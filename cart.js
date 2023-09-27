const cart = [];

function addToCart(model) {
    const selectedRAM = document.querySelector(`input[name="ram-${model}"]:checked`);
    const selectedStorage = document.querySelector(`input[name="storage-${model}"]:checked`);

    if (!selectedRAM || !selectedStorage) {
        alert("Please select RAM and storage options.");
        return;
    }

    const laptop = {
        model: model,
        RAM: selectedRAM.value,
        storage: selectedStorage.value,
        basePrice: getBasePrice(model)
    };

    laptop.totalPrice = calculateTotalPrice(laptop);

    cart.push(laptop);
    updateCartUI();
}

function calculateTotalPrice(laptop) {
    const basePrice = getBasePrice(laptop.model);

    const RAMPrice = laptop.RAM === "8GB" ? 50 : 100;
    const storagePrice = laptop.storage === "256GB" ? 100 : 150;

    return basePrice + RAMPrice + storagePrice;
}

function getBasePrice(model) {
    switch (model) {
        case "Standard":
            return 500;
        case "Pro":
            return 1500;
        case "Ultra":
            return 2500;
        default:
            return 0;
    }
}

function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");

    // Clear the cart UI
    cartItemsList.innerHTML = "";

    // Add cart items to the UI
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const listItem = document.createElement("li");
        listItem.textContent = `${item.model} Laptop, ${item.RAM} RAM, ${item.storage} storage, Total Price: $${item.totalPrice}`;

        // Add a "Clear from Cart" button for each item
        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear from Cart";
        clearButton.addEventListener("click", () => {
            removeFromCart(i);
        });

        listItem.appendChild(clearButton);
        cartItemsList.appendChild(listItem);
    }

    // Update total price
    totalPriceSpan.textContent = calculateTotal();
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

function calculateTotal() {
    let totalPrice = 0;

    for (const item of cart) {
        totalPrice += item.totalPrice;
    }

    return totalPrice;
}

// Initialize the cart UI
updateCartUI();
