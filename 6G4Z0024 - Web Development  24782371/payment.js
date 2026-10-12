function validateForm() {
  // get input values from the form
  var card = document.getElementById("cardNumber").value.trim();
  var month = parseInt(document.getElementById("expMonth").value);
  var year = parseInt(document.getElementById("expYear").value);
  var cvv = document.getElementById("cvv").value.trim();

  // get the error/success message areas
  var errorMsg = document.getElementById("errorMsg");
  var successMsg = document.getElementById("successMsg");

  // clear any previous messages
  errorMsg.textContent = "";
  successMsg.textContent = "";

  // Validation checks

  // Card number has to be 16 digits and only numbers
  if (card.length !== 16 || isNaN(card)) {
    errorMsg.textContent = "Card number must be 16 digits.";
    return false;
  }

  // MasterCard only (starts with 51 to 55)
  var prefix = card.substring(0, 2);
  if (parseInt(prefix) < 51 || parseInt(prefix) > 55) {
    errorMsg.textContent = "Only MasterCard numbers starting with 51–55 are acceptable.";
    return false;
  }

  // Checks if card is expired
  var today = new Date(); 
  var currentYear = today.getFullYear();
  var currentMonth = today.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    errorMsg.textContent = "Card is expired.";
    return false;
  }

  // CVV must be 3 digits only
  if (cvv.length !== 3 || isNaN(cvv)) {
    errorMsg.textContent = "CVV must be 3 digits.";
    return false;
  }

  // creates object with the payment details
  var paymentDetails = {
    master_card: Number(card),
    exp_month: month,
    exp_year: year,
    cvv_code: cvv
  };

  // send data using fetch() API calling
  fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentDetails) // converts object to JSON string
  })
  .then(function(response) {
    //  status code check from the server
    if (response.status === 200) {
      return response.json(); 
    } else if (response.status === 400) {
      // data we sent was most likely wrong
      throw new Error("Bad data was sent to the server.");
    } else {
      // Some other error
      throw new Error("Unexpected error. Try again.");
    }
  })
  .then(function(data) {
    // redirect to success page with last 4 digits of credit card
    var lastFour = card.slice(-4); // get last 4 numbers of the card
    window.location.href = "success.html?last4=" + lastFour;
  })
  .catch(function(error) {
    // If error then show it to the user
    errorMsg.textContent = error.message;
  });

  return false;
}
