let currentUserContacts = [];

async function loadContactsData() {
  await downloadFromServer();
  let item = await backend.getItem(`userID${currentUser["id"]}Contacts`);
  currentUserContacts = item || [];
  await test();
  render();
}
async function test() {
  let newContact;
  if (
    currentUserContacts == null ||
    currentUserContacts.length == 0 ||
    currentUserContacts == undefined
  ) {
    newContact = {
      contactCreatorID: currentUser["id"],
      name: currentUser.name,
      email: currentUser.email,
      phone: "Edit your Number",
      contactID: 0,
    };
    currentUserContacts.push(newContact);
    await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
  }
}

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
  newContact = {
    contactCreatorID: currentUser["id"],
    name: nameInput,
    email: emailInput,
    phone: numberInput,
    contactID: currentContactID,
  };
  currentUserContacts.push(newContact);
  await backend.setItem(
    `userID${currentUser["id"]}Contacts`,
    currentUserContacts
  );
  closeAddNewContact();
}



function render() {
  let dropArea = document.getElementById("contactsArea");
  dropArea.innerHTML = "";

  currentUserContacts.sort((a, b) => {
    if (a.contactID === 0) return -1;
    if (b.contactID === 0) return 1;
    return a.name.localeCompare(b.name);
  });

  let currentLetter = "";
  for (let i = 0; i < currentUserContacts.length; i++) {
    const contact = currentUserContacts[i];
    let firstLetter = contact.name[0].toUpperCase();
    if (firstLetter !== currentLetter) {
      dropArea.innerHTML += `<h2>${firstLetter}</h2>`;
      currentLetter = firstLetter;
    }
    dropArea.innerHTML += `
      <div>${contact.name}</div>
      <div>${contact.email}</div>
      <div>${contact.phone}</div>
      <div>contact id: ${contact.contactID}</div>
    `;
  }
}