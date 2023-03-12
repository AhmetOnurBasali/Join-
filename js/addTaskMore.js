//category section//
async function loadCategory() {
  await downloadFromServer();
  let item = await backend.getItem("categorys");
  if (typeof item === "string") {
    categorys = JSON.parse(item) || [];
  } else {
    categorys = item;
  }
}


async function openCategory() {
  let openCategory = document.getElementById("categoryIsOpen");
  openCategory.classList.remove("openCategory");
  openCategory.classList.add("categoryIsOpen");
  let selectedCategory = document.getElementById("selectedCategory");
  selectedCategory.classList.add("selectedCategoryTextOpen");
  selectedCategory.innerHTML = "select a category";
  toggleOpenFunction();
  getCategorys();
}


function toggleOpenFunction() {
  if (slideCategory === false) {
    slideOutCategory();
  } else {
    slideInCategory();
    document.getElementById('category-anim').classList.add("d-none");

  }
}


function slideInCategory() {
  arrayCategory.classList.remove("rotateIcon");
  document.getElementById('category-anim').classList.add("slide-in-top");
  document.getElementById('category-anim').classList.remove("slide-out-top");
  document.getElementById('categoryIsOpen').classList.remove('noneBottomBorder');
  slideCategory = false;
}


function slideOutCategory() {
  document.getElementById('category-anim').classList.remove("d-none");
  arrayCategory.classList.add("rotateIcon");
  document.getElementById('category-anim').classList.remove("slide-in-top");
  document.getElementById('category-anim').classList.add("slide-out-top");
  document.getElementById('categoryIsOpen').classList.add('noneBottomBorder');
  slideCategory = true;
}


function newCategory() {
  let openCategory = document.getElementById("openCategoryContainer");
  openCategory.classList.add("d-none");
  let createCategory = document.getElementById("createCategory");
  createCategory.classList.remove("d-none");
  let createCategoryContainer = document.getElementById(
    "createCategoryContainer"
  );
  createCategoryContainer.classList.remove("d-none");
}


function closeNewCategory() {
  let openCategorys = document.getElementById("openCategoryContainer");
  openCategorys.classList.remove("d-none");
  let createCategory = document.getElementById("createCategoryContainer");
  createCategory.classList.add("d-none");

}


async function setNewCategory() {
  let arrayCategory = document.getElementById("arrayCategory");
  arrayCategory.classList.remove("rotateIcon");
  let categoryContainer = document.getElementById("createCategoryContainer");
  categoryContainer.classList.add("d-none");
  let openCategorys = document.getElementById("openCategoryContainer");
  openCategorys.classList.remove("d-none");
  document.getElementById('category-anim').classList.add("d-none");
  document.getElementById('categoryIsOpen').classList.remove('noneBottomBorder');
  renderNewCategory();
}


function renderNewCategory() {
  let selectedCategory = document.getElementById("selectedCategory");
  selectedCategory.innerHTML = renderNewCategoryHTML();
}


async function getCategorys() {
  await proofAndSetTasks();
  let allCategorys = document.getElementById(`allCategorys`);
  allCategorys.innerHTML = "";
  for (let i = 0; i < allTasks.length; i++) {
    let taskCategory = allTasks[i].category;
    let taskColor = allTasks[i].titleBg;
    indexOfCategory(taskCategory, taskColor);
  }
  renderCategorys();
}


function renderCategorys() {
  for (let c = 0; c < displayedCategories.length; c++) {
    const element = displayedCategories[c];
    let category = element;
    let color = displayedCategoriesColor[c];
    allCategorys.innerHTML += renderCategorysHTML(c, category, color);
  }
}


function indexOfCategory(taskCategory, taskColor) {
  if (displayedCategories.indexOf(taskCategory) === -1) {
    displayedCategories.push(taskCategory);
    displayedCategoriesColor.push(taskColor);
  }
}


function chooseCategory(category, color) {
  let arrayCategory = document.getElementById("arrayCategory");
  document.getElementById('categoryIsOpen').classList.remove('noneBottomBorder');
  arrayCategory.classList.remove("rotateIcon");
  let selectedCategory = document.getElementById("selectedCategory");
  selectedCategory.innerHTML = chooseCategoryHTML(category, color);
  setOldCategory(category, color);
  renderOldCategory(category, color);
}


function setOldCategory() {
  let createCategory = document.getElementById("createCategory");
  createCategory.classList.add("d-none");
  let categoryContainer = document.getElementById("createCategoryContainer");
  categoryContainer.classList.add("d-none");
  let openCategorys = document.getElementById("openCategoryContainer");
  openCategorys.classList.remove("d-none");
  document.getElementById('category-anim').classList.add("d-none");
}


function renderOldCategory(category, color) {
  currentCategoryColor.push(color);
  let selectedCategory = document.getElementById("selectedCategory");
  selectedCategory.innerHTML = renderOldCategoryHTML(category, color);
}


function setColor(color) {
  clearColors(color);
  let selectColor = document.getElementById("category" + color);
  selectColor.style.border = "2px solid " + color;
  let dropColorContainer = document.getElementById("dropColorContainer");
  dropColorContainer.innerHTML = `<div style="border: 2px solid ${color};cursor:auto" class="colorCategory${color}"></div>`;
  currentCategoryColor.push(color);
}


function clearColors(color) {
  let colorSelection = document.querySelectorAll(".colorCategoryContainer div");
  for (let i = 0; i < colorSelection.length; i++) {
    colorSelection[i].style.border = "";
  }
  currentCategoryColor.splice(color);
}


function dropColorInInput() {
  let categoryInput = document.getElementById("createCategory");
  let dropColorContainer = document.getElementById("dropColorContainer");
  if (categoryInput.value == "") {
    dropColorContainer.classList.add("d-none");
  } else {
    dropColorContainer.classList.remove("d-none");
  }
}


//Assigned to section//
function openAssignedTo(assignedToIconID, hideBoarderID, expandContactsID, showContactsID, contactInitialsID, assignedToID) {
  let arrayAssigned = document.getElementById(assignedToIconID);
  let inputContainer = document.getElementById(assignedToID);
  arrayAssigned.classList.toggle("rotateIcon");
  if (slideAssignTo === false) {
    inputContainer.classList.add('responsiveAssigned');
    slideOutAssignedTo(hideBoarderID, expandContactsID, assignedToID);
    renderOpenAssignedTo(showContactsID, contactInitialsID);
    slideAssignTo = true;
  } else {
    inputContainer.classList.remove('responsiveAssigned');
    slideInAssignedTo(hideBoarderID, expandContactsID, assignedToID);
  }
}


function slideInAssignedTo(hideBoarderID, expandContactsID, assignedToID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.add("slide-in-top");
  contactList.classList.remove("slide-out-top");
  contactList.classList.toggle("d-none");
  slideAssignTo = false;
  assignedToBlockShiftIn(assignedToID);
}


function assignedToBlockShiftIn(inputID) {
  document.getElementById(inputID).style.marginBottom = '10px';
}


function slideOutAssignedTo(hideBoarderID, expandContactsID, assignedToID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.remove("slide-in-top");
  contactList.classList.add("slide-out-top");
  contactList.classList.toggle("d-none");
  assignedToBlockShiftOut(assignedToID);
}


function assignedToBlockShiftOut(inputID) {
  if (users.length === 1) {
    document.getElementById(inputID).style.marginBottom = '-25px';
  } else if (users.length === 2) {
    document.getElementById(inputID).style.marginBottom = '-59px';
  } else if (users.length === 3) {
    document.getElementById(inputID).style.marginBottom = '-93px';
  } else if (users.length === 4) {
    document.getElementById(inputID).style.marginBottom = '-127px';
  } else if (users.length >= 5) {
    document.getElementById(inputID).style.marginBottom = '-131px';
  }
}


function renderOpenAssignedTo(showContactsID, contactInitialsID) {
  let contacts = document.getElementById(showContactsID);
  contacts.innerHTML = "";
  let idHash = {};
  for (let i = 0; i < users.length; i++) {
    checked = false;
    let assignedData = getAssignedContacts(i);
    filterRenderBubble(assignedData, contactInitialsID);
    if (!idHash[users[i]['id']]) {
      contacts.innerHTML += renderOpenAssignedToHTML(assignedData, checked, i, contactInitialsID);
      idHash[users[i]['id']] = true;
    }
  }
}


function filterRenderBubble(assignedData, contactInitialsID) {
  if (contactInitialsID === 'contactInitialsEdit') {
    selectedContacts = allTasks[currentTaskID].assignedTo;
  }
  for (let j = 0; j < selectedContacts.length; j++) {
    if (selectedContacts[j].name === assignedData.contactName) {
      checked = true;
      break;
    }
  }
}


function getAssignedContacts(i) {
  let contactName = users[i].name;
  let contactColor = users[i].color;
  let contactInitials = users[i].initialLetters;
  return { contactName, contactColor, contactInitials };
}


function selectContact(contactName, contactColor, contactInitials, i, contactInitialsID) {
  let checkbox = document.getElementById(`contactCheckbox${i}`);
  if (checkbox.checked) {
    let contact = {
      name: contactName,
      color: contactColor,
      initial: contactInitials,
    };
    selectedContacts.push(contact);
  } else {
    selectedContacts = selectedContacts.filter(
      (contact) => contact.name !== contactName
    );
  }
  renderSelectContact(contactInitialsID);
}


function selectContactName(i) {
  let checkbox = document.getElementById(`contactCheckbox${i}`);
  checkbox.click();
}


function renderSelectContact(contactInitialsID) {
  let contactInitials = document.getElementById(contactInitialsID);
  contactInitials.innerHTML = ``;
  for (let i = 0; i < selectedContacts.length; i++) {
    let color = selectedContacts[i].color;
    let initialLetters = selectedContacts[i].initial;
    contactInitials.innerHTML += renderSelectContactHTML(color, initialLetters);
  }
}



//clear current task//
function clearTask() {
  clearPrio();
  newCategory();
  closeNewCategory();
  closeNewSubtask();
  acceptNewSubtask();
  clearDataAndInputs();
  let bubbles = document.getElementById('contactInitials')
  bubbles.innerHTML = ""
  if (slideCategory == true) {
    openCategory();
  }
  if (slideAssignTo == true) {
    contactDiv.click();
  }
}


function clearDataAndInputs() {
  let titleInput = document.getElementById("title");
  let descriptionInput = document.getElementById("description");
  let categoryInput = document.getElementById("createCategory");
  let dateInput = document.getElementById("date");
  newSubtask = [];
  newCreateSubtask = [];
  selectedContacts = [];
  titleInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
}


function clearPrio() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  urgentBtn.checked = false;
  mediumBtn.checked = false;
  lowBtn.checked = false;
  clearPrioText();
  clearPrioBtnWhite();
  clearPrioSVG();
}


function clearPrioText() {
  let lowPrioText = document.getElementById("lowPrioText");
  let normalPrioText = document.getElementById("normalPrioText");
  let highPrioText = document.getElementById("highPrioText");
  lowPrioText.style = "color: black;";
  normalPrioText.style = "color: black;";
  highPrioText.style = "color: black;";
}


function clearPrioBtnWhite() {
  let highBtnContainer = document.getElementById("highBtnContainer");
  let normalBtnContainer = document.getElementById("normalBtnContainer");
  let lowContainer = document.getElementById("lowBtnContainer");
  lowContainer.classList.remove("prioLowContainerOnClick");
  highBtnContainer.classList.remove("prioHighContainerOnClick");
  normalBtnContainer.classList.remove("prioNormalContainerOnClick");
}


function clearPrioSVG() {
  let svgLowColor = document.getElementById("svgLow");
  let svgNormalColor = document.getElementById("svgNormal");
  let svgHighColor = document.getElementById("svgHigh");
  svgLowColor.classList.remove("prioIconWhite");
  svgNormalColor.classList.remove("prioIconWhite");
  svgHighColor.classList.remove("prioIconWhite");
}


function openAddTask() {
  document.getElementById("addTask").innerHTML = addTaskHTML();
}