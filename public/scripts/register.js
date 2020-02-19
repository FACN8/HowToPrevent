const username = document.getElementById("inputName");
const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword");
const confirmPassword = document.getElementById("inputVerify");
const form = document.getElementsByClassName("form")[0];
const usernameErr = document.getElementById("usernameErr");
const emailErr = document.getElementById("emailErr");
const passwordErr = document.getElementById("passwordErr");
const confirmErr = document.getElementById("confirmErr");

const checkUsername = function () {
  if (username.value === '') {
    displayErr(usernameErr, "Please Enter your Username")
    return false;
  } else {
    displayErr(usernameErr, "");
    return true;
  }
};

const checkEmail = function () {
  if (email.value === '') {
    displayErr(emailErr, "Please Enter your Email")
    return false;
  } else {
    displayErr(emailErr, "");
    return true;
  }
};

const checkPw = function () {
  if (password.value === '') {
    displayErr(passwordErr, "Please enter Password");
    return false;
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const checkConfirmPw = function () {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, "Passwords do not match");
    return false;
  } else if (confirmPassword.value === '') {
    displayErr(confirmErr, "Please confirm your password");
    return false;
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

const displayErr = (errElem, errMsg) => {
  errElem.innerText = errMsg;
}

username.addEventListener("focusout", checkUsername);
email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);
confirmPassword.addEventListener("focusout", checkConfirmPw);

form.addEventListener("submit", function (event) {

  if (!checkUsername()) {
    event.preventDefault();
  }
  if (!checkEmail()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  }

});