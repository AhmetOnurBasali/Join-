async function loadCurrentUser() {
  await downloadFromServer();
  let item = localStorage.getItem("currentUser");
  if (typeof item === "string") {
    currentUser = JSON.parse(item) || [];
  } else {
    currentUser = item;
  }
  setGreatingName();
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
  // private-daten hashen?
  let newName = addUserName();
  let newColor = addUserColor();
  let newEmail = addUserEmail();
  let newPassword = document.getElementById("password");
  if (newEmail && proofName() === true) {
    await setNewUser(newName, newColor, newEmail, newPassword);
  } else {
    console.log();
    ("Überprüfe deine Angaben"); //TODO: vielleicht als text untern dem jeweiligen input
  }
}


async function setNewUser(newName, newColor, newEmail, newPassword) {
  let currentID = users.length;
  let newID = currentID + 1;
  let userData = {name: newName, email: newEmail, password: newPassword.value, color: newColor, id: newID};
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
        window.location.href = "../Add_Task/Add_Task.html";
      }, 500);}
  } else {
    window.location.href = "/index.html?msg=Email not Found";
  }
}


function proofName() {
  let regName = /^\w+(?: \w+)+$/;
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
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"]; // TODO: mehr variationen?
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


function setGreatingName() {
  let greatingName = document.getElementById("greatingName");
  greatingName.innerHTML = currentUser["name"];
}