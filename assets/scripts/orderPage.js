// initializing shopping card array
let shoppingCart = [];

// Add an event listener to handle clicks on elements with "add-to-cart" class
document.addEventListener("click", handleAddToCart);

function handleAddToCart(event) {
  if (event.target && event.target.classList.contains("add-to-cart")) {
    try {
      addToCart(event);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }
}

// adds the selected medicine to tha cart and gets the data from the card
function addToCart(event) {
  const medicineCard = event.target.closest(".medicine-card");
  if (!medicineCard) {
    alert("Could not find the medicine card. Please try again.");
    return;
  }

  const medicineTitle = getMedicineTitle(medicineCard);
  const price = getMedicinePrice(medicineCard);
  const quantity = getQuantity(medicineCard);

  if (quantity > 0) {
    const cartItem = createCartItem(medicineTitle, price, quantity);
    shoppingCart.push(cartItem);
    console.log(
      `Added to cart: ${cartItem.name} (Quantity: ${cartItem.quantity})`
    );
    updateCart();
  } else {
    window.alert("Please select a valid quantity (greater than 0).");
  }
}

// getting the medicine title from the card
function getMedicineTitle(medicineCard) {
  const titleElement = medicineCard.querySelector("h3");
  return titleElement ? titleElement.innerText : "Unknown Medicine";
}

// Helper function to extract and parse the medicine price
function getMedicinePrice(medicineCard) {
  const priceElement = medicineCard.querySelector(".medicine-price");
  if (!priceElement) {
    console.warn("Price element missing. Defaulting to LKR 0.");
    return 0;
  }
  const priceText = priceElement.innerText;
  return parseFloat(priceText.replace("Price: LKR. ", "").trim()) || 0;
}

// gets the quantity
function getQuantity(medicineCard) {
  const quantityInput = medicineCard.querySelector("input[type='number']");
  const quantityValue = parseInt(quantityInput.value);

  return Number.isInteger(quantityValue) && quantityValue > 0
    ? quantityValue
    : 0;
}

// creating a cart item
function createCartItem(name, price, quantity) {
  const itemTotalPrice = price * quantity;
  return {
    name: name,
    price: price,
    quantity: quantity,
    totalPrice: itemTotalPrice,
  };
}

// updates the cart table
function updateCart() {
  const cartTableBody = document.getElementById("cart-body");
  const totalPriceElement = document.getElementById("net-total");

  if (!cartTableBody || !totalPriceElement) {
    console.error("Cart table or total price element not found.");
    return;
  }

  clearCartDisplay(cartTableBody);
  const itemMap = groupCartItems();
  displayCartItems(cartTableBody, itemMap);
  displayTotalPrice(totalPriceElement, itemMap);
}

// clears the cart table
function clearCartDisplay(cartTableBody) {
  cartTableBody.innerHTML = "";
}

// if an item already exits add the quantity to the exisiting item
function groupCartItems() {
  let itemMap = {};
  shoppingCart.forEach((item) => {
    if (itemMap[item.name]) {
      itemMap[item.name].quantity += item.quantity;
      itemMap[item.name].totalPrice += item.totalPrice;
    } else {
      itemMap[item.name] = { ...item };
    }
  });
  return itemMap;
}

// adding cart items to the table
function displayCartItems(cartTableBody, itemMap) {
  let index = 1;
  for (const itemName in itemMap) {
    const cartItem = itemMap[itemName];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${cartItem.name}</td>
      <td>${cartItem.quantity}</td>
      <td>LKR ${cartItem.price.toFixed(2)}</td>
      <td>LKR ${cartItem.totalPrice.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
    index++;
  }
}

// displays net total
function displayTotalPrice(totalPriceElement, itemMap) {
  let totalAmount = 0;
  for (const itemName in itemMap) {
    totalAmount += itemMap[itemName].totalPrice;
  }
  totalPriceElement.innerText = `LKR ${totalAmount.toFixed(2)}`;
}
