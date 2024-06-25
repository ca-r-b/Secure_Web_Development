
document.getElementById("first-name").addEventListener("blur", checkFormValidity);
document.getElementById("last-name").addEventListener("blur", checkFormValidity);

document.getElementById("phone").addEventListener("blur", function() {
    var phoneInput = document.getElementById("phone");
    var phoneError = document.getElementById("phone-error");

    if (validatePhoneNumber(phoneInput.value)) {
        phoneError.style.display = "none";
    } else {
        phoneError.style.display = "block";
    }
    checkFormValidity();
});

document.getElementById("email").addEventListener("blur", function() {
    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("email-error");

    if (validateEmail(emailInput.value)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }
    checkFormValidity();
});

document.getElementById("profile-picture").addEventListener("change", function() {
    var pictureInput = document.getElementById("profile-picture");
    var pictureError = document.getElementById("picture-error");
    var fileName = pictureInput.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

    if (validateFileExtension(ext)) {
        pictureError.style.display = "none";
    } else {
        pictureError.style.display = "block";
    }
    checkFormValidity();
});

document.getElementById("password1").addEventListener("change", function() {
    validatePasswords();
});

document.getElementById("password2").addEventListener("change", function() {
    validatePasswords();
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/; // TODO: Character limit for email; 255 for octet parts; certain special characters sa start
    return re.test(email);
}

function validatePhoneNumber(phone) {
    var re = /^09\d{9}$/;
    return re.test(phone);
}

function validateFileExtension(fileName) {
    var re = /^(jpg|jpeg|png)$/i; // TODO: Magic Number - hex/ check for file header
    return re.test(fileName);
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
    
    if (    firstName !== "" && 
            lastName !== "" && 
            (emailInput !== "" && emailError === "none") && 
            (phoneInput !== "" && phoneError === "none") &&
            (pictureInput !== "" && pictureError === "none") &&
            (pw1Input !== "" && pw2Input !== "" && password1Error === "none" && password2Error === "none")
        ) {
        document.getElementById("register-btn").disabled = false;
    } else {
        document.getElementById("register-btn").disabled = true;
    }
}