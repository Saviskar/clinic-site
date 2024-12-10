document.addEventListener("DOMContentLoaded", fetchAndCreateEls);

const selectedItems = {}; // To track selected medicines

async function fetchAndCreateEls() {
  const mainMedicineContainer = document.getElementById("medicine-order-form");

  try {
    const medicines = await fetchMedicines();

    // Loop through categories
    for (const category in medicines) {
      const categoryData = medicines[category];

      // Create category title and container
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;

      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container");

      // Create cards for medicines
      categoryData.forEach((medicine, index) => {
        const medicineCard = document.createElement("div");
        medicineCard.classList.add("medicine-card");
        medicineCard.dataset.id = `${category}-${index}`;

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
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
  }
}

async function fetchMedicines() {
  const response = await fetch("assets/json/medicines.json");
  if (!response.ok) throw new Error("Failed to fetch data.");
  return response.json();
}

const cartBody = document.getElementById("cart-body");
const netTotal = document.getElementById("net-total");

function addToCart(medicine, quantity) {
  const itemId = medicine.name;
  const price = parseFloat(medicine.price);

  if (!quantity || quantity <= 0)
    return alert("Please enter a valid quantity.");

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

function updateCart() {
  cartBody.innerHTML = "";
  let total = 0;

  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];
    total += item.price * item.quantity;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>LKR. ${item.price}</td>
      <td>LKR. ${item.price * item.quantity}</td>
      <td>
        <button class="add-btn" onclick="addItem('${itemId}')">+</button>
        <button class="subtract-btn" onclick="removeItem('${itemId}')">-</button>
      </td>
    `;

    cartBody.appendChild(row);
  }

  netTotal.textContent = `LKR ${total}`;
}

function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity++;
    updateCart();
  }
}

function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].quantity--;
    if (selectedItems[itemId].quantity <= 0) {
      delete selectedItems[itemId];
    }
    updateCart();
  }
}

// Checkout functionality
document.querySelector(".checkout-btn").addEventListener("click", () => {
  alert("Thank you for your purchase.");
  selectedItems = {};
  updateCart();
});
