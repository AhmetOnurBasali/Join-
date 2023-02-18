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
    let nameInitials = getInitialLetters(currentUser["name"]);
    let initialsUpper = nameInitials.toUpperCase();
    newContact = {
      contactCreatorID: currentUser["id"],
      name: currentUser["name"],
      email: currentUser["email"],
      phone: "Edit your Number",
      initials: initialsUpper,
      initialsColor: currentUser["color"],
      contactID: 0,
    };
    currentUserContacts.push(newContact);
    await backend.setItem(
      `userID${currentUser["id"]}Contacts`,
      currentUserContacts
    );
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
function addPhoneNumber() {
  let numberInput = document.getElementById("inputNumber").value;
  let countryCode = "+49";
  let phoneNumber = numberInput.replace(/\D/g, "");
  phoneNumber = `${countryCode}${phoneNumber}`;
  phoneNumber = phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3");
  return phoneNumber;
}

async function createNewContact(event) {
  event.preventDefault();
  let nameInput = addUserName();
  let emailInput = addUserEmail();
  let numberInput = addPhoneNumber();
  let newColor = addUserColor();
  let nameInitials = getInitialLetters(nameInput);
  let initialsUpper = nameInitials.toUpperCase();
  let currentContactID = currentUserContacts.length;
  newContact = {
    contactCreatorID: currentUser["id"],
    name: nameInput,
    email: emailInput,
    phone: numberInput,
    initials: initialsUpper,
    initialsColor: newColor,
    contactID: currentContactID,
  };
  currentUserContacts.push(newContact);
  await backend.setItem(
    `userID${currentUser["id"]}Contacts`,
    currentUserContacts
  );
  closeAddNewContact();
  render();
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
      dropArea.innerHTML += `<span class="firstletter">${firstLetter}</span>`;
      currentLetter = firstLetter;
    }
    dropArea.innerHTML += `
  <div onclick="openContact(${contact.contactID})" class="contactContainer">
    <div class="contactsBubble" style="background:${contact.initialsColor};">
      <div style="color: white">${contact.initials}</div>
   </div>
   <div>
     <div>${contact.name}</div>
     <a class="lightblueColor">${contact.email}</a>
     <div>${contact.phone}</div>
     <div>contact id: ${contact.contactID}</div>
   </div>
  </div>
    `;
  }
}

function openContact(selectedID) {
  let contactContainer = document.getElementById("slideContainer");
  contactContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);

  let initialsSlides = document.getElementById("slideContactsBubble");
  initialsSlides.innerHTML = `<div style="background:${contact.initialsColor}" class="slideContactsBubble">${contact.initials}</div>`;

  let nameSlide = document.getElementById("slideName");
  nameSlide.innerHTML = `<span class="slideNameSize">${contact.name}</span>`;

  let emailSlide = document.getElementById("slideEmail");
  emailSlide.innerHTML = `<a class="lightblueColor">${contact.email}</a>`;

  let phoneSlide = document.getElementById("slidePhone");
  phoneSlide.innerHTML = `<number>${contact.phone}</number>`;

  let editSlide = document.getElementById("slideEditContact");
  editSlide.innerHTML = `
  <div onclick="openEditContact(${selectedID})"class="slideContactInfo">
    <img src="../assets/img/penEdit.svg">
    Edit Contact
  </div>`;
}

function openEditContact(editSelectedID) {
  let popupEditContainer = document.getElementById("editContactPopup");
  popupEditContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == editSelectedID);

  let nameEdit = document.getElementById("editName");
  nameEdit.value = `${contact.name}`;

  let emailEdit = document.getElementById("editEmail");
  emailEdit.value = `${contact.email}`;

  let phoneEdit = document.getElementById("editPhone");
  phoneEdit.value = `${contact.phone}`;
}

function saveEdit() {
  let nameEdit = document.getElementById("editName").value;

  let emailEdit = document.getElementById("editEmail").value;

  let phoneEdit = document.getElementById("editPhone").value;
}