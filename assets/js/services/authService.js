/**
 * Cravers | كريفيرز
 * Domain Service Layer: Authentication Service
 * Manages user session state, OTP validation, verification persistence, and event subscriptions.
 */

import { storage } from '../core/storage.js';
import { emailService } from './emailService.js';

let currentUser = null;
const authListeners = new Set();

export const authService = {
  /**
   * Initializes session from storage
   */
  init() {
    currentUser = storage.getUser();
    return currentUser;
  },

  /**
   * Returns currently logged-in user object or null
   */
  getCurrentUser() {
    if (!currentUser) {
      currentUser = storage.getUser();
    }
    return currentUser;
  },

  /**
   * Checks if user is authenticated and email-verified
   */
  isAuthenticated() {
    const user = this.getCurrentUser();
    return Boolean(user && user.isVerified);
  },

  /**
   * Requests a new 6-digit OTP email
   * @param {string} name
   * @param {string} email
   * @param {string} phone
   */
  async requestOtp(name, email, phone) {
    if (!name || !email) {
      throw new Error('Name and email are required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid email address.');
    }

    return await emailService.sendOtpEmail({
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim()
    });
  },

  /**
   * Validates OTP input and establishes verified session
   * @param {string} otpCode
   */
  async verifyOtp(otpCode) {
    const result = await emailService.verifyOtp(otpCode);
    if (result.valid && result.user) {
      currentUser = result.user;
      storage.saveUser(currentUser);
      this._notifyListeners();
    }
    return result;
  },

  /**
   * Terminates active session and notifies subscribers
   */
  logout() {
    currentUser = null;
    storage.clearUser();
    this._notifyListeners();
  },

  /**
   * Event listener subscription for auth changes
   * @param {Function} callback
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    authListeners.add(callback);
    // Trigger immediately with current state
    try {
      callback(this.getCurrentUser());
    } catch (err) {
      console.error('[AuthService] Listener execution error:', err);
    }
    return () => authListeners.delete(callback);
  },

  _notifyListeners() {
    const user = this.getCurrentUser();
    authListeners.forEach((fn) => {
      try {
        fn(user);
      } catch (err) {
        console.error('[AuthService] Subscriber notification error:', err);
      }
    });
  }
};
