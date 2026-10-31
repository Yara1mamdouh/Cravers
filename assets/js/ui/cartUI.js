/**
 * Cravers | كريفيرز
 * UI Layer: Sliding Offcanvas Cart & Checkout Controller
 * Manages offcanvas drawer, item quantities, order types, verified customer prefill,
 * live price breakdown, and WhatsApp ordering trigger.
 */

import { cartService } from '../services/cartService.js';
import { authService } from '../services/authService.js';
import { orderService } from '../services/orderService.js';
import { authUI } from './authUI.js';

let offcanvasCartInstance = null;
let currentOrderType = 'delivery'; // 'delivery' | 'takeaway' | 'dinein'

export const cartUI = {
  init() {
    this.offcanvasEl = document.getElementById('offcanvasCart');
    if (this.offcanvasEl && window.bootstrap) {
      offcanvasCartInstance = new window.bootstrap.Offcanvas(this.offcanvasEl);
    }

    this.bindEvents();

    // Subscribe to cart changes
    cartService.subscribe((items, calculations) => {
      this.renderCart(items, calculations);
      this.updateBadges(calculations.itemCount, calculations.grandTotal);
    });

    // Subscribe to auth changes to auto-populate checkout inputs
    authService.subscribe((user) => {
      this.populateCustomerDetails(user);
    });
  },

  openCart() {
    if (!offcanvasCartInstance && this.offcanvasEl && window.bootstrap) {
      offcanvasCartInstance = new window.bootstrap.Offcanvas(this.offcanvasEl);
    }
    if (offcanvasCartInstance) {
      offcanvasCartInstance.show();
    }
  },

  closeCart() {
    if (offcanvasCartInstance) {
      offcanvasCartInstance.hide();
    }
  },

  updateBadges(itemCount, grandTotal) {
    const badges = document.querySelectorAll('.cart-badge-counter');
    badges.forEach((b) => {
      b.textContent = itemCount;
      b.classList.remove('cart-badge-bump');
      // trigger reflow for animation restart
      void b.offsetWidth;
      if (itemCount > 0) {
        b.classList.add('cart-badge-bump');
      }
    });

    // Mobile bottom bar
    const mobileBar = document.getElementById('mobileCartBar');
    const mobileCount = document.getElementById('mobileCartCount');
    const mobileTotal = document.getElementById('mobileCartTotal');

    if (mobileBar) {
      if (itemCount > 0) {
        mobileBar.classList.add('has-items');
        if (mobileCount) mobileCount.textContent = `${itemCount} items`;
        if (mobileTotal) mobileTotal.textContent = `${grandTotal} EGP`;
      } else {
        mobileBar.classList.remove('has-items');
      }
    }
  },

  renderCart(items, calculations) {
    const itemsListContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const footerSection = document.getElementById('cartFooterSection');

    if (!itemsListContainer) return;

    if (!items || items.length === 0) {
      if (emptyState) emptyState.classList.remove('d-none');
      if (footerSection) footerSection.classList.add('d-none');
      itemsListContainer.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.classList.add('d-none');
    if (footerSection) footerSection.classList.remove('d-none');

    itemsListContainer.innerHTML = items.map((item) => {
      const sizeText = item.size && item.size.name && item.size.id !== 'default'
        ? `<div class="cart-item-subtext"><i class="bi bi-tag me-1"></i>${item.size.name}</div>`
        : '';

      const extrasText = item.extras && item.extras.length > 0
        ? `<div class="cart-item-subtext text-warning"><i class="bi bi-plus me-1"></i>${item.extras.map((e) => e.name).join(', ')}</div>`
        : '';

      return `
        <div class="cart-item-row" data-cart-item-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80'">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-subtext text-primary">${item.titleAr || ''}</div>
            ${sizeText}
            ${extrasText}
            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="quantity-stepper">
                <button class="stepper-btn btn-cart-dec" data-id="${item.id}" aria-label="Decrease quantity">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="stepper-val">${item.quantity}</span>
                <button class="stepper-btn btn-cart-inc" data-id="${item.id}" aria-label="Increase quantity">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <div class="cart-item-price">${item.totalPrice} EGP</div>
            </div>
          </div>
          <button class="cart-item-del-btn btn-cart-remove" data-id="${item.id}" title="Remove item">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      `;
    }).join('');

    // Attach cart item actions
    itemsListContainer.querySelectorAll('.btn-cart-inc').forEach((btn) => {
      btn.addEventListener('click', () => cartService.changeQuantity(btn.dataset.id, 1));
    });

    itemsListContainer.querySelectorAll('.btn-cart-dec').forEach((btn) => {
      btn.addEventListener('click', () => cartService.changeQuantity(btn.dataset.id, -1));
    });

    itemsListContainer.querySelectorAll('.btn-cart-remove').forEach((btn) => {
      btn.addEventListener('click', () => cartService.removeItem(btn.dataset.id));
    });

    // Update Price Summary Rows
    this.updatePriceDisplay();
  },

  updatePriceDisplay() {
    const calcs = cartService.getCalculations(currentOrderType);

    const subtotalEl = document.getElementById('cartSummarySubtotal');
    const taxEl = document.getElementById('cartSummaryTax');
    const deliveryRow = document.getElementById('cartSummaryDeliveryRow');
    const deliveryEl = document.getElementById('cartSummaryDelivery');
    const grandTotalEl = document.getElementById('cartSummaryGrandTotal');

    if (subtotalEl) subtotalEl.textContent = `${calcs.subtotal} EGP`;
    if (taxEl) taxEl.textContent = `${calcs.tax} EGP`;

    if (deliveryRow && deliveryEl) {
      if (calcs.deliveryFee > 0) {
        deliveryRow.classList.remove('d-none');
        deliveryEl.textContent = `${calcs.deliveryFee} EGP`;
      } else {
        deliveryRow.classList.add('d-none');
      }
    }

    if (grandTotalEl) grandTotalEl.textContent = `${calcs.grandTotal} EGP`;
  },

  populateCustomerDetails(user) {
    const nameInput = document.getElementById('checkoutCustomerName');
    const phoneInput = document.getElementById('checkoutCustomerPhone');
    const emailInput = document.getElementById('checkoutCustomerEmail');
    const authPrompt = document.getElementById('checkoutAuthPrompt');

    if (user && user.isVerified) {
      if (nameInput) nameInput.value = user.name || '';
      if (phoneInput) phoneInput.value = user.phone || '';
      if (emailInput) emailInput.value = user.email || '';
      if (authPrompt) {
        authPrompt.innerHTML = `
          <div class="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 small">
            <i class="bi bi-patch-check-fill fs-6 text-success"></i>
            <div>Ordering as <strong>${user.name}</strong> (Verified Account ✓)</div>
          </div>
        `;
      }
    } else {
      if (authPrompt) {
        authPrompt.innerHTML = `
          <div class="alert alert-warning d-flex align-items-center justify-content-between py-2 px-3 mb-3 small">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-info-circle-fill text-warning"></i>
              <span>Save time & verify your email!</span>
            </div>
            <button type="button" class="btn btn-sm btn-cravers py-0 px-2" id="btnCheckoutSignIn">Sign In</button>
          </div>
        `;
        const signInBtn = authPrompt.querySelector('#btnCheckoutSignIn');
        if (signInBtn) {
          signInBtn.addEventListener('click', () => {
            this.closeCart();
            authUI.showModal('register');
          });
        }
      }
    }
  },

  switchOrderType(type) {
    currentOrderType = type;

    // Update tab pills
    document.querySelectorAll('.order-type-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.type === type);
    });

    const deliveryWrap = document.getElementById('checkoutDeliveryWrapper');
    const dineinWrap = document.getElementById('checkoutDineinWrapper');
    const takeawayWrap = document.getElementById('checkoutTakeawayWrapper');

    if (deliveryWrap) deliveryWrap.classList.toggle('d-none', type !== 'delivery');
    if (dineinWrap) dineinWrap.classList.toggle('d-none', type !== 'dinein');
    if (takeawayWrap) takeawayWrap.classList.toggle('d-none', type !== 'takeaway');

    this.updatePriceDisplay();
  },

  async handleCheckout() {
    const items = cartService.getItems();
    if (items.length === 0) {
      authUI.showToast('Your cart is empty! Please add items first.', 'warning');
      return;
    }

    const nameInput = document.getElementById('checkoutCustomerName');
    const phoneInput = document.getElementById('checkoutCustomerPhone');
    const emailInput = document.getElementById('checkoutCustomerEmail');
    const notesInput = document.getElementById('checkoutCustomerNotes');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!name || !phone) {
      authUI.showToast('Please enter your name and phone number for the order.', 'warning');
      if (!name && nameInput) nameInput.focus();
      else if (phoneInput) phoneInput.focus();
      return;
    }

    let fulfillmentDetails = '';
    if (currentOrderType === 'delivery') {
      const addressInput = document.getElementById('checkoutDeliveryAddress');
      fulfillmentDetails = addressInput ? addressInput.value.trim() : '';
      if (!fulfillmentDetails) {
        authUI.showToast('Please enter your delivery address.', 'warning');
        if (addressInput) addressInput.focus();
        return;
      }
    } else if (currentOrderType === 'dinein') {
      const tableInput = document.getElementById('checkoutTableNumber');
      fulfillmentDetails = tableInput ? tableInput.value.trim() : '';
      if (!fulfillmentDetails) {
        authUI.showToast('Please enter your table number.', 'warning');
        if (tableInput) tableInput.focus();
        return;
      }
    } else {
      fulfillmentDetails = 'Pickup at Cravers Main Branch';
    }

    const calculations = cartService.getCalculations(currentOrderType);

    const orderData = {
      items,
      calculations,
      customer: { name, phone, email, notes },
      fulfillment: { type: currentOrderType, details: fulfillmentDetails }
    };

    try {
      const result = await orderService.dispatchOrder(orderData);
      if (result.method === 'automated_gateway') {
        authUI.showToast(result.message || 'تم إرسال الطلب لرقمك على واتساب آلياً بنجاح! 🍔📱', 'success');
      } else {
        authUI.showToast('تم فتح واتساب لإرسال الطلب مباشرة للمطعم! 🍔📱', 'info');
      }
    } catch (err) {
      authUI.showToast('حدث خطأ أثناء معالجة الطلب: ' + err.message, 'danger');
    }
  },

  bindEvents() {
    // Open cart triggers
    document.querySelectorAll('.btn-trigger-cart').forEach((btn) => {
      btn.addEventListener('click', () => this.openCart());
    });

    // Mobile cart bar trigger
    const mobileBar = document.getElementById('mobileCartBar');
    if (mobileBar) {
      mobileBar.addEventListener('click', () => this.openCart());
    }

    // Order type tabs
    document.querySelectorAll('.order-type-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.switchOrderType(btn.dataset.type);
      });
    });

    // Checkout Submit Button
    const checkoutBtn = document.getElementById('btnSubmitOrderWhatsApp');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    // Clear Cart Button
    const clearBtn = document.getElementById('btnClearCart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart? / هل تريد تفريغ السلة؟')) {
          cartService.clear();
          authUI.showToast('Cart cleared.', 'info');
        }
      });
    }
  }
};
