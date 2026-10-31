/**
 * Cravers | كريفيرز
 * Core Layer: LocalStorage Management
 * Handles persistent client-side state for cart, user auth session, menu overrides, and theme.
 */

const STORAGE_KEYS = {
  CART: 'cravers_cart',
  USER: 'cravers_user',
  CUSTOM_MENU: 'cravers_custom_menu',
  THEME: 'cravers_theme',
  CONFIG: 'cravers_app_config'
};

export const storage = {
  /**
   * Cart Operations
   */
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('[Storage] Error reading cart:', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      return true;
    } catch (e) {
      console.error('[Storage] Error saving cart:', e);
      return false;
    }
  },

  clearCart() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CART);
      return true;
    } catch (e) {
      console.error('[Storage] Error clearing cart:', e);
      return false;
    }
  },

  /**
   * User & Auth Session Operations
   */
  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('[Storage] Error reading user session:', e);
      return null;
    }
  },

  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return true;
    } catch (e) {
      console.error('[Storage] Error saving user session:', e);
      return false;
    }
  },

  clearUser() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      return true;
    } catch (e) {
      console.error('[Storage] Error clearing user session:', e);
      return false;
    }
  },

  /**
   * Menu Operations (Default + Admin Custom Dishes)
   */
  getCustomMenu() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_MENU);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('[Storage] Error reading custom menu:', e);
      return [];
    }
  },

  saveCustomMenu(items) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MENU, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('[Storage] Error saving custom menu:', e);
      return false;
    }
  },

  clearCustomMenu() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_MENU);
      return true;
    } catch (e) {
      console.error('[Storage] Error resetting custom menu:', e);
      return false;
    }
  },

  /**
   * Theme Mode Operations ('dark' | 'light')
   */
  getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    } catch (e) {
      return 'dark';
    }
  },

  saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (e) {
      console.error('[Storage] Error saving theme:', e);
      return false;
    }
  },

  /**
   * Dynamic EmailJS & Restaurant Configuration
   */
  getEmailConfig() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('[Storage] Error reading email config:', e);
      return null;
    }
  },

  saveEmailConfig(config) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
      return true;
    } catch (e) {
      console.error('[Storage] Error saving email config:', e);
      return false;
    }
  },

  clearEmailConfig() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
      return true;
    } catch (e) {
      return false;
    }
  }
};
