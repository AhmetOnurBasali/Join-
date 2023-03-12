let email = "";

async function onPageLoad() {
  await loadUsers();
  email = getEmailUrlParameter();
}

function getEmailUrlParameter() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currentEmail = urlParams.get("email");
  const emailToLowerCase = currentEmail.toLowerCase();
  const email = emailToLowerCase.replace(/^\w/, (c) => c.toUpperCase());
  return email;
}


async function onSubmit(event) {
  event.preventDefault();
  let newPassword = document.getElementById("newPassword").value;
  let confirmNewPassword = document.getElementById("confirmNewPassword");
  let emailFound = users.find((u) => u.email == email);
  if (emailFound && newPassword === confirmNewPassword.value) {
    await changePassword(emailFound, newPassword);
  } else {
    msgBox.innerHTML ="Make sure the second password you typed matches the first";
    confirmNewPassword.classList.add("falseInput");
  }
}


async function changePassword(emailFound, newPassword) {
  emailFound["password"] = newPassword;
  if (emailFound["password"] === newPassword) {
    let popUp = document.getElementById("popUpPasswordChange");
    popUp.classList.remove("d-none");
    await backend.setItem("users", users);
    setTimeout(() => {
      popUp.classList.add("d-none");
      window.location.href = "/index.html?msg=password was change";
    }, 1500);
  }
}
