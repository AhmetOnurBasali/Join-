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
  let newEmail = document.getElementById("email");
  let newPassword = document.getElementById("password");
  users.push({ email: newEmail.value, password: newPassword.value });
  await backend.setItem("users", users);
  console.log(users);
  newEmail.value = "";
  newPassword.value = "";
  setTimeout(() => {
    window.location.href =
      "/login.html?msg=Du hast dich erfolgreich Regrestiert";
  }, 2000);
}

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
    setTimeout(() => {
      window.location.href = "dashboard.html"; // <---- TODO : wird später summary.html
    }, 2000);
  }
}


