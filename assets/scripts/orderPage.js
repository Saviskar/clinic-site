document.addEventListener("DOMContentLoaded", fetchAndCreateEls);

async function fetchAndCreateEls() {
  const mainMedicineContainer = document.getElementById("medicine-order-form");

  try {
    const medicines = await fetchMedicines();

    // loop through each category in the JSON
    for (const category in medicines) {
      const categoryData = medicines[category];

      // category title
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;

      // create a container for each category
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container");

      // loop through the medicines in the category
      categoryData.forEach((medicine) => {
        const medicineCard = document.createElement("div");
        medicineCard.classList.add("medicine-card");

        // image of the medicine
        const image = document.createElement("img");
        image.classList.add("medicine-image");
        image.src = `${medicine.image}`;

        // title of the medicine
        const medicineTitle = document.createElement("h3");
        medicineTitle.textContent = medicine.name;

        // price of the medicine
        const price = document.createElement("p");
        price.classList.add("medicine-price");
        price.textContent = `Price: LKR. ${medicine.price}`;

        // quantity input
        const inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.placeholder = "Enter quantity";
        inputElement.min = "1";

        // add to Cart button
        const button = document.createElement("button");
        button.classList.add("add-to-cart");
        button.textContent = "Add to Cart";

        // append everything to the card
        medicineCard.appendChild(image);
        medicineCard.appendChild(medicineTitle);
        medicineCard.appendChild(price);
        medicineCard.appendChild(inputElement);
        medicineCard.appendChild(button);

        // append the card to the category container
        categoryContainer.appendChild(medicineCard);
      });

      // append the category title and its container to the main container
      mainMedicineContainer.appendChild(categoryTitle);
      mainMedicineContainer.appendChild(categoryContainer);
    }
  } catch (error) {
    console.error(error);
  }
}

// fetch data from the json file
async function fetchMedicines() {
  const response = await fetch("assets/json/medicines.json");
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  return response.json();
}

// all below during add to cart

// handle float point values
// negative values

// all below in checkout page

// give a message thanking the user with the delivery date and take him back to the order page
