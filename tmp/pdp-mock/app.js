const state = { cart: 0, query: '' };
const mainImage = document.querySelector('#main-image');
const cartCount = document.querySelector('#cart-count');
const purchaseStatus = document.querySelector('#purchase-status');
const cartDialog = document.querySelector('#cart-dialog');
const cartSummary = document.querySelector('#cart-summary');

function setCart(count) {
  state.cart = count;
  cartCount.value = count;
  cartCount.textContent = count;
}

function updateRecommendations() {
  const query = state.query.trim().toLowerCase();
  let visibleCount = 0;
  document.querySelectorAll('[data-product-card]').forEach(card => {
    const visible = card.dataset.productName.toLowerCase().includes(query);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelector('#empty-state').hidden = visibleCount !== 0;
}

document.querySelector('#thumbnails').addEventListener('click', event => {
  const thumbnail = event.target.closest('[data-image]');
  if (!thumbnail) return;
  mainImage.src = thumbnail.dataset.image;
  document.querySelectorAll('[data-image]').forEach(button => button.setAttribute('aria-pressed', String(button === thumbnail)));
});

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  state.query = document.querySelector('#search').value;
  updateRecommendations();
});

document.addEventListener('click', event => {
  const quickAdd = event.target.closest('[data-product]');
  if (!quickAdd) return;
  setCart(state.cart + 1);
  purchaseStatus.textContent = 'Product added to your cart.';
});

document.querySelector('#purchase-form').addEventListener('submit', event => {
  event.preventDefault();
  const quantity = Math.max(1, Math.min(10, Number(document.querySelector('#quantity').value) || 1));
  setCart(state.cart + quantity);
  purchaseStatus.textContent = `${state.cart} item(s) in your cart.`;
});

document.querySelector('#buy-now').addEventListener('click', () => {
  cartDialog.showModal();
  cartSummary.textContent = 'Ready to checkout with your iPhone 14 Pro Max.';
});

document.querySelector('#cart-button').addEventListener('click', () => {
  cartDialog.showModal();
  cartSummary.textContent = state.cart ? `${state.cart} item(s) ready for checkout.` : 'Your cart is empty.';
});

document.querySelector('#checkout').addEventListener('click', () => {
  cartSummary.textContent = 'Checkout is mocked for this prototype.';
});

document.querySelector('#wishlist').addEventListener('click', event => {
  const pressed = event.currentTarget.getAttribute('aria-pressed') === 'true';
  event.currentTarget.setAttribute('aria-pressed', String(!pressed));
  event.currentTarget.firstChild.textContent = !pressed ? '★ ' : '☆ ';
});
