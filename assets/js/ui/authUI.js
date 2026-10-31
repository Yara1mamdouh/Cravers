/**
 * Cravers | كريفيرز
 * UI Layer: Authentication Controller & 6-Digit PIN Modal
 * Handles registration inputs, auto-advancing OTP boxes, countdown timer,
 * paste detection, user avatar rendering, and login state notifications.
 */

import { authService } from '../services/authService.js';
import { emailService } from '../services/emailService.js';

let authModalInstance = null;
let countdownInterval = null;

export const authUI = {
  init() {
    this.modalEl = document.getElementById('authModal');
    if (this.modalEl && window.bootstrap) {
      authModalInstance = new window.bootstrap.Modal(this.modalEl);
    }

    this.bindEvents();
    this.setupOtpInputs();

    // Subscribe to auth state updates
    authService.subscribe((user) => {
      this.renderNavbarAuth(user);
    });
  },

  showModal(step = 'register') {
    if (!authModalInstance && this.modalEl && window.bootstrap) {
      authModalInstance = new window.bootstrap.Modal(this.modalEl);
    }

    if (step === 'register') {
      this.switchStep('register');
    }

    if (authModalInstance) {
      authModalInstance.show();
    }
  },

  hideModal() {
    if (authModalInstance) {
      authModalInstance.hide();
    }
    clearInterval(countdownInterval);
  },

  switchStep(step) {
    const registerStep = document.getElementById('authStepRegister');
    const otpStep = document.getElementById('authStepOtp');

    if (step === 'otp') {
      registerStep.classList.add('d-none');
      otpStep.classList.remove('d-none');
      // Focus first OTP box
      setTimeout(() => {
        const firstOtp = document.querySelector('.otp-box[data-index="0"]');
        if (firstOtp) firstOtp.focus();
      }, 200);
    } else {
      otpStep.classList.add('d-none');
      registerStep.classList.remove('d-none');
      this.clearOtpInputs();
      clearInterval(countdownInterval);
    }
  },

  setupOtpInputs() {
    const otpBoxes = document.querySelectorAll('.otp-box');

    otpBoxes.forEach((box, index) => {
      // Keydown handler: Backspace & Arrow keys navigation
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!box.value && index > 0) {
            otpBoxes[index - 1].focus();
            otpBoxes[index - 1].value = '';
          } else {
            box.value = '';
          }
          e.preventDefault();
        } else if (e.key === 'ArrowLeft' && index > 0) {
          otpBoxes[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });

      // Input handler: numeric input and auto-advance
      box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        box.value = val ? val.slice(-1) : '';

        if (box.value && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }

        // Auto-verify if all 6 digits are filled
        const fullOtp = Array.from(otpBoxes).map((b) => b.value).join('');
        if (fullOtp.length === 6) {
          this.handleOtpSubmit();
        }
      });

      // Clipboard Paste handler: paste 6-digit code
      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const clipboardData = (e.clipboardData || window.clipboardData).getData('text');
        const numbersOnly = clipboardData.replace(/[^0-9]/g, '').slice(0, 6);

        if (numbersOnly.length > 0) {
          numbersOnly.split('').forEach((digit, i) => {
            if (otpBoxes[i]) {
              otpBoxes[i].value = digit;
            }
          });

          if (numbersOnly.length === 6) {
            this.handleOtpSubmit();
          } else {
            const nextIndex = Math.min(numbersOnly.length, otpBoxes.length - 1);
            otpBoxes[nextIndex].focus();
          }
        }
      });
    });
  },

  clearOtpInputs() {
    document.querySelectorAll('.otp-box').forEach((box) => {
      box.value = '';
      box.classList.remove('is-invalid');
    });
  },

  startCountdown(seconds = 60) {
    clearInterval(countdownInterval);
    let remaining = seconds;
    const countdownEl = document.getElementById('otpCountdownText');
    const resendBtn = document.getElementById('btnResendOtp');

    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.classList.add('opacity-50');
    }

    const updateDisplay = () => {
      if (countdownEl) {
        countdownEl.textContent = `(${remaining}s)`;
      }
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        if (countdownEl) countdownEl.textContent = '';
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.classList.remove('opacity-50');
        }
      }
      remaining--;
    };

    updateDisplay();
    countdownInterval = setInterval(updateDisplay, 1000);
  },

  async handleRegisterSubmit(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('authName');
    const emailInput = document.getElementById('authEmail');
    const phoneInput = document.getElementById('authPhone');
    const submitBtn = document.getElementById('btnSubmitRegister');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !email) {
      this.showToast('Please enter your name and a valid email address.', 'warning');
      return;
    }

    // Set loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending Code...';
    }

    try {
      const result = await authService.requestOtp(name, email, phone);

      // Update target email display in OTP view
      const emailDisplay = document.getElementById('otpTargetEmail');
      if (emailDisplay) emailDisplay.textContent = email;

      this.switchStep('otp');
      this.startCountdown(60);

      this.showToast(result.message, result.isSimulated ? 'info' : 'success');
    } catch (err) {
      this.showToast(err.message || 'Failed to dispatch verification code.', 'danger');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i> Send Verification Code';
      }
    }
  },

  async handleResendOtp() {
    const session = emailService.getActiveSession();
    if (!session) {
      this.switchStep('register');
      return;
    }

    const resendBtn = document.getElementById('btnResendOtp');
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    }

    try {
      const result = await emailService.sendOtpEmail({
        name: session.name,
        email: session.email,
        phone: session.phone
      });
      this.clearOtpInputs();
      this.startCountdown(60);
      this.showToast(result.message, result.isSimulated ? 'info' : 'success');
    } catch (err) {
      this.showToast(err.message, 'warning');
    } finally {
      if (resendBtn) {
        resendBtn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Resend Code <span id="otpCountdownText"></span>';
      }
    }
  },

  async handleOtpSubmit() {
    const otpBoxes = document.querySelectorAll('.otp-box');
    const enteredOtp = Array.from(otpBoxes).map((b) => b.value).join('');

    if (enteredOtp.length !== 6) {
      this.showToast('Please enter the full 6-digit verification code.', 'warning');
      return;
    }

    const submitBtn = document.getElementById('btnVerifyOtpSubmit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> جاري التحقق...';
    }

    try {
      const result = await authService.verifyOtp(enteredOtp);

      if (result.valid) {
        otpBoxes.forEach((b) => b.classList.remove('is-invalid'));
        this.showToast(`Welcome, ${result.user.name}! Your account is verified. ✨`, 'success');
        this.hideModal();
      } else {
        otpBoxes.forEach((b) => b.classList.add('is-invalid'));
        this.showToast(result.message, 'danger');
        setTimeout(() => {
          this.clearOtpInputs();
          if (otpBoxes[0]) otpBoxes[0].focus();
        }, 500);
      }
    } catch (err) {
      this.showToast(err.message || 'حدث خطأ أثناء التحقق من الرمز.', 'danger');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-patch-check-fill me-2"></i> Verify & Proceed';
      }
    }
  },

  renderNavbarAuth(user) {
    const container = document.getElementById('navbarAuthContainer');
    if (!container) return;

    if (user && user.isVerified) {
      const initial = user.name ? user.name.charAt(0).toUpperCase() : 'C';
      container.innerHTML = `
        <div class="dropdown">
          <div class="user-profile-chip dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" role="button">
            <div class="user-avatar-initial">${initial}</div>
            <span class="user-chip-name">${user.name}</span>
            <span class="user-chip-badge"><i class="bi bi-patch-check-fill me-1"></i>Verified</span>
          </div>
          <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-2 mt-2">
            <li class="px-3 py-2 border-bottom">
              <div class="fw-bold">${user.name}</div>
              <div class="small text-muted">${user.email}</div>
              ${user.phone ? `<div class="small text-muted">${user.phone}</div>` : ''}
            </li>
            <li>
              <button class="dropdown-item text-danger d-flex align-items-center gap-2 py-2 mt-1" id="btnLogoutUser">
                <i class="bi bi-box-arrow-right"></i> Sign Out / تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      `;

      const logoutBtn = container.querySelector('#btnLogoutUser');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          authService.logout();
          this.showToast('You have been signed out.', 'info');
        });
      }
    } else {
      container.innerHTML = `
        <button class="btn btn-cravers-outline d-flex align-items-center gap-2" id="btnNavbarLogin">
          <i class="bi bi-person-fill"></i>
          <span>Login / تسجيل</span>
        </button>
      `;

      const loginBtn = container.querySelector('#btnNavbarLogin');
      if (loginBtn) {
        loginBtn.addEventListener('click', () => this.showModal('register'));
      }
    }
  },

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const icons = {
      success: 'bi-check-circle-fill text-success',
      danger: 'bi-exclamation-octagon-fill text-danger',
      warning: 'bi-exclamation-triangle-fill text-warning',
      info: 'bi-info-circle-fill text-primary'
    };

    const toastEl = document.createElement('div');
    toastEl.className = 'cravers-toast';
    toastEl.innerHTML = `
      <i class="bi ${icons[type] || icons.info} fs-5"></i>
      <div class="flex-grow-1 font-monospace-hint" style="font-size: 0.88rem;">${message}</div>
      <button type="button" class="btn-close btn-close-white ms-2" aria-label="Close"></button>
    `;

    toastContainer.appendChild(toastEl);

    const closeBtn = toastEl.querySelector('.btn-close');
    const dismiss = () => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(-10px)';
      setTimeout(() => toastEl.remove(), 250);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, 5000);
  },

  bindEvents() {
    const registerForm = document.getElementById('authRegisterForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegisterSubmit(e));
    }

    const resendBtn = document.getElementById('btnResendOtp');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.handleResendOtp());
    }

    const backToRegisterBtn = document.getElementById('btnBackToRegister');
    if (backToRegisterBtn) {
      backToRegisterBtn.addEventListener('click', () => this.switchStep('register'));
    }

    const verifyOtpBtn = document.getElementById('btnVerifyOtpSubmit');
    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener('click', () => this.handleOtpSubmit());
    }
  }
};
