// Format price to PHP currency
function formatPrice(price) {
    return new Intl.NumberFormat('en-PH', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// Get similar products based on category and brand
function getSimilarProducts(currentProduct, limit = 4) {
    return products
        .filter(p => 
            (p.category === currentProduct.category || p.brand === currentProduct.brand) && 
            p.id !== currentProduct.id
        )
        .slice(0, limit);
}

// Quantity control component
function createQuantityControl(currentQty, onIncrease, onDecrease) {
    return `
        <div class="quantity-control">
            <button onclick="${onDecrease}" class="qty-btn">-</button>
            <span class="qty-value">${currentQty}</span>
            <button onclick="${onIncrease}" class="qty-btn">+</button>
        </div>
    `;
}