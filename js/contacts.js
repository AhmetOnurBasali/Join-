let currentContactID = [currentUser["id"]];
let currentUserContacts = [];

function closeAddNewContact() {
  let container = document.getElementById("addContactPopup");
  container.classList.add("d-none");
}

function openAddNewContact() {
  let container = document.getElementById("addContactPopup");
  container.classList.remove("d-none");
}

function closeEditContact() {
  let container = document.getElementById("editContactPopup");
  container.classList.add("d-none");
}

async function createNewContact(event) {
  event.preventDefault();

  let nameInput = document.getElementById("inputName").value;
  let emailInput = document.getElementById("inputEmail").value;
  let numberInput = document.getElementById("inputNumber").value;
  console.log(nameInput, emailInput, numberInput);
  console.log(currentUser);
  let contacts = {
    contactCreatorID: currentUser["id"],
    name: nameInput,
    email: emailInput,
    phone: numberInput,
  };
  console.log(contacts);
  currentContactID++;
  currentUserContacts.push(contacts);
  await backend.setItem("currentUserContacts", contacts);
}

async function loadContactsData() {
  await downloadFromServer();
  let item = await backend.getItem("currentUserContacts");
  if (typeof item === "string") {
    currentUserContacts = JSON.parse(item) || [];
  } else {
    currentUserContacts = item;
  }
}
