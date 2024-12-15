const placeOrderBtn = document.getElementById("placeOrder");

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const postalCode = document.getElementById("postal-code").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const expiryDate = document.getElementById("expiry-date").value.trim();
  const cvvNumber = document.getElementById("cvv").value.trim();

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
    email.indexOf("@") > email.lastIndexOf(".")
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

  if (paymentMethod.value === "card-payment") {
    if (
      cardNumber === "" ||
      !/^\d+$/.test(cardNumber) ||
      (cardNumber.length !== 15 && cardNumber.length !== 16) ||
      !checkLuhn(cardNumber)
    ) {
      cardError.textContent = "Please enter a valid card number.";
      isValid = false;
    }

    function checkLuhn(cardNo) {
      let nDigits = cardNo.length;

      let nSum = 0;
      let isSecond = false;
      for (let i = nDigits - 1; i >= 0; i--) {
        let d = cardNo[i].charCodeAt() - "0".charCodeAt();

        if (isSecond == true) d = d * 2;

        // We add two digits to handle
        // cases that make two digits
        // after doubling
        nSum += parseInt(d / 10, 10);
        nSum += d % 10;

        isSecond = !isSecond;
      }
      return nSum % 10 == 0;
    }

    // expiry date validation
    if (expiryDate === "") {
      dateError.textContent = "Expiry date is required.";
      isValid = false;
    } else {
      const currentDate = new Date();
      const [expiryYear, expiryMonth] = expiryDate.split("-").map(Number);

      if (
        isNaN(expiryYear) ||
        isNaN(expiryMonth) ||
        expiryYear < currentDate.getFullYear() ||
        (expiryYear === currentDate.getFullYear() &&
          expiryMonth < currentDate.getMonth() + 1)
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
  } else if (paymentMethod.value === "cash-on-delivery") {
    // successfullPurchase();
  }

  if (isValid) {
    redirectOrderPage();
  }

  return isValid; // return the result of the validation
  console.log(isValid);
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
  }
}

getTableData();
displayCardInfo();
paymentMethod.addEventListener("change", displayCardInfo);

function redirectOrderPage() {
  // alert("Thank you for purschasing, your order will be delivered");
  window.location.href = "pharmacy.html";
}

// placeOrderBtn.addEventListener("click", () => {
//   validateForm();
//   successfullPurchase();
// });

placeOrderBtn.addEventListener("click", () => {
  if (validateForm()) {
    successfullPurchase();
  }
});

function successfullPurchase() {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 3);
  const deliveryDate = currentDate.toDateString();

  alert(
    `Thank you for your purchase! Your medicines will be delivered on ${deliveryDate}`
  );

  window.location.href = "pharmacy.html";
}
