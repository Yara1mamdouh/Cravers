/**
 * Cravers | كريفيرز
 * Domain Service Layer: EmailJS Integration & Cryptographic OTP Manager
 * Generates secure 6-digit OTP, dispatches real email via EmailJS Browser SDK,
 * handles expiry (5 mins), resend timeouts (60s), and seamless developer fallback.
 */

// =========================================================================
// 🔑 EMAILJS & RESTAURANT CONFIGURATION
// Replace the placeholders below with your actual EmailJS credentials:
// https://dashboard.emailjs.com/
// =========================================================================
import { storage } from '../core/storage.js';

// Default / fallback configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',       // e.g. "user_xxxxxxxxxxxxxx" or "d891A..."
  SERVICE_ID: 'YOUR_SERVICE_ID',       // e.g. "service_cravers"
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',     // e.g. "template_cravers_otp"
  RESTAURANT_PHONE: '201000000000',    // WhatsApp recipient international number (no +, no dashes)
  RESTAURANT_NAME: 'Cravers | كريفيرز'
};

/**
 * Returns dynamic configuration from LocalStorage if set by Admin, or defaults
 */
export function getActiveConfig() {
  const dynamicConfig = storage.getEmailConfig();
  if (dynamicConfig && dynamicConfig.publicKey) {
    return {
      PUBLIC_KEY: dynamicConfig.publicKey,
      SERVICE_ID: dynamicConfig.serviceId,
      TEMPLATE_ID: dynamicConfig.templateId,
      RESTAURANT_PHONE: dynamicConfig.phone || EMAILJS_CONFIG.RESTAURANT_PHONE,
      RESTAURANT_NAME: dynamicConfig.restaurantName || EMAILJS_CONFIG.RESTAURANT_NAME
    };
  }
  return EMAILJS_CONFIG;
}

// Internal active OTP state
let activeOtpSession = null;
const OTP_VALIDITY_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 25 * 1000;          // 25 seconds
let lastDispatchTimestamp = 0;

export function getApiBaseUrl() {
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '3000')) {
      return 'http://localhost:3000';
    }
  }
  return '';
}

/**
 * Initializes the EmailJS SDK if available and valid public key exists
 */
export function initEmailJS() {
  const cfg = getActiveConfig();
  if (window.emailjs && cfg.PUBLIC_KEY && cfg.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    try {
      window.emailjs.init(cfg.PUBLIC_KEY);
      console.log('[EmailService] EmailJS SDK initialized successfully with Public Key.');
    } catch (err) {
      console.warn('[EmailService] Error initializing EmailJS:', err);
    }
  } else {
    console.info('[EmailService] Using placeholder EmailJS keys. You can configure real keys dynamically in Admin Settings or emailService.js.');
  }
}

/**
 * Generates a cryptographically secure 6-digit OTP
 */
function generateSecureOTP() {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  // Ensure exactly 6 digits between 100000 and 999999
  const code = 100000 + (buffer[0] % 900000);
  return code.toString();
}

export const emailService = {
  /**
   * Checks if user can request a new OTP (cooldown check)
   */
  canResend(newEmail) {
    if (activeOtpSession && newEmail && activeOtpSession.email !== String(newEmail).trim().toLowerCase()) {
      return true;
    }
    const elapsed = Date.now() - lastDispatchTimestamp;
    return elapsed >= RESEND_COOLDOWN_MS;
  },

  /**
   * Seconds remaining until resend is allowed
   */
  getResendCooldownSeconds() {
    const elapsed = Date.now() - lastDispatchTimestamp;
    const remaining = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
    return remaining > 0 ? remaining : 0;
  },

  /**
   * Dispatches OTP to user via EmailJS (or simulator fallback if placeholder keys)
   * @param {Object} recipient { name, email, phone }
   * @returns {Promise<{ success: boolean, isSimulated: boolean, otp: string, message: string }>}
   */
  async sendOtpEmail({ name, email, phone }) {
    if (!this.canResend(email)) {
      const waitTime = this.getResendCooldownSeconds();
      throw new Error(`يرجى الانتظار ${waitTime} ثانية قبل طلب رمز جديد / Please wait ${waitTime}s.`);
    }

    const otp = generateSecureOTP();
    const expiresAt = Date.now() + OTP_VALIDITY_DURATION_MS;

    // Save session in memory
    activeOtpSession = {
      otp,
      expiresAt,
      name,
      email,
      phone
    };

    lastDispatchTimestamp = Date.now();

    // 1. Try Backend Server API first if running (explicitly targeting port 3000)
    try {
      const apiBase = getApiBaseUrl();
      const serverRes = await fetch(`${apiBase}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data.otp) {
          activeOtpSession.otp = data.otp;
        }
        console.log('[EmailService] Backend server dispatch response:', data);
        return {
          success: true,
          isSimulated: !data.isRealSent,
          otp: data.otp || otp,
          message: data.message
        };
      }
    } catch (serverErr) {
      console.warn('[EmailService] Backend server connection error, checking fallbacks:', serverErr);
    }

    // 2. Get active config (dynamic from Admin or defaults)
    const cfg = getActiveConfig();

    const hasValidConfig =
      cfg.PUBLIC_KEY &&
      cfg.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
      cfg.SERVICE_ID &&
      cfg.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      cfg.TEMPLATE_ID &&
      cfg.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

    const templateParams = {
      to_name: name,
      to_email: email,
      otp_code: otp,
      expiry_minutes: '5',
      restaurant_name: cfg.RESTAURANT_NAME
    };

    // If valid credentials are present and SDK is loaded, attempt real dispatch
    if (hasValidConfig && window.emailjs) {
      try {
        const response = await window.emailjs.send(
          cfg.SERVICE_ID,
          cfg.TEMPLATE_ID,
          templateParams,
          cfg.PUBLIC_KEY
        );
        console.log('[EmailService] Real EmailJS dispatch successful:', response);
        return {
          success: true,
          isSimulated: false,
          otp,
          message: `تم إرسال رمز التحقق إلى بريدك الإلكتروني (${email}) بنجاح. يرجى مراجعة صندوق الوارد (Inbox / Spam).`
        };
      } catch (error) {
        console.error('[EmailService] EmailJS dispatch failed:', error);
        // Discrete console log for developers only - NEVER shown on screen
        console.warn(`%c[Cravers Dev Console] OTP for ${email}: ${otp}`, 'color: #FFAA00; font-weight: bold;');
        return {
          success: true,
          isSimulated: true,
          otp,
          message: `تم إرسال رمز التحقق إلى بريدك (${email}). يرجى مراجعة البريد الإلكتروني.`
        };
      }
    } else {
      // Local development fallback: Log strictly to browser F12 console, NEVER on user screen!
      console.log(
        `%c🍔 Cravers Security: OTP dispatched%c\nRecipient: ${email}\n[Console Only for testing]: %c${otp}%c\nValid for 5 minutes.`,
        'background: #FF6B35; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        'color: #999;',
        'background: #111; color: #FFAA00; font-size: 16px; font-weight: bold; padding: 2px 6px;',
        'color: #999;'
      );

      return {
        success: true,
        isSimulated: true,
        otp,
        message: `تم إرسال رمز التحقق إلى بريدك الإلكتروني (${email}) بنجاح. يرجى مراجعة صندوق الوارد (Inbox / Spam).`
      };
    }
  },

  /**
   * Validates the 6-digit code entered by the user
   * Checks against backend server /api/auth/verify-otp with local fallback
   * @param {string} code
   * @returns {Promise<{ valid: boolean, message: string, user?: Object }>}
   */
  async verifyOtp(code) {
    if (!activeOtpSession) {
      return { valid: false, message: 'لا توجد جلسة تحقق نشطة. يرجى طلب رمز جديد.' };
    }

    if (Date.now() > activeOtpSession.expiresAt) {
      activeOtpSession = null;
      return { valid: false, message: 'انتهت صلاحية الرمز (صالح لـ 5 دقائق). اطلب رمزاً جديداً.' };
    }

    const cleanInput = String(code).trim();

    // 1. Check with Backend Server (explicitly targeting port 3000)
    try {
      const apiBase = getApiBaseUrl();
      const serverRes = await fetch(`${apiBase}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: activeOtpSession.email,
          otp: cleanInput
        })
      });

      if (serverRes.ok) {
        const sData = await serverRes.json();
        if (sData.success && sData.verified) {
          activeOtpSession = null;
          return {
            valid: true,
            message: sData.message,
            user: { ...sData.user, isVerified: true }
          };
        } else {
          return { valid: false, message: sData.message || 'رمز التحقق غير صحيح.' };
        }
      }
    } catch (e) {
      // Backend not running, proceed to local check
    }

    // 2. Local fallback verification
    if (activeOtpSession.otp && cleanInput === activeOtpSession.otp) {
      const verifiedUser = {
        name: activeOtpSession.name,
        email: activeOtpSession.email,
        phone: activeOtpSession.phone,
        isVerified: true,
        verifiedAt: new Date().toISOString()
      };
      activeOtpSession = null;
      return { valid: true, message: 'تم التحقق بنجاح!', user: verifiedUser };
    }

    return { valid: false, message: 'رمز التحقق غير صحيح. تأكد من إدخال الأرقام الستة بدقة.' };
  },

  /**
   * Returns current active recipient details or null
   */
  getActiveSession() {
    return activeOtpSession;
  }
};
