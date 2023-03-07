let disclaimerShowAgain = true
let disclaimerUnderstood = false


function understoodDisclaimer() {
  let checkbox = document.getElementById('disclaimerCheck').checked
  if (checkbox == true) {
    disclaimerShowAgain = false
    localStorage.setItem('disclaimerUnderstood', true)
    localStorage.setItem('dontShowAgain', false)
  }
  disclaimerUnderstood = true
  let text = document.getElementById('disclaimerConatiner')
  text.classList.add('d-none')
}


function animateImage() {
  loginLogo.classList.add('d-none')
  let svg = document.getElementById('joinEntrance');
  svg.classList.add('slide-out-tl');
  let bg = document.getElementById('joinEntranceBg');
  bg.classList.add('title-bg-hide');
  setTimeout(() => {
    svg.classList.add('d-none');
    bg.classList.add('d-none');
    loginLogo.classList.remove('d-none')
  }, 1900);
}


function proofDisclaimer() {
  let storage = localStorage.getItem('dontShowAgain')
  if (storage === "false") {
    return true
  }
  if (disclaimerUnderstood == false) {
    let falseInputText = document.getElementById('msgBoxUnderstood')
    falseInputText.classList.remove('d-none')
    return false
  } else {
    return true
  }
}


function loadParms() {
  const urlParams = new URLSearchParams(window.location.search)
  const msg = urlParams.get('msg')
  if (msg) {
    msgBox.innerHTML = msg;
  } else {
    document.getElementById('msgBox').classList.add('d-none')
  }
  loadSecondParms()
}


function loadSecondParms() {
  const urlParams2 = new URLSearchParams(window.location.search)
  const msg2 = urlParams2.get('msg2')
  if (msg2) {
    setSecondParms(msg2)
  } else try {
    document.getElementById('msgBox2').classList.add('d-none')
  } catch (error) {
    console.log("no prams");
  }
}


function setSecondParms(msg2) {
  setTimeout(() => {
    passwordInput = document.getElementById("password");
    msgBox2.innerHTML = msg2;
    passwordInput.value = ""
    passwordInput.placeholder = "Ups! Try again"
  }, 100);
}


async function proofDisclaimerAgain() {
  let dontShow = localStorage.getItem("dontShowAgain");
  if (dontShow === "false") {
    let text = document.getElementById('disclaimerConatiner')
    text.classList.add('d-none')
  }
  if (!dontShow) {
    let text = document.getElementById('disclaimerConatiner')
    text.classList.remove('d-none')
  }
}


function initLocalLogin() {
  loadLocalDisclaimer()
  loadLocalRememberUser()
}


function loadLocalRememberUser() {
  const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email");
  passwordInput = document.getElementById("password");
  if (localStorage.checkbox && localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.email;
    passwordInput.value = localStorage.password;
  } else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
    passwordInput.value = "";
  }
}


function loadLocalDisclaimer() {
  if (localStorage.getItem('dontShowAgain') === 'true') {
    let text = document.getElementById('disclaimerConatiner');
    text.classList.add('d-none');
  }
}


async function loadCurrentUser() {
  await downloadFromServer();
  let item = localStorage.getItem("currentUser");
  if (typeof item === "string") {
    currentUser = JSON.parse(item) || [];
  } else {
    currentUser = item;
  }
  if (currentUser == null) {
    window.location.href = "/index.html?msg=Please Log In or sign up."
  }
}


async function loadUsers() {
  await downloadFromServer();
  let item = backend.getItem("users");
  if (typeof item === "string") {
    users = JSON.parse(item) || [];
  } else {
    users = item;
  }
  proofUsers();
}


async function proofUsers() {
  if (users === null) {
    await setGuestUser();
  }
}


async function addUser() {
  let newName = addUserName();
  let newColor = addUserColor();
  let newEmail = addUserEmail();
  let newInitialLetters = getInitialLetters(newName)
  let newPassword = document.getElementById("password");
  if (newEmail && proofName() === true && proofDisclaimer() == true) {
    await setNewUser(newName, newColor, newEmail, newPassword, newInitialLetters);
  } else {
    console.log();
    ("Überprüfe deine Angaben");
  }
}


function getInitialLetters(newName) {
  let initialFirstName = newName.split(" ")[0][0];
  let initialLastName = newName.split(" ")[1][0];
  let newInitialLetters = initialFirstName + initialLastName;
  return newInitialLetters
}


async function setNewUser(newName, newColor, newEmail, newPassword, newInitialLetters) {
  let currentID = users.length - 1;
  let newID = currentID + 1;
  let userData = {
    name: newName,
    email: newEmail,
    password: newPassword.value,
    color: newColor,
    id: newID,
    initialLetters: newInitialLetters
  };
  await saveNewUser(userData);
  setTimeout(() => {
    window.location.href = "/index.html?msg=Your regrestation was successful";
  }, 500);
}


async function saveNewUser(userData) {
  users.push(userData);
  await backend.setItem("users", users);
}


async function login() {
  let email = setLoginEmail();
  if (email) {
    let password = setLoginPassword();
    let user = users.find((u) => u.email == email && u.password == password);
    if (user) {
      setCurrentUser(user);
      setTimeout(() => {
        window.location.href = "../html/summary.html";
      }, 500);
    }
  } else {
    window.location.href = "/index.html?msg=Email not Found";
  }
}


function proofName() {
  let regName = /^[\wäöüÄÖÜ]+(?: [\wäöüÄÖÜ]+)+$/;
  let name = document.getElementById("name").value;
  if (!regName.test(name)) {
    document.getElementById("name").focus();
    document.getElementById("name").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("name").classList.remove("falseInput");
    return true;
  }
}


function getRandomColor() {
  const colors = ["red", "orange", "chocolate", "green", "blue", "purple"]; // TODO: mehr variationen?
  return colors[Math.floor(Math.random() * colors.length)];
}


function addUserColor() {
  newColor = getRandomColor();
  return newColor;
}


function addUserName() {
  let name = document.getElementById("name").value.toLowerCase();
  let newName = name.replace(/\b\w/g, (l) => l.toUpperCase());
  return newName;
}


function setLoginPassword() {
  let inputPassword = document.getElementById("password").value;
  let user = users.find((u) => u.password == password.value);
  if (user) {
    return inputPassword;
  } else {
    window.location.href = "/index.html?msg2=wrong password";
  }
}


function setCurrentUser(user) {
  currentUser.push(user);
  console.log("user gefunden:", user);
  let userJSON = JSON.stringify(user);
  localStorage.setItem("currentUser", userJSON);
}


function setLoginEmail() {
  let email = document.getElementById("email").value.toLowerCase();
  let newEmail = email.replace(/^\w/, (c) => c.toUpperCase());
  let emailFound = users.find((u) => u.email == newEmail);
  let emailRegex = getEmailRegEx();
  if (emailFound && emailRegex.test(newEmail)) {
    return newEmail;
  } else {
    console.log("invalid email");
    return;
  }
}


function proofEmail() {
  let regEmail = getEmailRegEx();
  let email = document.getElementById("email").value;
  if (!regEmail.test(email)) {
    document.getElementById("email").focus();
    document.getElementById("email").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("email").classList.remove("falseInput");
    return true;
  }
}


function addUserEmail() {
  let email = document.getElementById("email").value.toLowerCase();
  let newEmail = email.replace(/^\w/, (c) => c.toUpperCase());
  let emailFound = users.find((u) => u.email == newEmail);
  let emailRegex = getEmailRegEx();
  if (!emailRegex.test(newEmail)) {
    proofEmail();
    return;
  }
  if (emailFound) {
    window.location.href =
      "signUp.html?msg=The email is already registered here";
    return;
  } else {
    return newEmail;
  }
}

function lsRememberMe() {
  const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email");
  passwordInput = document.getElementById("password");
  if (rmCheck.checked && emailInput.value && passwordInput.value !== "") {
    localStorage.email = emailInput.value;
    localStorage.password = passwordInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.email = "";
    localStorage.password = "";
    localStorage.checkbox = "";
  }
}

function loginAsGuest() {
  let email = document.getElementById("email");
  email.value = users[0]["email"];
  let password = document.getElementById("password");
  password.value = users[0]["password"];
}

async function setGuestUser() {
  let users = [
    {
      name: "Guest User",
      email: "Xxx@xxx.xx",
      password: "v67rR§F$",
      color: "Black",
      id: 0,
      initialLetters: "GU"
    },
  ];
  await backend.setItem("users", users);
}

function showLock() {
  var input = document.getElementById("password");
  if (input.type === "password") {
    input.style =
      "background-image: url(../assets/img/password.svg); background-repeat: no-repeat; background-position: right;   background-position-x: 95%; background-size: 20px;";
  } else {
    input.type = "password";
  }
}

function showEye() {
  var input = document.getElementById("password");
  if (input.type === "password") {
    input.style =
      "background-image: url(../assets/img/show.png); background-repeat: no-repeat; background-position: right;   background-position-x: 95%; background-size: 20px;";
  } else {
    input.type = "password";
  }
}

function showPassword() {
  let input = document.getElementById("password");
  let checkbox = document.querySelector(".showPassword");
  if (checkbox.checked) {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function getEmailRegEx() {
  let emailRegex = /^[.-\wäöüÄÖÜ_]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
  return emailRegex;
}


