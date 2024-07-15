document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const addToCartButtons = document.querySelectorAll('.addToCart');

    let cart = [];

    cartButton.addEventListener('click', function () {
        cartDropdown.classList.toggle('hidden');
    });

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const product = {
                id: index,
                name: button.parentElement.querySelector('h3').textContent,
                price: button.parentElement.querySelector('p').textContent,
                image: button.parentElement.querySelector('img').src,
            };
            addToCart(product);
        });
    });

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        updateCart();
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="flex justify-between items-center mb-4">
                    <img src="${item.image}" alt="${item.name}" class="h-10 w-10 object-cover rounded">
                    <div>
                        <h4 class="text-sm font-bold">${item.name}</h4>
                        <p class="text-gray-600">${item.price} x ${item.quantity}</p>
                    </div>
                </div>
            `).join('');
        }
    }
});
