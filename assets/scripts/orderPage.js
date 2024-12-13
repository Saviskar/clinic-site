document.addEventListener("DOMContentLoaded", initializeApp);
document.addEventListener("DOMContentLoaded", () => clearCart());

const selectedItems = {}; // To track selected medicines
const checkoutBtn = document.getElementById("checkout-btn");
const addFavBtn = document.getElementById("fav-btn");
const applyFavBtn = document.getElementById("apply-fav-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize the application
async function initializeApp() {
  try {
    const medicines = await fetchMedicineData();
    loadCartFromStorage(); // Load cart items from local storage
    createMedicineCards(medicines);
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

// Fetch medicine data from a JSON file
async function fetchMedicineData() {
  const response = await fetch("assets/json/medicines.json");
  if (!response.ok) throw new Error("Failed to fetch data.");
  return response.json();
}

// Create medicine cards dynamically based on fetched data
function createMedicineCards(medicines) {
  const mainMedicineContainer = document.getElementById("medicine-order-form");

  for (const category in medicines) {
    const categoryData = medicines[category];

    // Create category title and container
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category;

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    // Create cards for medicines
    categoryData.forEach((medicine) => {
      const medicineCard = document.createElement("div");
      medicineCard.classList.add("medicine-card");

      // Medicine image
      const image = document.createElement("img");
      image.classList.add("medicine-image");
      image.src = medicine.image;

      // Medicine title
      const medicineTitle = document.createElement("h3");
      medicineTitle.textContent = medicine.name;

      // Medicine price
      const price = document.createElement("p");
      price.classList.add("medicine-price");
      price.textContent = `Price: LKR. ${medicine.price}`;

      // Quantity input
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.placeholder = "Enter quantity";
      inputElement.min = "1";

      // Add to cart button
      const button = document.createElement("button");
      button.classList.add("add-to-cart");
      button.textContent = "Add to Cart";
      button.addEventListener("click", () =>
        addToCart(medicine, inputElement.value)
      );

      // Append elements to card
      medicineCard.append(image, medicineTitle, price, inputElement, button);
      categoryContainer.appendChild(medicineCard);
    });

    // Append to main container
    mainMedicineContainer.append(categoryTitle, categoryContainer);
  }
}

// Update the cart display
function updateCart() {
  const cartBody = document.getElementById("cart-body");
  const netTotal = document.getElementById("net-total");

  cartBody.innerHTML = "";
  let total = 0;

  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];
    total += item.price * item.quantity;

    const medRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `LKR. ${item.price}`;

    const totalCell = document.createElement("td");
    totalCell.textContent = `LKR. ${item.price * item.quantity}`;

    const actionsCell = document.createElement("td");
    const addButton = document.createElement("button");
    addButton.classList.add("add-btn");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => addItem(itemId));

    const subtractButton = document.createElement("button");
    subtractButton.classList.add("subtract-btn");
    subtractButton.textContent = "-";
    subtractButton.addEventListener("click", () => removeItem(itemId));

    actionsCell.append(addButton, subtractButton);

    medRow.append(nameCell, quantityCell, priceCell, totalCell, actionsCell);
    cartBody.appendChild(medRow);
  }

  netTotal.textContent = `LKR ${total}`;
}

// Add selected medicine to the cart
function addToCart(medicine, quantity) {
  const itemId = medicine.name;
  const price = parseFloat(medicine.price);

  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity += parseInt(quantity);
  } else {
    selectedItems[itemId] = {
      name: medicine.name,
      price: price,
      quantity: parseInt(quantity),
    };
  }

  updateCart();
}

// Increase item quantity in the cart
function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity++;
    saveCartToStorage(); // Save updated cart to local storage
    updateCart();
  }
}

// Decrease item quantity in the cart
function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity--;
    if (selectedItems[itemId].quantity <= 0) {
      delete selectedItems[itemId];
    }
    saveCartToStorage(); // Save updated cart to local storage
    updateCart();
  }
}

// Save cart to local storage
function saveCartToStorage() {
  localStorage.setItem("favorites", JSON.stringify(selectedItems));
}

// Load cart from local storage
function loadCartFromStorage() {
  const storedCart = JSON.parse(localStorage.getItem("favorites"));
  if (storedCart) {
    Object.assign(selectedItems, storedCart);
    updateCart();
  }
}

// Redirect to checkout page
function redirectToCheckout() {
  window.location.href = "checkoutPage.html";
}

// Clear the cart
function clearCart(showAlert = false) {
  Object.keys(selectedItems).forEach((itemId) => delete selectedItems[itemId]); // clear selected items
  updateCart();

  if (showAlert) {
    alert("Cart cleared successfully!");
  }
}

// Event listeners for buttons
checkoutBtn.addEventListener("click", redirectToCheckout);
clearCartBtn.addEventListener("click", () => clearCart(true));
applyFavBtn.addEventListener("click", loadCartFromStorage);
addFavBtn.addEventListener("click", saveCartToStorage);
