// MAINTAIN STICKY POSITION ON RELOAD
document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = sessionStorage.getItem('scrollpos');
  if (scrollpos) {
      window.scrollTo(0, scrollpos);
      sessionStorage.removeItem('scrollpos');
  }
});

window.addEventListener("beforeunload", function (e) {
  sessionStorage.setItem('scrollpos', window.scrollY);
});

// ==========================================================================================================================================================//
// VALIDATIONS
document
  .getElementById("first-name")
  .addEventListener("blur", checkFormValidity);
document
  .getElementById("last-name")
  .addEventListener("blur", checkFormValidity);
document.getElementById("birthday").addEventListener("blur", checkFormValidity);
document.getElementById("idnumber").addEventListener("blur", checkFormValidity);

document.getElementById("phone").addEventListener("blur", function () {
  var phoneInput = document.getElementById("phone");
  var phoneError = document.getElementById("phone-error");

  if (validatePhoneNumber(phoneInput.value)) {
    phoneError.style.display = "none";
  } else {
    phoneError.style.display = "block";
  }
  checkFormValidity();
});

document.getElementById("email").addEventListener("blur", function () {
  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("email-error");

  if (validateEmail(emailInput.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
  checkFormValidity();
});

document
  .getElementById("profile-picture")
  .addEventListener("change", async function () {
    var pictureInput = document.getElementById("profile-picture");
    var pictureError = document.getElementById("picture-error");
    if (await validateFile(pictureInput)) {
      pictureError.style.display = "none";
    } else {
      pictureError.style.display = "block";
    }
    checkFormValidity();
  });

document.getElementById("password1").addEventListener("change", function () {
  validatePasswords();
});

document.getElementById("password2").addEventListener("change", function () {
  validatePasswords();
});

document.getElementById("idnumber").addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.length > 8) {
    e.target.value = value.slice(0, 8);
  }
});

function validateEmail(email) {
  // var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // OLD VERSION
  var re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // TODO: Character limit for email;
  // 255 for octet parts;
  // certain special characters sa start
  return re.test(email);
}

function validatePhoneNumber(phone) {
  var re = /^09\d{9}$/;
  return re.test(phone);
}

getFileSignature = (buffer) => {
  const header = buffer.slice(0, 4).toString("hex").toUpperCase();
  switch (header) {
    case "89504E47":
      return "image/png";
    case "FFD8FFE0":
    case "FFD8FFE1":
    case "FFD8FFE2":
    case "FFD8FFE3":
    case "FFD8FFE8":
      return "image/jpeg";
    default:
      return "unknown";
  }
};

async function validateFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function (e) {
      const buffer = new Uint8Array(e.target.result);
      const fileType = getFileSignature(buffer);
      resolve(fileType !== "unknown");
    };
    reader.onerror = function () {
      reject(new Error("File read error"));
    };
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
}

function validatePassword(password) {
  // - Minimum 8 characters
  // - One uppercase letter
  // - One lowercase letter
  // - One number and one special character
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[^ ]{12,64}$/;
  return re.test(password);
}

function validatePasswords() {
  var pw1Input = document.getElementById("password1");
  var pw2Input = document.getElementById("password2");
  var password1Error = document.getElementById("password1-error");
  var password2Error = document.getElementById("password2-error");

  if (validatePassword(pw1Input.value)) {
    password1Error.style.display = "none";
    if (pw1Input.value === pw2Input.value) {
      password2Error.style.display = "none";
    } else {
      password2Error.style.display = "block";
    }
  } else {
    password1Error.style.display = "block";
  }
  checkFormValidity();
}

function checkFormValidity() {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;

  var birthday = document.getElementById("birthday").value;
  var idNumber = document.getElementById("idnumber").value;

  var emailInput = document.getElementById("email").value;
  var emailError = document.getElementById("email-error").style.display;

  var phoneInput = document.getElementById("phone").value;
  var phoneError = document.getElementById("phone-error").style.display;

  var pictureInput = document.getElementById("profile-picture").value;
  var pictureError = document.getElementById("picture-error").style.display;

  var pw1Input = document.getElementById("password1").value;
  var pw2Input = document.getElementById("password2").value;
  var password1Error = document.getElementById("password1-error").style.display;
  var password2Error = document.getElementById("password2-error").style.display;

  if (
    firstName !== "" &&
    lastName !== "" &&
    birthday !== "" &&
    idNumber !== "" &&
    emailInput !== "" &&
    emailError === "none" &&
    phoneInput !== "" &&
    phoneError === "none" &&
    pictureInput !== "" &&
    pictureError === "none" &&
    pw1Input !== "" &&
    pw2Input !== "" &&
    password1Error === "none" &&
    password2Error === "none"
  ) {
    document.getElementById("register-btn").disabled = false;
  } else {
    document.getElementById("register-btn").disabled = true;
  }
}
