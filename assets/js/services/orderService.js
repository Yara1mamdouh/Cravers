/**
 * Cravers | كريفيرز
 * Domain Service Layer: WhatsApp Order Message Formatter & Hybrid Dispatcher
 * 
 * Automated Hybrid Dispatch System:
 * 1. Primary Flow: Asynchronous API call (fetch) to automated WhatsApp gateway (e.g. UltraMsg)
 *    sending order confirmation & status directly to the customer's phone number.
 * 2. Fallback Flow: Immediately falls back to wa.me link targeting restaurant if gateway fails,
 *    errors out, or if credentials are left blank/placeholder, guaranteeing no order is ever lost.
 */

import { EMAILJS_CONFIG, getActiveConfig, getApiBaseUrl } from './emailService.js';
import { storage } from '../core/storage.js';

// =========================================================================
// 📱 AUTOMATED WHATSAPP GATEWAY CONFIGURATION (UltraMsg / Gateway API)
// Live gateway credentials configured:
// https://ultramsg.com/
// =========================================================================
export const WHATSAPP_GATEWAY_CONFIG = {
  INSTANCE_ID: 'instance190760',
  TOKEN: 'zn63a0x35ve7og9p',
  BASE_URL: 'https://api.ultramsg.com'
};

export function getActiveWhatsAppGatewayConfig() {
  const dynamicConfig = storage.getEmailConfig();
  if (dynamicConfig && dynamicConfig.ultraMsgInstanceId && dynamicConfig.ultraMsgToken) {
    return {
      INSTANCE_ID: dynamicConfig.ultraMsgInstanceId.trim(),
      TOKEN: dynamicConfig.ultraMsgToken.trim(),
      BASE_URL: 'https://api.ultramsg.com'
    };
  }
  return WHATSAPP_GATEWAY_CONFIG;
}

export const orderService = {
  /**
   * Formats the complete restaurant WhatsApp order ticket
   * @param {Object} orderData
   */
  formatWhatsAppMessage({ items, calculations, customer, fulfillment }) {
    const timestamp = new Date().toLocaleString('ar-EG', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    let typeText = '';
    let detailsText = '';

    if (fulfillment.type === 'dinein') {
      typeText = '🍽️ تناول بالصالة (Dine-in)';
      detailsText = `🏷️ رقم الطاولة (Table No): ${fulfillment.details || 'غير محدد'}`;
    } else if (fulfillment.type === 'takeaway') {
      typeText = '🛍️ استلام من المطعم (Takeaway)';
      detailsText = '📍 الاستلام من فرع كريفيرز الرئيسي';
    } else {
      typeText = '🛵 توصيل منزلي (Delivery)';
      detailsText = `📍 عنوان التوصيل: ${fulfillment.details || 'غير محدد'}`;
    }

    const itemsListText = items
      .map((item, index) => {
        let sizeInfo = item.size && item.size.name && item.size.id !== 'default' ? ` [${item.size.name}]` : '';
        let extrasInfo = '';
        if (item.extras && item.extras.length > 0) {
          extrasInfo = '\n   ➕ ' + item.extras.map((e) => e.name).join(', ');
        }
        return `${index + 1}. *${item.quantity}x ${item.title}* (${item.titleAr})${sizeInfo}${extrasInfo}\n   💵 *${item.totalPrice} EGP*`;
      })
      .join('\n\n');

    const notesSection = customer.notes && customer.notes.trim()
      ? `\n📝 *ملاحظات خاصة:*\n${customer.notes.trim()}\n`
      : '';

    const message = `🔥 *طلب جديد من Cravers | كريفيرز* 🔥
━━━━━━━━━━━━━━━━━━━━
🕒 *الوقت:* ${timestamp}
👤 *العميل:* ${customer.name || 'عميل كريفيرز'}
📞 *رقم الهاتف:* ${customer.phone || 'غير مسجل'}
📧 *البريد:* ${customer.email || 'غير مسجل'}
${typeText}
${detailsText}
━━━━━━━━━━━━━━━━━━━━
🍔 *تفاصيل الأصناف المطلوبة:*

${itemsListText}
${notesSection}━━━━━━━━━━━━━━━━━━━━
📊 *ملخص الحساب:*
• المجموع الفرعي: ${calculations.subtotal} EGP
• ضريبة القيمة المضافة (${calculations.taxRate}%): ${calculations.tax} EGP
${calculations.deliveryFee > 0 ? `• خدمة التوصيل: ${calculations.deliveryFee} EGP\n` : ''}💰 *الإجمالي النهائي: ${calculations.grandTotal} EGP*
━━━━━━━━━━━━━━━━━━━━
✨ شكرًا لاختيارك كريفيرز | Cravers - Satisfy Your Cravings! ✨`;

    return message;
  },

  /**
   * Formats the automated confirmation message sent to the customer
   * @param {Object} orderData
   */
  formatCustomerOrderConfirmation({ items, calculations, customer, fulfillment }) {
    let typeText = '';
    let detailsText = '';

    if (fulfillment.type === 'dinein') {
      typeText = '🍽️ نوع الطلب: صالة (Dine-in)';
      detailsText = `🏷️ رقم الطاولة: ${fulfillment.details || 'غير محدد'}`;
    } else if (fulfillment.type === 'takeaway') {
      typeText = '🛍️ نوع الطلب: استلام من المطعم (Takeaway)';
      detailsText = '📍 الاستلام من فرع كريفيرز الرئيسي';
    } else {
      typeText = '🛵 نوع الطلب: توصيل منزلي (Delivery)';
      detailsText = `📍 عنوان التوصيل: ${fulfillment.details || 'غير محدد'}`;
    }

    const itemsList = items
      .map((item, index) => {
        let sizeInfo = item.size && item.size.name && item.size.id !== 'default' ? ` [${item.size.name}]` : '';
        let extrasInfo = '';
        if (item.extras && item.extras.length > 0) {
          extrasInfo = '\n   ➕ ' + item.extras.map((e) => e.name).join(', ');
        }
        return `${index + 1}. *${item.quantity}x ${item.title}* (${item.titleAr})${sizeInfo}${extrasInfo}\n   💵 *${item.totalPrice} EGP*`;
      })
      .join('\n\n');

    const notesSection = customer.notes && customer.notes.trim()
      ? `\n📝 *ملاحظاتك:* ${customer.notes.trim()}\n`
      : '';

    return `🍔 *Cravers | كريفيرز* 🍔
━━━━━━━━━━━━━━━━━━━━
✨ *طلبك وصل المطبخ وجاري التجهيز!* ✨
━━━━━━━━━━━━━━━━━━━━
👤 *العميل:* ${customer.name}
📞 *رقم الهاتف:* ${customer.phone}
${typeText}
${detailsText}
━━━━━━━━━━━━━━━━━━━━
📋 *تفاصيل أصناف طلبك:*

${itemsList}
${notesSection}━━━━━━━━━━━━━━━━━━━━
📊 *الفاتورة الحسابية:*
• المجموع الفرعي: ${calculations.subtotal} EGP
• ضريبة القيمة المضافة (${calculations.taxRate}%): ${calculations.tax} EGP
${calculations.deliveryFee > 0 ? `• خدمة التوصيل: ${calculations.deliveryFee} EGP\n` : ''}💰 *الإجمالي النهائي: ${calculations.grandTotal} EGP*
━━━━━━━━━━━━━━━━━━━━
🕒 *وقت التجهيز المتوقع:* 15 - 25 دقيقة.
✨ شكراً لاختيارك Cravers | كريفيرز - أشبع رغبتك! ✨`;
  },

  /**
   * Generates direct wa.me link with encoded order text
   * @param {Object} orderData
   * @param {string} customPhone Optional override
   */
  generateWhatsAppLink(orderData, customPhone = null) {
    const message = this.formatWhatsAppMessage(orderData);
    const cfg = getActiveConfig ? getActiveConfig() : EMAILJS_CONFIG;
    const phone = customPhone || cfg.RESTAURANT_PHONE || '201000000000';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  },

  /**
   * Fallback: Opens wa.me direct WhatsApp link
   * @param {Object} orderData
   */
  fallbackToWaMe(orderData) {
    const url = this.generateWhatsAppLink(orderData);
    window.open(url, '_blank', 'noopener,noreferrer');
    return url;
  },

  /**
   * Automated Hybrid Dispatch System
   * 1. Primary Flow: Asynchronous API call to automated WhatsApp gateway
   * 2. Fallback Flow: Try/catch fallback to wa.me redirect if API fails or credentials invalid
   * @param {Object} orderData
   * @returns {Promise<{ success: boolean, method: 'automated_gateway'|'fallback_wame', url?: string, data?: Object }>}
   */
  async dispatchOrder(orderData) {
    const gateway = getActiveWhatsAppGatewayConfig();

    const hasValidGateway =
      gateway.INSTANCE_ID &&
      gateway.INSTANCE_ID !== 'YOUR_INSTANCE_ID' &&
      gateway.TOKEN &&
      gateway.TOKEN !== 'YOUR_TOKEN' &&
      orderData.customer &&
      orderData.customer.phone;

    // PRIMARY FLOW: Attempt automated WhatsApp gateway API dispatch to customer's phone
    if (hasValidGateway) {
      try {
        let cleanCustomerPhone = String(orderData.customer.phone).replace(/[^0-9]/g, '');
        if (cleanCustomerPhone.startsWith('01') && cleanCustomerPhone.length === 11) {
          cleanCustomerPhone = '2' + cleanCustomerPhone; // Egyptian international prefix
        }

        const messageText = this.formatCustomerOrderConfirmation(orderData);

        // 1. Try local server dispatch first (avoids any browser CORS issues)
        try {
          const apiBase = getApiBaseUrl();
          const serverRes = await fetch(`${apiBase}/api/orders/dispatch-whatsapp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: cleanCustomerPhone, body: messageText })
          });
          if (serverRes.ok) {
            const serverData = await serverRes.json();
            if (serverData.success) {
              console.log('[OrderService] Automated WhatsApp dispatch via server successful:', serverData);
              return {
                success: true,
                method: 'automated_gateway',
                data: serverData,
                message: 'تم إرسال تفاصيل وتأكيد الطلب إلى رقمك على الواتساب آلياً بنجاح! 🍔📱'
              };
            }
          }
        } catch (serverErr) {
          console.warn('[OrderService] Server dispatch failed, attempting direct UltraMsg call:', serverErr);
        }

        // 2. Direct UltraMsg API call
        const params = new URLSearchParams();
        params.append('token', gateway.TOKEN);
        params.append('to', cleanCustomerPhone);
        params.append('body', messageText);

        const endpoint = `${gateway.BASE_URL}/${gateway.INSTANCE_ID}/messages/chat`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        if (!response.ok) {
          throw new Error(`Gateway HTTP status ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log('[OrderService] Primary Flow: Automated WhatsApp dispatch successful:', data);
        return {
          success: true,
          method: 'automated_gateway',
          data,
          message: 'تم إرسال تفاصيل وتأكيد الطلب إلى رقمك على الواتساب آلياً بنجاح! 🍔📱'
        };
      } catch (error) {
        console.warn('[OrderService] Primary Flow failed. Activating Fallback Flow (wa.me):', error.message);
        // FALLBACK FLOW: Redirect to formatted wa.me link
        const fallbackUrl = this.fallbackToWaMe(orderData);
        return {
          success: true,
          method: 'fallback_wame',
          url: fallbackUrl,
          message: 'تم تحويلك إلى واتساب لإرسال الطلب مباشرة إلى المطعم.'
        };
      }
    } else {
      // Fallback Flow: Credentials empty/placeholder -> Instant wa.me redirect
      console.info('[OrderService] Gateway credentials missing or placeholder. Running Fallback Flow (wa.me).');
      const fallbackUrl = this.fallbackToWaMe(orderData);
      return {
        success: true,
        method: 'fallback_wame',
        url: fallbackUrl,
        message: 'تم تحويلك إلى واتساب لإرسال الطلب مباشرة.'
      };
    }
  },

  /**
   * Backwards compatible method wrapping dispatchOrder
   * @param {Object} orderData
   */
  async submitOrderViaWhatsApp(orderData) {
    return await this.dispatchOrder(orderData);
  }
};
