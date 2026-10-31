/**
 * Cravers | كريفيرز
 * Domain Service Layer: Cart Calculation & State Manager
 * Handles item options, sizes, add-ons, quantity modifications, tax, fees, and calculations.
 */

import { storage } from '../core/storage.js';

const TAX_RATE = 0.10; // 10% VAT
const DELIVERY_FEE = 25; // 25 EGP fixed delivery fee

let cartItems = [];
const cartListeners = new Set();

/**
 * Computes a unique hash/ID for a cart entry based on dishId, sizeId, and sorted extras IDs
 */
function createCartItemKey(dishId, sizeId, extras) {
  const sortedExtras = [...(extras || [])].map((e) => e.id).sort().join(',');
  return `${dishId}__${sizeId || 'default'}__${sortedExtras}`;
}

export const cartService = {
  /**
   * Initializes cart from local storage
   */
  init() {
    cartItems = storage.getCart();
    return cartItems;
  },

  /**
   * Retrieves all items currently in cart
   */
  getItems() {
    return [...cartItems];
  },

  /**
   * Total number of individual items in cart
   */
  getItemCount() {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  },

  /**
   * Adds an item with chosen size and extras to cart
   * @param {Object} dish Base dish object
   * @param {Object} size Selected size { id, name, priceDiff }
   * @param {Array} extras Array of selected extras [{ id, name, price }]
   * @param {number} quantity
   */
  addItem(dish, size, extras = [], quantity = 1) {
    const safeQty = Math.max(1, parseInt(quantity, 10) || 1);
    const sizeObj = size || { id: 'default', name: 'Standard', priceDiff: 0 };
    const safeExtras = Array.isArray(extras) ? extras : [];

    const itemKey = createCartItemKey(dish.id, sizeObj.id, safeExtras);

    // Calculate unit price: dish base + size price difference + all selected extras
    const extrasTotal = safeExtras.reduce((sum, ext) => sum + (Number(ext.price) || 0), 0);
    const unitPrice = Number(dish.price) + (Number(sizeObj.priceDiff) || 0) + extrasTotal;

    const existingIndex = cartItems.findIndex((item) => item.key === itemKey);

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += safeQty;
      cartItems[existingIndex].totalPrice = cartItems[existingIndex].quantity * unitPrice;
    } else {
      cartItems.push({
        id: 'ci_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        key: itemKey,
        dishId: dish.id,
        title: dish.title,
        titleAr: dish.titleAr,
        image: dish.image,
        category: dish.category,
        size: sizeObj,
        extras: safeExtras,
        unitPrice,
        quantity: safeQty,
        totalPrice: unitPrice * safeQty
      });
    }

    this._persistAndNotify();
  },

  /**
   * Modifies quantity of a cart item
   * @param {string} cartItemId
   * @param {number} delta e.g. +1 or -1
   */
  changeQuantity(cartItemId, delta) {
    const itemIndex = cartItems.findIndex((i) => i.id === cartItemId);
    if (itemIndex === -1) return;

    const newQty = cartItems[itemIndex].quantity + delta;
    if (newQty <= 0) {
      cartItems.splice(itemIndex, 1);
    } else {
      cartItems[itemIndex].quantity = newQty;
      cartItems[itemIndex].totalPrice = newQty * cartItems[itemIndex].unitPrice;
    }

    this._persistAndNotify();
  },

  /**
   * Removes an item by cart ID
   * @param {string} cartItemId
   */
  removeItem(cartItemId) {
    cartItems = cartItems.filter((i) => i.id !== cartItemId);
    this._persistAndNotify();
  },

  /**
   * Empties the cart
   */
  clear() {
    cartItems = [];
    this._persistAndNotify();
  },

  /**
   * Computes totals based on order type ('delivery', 'takeaway', 'dinein')
   * @param {string} orderType
   */
  getCalculations(orderType = 'delivery') {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const delivery = (orderType === 'delivery' && subtotal > 0) ? DELIVERY_FEE : 0;
    const grandTotal = Math.round((subtotal + tax + delivery) * 100) / 100;

    return {
      subtotal,
      taxRate: TAX_RATE * 100,
      tax,
      deliveryFee: delivery,
      grandTotal,
      currency: 'EGP',
      itemCount: this.getItemCount()
    };
  },

  /**
   * Subscriber pattern for UI reactivity
   */
  subscribe(callback) {
    cartListeners.add(callback);
    try {
      callback(this.getItems(), this.getCalculations());
    } catch (err) {
      console.error('[CartService] Initial subscriber error:', err);
    }
    return () => cartListeners.delete(callback);
  },

  _persistAndNotify() {
    storage.saveCart(cartItems);
    const items = this.getItems();
    const calcs = this.getCalculations();
    cartListeners.forEach((fn) => {
      try {
        fn(items, calcs);
      } catch (err) {
        console.error('[CartService] Subscriber notification error:', err);
      }
    });
  }
};
