document.addEventListener('DOMContentLoaded', () => {
    // Other event listeners...

    // Add to cart function
    window.addToCart = (productName, price) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = { productName, price, quantity: 1 };

        const existingItem = cartItems.find(item => item.productName === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${productName} has been added to the cart`);
    };
});
