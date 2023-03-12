async function onSubmit(event) {
  event.preventDefault();
  let user = proofEmail();
  if (user) {
    let response = await getResponse(event);
    tryToSendEmail(response);
  } else {
    window.location.href = "getEmail.html?msg=email is not registered here";
  }
}


function proofEmail() {
  let emailInput = document.getElementById("email").value.toLowerCase();
  let email = emailInput.replace(/^\w/, (c) => c.toUpperCase());
  let user = users.find((u) => u.email == email);
  return user;
}


async function getResponse(event) {
  let formData = new FormData(event.target);
  let response = await action(formData);
  return response;
}


async function tryToSendEmail(response) {
  let popUp = document.getElementById("popUpEmailSend");
  popUp.classList.toggle("d-none", !response.ok);
  setTimeout(() => {
    window.location.href = `getEmail.html?msg=${ response.ok? `email was send to ${email.value}`: "email not send(error: getEmail.js - tryToSendEmail(response)"}`;
  }, 1000);
}


function action(formData) {
  const input = "https://gruppe-446.developerakademie.net/html/send_mail.php";
  const requestInit = {
    method: "post",
    body: formData,
  };
  return fetch(input, requestInit);
}
