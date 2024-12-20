import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart added-message-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function addCartMessage(productId) {
  // We're going to use an object to save the timeout ids.
  // The reason we use an object is because each product
  // will have its own timeoutId. So an object lets us
  // save multiple timeout ids for different products.
  const addedMessageTimeouts = {};

  const addedToCart = document.querySelector(`.added-message-${productId}`);
  addedToCart.classList.add("displayMess");

  //Check ig there's a previous timeout for this product.
  //If there is, we should stop it.
  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
    
  const timeoutId = setTimeout(() => { 
    addedToCart.classList.remove("displayMess");
  }, 2000);

  //Save the timeoutId for this product so we can stop it later if we need to.
  addedMessageTimeouts[productId] = timeoutId;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;

      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

      const quantity = Number(quantitySelector.value);

      addToCart(productId, quantity);
      updateCartQuantity();
      addCartMessage(productId);
    });
  });

updateCartQuantity();