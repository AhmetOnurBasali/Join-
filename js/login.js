
async function loadUsers() {
  await downloadFromServer();
  let item = backend.getItem("users");
  if (typeof item === "string") {
    users = JSON.parse(item) || [];
  } else {
    users = item;
  }
  await backend.setItem("users", users);
}

async function addUser() {
  // private-daten hashen?
  let newColor = setUserColor();
  let newName = document.getElementById("name");
  let newEmail = document.getElementById("email");
  let newPassword = document.getElementById("password");

  if (proofName() === true) {// proof Optimieren
    
    let currentID = users.length
    let newID = currentID + 1;

    users.push({
      name: newName.value,
      email: newEmail.value,
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
    alert("Überprüfe die Daten");//TODO: vielleicht als text untern dem jeweiligen input
  }
}

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find((u) => u.email == email.value && u.password == password.value);
  console.log(user);
  if (user) {
    console.log("user gefunden");
    setTimeout(() => {
      window.location.href = "test.html"; // <---- TODO : wird später summary.html
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

function lsRememberMe() {
  if (rmCheck.checked && emailInput.value && passwordInput.value !== "") {
      localStorage.username = emailInput.value;
      localStorage.password = passwordInput.value;
      localStorage.checkbox = rmCheck.value;
  } else {
      localStorage.username = "";
      localStorage.password = ""
      localStorage.checkbox = "";
  }
}
