const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// In-memory active OTP store: { [email]: { otp, expiresAt, name, phone } }
const activeOtpSessions = new Map();

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
}

function buildOtpEmailHtml({ name, otp }) {
  return `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0d1117; color: #ffffff; padding: 20px; margin: 0; }
      .container { max-width: 520px; margin: 0 auto; background: #161b22; border-radius: 16px; border: 1px solid #30363d; overflow: hidden; }
      .header { background: linear-gradient(135deg, #FF6B35, #FF8C00); padding: 30px 20px; text-align: center; }
      .header h1 { margin: 0; font-size: 26px; color: #ffffff; font-weight: 800; }
      .header p { margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
      .content { padding: 30px 25px; text-align: center; }
      .greeting { font-size: 18px; color: #e6edf3; margin-bottom: 20px; }
      .otp-box { background: #0d1117; border: 2px dashed #FF6B35; border-radius: 12px; padding: 20px; margin: 25px 0; display: inline-block; }
      .otp-code { font-size: 38px; font-weight: 900; letter-spacing: 12px; color: #FF8C00; font-family: monospace; }
      .notice { font-size: 13px; color: #8b949e; margin-top: 15px; line-height: 1.6; }
      .footer { background: #090d13; padding: 15px; text-align: center; font-size: 12px; color: #6e7681; border-top: 1px solid #21262d; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Cravers | كريفيرز 🔥</h1>
        <p>Satisfy Your Cravings | أشبع رغبتك</p>
      </div>
      <div class="content">
        <div class="greeting">مرحباً <strong>${name || 'عزيزنا العميل'}</strong> 👋</div>
        <p style="color: #c9d1d9; font-size: 15px; line-height: 1.6;">
          شكراً لتسجيلك في كريفيرز! استخدم رمز التحقق التالي لتأكيد بريدك الإلكتروني وإتمام طلبك:
        </p>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <div class="notice">
          ⏱️ هذا الرمز صالح لمدة <strong>5 دقائق فقط</strong>.<br>
          ⚠️ يرجى عدم مشاركة هذا الرمز مع أي شخص لحماية حسابك وخصوصيتك.
        </div>
      </div>
      <div class="footer">
        © 2026 Cravers Gourmet Restaurant. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    activeOtpSessions.set(cleanEmail, {
      otp,
      expiresAt,
      name: name || 'Valued Guest',
      phone: phone || ''
    });

    console.log(`[Server Auth] Generated dynamic OTP for ${cleanEmail}: ${otp}`);

    const transporter = createTransporter();

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"Cravers Restaurant | كريفيرز" <${process.env.SMTP_USER}>`,
          to: cleanEmail,
          subject: `رمز تأكيد حسابك في كريفيرز: ${otp}`,
          text: `مرحباً ${name || 'عزيزنا العميل'}،\n\nشكراً لتسجيلك في كريفيرز!\nرمز التحقق الخاص بك هو: ${otp}\n\nهذا الرمز صالح لمدة 5 دقائق.\nCravers Gourmet Restaurant`,
          html: buildOtpEmailHtml({ name, otp })
        });

        console.log(`[Server Auth] Real email sent to ${cleanEmail}! MessageId: ${info.messageId}`);

        return res.json({
          success: true,
          isRealSent: true,
          message: `تم إرسال رمز التحقق الحقيقي إلى بريدك الإلكتروني (${cleanEmail}) بنجاح! راجع صندوق الوارد (Inbox / Spam).`
        });
      } catch (mailErr) {
        console.error('[Server Auth] Error sending email via SMTP:', mailErr.message);
        return res.json({
          success: true,
          isRealSent: false,
          otp,
          message: `تعذر إرسال الإيميل بسبب إعدادات SMTP (${mailErr.message}). الرمز للتجربة: ${otp}`
        });
      }
    } else {
      console.warn(`[Server Auth] No SMTP credentials configured in .env.`);
      return res.json({
        success: true,
        isRealSent: false,
        otp,
        message: `تم توليد الرمز بنجاح! لكي يصل بريد حقيقي إلى Gmail، يرجى تفعيل SMTP في ملف .env. الرمز للتجربة: ${otp}`
      });
    }
  } catch (err) {
    console.error('[Server Auth] Exception in /send-otp:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const session = activeOtpSessions.get(cleanEmail);

    if (!session) {
      return res.status(400).json({ success: false, message: 'لا توجد جلسة تحقق نشطة لهذا البريد. اطلب رمزاً جديداً.' });
    }

    if (Date.now() > session.expiresAt) {
      activeOtpSessions.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'انتهت صلاحية الرمز (صالح لـ 5 دقائق فقط). يرجى طلب رمز جديد.' });
    }

    if (session.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'رمز التحقق غير صحيح. تأكد من إدخال الأرقام الستة بدقة.' });
    }

    activeOtpSessions.delete(cleanEmail);
    const user = {
      name: session.name,
      email: cleanEmail,
      phone: session.phone,
      verified: true,
      verifiedAt: new Date().toISOString()
    };

    console.log(`[Server Auth] User verified successfully: ${cleanEmail}`);
    res.json({
      success: true,
      verified: true,
      user,
      message: `تم التحقق من بريدك الإلكتروني بنجاح! أهلاً بك يا ${session.name}.`
    });
  } catch (err) {
    console.error('[Server Auth] Exception in /verify-otp:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/config/smtp', (req, res) => {
  const { smtpUser, smtpPass } = req.body;
  if (!smtpUser || !smtpPass) {
    return res.status(400).json({ success: false, message: 'SMTP User and Pass are required.' });
  }
  process.env.SMTP_USER = smtpUser.trim();
  process.env.SMTP_PASS = smtpPass.trim();

  const envContent = `PORT=${PORT}\nSMTP_USER=${process.env.SMTP_USER}\nSMTP_PASS=${process.env.SMTP_PASS}\n`;
  fs.writeFileSync(path.join(__dirname, '.env'), envContent, 'utf8');

  res.json({ success: true, message: 'SMTP settings updated successfully!' });
});

app.post('/api/orders/dispatch-whatsapp', async (req, res) => {
  try {
    const { to, body } = req.body;
    const instanceId = process.env.ULTRAMSG_INSTANCE_ID || 'instance190760';
    const token = process.env.ULTRAMSG_TOKEN || 'zn63a0x35ve7og9p';

    if (!to || !body) {
      return res.status(400).json({ success: false, message: 'Recipient phone (to) and body text are required.' });
    }

    // Clean and normalize phone number
    let cleanPhone = String(to).replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('01') && cleanPhone.length === 11) {
      cleanPhone = '2' + cleanPhone; // Egyptian international format
    }

    console.log(`[Server WhatsApp] Dispatching automated WhatsApp message to ${cleanPhone}...`);

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('to', cleanPhone);
    params.append('body', body);

    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json();
    console.log('[Server WhatsApp] UltraMsg API response:', data);

    if (data.error) {
      return res.status(400).json({ success: false, error: data.error });
    }

    return res.json({
      success: true,
      data,
      message: 'تم إرسال تفاصيل وتأكيد الطلب إلى رقمك على الواتساب آلياً بنجاح!'
    });
  } catch (err) {
    console.error('[Server WhatsApp] Exception in /dispatch-whatsapp:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Cravers Restaurant Server running on: http://localhost:${PORT}`);
  console.log(`🍔 Master Menu: 67 dishes with high-res photography`);
  console.log(`📧 OTP Email Service: ${process.env.SMTP_USER ? 'Active (Real SMTP)' : 'Ready (Awaiting SMTP config)'}`);
  console.log(`==================================================\n`);
});
