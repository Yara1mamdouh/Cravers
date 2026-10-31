/**
 * Cravers | كريفيرز
 * UI Layer: Theme Switcher Controller
 * Manages dark/light theme switching, persistent storage, and icon transitions.
 */

import { storage } from '../core/storage.js';

export const themeUI = {
  currentTheme: 'dark',

  init() {
    this.currentTheme = storage.getTheme() || 'dark';
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  },

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    storage.saveTheme(theme);
    this.updateIcons(theme);
  },

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  },

  updateIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('title', 'Switch to Light Mode / تفعيل الوضع الفاتح');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode / تفعيل الوضع الداكن');
        }
      }
    });
  },

  bindEvents() {
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.toggleTheme());
    });
  }
};
