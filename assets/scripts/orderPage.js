document.addEventListener("DOMContentLoaded", initializeApp);

const selectedItems = {}; // To track selected medicines
const checkoutBtn = document.getElementById("checkout-btn");
const addFavBtn = document.getElementById("add-fav-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

async function initializeApp() {
  try {
    const medicines = await fetchMedicineData();
    loadCartFromStorage(); // Load cart items from local storage
    createMedicineCards(medicines);
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

async function fetchMedicineData() {
  const response = await fetch("assets/json/medicines.json");
  if (!response.ok) throw new Error("Failed to fetch data.");
  return response.json();
}

function createMedicineCards(medicines) {
  const mainMedicineContainer = document.getElementById("medicine-order-form");

  for (const category in medicines) {
    const categoryData = medicines[category];

    // create category title and container
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category;

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    // create cards for medicines
    categoryData.forEach((medicine) => {
      const medicineCard = document.createElement("div");
      medicineCard.classList.add("medicine-card");

      // medicine image
      const image = document.createElement("img");
      image.classList.add("medicine-image");
      image.src = medicine.image;

      // medicine title
      const medicineTitle = document.createElement("h3");
      medicineTitle.textContent = medicine.name;

      // medicine price
      const price = document.createElement("p");
      price.classList.add("medicine-price");
      price.textContent = `Price: LKR. ${medicine.price}`;

      // quantity input
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.placeholder = "Enter quantity";
      inputElement.min = "1";

      // add to cart button
      const button = document.createElement("button");
      button.classList.add("add-to-cart");
      button.textContent = "Add to Cart";
      button.addEventListener("click", () =>
        addToCart(medicine, inputElement.value)
      );

      // append elements to card
      medicineCard.append(image, medicineTitle, price, inputElement, button);
      categoryContainer.appendChild(medicineCard);
    });

    // append to main container
    mainMedicineContainer.append(categoryTitle, categoryContainer);
  }
}

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

  saveCartToStorage(); // ave updated cart to local storage
  updateCart();
}

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

function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity++;
    saveCartToStorage(); // save updated cart to local storage
    updateCart();
  }
}

function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity--;
    if (selectedItems[itemId].quantity <= 0) {
      delete selectedItems[itemId];
    }
    saveCartToStorage(); // save updated cart to local storage
    updateCart();
  }
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(selectedItems));
}

function loadCartFromStorage() {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    Object.assign(selectedItems, storedCart);
    updateCart();
  }
}

function redirectToCheckout() {
  window.location.href = "checkoutPage.html";
}

function clearCart() {
  Object.keys(selectedItems).forEach((itemId) => delete selectedItems[itemId]); // Clear selected items
  saveCartToStorage(); // clear cart from local storage
  updateCart(); // refresh the cart display
  alert("Cart cleared successfully!");
}

checkoutBtn.addEventListener("click", redirectToCheckout);
clearCartBtn.addEventListener("click", clearCart);
