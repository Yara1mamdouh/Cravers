/**
 * Cravers | كريفيرز
 * Main Application Bootstrapper (ES6 Modules)
 * Initializes services, configures EmailJS, binds controllers, and starts the UI.
 */

import { initEmailJS } from './services/emailService.js';
import { authService } from './services/authService.js';
import { cartService } from './services/cartService.js';
import { themeUI } from './ui/themeUI.js';
import { authUI } from './ui/authUI.js';
import { menuUI } from './ui/menuUI.js';
import { cartUI } from './ui/cartUI.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🍔 Cravers | كريفيرز%c Digital Menu initialized with Clean Architecture.', 'background: #FF6B35; color: #fff; font-weight: bold; font-size: 14px; padding: 4px 10px; border-radius: 4px;', 'color: #FFAA00;');

  // 1. Initialize Theme (Dark/Light)
  themeUI.init();

  // 2. Initialize EmailJS SDK
  initEmailJS();

  // 3. Initialize Core Domain Services
  authService.init();
  cartService.init();

  // 4. Initialize UI Presentation Layer
  authUI.init();
  menuUI.init();
  cartUI.init();

  // Expose global debug utilities for developers
  window.Cravers = {
    authService,
    cartService,
    themeUI,
    authUI,
    menuUI,
    cartUI
  };
});
