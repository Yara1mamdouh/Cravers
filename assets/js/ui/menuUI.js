/**
 * Cravers | كريفيرز
 * UI Layer: Menu & Customization Controller
 * Renders categories, responsive dish cards, live search filtering,
 * and the interactive item customization modal with dynamic price calculations.
 */

import { CATEGORIES, DEFAULT_MENU_ITEMS } from '../core/menuData.js';
import { storage } from '../core/storage.js';
import { cartService } from '../services/cartService.js';
import { authUI } from './authUI.js';

let activeCategory = 'all';
let searchQuery = '';
let customizeModalInstance = null;
let currentCustomizingDish = null;

export const menuUI = {
  init() {
    this.modalEl = document.getElementById('customizationModal');
    if (this.modalEl && window.bootstrap) {
      customizeModalInstance = new window.bootstrap.Modal(this.modalEl);
    }

    this.renderCategoryPills();
    this.renderDishes();
    this.bindSearch();
  },

  getAllDishes() {
    const customItems = storage.getCustomMenu() || [];
    return [...DEFAULT_MENU_ITEMS, ...customItems];
  },

  renderCategoryPills() {
    const container = document.getElementById('categoryPillsContainer');
    if (!container) return;

    container.innerHTML = CATEGORIES.map((cat) => `
      <button class="category-pill ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
        <i class="bi ${cat.icon}"></i>
        <span>${cat.name} / ${cat.nameAr}</span>
      </button>
    `).join('');

    container.querySelectorAll('.category-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        container.querySelectorAll('.category-pill').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderDishes();
      });
    });
  },

  renderDishes() {
    const grid = document.getElementById('menuItemsGrid');
    if (!grid) return;

    const allDishes = this.getAllDishes();
    const query = searchQuery.trim().toLowerCase();

    const filtered = allDishes.filter((dish) => {
      const matchCat = activeCategory === 'all' || dish.category === activeCategory;
      if (!matchCat) return false;

      if (!query) return true;

      const titleMatch = (dish.title || '').toLowerCase().includes(query);
      const titleArMatch = (dish.titleAr || '').includes(query);
      const descMatch = (dish.description || '').toLowerCase().includes(query);
      const descArMatch = (dish.descriptionAr || '').includes(query);

      return titleMatch || titleArMatch || descMatch || descArMatch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="display-6 text-muted mb-3"><i class="bi bi-search"></i></div>
          <h4 class="fw-bold">No Delicious Dishes Found / لم نعثر على نتائج</h4>
          <p class="text-secondary">Try searching for something else like "Angus", "Pizza", or "Fries".</p>
          <button class="btn btn-cravers mt-2" id="btnResetSearch">
            <i class="bi bi-arrow-counterclockwise me-1"></i> View All Dishes
          </button>
        </div>
      `;

      const resetBtn = grid.querySelector('#btnResetSearch');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchQuery = '';
          const searchInput = document.getElementById('menuSearchInput');
          if (searchInput) searchInput.value = '';
          activeCategory = 'all';
          this.renderCategoryPills();
          this.renderDishes();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map((dish) => {
      const rating = dish.rating || 4.9;
      const reviews = dish.reviewsCount || 150;
      const badgeHtml = dish.badge ? `<span class="dish-badge-tag">${dish.badge}</span>` : '';

      return `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="dish-card" data-dish-id="${dish.id}">
            <div class="dish-image-wrapper">
              <img src="${dish.image}" alt="${dish.title}" class="dish-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'">
              ${badgeHtml}
              <div class="dish-rating-tag">
                <i class="bi bi-star-fill"></i>
                <span>${rating}</span>
                <span class="text-muted" style="font-size: 0.68rem;">(${reviews})</span>
              </div>
            </div>

            <div class="dish-card-body">
              <h5 class="dish-title-en">${dish.title}</h5>
              <div class="dish-title-ar">${dish.titleAr || ''}</div>
              <p class="dish-desc">${dish.description}</p>

              <div class="dish-meta-row">
                ${dish.prepTime ? `<span><i class="bi bi-clock me-1 text-primary"></i>${dish.prepTime}</span>` : ''}
                ${dish.calories ? `<span><i class="bi bi-fire me-1 text-warning"></i>${dish.calories}</span>` : ''}
              </div>

              <div class="dish-footer">
                <div class="dish-price-wrap">
                  <span class="dish-price-label">Price / السعر</span>
                  <div>
                    <span class="dish-price-value">${dish.price}</span>
                    <span class="dish-price-currency">EGP</span>
                  </div>
                </div>

                <div class="dish-actions">
                  <button class="btn btn-cravers btn-sm btn-open-customize d-flex align-items-center gap-1" data-dish-id="${dish.id}">
                    <i class="bi bi-sliders"></i>
                    <span>Customize / اطلب</span>
                  </button>
                  <button class="btn-quick-add" data-dish-id="${dish.id}" title="Quick Add / إضافة سريعة">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events for customize and quick add
    grid.querySelectorAll('.btn-open-customize').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishId = btn.dataset.dishId;
        this.openCustomizationModal(dishId);
      });
    });

    grid.querySelectorAll('.btn-quick-add').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishId = btn.dataset.dishId;
        this.quickAdd(dishId);
      });
    });

    grid.querySelectorAll('.dish-card').forEach((card) => {
      card.addEventListener('click', () => {
        const dishId = card.dataset.dishId;
        this.openCustomizationModal(dishId);
      });
    });
  },

  quickAdd(dishId) {
    const allDishes = this.getAllDishes();
    const dish = allDishes.find((d) => d.id === dishId);
    if (!dish) return;

    const defaultSize = (dish.sizes && dish.sizes.length > 0)
      ? dish.sizes.find((s) => s.default) || dish.sizes[0]
      : { id: 'default', name: 'Standard', priceDiff: 0 };

    cartService.addItem(dish, defaultSize, [], 1);
    authUI.showToast(`Added 1x ${dish.title} to cart! 🛒`, 'success');
  },

  openCustomizationModal(dishId) {
    const allDishes = this.getAllDishes();
    const dish = allDishes.find((d) => d.id === dishId);
    if (!dish) return;

    currentCustomizingDish = dish;

    // Set modal header & details
    const titleEl = document.getElementById('modalDishTitle');
    const descEl = document.getElementById('modalDishDesc');
    const imgEl = document.getElementById('modalDishImg');
    const basePriceEl = document.getElementById('modalBasePrice');

    if (titleEl) titleEl.textContent = `${dish.title} (${dish.titleAr || ''})`;
    if (descEl) descEl.textContent = dish.description;
    if (imgEl) {
      imgEl.src = dish.image;
      imgEl.onerror = () => {
        imgEl.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
      };
    }
    if (basePriceEl) basePriceEl.textContent = `${dish.price} EGP`;

    // Render Sizes
    const sizesContainer = document.getElementById('modalSizesContainer');
    if (sizesContainer) {
      if (dish.sizes && dish.sizes.length > 0) {
        sizesContainer.innerHTML = `
          <label class="fw-bold mb-2 text-primary d-flex align-items-center gap-2">
            <i class="bi bi-aspect-ratio"></i>
            <span>Choose Size / اختر الحجم</span>
          </label>
          <div class="mb-4">
            ${dish.sizes.map((s, idx) => `
              <label class="custom-option-card ${s.default || idx === 0 ? 'active-option' : ''}">
                <div class="d-flex align-items-center gap-2">
                  <input type="radio" name="modalSizeRadio" value="${s.id}" data-diff="${s.priceDiff || 0}" ${s.default || idx === 0 ? 'checked' : ''} class="form-check-input mt-0">
                  <span class="fw-semibold">${s.name}</span>
                </div>
                <span class="custom-option-diff">${s.priceDiff > 0 ? `+${s.priceDiff} EGP` : 'Included'}</span>
              </label>
            `).join('')}
          </div>
        `;
      } else {
        sizesContainer.innerHTML = '';
      }
    }

    // Render Extras
    const extrasContainer = document.getElementById('modalExtrasContainer');
    if (extrasContainer) {
      if (dish.extras && dish.extras.length > 0) {
        extrasContainer.innerHTML = `
          <label class="fw-bold mb-2 text-primary d-flex align-items-center gap-2">
            <i class="bi bi-plus-circle-fill"></i>
            <span>Add Extras / إضافات مميزة</span>
          </label>
          <div class="mb-3">
            ${dish.extras.map((ext) => `
              <label class="custom-option-card">
                <div class="d-flex align-items-center gap-2">
                  <input type="checkbox" name="modalExtraCheckbox" value="${ext.id}" data-price="${ext.price}" data-name="${ext.name}" class="form-check-input mt-0">
                  <span class="fw-semibold">${ext.name}</span>
                </div>
                <span class="custom-option-diff">+${ext.price} EGP</span>
              </label>
            `).join('')}
          </div>
        `;
      } else {
        extrasContainer.innerHTML = '';
      }
    }

    // Reset Quantity Stepper to 1
    const qtyVal = document.getElementById('modalQtyValue');
    if (qtyVal) qtyVal.textContent = '1';

    this.bindModalLivePricing();
    this.updateModalCalculatedTotal();

    if (customizeModalInstance) {
      customizeModalInstance.show();
    }
  },

  bindModalLivePricing() {
    const sizeRadios = document.querySelectorAll('input[name="modalSizeRadio"]');
    sizeRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('input[name="modalSizeRadio"]').forEach((r) => {
          r.closest('.custom-option-card').classList.toggle('active-option', r.checked);
        });
        this.updateModalCalculatedTotal();
      });
    });

    const extraCheckboxes = document.querySelectorAll('input[name="modalExtraCheckbox"]');
    extraCheckboxes.forEach((chk) => {
      chk.addEventListener('change', () => {
        chk.closest('.custom-option-card').classList.toggle('active-option', chk.checked);
        this.updateModalCalculatedTotal();
      });
    });

    // Stepper buttons
    const minusBtn = document.getElementById('btnModalQtyMinus');
    const plusBtn = document.getElementById('btnModalQtyPlus');
    const qtyVal = document.getElementById('modalQtyValue');

    if (minusBtn && plusBtn && qtyVal) {
      minusBtn.onclick = () => {
        let current = parseInt(qtyVal.textContent, 10) || 1;
        if (current > 1) {
          qtyVal.textContent = (current - 1).toString();
          this.updateModalCalculatedTotal();
        }
      };

      plusBtn.onclick = () => {
        let current = parseInt(qtyVal.textContent, 10) || 1;
        qtyVal.textContent = (current + 1).toString();
        this.updateModalCalculatedTotal();
      };
    }

    // Modal Add Button
    const addBtn = document.getElementById('btnModalAddToCart');
    if (addBtn) {
      addBtn.onclick = () => this.confirmAddToCart();
    }
  },

  updateModalCalculatedTotal() {
    if (!currentCustomizingDish) return;

    let base = Number(currentCustomizingDish.price) || 0;

    // Size diff
    const checkedSize = document.querySelector('input[name="modalSizeRadio"]:checked');
    if (checkedSize) {
      base += Number(checkedSize.dataset.diff) || 0;
    }

    // Extras
    const checkedExtras = document.querySelectorAll('input[name="modalExtraCheckbox"]:checked');
    checkedExtras.forEach((chk) => {
      base += Number(chk.dataset.price) || 0;
    });

    const qtyVal = document.getElementById('modalQtyValue');
    const qty = parseInt(qtyVal ? qtyVal.textContent : '1', 10) || 1;

    const grand = base * qty;
    const totalEl = document.getElementById('modalCalculatedTotal');
    if (totalEl) totalEl.textContent = `${grand} EGP`;
  },

  confirmAddToCart() {
    if (!currentCustomizingDish) return;

    let selectedSize = null;
    const checkedSize = document.querySelector('input[name="modalSizeRadio"]:checked');
    if (checkedSize && currentCustomizingDish.sizes) {
      selectedSize = currentCustomizingDish.sizes.find((s) => s.id === checkedSize.value);
    }

    const selectedExtras = [];
    const checkedExtras = document.querySelectorAll('input[name="modalExtraCheckbox"]:checked');
    checkedExtras.forEach((chk) => {
      selectedExtras.push({
        id: chk.value,
        name: chk.dataset.name,
        price: Number(chk.dataset.price) || 0
      });
    });

    const qtyVal = document.getElementById('modalQtyValue');
    const quantity = parseInt(qtyVal ? qtyVal.textContent : '1', 10) || 1;

    cartService.addItem(currentCustomizingDish, selectedSize, selectedExtras, quantity);

    if (customizeModalInstance) {
      customizeModalInstance.hide();
    }

    authUI.showToast(`Added ${quantity}x ${currentCustomizingDish.title} to cart! 🛒`, 'success');
  },

  bindSearch() {
    const searchInputs = document.querySelectorAll('.menu-search-input');
    searchInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        this.renderDishes();
      });
    });
  }
};
