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

async function addUser() { // private-daten hashen? proof für vor und nachname Optimieren 
  let newColor = assignColorOnRegistration()
  let newName = document.getElementById("name")
  let newEmail = document.getElementById("email");
  let newPassword = document.getElementById("password");
  assignColorOnRegistration()
  users.push({name: newName.value, email: newEmail.value, password: newPassword.value, color: newColor});
  await backend.setItem("users", users);
  console.log(users);
  newName.value = "";
  newEmail.value = "";
  newPassword.value = "";
  setTimeout(() => {
    window.location.href =
      "/login.html?msg=Du hast dich erfolgreich Regrestiert";
  }, 1500);
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
    }, 1500);
  }
}


function proofName(){ 
  let regName = /^\w+(?: \w+)+$/
  let name = document.getElementById('name').value;
  if(!regName.test(name)){
      console.log('Please enter your full name (first & last name).')
      document.getElementById('name').focus();
      document.getElementById('name').classList.add('falseInput')
      return false;
  }else{
      console.log('Valid name given.')
      document.getElementById('name').classList.remove('falseInput')
      return true;
  }
}




function getRandomColor() {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"]; // TODO: mehr variationen 
  return colors[Math.floor(Math.random() * colors.length)];
}

function assignColorOnRegistration() {
  newColor = getRandomColor();
  return newColor
}

