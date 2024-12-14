const placeOrderBtn = document.getElementById("placeOrder");

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const postalCode = document.getElementById("postal-code").value;
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvvNumber = document.getElementById("cvv").value;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const addressError = document.getElementById("address-error");
  const cityError = document.getElementById("city-error");
  const postalError = document.getElementById("postal-error");
  const cardError = document.getElementById("card-error");
  const dateError = document.getElementById("date-error");
  const cvvError = document.getElementById("cvv-error");

  // clear all previous error messages
  nameError.textContent = "";
  emailError.textContent = "";
  addressError.textContent = "";
  cityError.textContent = "";
  postalError.textContent = "";
  cardError.textContent = "";
  dateError.textContent = "";
  cvvError.textContent = "";

  let isValid = true;

  // name validation
  if (name === "" || /\d/.test(name)) {
    nameError.textContent = "Please enter your name properly.";
    isValid = false;
  }

  // email validation
  if (
    email === "" ||
    !email.includes("@") ||
    email.indexOf("@") > email.lastIndexOf(".") // checks if @ is before the period
  ) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  }

  // address validation
  if (address === "" || !/^[A-Za-z0-9\s,.'\-#/]+$/.test(address)) {
    addressError.textContent = "Please enter a valid address.";
    isValid = false;
  }

  // city validation
  if (city === "" || !/^[a-zA-Z\s]+$/.test(city)) {
    cityError.textContent =
      "City name should not contain numbers or special characters.";
    isValid = false;
  }

  // postal code validation
  if (postalCode === "" || !/^\d+$/.test(postalCode)) {
    postalError.textContent =
      "Postal code should only contain numbers and cannot be empty.";
    isValid = false;
  }

  // card number validation
  if (
    cardNumber === "" ||
    !/^\d+$/.test(cardNumber) ||
    (cardNumber.length !== 15 && cardNumber.length !== 16)
  ) {
    cardError.textContent = "Please enter a valid card number.";
    isValid = false;
  }

  // expiry date validation
  if (expiryDate === "") {
    dateError.textContent = "Expiry date is required.";
    isValid = false;
  } else {
    const currentDate = new Date();
    const [expiryYear, expiryMonth] = expiryDate.split("-");
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      dateError.textContent = "Card has expired.";
      isValid = false;
    }
  }

  // cvv validation
  if (cvvNumber === "" || !/^\d{3,4}$/.test(cvvNumber)) {
    cvvError.textContent = "Please enter a valid CVV.";
    isValid = false;
  }

  if (isValid) {
    redirectOrderPage();
  }

  return isValid; // return the result of the validation
}

const paymentMethod = document.getElementById("payment-method");
const medicineSectionOne = document.getElementById("DebitCreditPayment");

function displayCardInfo() {
  if (paymentMethod.value === "card-payment") {
    medicineSectionOne.style.display = "block";
  } else {
    medicineSectionOne.style.display = "none";
  }
}

const cartTable = document.getElementById("checkoutCartTable");

function getTableData() {
  const storedTableContent = JSON.parse(
    localStorage.getItem("cartContainerContent")
  );
  if (storedTableContent) {
    cartTable.innerHTML = storedTableContent;

    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.style.display = "none";

    // const actionButtons = document.getElementById("actionsBtn");
    // actionButtons.style.display = "none";
  }
}

getTableData();
displayCardInfo();
paymentMethod.addEventListener("change", displayCardInfo);

function redirectOrderPage() {
  alert("Thank you for purschasing, your order will be delivered");
  window.location.href = "orderPage.html";
}

placeOrderBtn.addEventListener("click", validateForm);

// function handlePaymentMethodChange() {
//   const paymentMethodValue = document.getElementById("payment-method").value;
//   const paymentDetails = document.getElementById("payment-details");

//   console.log(paymentDetails);

//   const medicineSectionOne = document.getElementById("cardPayment");

//   if (paymentMethodValue === "card-payment") {
//     // create and configure the label for Card Number
//     const cardNumberLabel = document.createElement("label");
//     cardNumberLabel.setAttribute("for", "card-number");
//     cardNumberLabel.textContent = "Card Number";
//     cardNumberLabel.classList.add("medicine-card");

//     // create and configure the input for Card Number
//     const cardNumberInput = document.createElement("input");
//     cardNumberInput.setAttribute("type", "text");
//     cardNumberInput.setAttribute("id", "card-number");
//     cardNumberInput.setAttribute("name", "card-number");
//     cardNumberInput.setAttribute("required", true);

//     // create and configure the error span for Card Number
//     const cardErrorDisplayEl = document.createElement("span");
//     cardErrorDisplayEl.setAttribute("id", "card-error");
//     cardErrorDisplayEl.classList.add("error-message");

//     // append elements for Card Number
//     paymentDetails.appendChild(cardNumberLabel);
//     paymentDetails.appendChild(cardNumberInput);
//     paymentDetails.appendChild(cardErrorDisplayEl);

//     // create and configure the label for Expiry Date
//     const expiryDateLabel = document.createElement("label");
//     expiryDateLabel.setAttribute("for", "expiry-date");
//     expiryDateLabel.textContent = "Expiry Date";

//     // create and configure the input for Expiry Date
//     const expiryDateInput = document.createElement("input");
//     expiryDateInput.setAttribute("type", "month");
//     expiryDateInput.setAttribute("id", "expiry-date");
//     expiryDateInput.setAttribute("name", "expiry-date");
//     expiryDateInput.setAttribute("required", true);

//     // create and configure the error span for Expiry Date
//     const dateErrorDisplayEl = document.createElement("span");
//     dateErrorDisplayEl.setAttribute("id", "date-error");
//     dateErrorDisplayEl.classList.add("error-message");

//     // append elements for Expiry Date
//     paymentDetails.appendChild(expiryDateLabel);
//     paymentDetails.appendChild(expiryDateInput);
//     paymentDetails.appendChild(dateErrorDisplayEl);

//     // create and configure the label for CVV
//     const cvvLabel = document.createElement("label");
//     cvvLabel.setAttribute("for", "cvv");
//     cvvLabel.textContent = "CVV";

//     // create and configure the input for CVV
//     const cvvInput = document.createElement("input");
//     cvvInput.setAttribute("type", "text");
//     cvvInput.setAttribute("id", "cvv");
//     cvvInput.setAttribute("name", "cvv");
//     cvvInput.setAttribute("required", true);

//     // create and configure the error span for CVV
//     const cvvErrorDisplayEl = document.createElement("span");
//     cvvErrorDisplayEl.setAttribute("id", "cvv-error");
//     cvvErrorDisplayEl.classList.add("error-message");

//     // append elements for CVV
//     paymentDetails.appendChild(cvvLabel);
//     paymentDetails.appendChild(cvvInput);
//     paymentDetails.appendChild(cvvErrorDisplayEl);
//   } else if (paymentMethod === "cash-on-delivery") {
//     // render content for Cash on Delivery
//     paymentDetails.innerHTML = `
//       <p>You selected Cash on Delivery. Please prepare the amount during delivery.</p>
//     `;
//   } else {
//     // show error if no payment method is selected
//     alert("Else statement");
//   }
// }
