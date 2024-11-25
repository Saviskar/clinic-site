document.addEventListener("DOMContentLoaded", fetchAndCreateEls);

async function fetchAndCreateEls() {
  const mainMedicineContainer = document.getElementById("medicine-order-form");

  try {
    const medicines = await fetchMedicines();

    medicines.forEach((medicine) => {
      // order page container element
      const orderPageContainer = document.createElement("div");
      orderPageContainer.classList.add("order-page-container");

      // medicine category title element
      const title = document.createElement("h1");
      title.classList.add("hero-text", "title");
      title.textContent = `${medicine.mainCategory}`;

      // medicine container
      const medicineContainer = document.createElement("div");
      medicineContainer.classList.add("medicine-container");

      // medicine card
      const medicineCard = document.createElement("div");
      medicineCard.classList.add("medicine-card");

      // image of the medicine
      const image = document.createElement("img");
      image.classList.add("medicine-image");

      // title of the medicine itself
      const medicineItself = document.createElement("h3");
      medicineItself.textContent = `${medicine.name}`;

      // price displaying element
      const price = document.createElement("p");
      price.classList.add("medicine-price");
      price.textContent = `Price: LKR. ${medicine.price}`;

      // quantity label element
      const quantityLabel = document.createElement("label");

      // setting the label name
      quantityLabel.textContent = `Quantity: ${medicine.quantity}`; // no attribute named quantity in json

      // create input element
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.placeholder = "Enter a number";
      inputElement.min = "1";
      inputElement.id = "numberInput";

      // creating a button element
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("add-to-cart");
      button.textContent = `Add to Cart`;

      // append all elements to the medicineCard
      medicineCard.appendChild(image);
      medicineCard.appendChild(medicineItself);
      medicineCard.appendChild(price);
      medicineCard.appendChild(quantityLabel);
      medicineCard.appendChild(inputElement);
      medicineCard.appendChild(button);

      // append the medicineCard to the medicine container
      medicineContainer.appendChild(medicineCard);

      // append the title and medicine container to the order page container
      orderPageContainer.appendChild(title);
      orderPageContainer.appendChild(medicineContainer);

      // append the orderPageContainer to the main container
      mainMedicineContainer.appendChild(orderPageContainer);
    });
  } catch (error) {
    console.log(error);
  }
}

async function fetchMedicines() {
  const response = await fetch("assets/json/medicines.json");
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  return response.json();
}

fetchMedicines();
