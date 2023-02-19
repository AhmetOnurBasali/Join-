let currentUserContacts = [];
let currentSelectedID = [];

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

async function createNewContact(event) {
  event.preventDefault();
  let nameInput = tryGetName();
  let emailInput = tryGetEmail();
  let numberInput = tryGetPhone();
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
  if (proofEmail(emailInput) === true && proofName(nameInput) === true) {
    currentUserContacts.push(newContact);
    await backend.setItem(
      `userID${currentUser["id"]}Contacts`,
      currentUserContacts
    );
    closeAddNewContact();
    render();
  }
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
  <div onclick="openContact(${contact.contactID})" id="contactContainer${contact.contactID}" class="contactContainer contactContainerhover">
    <div class="contactsBubble" style="background:${contact.initialsColor};">
      <div style="color: white">${contact.initials}</div>
   </div>
   <div>
     <div class="contactName">${contact.name}</div>
     <a class="lightblueColor">${contact.email}</a>
   </div>
  </div>
    `;
  }
}

function removeFocus(selectedID) {
  document.getElementById(`contactContainer${selectedID}`).focus();
  document.getElementById(`contactContainer${selectedID}`).classList.toggle("focusContact");
  document.getElementById(`contactContainer${selectedID}`).classList.toggle("contactContainerhover");
}

function openContact(selectedID) {
  let contactContainer = document.getElementById("slideContainer");
  contactContainer.classList.remove("d-none");

  document.getElementById(`contactContainer${selectedID}`).focus();
  document.getElementById(`contactContainer${selectedID}`).classList.add("focusContact");
  document.getElementById(`contactContainer${selectedID}`).classList.remove("contactContainerhover");


  let contact = currentUserContacts.find((u) => u.contactID == selectedID);

  let initialsSlides = document.getElementById("slideContactsBubble");
  initialsSlides.innerHTML = `<div style="background:${contact.initialsColor}" class="slideContactsBubble">${contact.initials}</div>`;

  let nameSlide = document.getElementById("slideName");
  nameSlide.innerHTML = `<span class="slideNameSize">${contact.name}</span>`;

  let emailSlide = document.getElementById("slideEmail");
  emailSlide.innerHTML = `<a class="lightblueColor">${contact.email}</a>`;

  let phoneSlide = document.getElementById("slidePhone");
  phoneSlide.innerHTML = `<number>+${contact.phone}</number>`;

  let editSlide = document.getElementById("slideEditContact");
  editSlide.innerHTML = `
  <div onclick="openEditContact(${selectedID})"class="slideContactInfo">
    <img src="../assets/img/penEdit.svg">
    Edit Contact
  </div>`;
}

function openEditContact(selectedID) {
  let popupEditContainer = document.getElementById("editContactPopup");
  popupEditContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);

  let contactBubble = document.getElementById("bubbleInEditSection");
  contactBubble.innerHTML = `<div><div style="background:${contact.initialsColor}" class="slideContactsBubble">${contact.initials}</div>`;

  let nameEdit = document.getElementById("editName");
  nameEdit.value = `${contact.name}`;

  let emailEdit = document.getElementById("editEmail");
  emailEdit.value = `${contact.email}`;

  let phoneEdit = document.getElementById("editPhone");
  let formatedNumber =
    currentUserContacts[selectedID]["phone"].split(" ")[0] +
    currentUserContacts[selectedID]["phone"].split(" ")[1];
  phoneEdit.value = `${formatedNumber}`;
  setTimeout(() => {
    phoneEdit.type = "number";
  }, 100);
  currentSelectedID.push(selectedID);
}

async function saveEdit(event) {
  event.preventDefault();
  let id = currentSelectedID;
  let nameEdit = tryGetName();
  currentUserContacts[id]["name"] = nameEdit;
  let emailEdit = tryGetEmail();
  currentUserContacts[id]["email"] = emailEdit;
  let phoneEdit = tryGetPhone();
  currentUserContacts[id]["phone"] = phoneEdit;
  let nameInitials = getInitialLetters(nameEdit);
  let initialsUpper = nameInitials.toUpperCase();
  currentUserContacts[id]["initials"] = initialsUpper;

  if (proofEditName() === true && proofEditEmail() === true) {
    await backend.setItem(
      `userID${currentUser["id"]}Contacts`,
      currentUserContacts
    );
  }
}

function tryGetEmail() {
  let newEmail = document.getElementById("email").value;
  addContactEmail(newEmail);
  if (newEmail === "") {
    let nameEdit = document.getElementById("editEmail").value;
    addContactEmail(nameEdit);
    return nameEdit;
  } else {
    return newEmail;
  }
}

function addContactEmail(email) {
  let newEmail = email.replace(/^\w/, (c) => c.toUpperCase());
  let emailRegex = getEmailRegEx();
  if (!emailRegex.test(newEmail)) {
    proofEmail();
    return;
  } else {
    return newEmail;
  }
}

function tryGetPhone() {
  let newPhone = document.getElementById("phone").value;
  let newNumber = setPhoneNumber(newPhone);
  if (newPhone === "" || newNumber === newPhone) {
    let phoneEdit = document.getElementById("editPhone").value;
    let editNumber = setPhoneNumber(phoneEdit);
    return editNumber;
  } else {
    return newNumber;
  }
}

function setPhoneNumber(numberInput) {
  let phoneNumber = numberInput.replace(/\D/g, "");
  phoneNumber = `${phoneNumber}`;
  phoneNumber = phoneNumber.replace(/(\d{4})(\d{7})/, "$1 $2");
  return phoneNumber;
}

function tryGetName() {
  let name = document.getElementById("name").value.toLowerCase();
  let newName = addContactName(name);
  if (name === "" || newName === name) {
    let nameEdit = document.getElementById("editName").value.toLowerCase();
    let editName = addContactName(nameEdit);
    return editName;
  } else {
    return newName;
  }
}

function addContactName(name) {
  let newName = name.replace(/\b\w/g, (l) => l.toUpperCase());
  return newName;
}

function proofEditName() {
  let regName = /^[\wäöüÄÖÜ]+(?: [\wäöüÄÖÜ]+)+$/;
  let name = document.getElementById("editName").value;
  if (!regName.test(name)) {
    document.getElementById("editName").focus();
    document.getElementById("editName").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("editName").classList.remove("falseInput");
    return true;
  }
}

function proofEditEmail() {
  let regEmail = getEmailRegEx();
  let email = document.getElementById("editEmail").value;
  if (!regEmail.test(email)) {
    document.getElementById("editEmail").focus();
    document.getElementById("editEmail").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("editEmail").classList.remove("falseInput");
    return true;
  }
}

function clearContactsInputs() {
  let name = document.getElementById("name");
  name.value = "";
  let email = document.getElementById("email");
  email.value = "";
  let phone = document.getElementById("phone");
  phone.value = "";
}