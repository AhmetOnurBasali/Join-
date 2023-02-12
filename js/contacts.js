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

function createNewContact(event) {
  event.preventDefault();
  let nameInput = document.getElementById("inputName").value;
  let emailInput = document.getElementById("inputEmail").value;
  let numberInput = document.getElementById("inputNumber").value;
  console.log(nameInput, emailInput, numberInput);
  console.log(currentUser);
  let currentUserContacts = {
    contactCreatorID: currentUser['id'],
    name:nameInput,
    email:emailInput,
    phone:numberInput
  }
  console.log(currentUserContacts);
}
