document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const validatePassword = document.getElementById("validatePassword");
  const rememberMeCheckbox = document.getElementById("keepLogIn");

  // Load the stored username if "Remember Me" was checked
  if (localStorage.getItem('rememberMe') === 'true') {
    username.value = localStorage.getItem('username');
    email.value = localStorage.getItem('email');
    password.value = localStorage.getItem('password')
    rememberMeCheckbox.checked = true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check the form inputs
    checkInputs();

    // Handle "Remember Me" feature
    if (rememberMeCheckbox.checked) {
      localStorage.setItem('username', username.value);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('rememberMe');
    }

    // Redirect to another page if form is valid
    if (isFormValid()) {
      window.location.href = '../Views/homePage.html';
    }
  });

  // Check inputs function
  function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const validatePasswordValue = validatePassword.value.trim();

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
    } else {
      setSuccessFor(username);
    }

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Email is not valid");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else {
      setSuccessFor(password);
    }

    if (validatePasswordValue === "") {
      setErrorFor(validatePassword, "Password check cannot be blank");
    } else if (passwordValue !== validatePasswordValue) {
      setErrorFor(validatePassword, "Passwords do not match!");
    } else {
      setSuccessFor(validatePassword);
    }
  }

  // Set error function
  function setErrorFor(input, message) {
    const formControlContainer = input.parentElement;
    const small = formControlContainer.querySelector("small");

    small.innerText = message;
    formControlContainer.classList.add('error');
    formControlContainer.classList.remove('success');
  }

  // Set success function
  function setSuccessFor(input) {
    const formControlContainer = input.parentElement;

    formControlContainer.classList.add('success');
    formControlContainer.classList.remove('error');
  }

  // Email validation function
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  // Function to check if all inputs are valid
  function isFormValid() {
    return !Array.from(form.querySelectorAll('.formControlContainer'))
      .some(container => container.classList.contains('error'));
  }
});