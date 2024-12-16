let cart = [];
let currentPage = 'home';
let filters = {
    brand: '',
    category: ''
};

// DOM Elements
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const brandFilter = document.getElementById('brandFilter');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize filters
brands.forEach(brand => {
    brandFilter.innerHTML += `<option value="${brand}">${brand}</option>`;
});

categories.forEach(category => {
    categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
});

// Event Listeners
searchInput.addEventListener('input', handleSearch);
cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
brandFilter.addEventListener('change', handleFilters);
categoryFilter.addEventListener('change', handleFilters);

// Navigation Functions
function navigateTo(page, productId = null) {
    currentPage = page;
    console.log(page)
    switch (page) {
      case "home":
        renderTop();
        renderProductList(filterProducts()); 
        break;
      case "products":
        renderProductList(filterProducts());
        break;
      case "product":
        renderProductDetails(productId);
        break;
    }
}

// Filter Functions
function handleFilters(e) {
    filters[e.target.id === 'brandFilter' ? 'brand' : 'category'] = e.target.value;
    renderProductList(filterProducts());
}

function filterProducts() {
    return products.filter(product => {
        const matchesBrand = !filters.brand || product.brand === filters.brand;
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesSearch = !searchInput.value || 
            product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchInput.value.toLowerCase());
        return matchesBrand && matchesCategory && matchesSearch;
    });
}

function renderTop() {
  heroSection.innerHTML = `
        <div class="hero">
            <div class="hero-content">
                <h1>Step into Style</h1>
                <p>Discover the perfect shoes for every occasion</p>
                <button class="hero-btn" onclick="scrollToProducts()">Shop Now</button>
            </div>
        </div>
    `;
}

function scrollToProducts() {
  mainContent.scrollIntoView({ behavior: "smooth" });
}

// Render Functions
function renderProductList(productsToShow) {
    mainContent.innerHTML = `
     <h2 class="section-title">All Products</h2>
        <div class="product-grid">
            ${productsToShow
              .map(
                (product) => `
                <div class="product-card" onclick="navigateTo('product', ${
                  product.id
                })">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₱${formatPrice(product.price)}</p>
                    <p>Stocks: ${product.stocks}</p>
                    <p class="product-meta">${product.brand} | ${
                  product.category
                }</p>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

function renderProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const similarProducts = getSimilarProducts(product);

  mainContent.innerHTML = `
        <div class="product-details">
            <div class="main-product">
                <img src="${product.image}" alt="${product.name}">
                <div class="info">
                    <h1>${product.name}</h1>
                    <p class="price">₱${formatPrice(product.price)}</p>
                    <p>${product.description}</p>
                    <p>${product.stocks}</p>
                    <p class="product-meta">${product.brand} | ${
    product.category
  }</p>
                    <div class="sizes">
                        <h4>Available Sizes:</h4>
                        <div class="size-buttons">
                            ${product.sizes
                              .map(
                                (size) => `
                                <button class="size-btn" data-size="${size}">${size}</button>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    <div class="quantity-control">
                        <button class="qty-btn decrease">-</button>
                        <span class="qty-value">0</span>
                        <button class="qty-btn increase">+</button>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
            
            <div class="similar-products">
                <h3>Similar Products</h3>
                <div class="product-grid">
                    ${similarProducts
                      .map(
                        (p) => `
                        <div class="product-card" onclick="navigateTo('product', ${
                          p.id
                        })">
                            <img src="${p.image}" alt="${p.name}">
                            <h3>${p.name}</h3>
                            <p>₱${formatPrice(p.price)}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  // Add event listeners after rendering
  addProductDetailsEventListeners(product);
}

function addProductDetailsEventListeners(product) {
  const sizeButtons = document.querySelectorAll(".size-btn");
  const qtyDecreaseBtn = document.querySelector(".qty-btn.decrease");
  const qtyIncreaseBtn = document.querySelector(".qty-btn.increase");
  const qtyValue = document.querySelector(".qty-value");
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  let selectedSize = null;
  let quantity = 0;

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedSize = button.dataset.size;
    });
  });

  qtyDecreaseBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });

  qtyIncreaseBtn.addEventListener("click", () => {
    quantity++;
    qtyValue.textContent = quantity;
  });

  addToCartBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product.id, quantity, selectedSize);
  });
}

// Stock Management Function
function updateProductStock(productId, quantity) {
    const product = products.find((p) => p.id === productId);
    if (product) {
        product.stocks = Math.max(0, product.stocks - quantity);
    }
}

// Cart Functions
function addToCart(productId, quantity = 1, size) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  if (product.stocks < quantity) {
      alert(`Not enough stock available! Current stock: ${product.stocks}`);
      return;
  }

  const existingItem = cart.find(
    (item) => item.id === productId && item.size === size
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity, size });
  }

  updateProductStock(productId, quantity); // Deduct stock
  updateCartUI();
  toggleCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity = Math.max(0, item.quantity - 1);
        if (item.quantity === 0) {
            removeFromCart(productId);
            return;
        }
    }
    updateCartUI();
}

function updateProductQuantity(productId, action) {
    const qtyElement = event.target.parentElement.querySelector('.qty-value');
    let currentQty = parseInt(qtyElement.textContent);

    if (action === 'increase') {
        currentQty += 1;
    } else if (action === 'decrease') {
        currentQty = Math.max(1, currentQty - 1);
    }

    qtyElement.textContent = currentQty;
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>₱${formatPrice(item.price)} x ${item.quantity}</p>
                ${createQuantityControl(item.quantity,
                    `updateCartQuantity(${item.id}, 'increase')`,
                    `updateCartQuantity(${item.id}, 'decrease')`)}
            </div>
            <button onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    cartTotal.textContent = formatPrice(
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );
}

function toggleCart() {
    cartModal.classList.toggle('active');
}

// Search Function
function handleSearch() {
    renderProductList(filterProducts());
}

// Checkout Function
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! Total: ₱' + cartTotal.textContent);
    cart = [];
    updateCartUI();
    toggleCart();
});

// Initialize the app
navigateTo('home');
