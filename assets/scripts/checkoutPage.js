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

function redirectOrderPage() {
  window.location.href = "orderPage.html";
}

placeOrderBtn.addEventListener("click", validateForm);
