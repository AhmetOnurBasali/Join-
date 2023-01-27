async function loadCurrentUser() {
  await downloadFromServer();
  let item = backend.getItem("currentUser");
  if (typeof item === "string") {
    currentUser = JSON.parse(item) || [];
  } else {
    currentUser = item;
  }
  setGreatingName();
}

function setGreatingName() {
  let greatingName = document.getElementById("greatingName");
  greatingName.innerHTML = currentUser["name"];
}

async function loadUsers() {
  await downloadFromServer();
  let item = backend.getItem("users");
  if (typeof item === "string") {
    users = JSON.parse(item) || [];
  } else {
    users = item;
  }
}

async function addUser() {
  // private-daten hashen?
  let newName = setUserName();
  let newColor = setUserColor();
  let newEmail = setUserEmail();
  let newPassword = document.getElementById("password");

  if (proofName() === true) {
    // proof Optimieren

    let currentID = users.length;
    let newID = currentID + 1;

    users.push({
      name: newName,
      email: newEmail,
      password: newPassword.value,
      color: newColor,
      id: newID,
    });

    await backend.setItem("users", users);

    newName.value = "";
    newEmail.value = "";
    newPassword.value = "";
    console.log(users);

    setTimeout(() => {
      window.location.href =
        "/index.html?msg=Du hast dich erfolgreich Regrestiert";
    }, 1500);
  } else {
    alert("Überprüfe deine Angaben"); //TODO: vielleicht als text untern dem jeweiligen input
  }
}

async function login() {
  let email = setUserEmail();
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email && u.password == password.value
  );
  if (user) {
    console.log("user gefunden:", user);
    currentUser.push(user);
    await backend.setItem("currentUser", user);
    setTimeout(() => {
      window.location.href = "../Summary/summary.html";
    }, 1500);
  }
}

function proofName() {
  let regName = /^\w+(?: \w+)+$/;
  let name = document.getElementById("name").value;
  if (!regName.test(name)) {
    console.log("Please enter your full name (first & last name).");
    document.getElementById("name").focus();
    document.getElementById("name").classList.add("falseInput");
    return false;
  } else {
    console.log("Valid name given.");
    document.getElementById("name").classList.remove("falseInput");
    return true;
  }
}

function getRandomColor() {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"]; // TODO: mehr variationen?
  return colors[Math.floor(Math.random() * colors.length)];
}

function setUserColor() {
  newColor = getRandomColor();
  return newColor;
}

function setUserName() {
  let name = document.getElementById("name").value.toLowerCase();
  let newName = name.replace(/\b\w/g, (l) => l.toUpperCase());
  return newName;
}

function setUserEmail() {
  let email = document.getElementById("email").value.toLowerCase();
  let newEmail = email.replace(/^\w/, (c) => c.toUpperCase());
  return newEmail;
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
