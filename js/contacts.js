let currentUserContacts = [];
let currentSelectedID = [];
let previousID = null;

async function loadContactsData() {
  await downloadFromServer();
  let item = await backend.getItem(`userID${currentUser["id"]}Contacts`);
  currentUserContacts = item || [];
  await proofContactsAvailable();
  renderContacts();
}

async function proofContactsAvailable() {
  let contact;
  if (noContacts() === true) {
    let newContact = getCurrentUserData(contact)
    setCurrentUserData(newContact)
  }
}


function noContacts() {
  if (currentUserContacts == null || currentUserContacts.length == 0 || currentUserContacts == undefined) {
    return true
  } else {
    return false
  }
}


function getCurrentUserData() {
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
  return newContact
}


async function setCurrentUserData(newContact) {
  currentUserContacts.push(newContact);
  await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
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
  let currentContactID = currentUserContacts.length;
  let data = { nameInput, emailInput, numberInput, newColor, nameInitials, currentContactID }
  let newContact = makeDataToContact(data)
  if (proofEmail(emailInput) === true && proofName(nameInput) === true && numberInput.length > 5 && numberInput.length < 16) {
    setNewContact(newContact)
  }
}


function makeDataToContact(data) {
  newContact = {
    contactCreatorID: currentUser["id"],
    name: data.nameInput,
    email: data.emailInput,
    phone: data.numberInput,
    initials: data.nameInitials,
    initialsColor: data.newColor,
    contactID: data.currentContactID,
  };
  return newContact
}


async function setNewContact(newContact) {
  currentUserContacts.push(newContact);
  await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
  location.reload();
}


function renderContacts() {
  sortContacts()
  let dropArea = document.getElementById("contactsArea");
  dropArea.innerHTML = "";
  let currentLetter = "";
  for (let i = 0; i < currentUserContacts.length; i++) {
    const contact = currentUserContacts[i];
    let firstLetter = contact.name[0].toUpperCase();
    if (firstLetter !== currentLetter) {
      dropArea.innerHTML += `<span class="firstletter">${firstLetter}</span>`;
      currentLetter = firstLetter;
    }
    dropArea.innerHTML += renderContactsHTML(contact);
  }
}


function sortContacts() {
  currentUserContacts.sort((a, b) => {
    if (a.contactID === 0) return -1;
    if (b.contactID === 0) return 1;
    return a.name.localeCompare(b.name);
  });
}


function openContact(selectedID) {
  setFocus(selectedID);
  let contactContainer = document.getElementById("slideContainer");
  contactContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);
  renderSelectedContact(contact, selectedID);
}


function setFocus(selectedID) {
  document.getElementById(`contactContainer${selectedID}`).focus();
  document.getElementById(`contactContainer${selectedID}`).classList.add("focusContact");
  document.getElementById(`contactContainer${selectedID}`).classList.remove("contactContainerhover");
  document.getElementById(`contactBubble${selectedID}`).focus();
  document.getElementById(`contactBubble${selectedID}`).classList.add("contactsBubbleBorder");
  if (previousID !== null && previousID !== selectedID) {
    document.getElementById(`contactContainer${previousID}`).classList.remove("focusContact");
    document.getElementById(`contactContainer${previousID}`).classList.add("contactContainerhover");
    document.getElementById(`contactBubble${previousID}`).classList.remove("contactsBubbleBorder");
  }
  previousID = selectedID;
}


function renderSelectedContact(contact, selectedID) {
  let initialsSlides = document.getElementById("slideContactsBubble");
  let nameSlide = document.getElementById("slideName");
  let emailSlide = document.getElementById("slideEmail");
  let phoneSlide = document.getElementById("slidePhone");
  let editSlide = document.getElementById("slideEditContact");
  phoneSlide.innerHTML = `<number>+${contact.phone}</number>`;
  emailSlide.innerHTML = `<a class="lightblueColor">${contact.email}</a>`;
  nameSlide.innerHTML = `<span class="slideNameSize">${contact.name}</span>`;
  initialsSlides.innerHTML = `<div style="background:${contact.initialsColor}" class="slideContactsBubble">${contact.initials}</div>`;
  editSlide.innerHTML = renderContactAddTaskHTML(selectedID)
}


function openEditContact(selectedID) {
  let popupEditContainer = document.getElementById("editContactPopup");
  popupEditContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);
  loadCurrentDataContactEdit(contact, selectedID)
}


function loadCurrentDataContactEdit(contact, selectedID) {
  let contactBubble = document.getElementById("bubbleInEditSection");
  let emailEdit = document.getElementById("editEmail");
  let phoneEdit = document.getElementById("editPhone");
  let nameEdit = document.getElementById("editName");
  nameEdit.value = `${contact.name}`
  emailEdit.value = `${contact.email}`;
  let formatedNumber = contact.phone.split(" ")[0] + contact.phone.split(" ")[1];
  phoneEdit.value = `${formatedNumber}`;
  contactBubble.innerHTML = `<div style="background:${contact.initialsColor}" class="slideContactsBubble">${contact.initials}</div>`;
  setTimeout(() => { phoneEdit.type = "number"; }, 100);
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
  currentUserContacts[id]["initials"] = nameInitials;
  if (proofEditName() === true && proofEditEmail() === true && phoneEdit.length > 5 && phoneEdit.length < 16) {
    await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
    location.reload();
  }
}


function tryGetEmail() {
  let newEmail = document.getElementById("email").value.toLowerCase();
  addContactEmail(newEmail);
  if (newEmail === "") {
    let nameEdit = document.getElementById("editEmail").value.toLowerCase();
    addContactEmail(nameEdit);
    return nameEdit;
  } else {
    return newEmail;
  }
}


function addContactEmail(email) {
  let newEmail = email;
  let emailRegex = getEmailRegEx(newEmail);
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
  if (newPhone === "" || newNumber == newPhone) {
    let phoneEdit = document.getElementById("editPhone").value;
    let editNumber = setPhoneNumber(phoneEdit);
    return editNumber;
  }
  if (newPhone.length < 4) {
    return false;
  } else {
    return newNumber;
  }
}


function setPhoneNumber(numberInput) {
  let phoneNumber = numberInput.replace(/\D/g, "");
  phoneNumber = `${phoneNumber}`;
  phoneNumber = phoneNumber.replace(/(\d{4})(\d{1})/, "$1 $2");
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


function proofPhone(id) {
  const phoneInput = document.getElementById(id);
  const phoneError = document.getElementById("phoneError");
  if (phoneInput.value.length < 5) {
    setMinTextForInput(id, phoneError)
    return false;
  } else if (phoneInput.value.length > 14) {
    setMaxTextForInput(id, phoneError)
    return false;
  } else {
    setNoneTextForInput(id, phoneError)
    return true;
  }
}


function setMinTextForInput(id, phoneError) {
  document.getElementById(id).focus();
  document.getElementById(id).classList.add("falseInput");
  phoneError.innerText = "Phone number min 5 Numbers";
}


function setMaxTextForInput(id, phoneError) {
  document.getElementById(id).focus();
  document.getElementById(id).classList.add("falseInput");
  phoneError.innerText = "Phone number max 15 Numbers";
}


function setNoneTextForInput(id, phoneError) {
  phoneError.innerText = "";
  document.getElementById(id).classList.remove("falseInput");
}


function clearContactsInputs() {
  let name = document.getElementById("name");
  name.value = "";
  let email = document.getElementById("email");
  email.value = "";
  let phone = document.getElementById("phone");
  phone.value = "";
}