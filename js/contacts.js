let currentUserContacts = []

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
  let currentContactID = currentUserContacts.length;
  let newContact = {
    contactCreatorID: currentUser["id"],
    name: nameInput,
    email: emailInput,
    phone: numberInput,
    contactID: currentContactID,
  };
  
  
   currentUserContacts.push(newContact);

   await backend.setItem("currentUserContacts", (currentUserContacts));
  closeAddNewContact();
  render();
}

async function render() {
  await downloadFromServer();
  let dropArea = document.getElementById("contactsArea");
  dropArea.innerHTML = "";
  for (let i = 0; i < currentUserContacts.length; i++) {
    const contact = currentUserContacts[i];
    dropArea.innerHTML += `<div>${contact.name}</div>`;
  }
}

async function loadContactsData() {
  let item = await backend.getItem("currentUserContacts");
  if (item !== null) {
    currentUserContacts = JSON.parse(item);
  } else {
    currentUserContacts = [];
  }
  render();
}
