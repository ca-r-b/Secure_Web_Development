

function validatePhoneNumber(phone) {
    var re = /^09\d{9}$/;
    return re.test(phone);
  }

  document.getElementById("editPhone").addEventListener("blur", function () {
    var phoneInput = document.getElementById("editPhone");
    var phoneError = document.getElementById("edit-phone-error");
  console.log('aaaaaaaaaaa');
    if (validatePhoneNumber(phoneInput.value)) {
      phoneError.style.display = "none";
      document.getElementById("edit-button").disabled = false;
    } else {
      phoneError.style.display = "block";
      document.getElementById("edit-button").disabled = true;
    }
  });