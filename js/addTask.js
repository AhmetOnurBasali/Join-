let slideAssignTo = false;
let slideCategory = false;

let currentCategoryColor = [];
let displayedCategories = [];
let displayedCategoriesColor = [];

let newCreateSubtask = [];
let newSubtask = [];

let selectedContacts = [];
let allContacts = [];

async function loadTasks() {
  await downloadFromServer();
  let item = await backend.getItem("allTasks");
  if (typeof item === "string") {
    allTasks = JSON.parse(item) || [];
  } else {
    allTasks = item;
  }
}


async function createNewTask(event) {
  await proofEventAndTasksJSON(event);
  let newTask = getTaskData(newArea);
  let proof = taskProofSection(newTask);
  if (proof === true) {
    setTaskData(newTask);
  }
}


async function proofEventAndTasksJSON(event) {
  if (event) {
    event.preventDefault();
  }
  if (!allTasks) {
    allTasks = [{ id: 0, category: "Design", titleBg: "Red" }];
  }
  await downloadFromServer();
}


function getTaskData(newArea) {
  let prioNew = checkPrio();
  let currentID = allTasks.length;
  let creatorNew = currentUser["name"];
  let titleNew = document.getElementById("title").value;
  let descriptionNew = document.getElementById("description").value;
  let categoryNew = document.getElementById("selectedCategory").innerText;
  let dateNew = document.getElementById("date").value;
  newCreateSubtask = newCreateSubtask.filter(
    (subtask) => !newSubtask.includes(subtask)
  );
  return {
    creator: creatorNew,
    title: titleNew,
    description: descriptionNew,
    category: categoryNew,
    titleBg: currentCategoryColor[0],
    assignedTo: selectedContacts,
    date: dateNew,
    prio: prioNew,
    closedSubtask: newSubtask,
    openSubtask: newCreateSubtask,
    id: currentID,
    area: newArea,
  };
}


function taskProofSection(newTask) {
  let data = proofTaskData(newTask);
  let title = proofTitle(newTask);
  let description = proofDescription(newTask);
  let category = proofCategory(newTask);
  let assigned = proofAssigned(newTask);
  let date = proofDate(newTask);
  let prio = proofPrio(newTask);
  let subtask = proofSubtask(newTask);
  if (checkProofOf(data, title, description, category, assigned, date, prio, subtask) === true) {
    return true;
  }
  return false;
}


function checkProofOf(data, title, description, category, assigned, date, prio, subtask) {
  return (
    data === true &&
    title === true &&
    description === true &&
    category === true &&
    assigned === true &&
    date === true &&
    prio === true &&
    subtask === true
  );
}


function proofTaskData(newTask) {
  if (!newTask.creator) {
    // newTask.creator == "Guest User"
    alert("proof Current user");
    return false;
  }
  if (newTask.id === undefined || !newTask.area) {
    console.log("proof the id or area undefined");
    return false;
  }
  return true;
}


function proofTitle(newTask) {
  if (!newTask.title) {
    let msgBox = document.getElementById("msgBoxTitle");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofDescription(newTask) {
  if (!newTask.description) {
    let msgBox = document.getElementById("msgBoxDescription");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofCategory(newTask) {
  if (newTask.category == "select a category" || newTask.category == "" || !newTask.titleBg) {
    let msgBox = document.getElementById("msgBoxCategory");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofAssigned() {
  if (selectedContacts.length === 0) {
    let msgBox = document.getElementById("msgBoxAssigned");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofDate(newTask) {
  if (!newTask.date) {
    let msgBox = document.getElementById("msgBoxDate");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofPrio(newTask) {
  if (!newTask.prio) {
    let msgBox = document.getElementById("msgBoxPrio");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofSubtask() {
  if (newSubtask.length === 0 && newCreateSubtask.length === 0) {
    let msgBox = document.getElementById("msgBoxSubtask");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function showRequiredText(msgBox) {
  msgBox.classList.remove("d-none");
  msgBox.innerHTML = "This field is required";
}


function proofInput(id) {
  let requiredContainer = document.getElementById(id);
  if (requiredContainer.innerHTML != "") {
    requiredContainer.classList.add("d-none");
  } else {
    requiredContainer.classList.remove("d-none");
  }
}


async function setTaskData(newTask) {
  allTasks.push(newTask);
  await backend.setItem("allTasks", allTasks);
  // clearTask();
  slidePopup.classList.remove("d-none");
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 1000);
}


//Prio section//

function checkPrio() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (urgentBtn.checked === true) {
    return "Urgent";
  }
  if (mediumBtn.checked === true) {
    return "Medium";
  }
  if (lowBtn.checked === true) {
    return "Low";
  }
}

function setPrioCheckBox(prio) {
  
  if (prio === "low") {
    resetAllPrioBtn('medium', 'urgent');
    setLowPrioBtn();
  }
  if (prio === "medium") {
    resetAllPrioBtn('low', 'urgent');
    setNormalPrioBtn();
  }
  if (prio === "urgent") {
    resetAllPrioBtn('low', 'medium');
    setHighPrioBtn();
  }
}

function resetAllPrioBtn(uncheckBtn1, uncheckBtn2) {
  document.getElementById(`${uncheckBtn1}Btn`).checked = false;
  document.getElementById(`${uncheckBtn2}Btn`).checked = false;

  document.getElementById("svgLow").classList.remove("prioIconWhite");
  document.getElementById("svgNormal").classList.remove("prioIconWhite");
  document.getElementById("svgHigh").classList.remove("prioIconWhite");

  document.getElementById("lowPrioText").style = "color: black;";
  document.getElementById("normalPrioText").style = "color: black;";
  document.getElementById("highPrioText").style = "color: black;";

  document.getElementById("lowBtnContainer").classList.remove("prioLowContainerOnClick");
  document.getElementById("normalBtnContainer").classList.remove("prioNormalContainerOnClick");
  document.getElementById("highBtnContainer").classList.remove("prioHighContainerOnClick");
}




function setLowPrioBtn() {
  let lowBtn = document.getElementById("lowBtn");
    lowBtn.checked = true;
    setLowPrioSvgColor();
    setLowPrioTextColor();
    setLowPrioBtnColor();
}


function setNormalPrioBtn() {
  let mediumBtn = document.getElementById("mediumBtn");
    mediumBtn.checked = true;
    setNormalPrioSvgColor();
    setNormalPrioTextColor();
    setNormalPrioBtnColor();
}


function setHighPrioBtn() {
  let urgentBtn = document.getElementById("urgentBtn");
    urgentBtn.checked = true;
    setHighPrioSvgColor();
    setHighPrioTextColor();
    setHighPrioBtnColor();
}


function setLowPrioSvgColor() {
  let svgLowColor = document.getElementById("svgLow");
  svgLowColor.classList.add("prioIconWhite");

}


function setLowPrioTextColor() {
  let lowPrioText = document.getElementById("lowPrioText");
  lowPrioText.style = "color: white;";
}


function setLowPrioBtnColor() {
  let lowContainer = document.getElementById("lowBtnContainer");
  lowContainer.classList.add("prioLowContainerOnClick");
}

function setNormalPrioSvgColor() {
  let svgNormalColor = document.getElementById("svgNormal");
  svgNormalColor.classList.add("prioIconWhite");
}


function setNormalPrioTextColor() {
  let normalPrioText = document.getElementById("normalPrioText");
  normalPrioText.style = "color: white;";
}


function setNormalPrioBtnColor() {
  let normalBtnContainer = document.getElementById("normalBtnContainer");
  normalBtnContainer.classList.add("prioNormalContainerOnClick");
}


function setHighPrioSvgColor() {
  let svgHighColor = document.getElementById("svgHigh");
  svgHighColor.classList.add("prioIconWhite");
}


function setHighPrioTextColor() {
  let highPrioText = document.getElementById("highPrioText");
  highPrioText.style = "color: white;";
}


function setHighPrioBtnColor() {
  let highBtnContainer = document.getElementById("highBtnContainer");
  highBtnContainer.classList.add("prioHighContainerOnClick");
}


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
  let arrayCategory = document.getElementById("arrayCategory");
  let newCategory = document.getElementById("newCategory");
  let allCategorys = document.getElementById("allCategorys");
  if (slideCategory === false) {
    slideInCategory(newCategory, allCategorys, arrayCategory);
  } else {
    slideOutCategory(newCategory, allCategorys, arrayCategory);
    setTimeout(() => {
      newCategory.classList.add("d-none");
      allCategorys.classList.add("d-none");
    }, 200);
  }
}


function slideOutCategory(newCategory, allCategorys) {
  arrayCategory.classList.remove("rotateIcon");
  newCategory.classList.add("slide-out-top");
  newCategory.classList.remove("slide-in-top");
  allCategorys.classList.add("slide-out-top");
  allCategorys.classList.remove("slide-in-top");
  slideCategory = false;
}


function slideInCategory(newCategory, allCategorys) {
  newCategory.classList.remove("d-none");
  allCategorys.classList.remove("d-none");
  arrayCategory.classList.add("rotateIcon");
  newCategory.classList.remove("slide-out-top");
  newCategory.classList.add("slide-in-top");
  allCategorys.classList.remove("slide-out-top");
  allCategorys.classList.add("slide-in-top");
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
  let newCategory = document.getElementById("newCategory");
  newCategory.classList.add("d-none");
  let allCategorys = document.getElementById("allCategorys");
  allCategorys.classList.add("d-none");
  renderNewCategory();
}


function renderNewCategory() {
  let selectedCategory = document.getElementById("selectedCategory");
  selectedCategory.innerHTML = renderNewCategoryHTML();
}


async function getCategorys() {
  await proofEventAndTasksJSON();
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
  let newCategory = document.getElementById("newCategory");
  newCategory.classList.add("d-none");
  let allCategorys = document.getElementById("allCategorys");
  allCategorys.classList.add("d-none");
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
function openAssignedTo(assignedToIconID, hideBoarderID, expandContactsID, showContactsID) {
  let arrayAssigned = document.getElementById(assignedToIconID);
  arrayAssigned.classList.toggle("rotateIcon");
  if (slideAssignTo === false) {
    slideInAssignTo(hideBoarderID, expandContactsID);
    renderOpenAssignedTo(showContactsID);
    slideAssignTo = true;
  } else {
    slideOutAssignTo(hideBoarderID, expandContactsID);
  }
}


function slideOutAssignTo(hideBoarderID, expandContactsID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.add("slide-out-top");
  setTimeout(() => {
    contactList.classList.remove("slide-in-top");
    contactList.classList.toggle("d-none");
    slideAssignTo = false;
  }, 200);
}


function slideInAssignTo(hideBoarderID, expandContactsID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.remove("slide-out-top");
  contactList.classList.add("slide-in-top");
  contactList.classList.toggle("d-none");
}


function renderOpenAssignedTo(showContactsID) {
  let contacts = document.getElementById(showContactsID);
  contacts.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    checked = false;
    let assignedData = getAssignedContacts(i);
    filterRenderBubble(assignedData);
    contacts.innerHTML += renderOpenAssignedToHTML(assignedData, checked, i);
  }
}


function filterRenderBubble(assignedData) {
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


function selectContact(contactName, contactColor, contactInitials, i) {
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
  renderSelectContact();
}


function selectContactName(i) {
  let checkbox = document.getElementById(`contactCheckbox${i}`);
  checkbox.click();
}


function renderSelectContact() {
  let contactInitials = document.getElementById("contactInitials");
  contactInitials.innerHTML = ``;
  for (let i = 0; i < selectedContacts.length; i++) {
    let color = selectedContacts[i].color;
    let initials = selectedContacts[i].initial;
    contactInitials.innerHTML += renderSelectContactHTML(color, initials);
  }
}


//Subtask section//
function setNewSubtask() {
  let subtask = document.getElementById("subtask");
  let subtaskBtns = document.getElementById("subtaskInputBtnsContainer");
  if (subtask.value === "") {
    subtask.style = "background-image: url(../assets/img/plusSubtask.svg);";
    subtaskBtns.classList.add("d-none");
  } else {
    subtaskInputBtnsContainer;
    subtask.style = "background-image: url();";
    subtaskBtns.classList.remove("d-none");
  }
}


function closeNewSubtask() {
  let subtaskInput = document.getElementById("subtask");
  subtaskInput.value = "";
  setNewSubtask();
}


function acceptNewSubtask() {
  let subtaskInput = document.getElementById("subtask");
  let subtask = subtaskInput.value;
  if (subtask) {
    newCreateSubtask.push(subtask);
  }
  renderNewSubtask();
}


function renderNewSubtask() {
  let subtaskCheckboxArea = document.getElementById("subtaskCheckboxArea");
  subtaskCheckboxArea.innerHTML = "";
  for (let i = 0; i < newCreateSubtask.length; i++) {
    const subtask = newCreateSubtask[i];
    subtaskCheckboxArea.innerHTML += renderNewSubtaskHTML(subtask, i);
  }
  closeNewSubtask();
}


function checkSubtask(event, subtask) {
  let checkbox = event.target;
  if (checkbox.checked) {
    newSubtask.push(subtask);
  }
}


function checkSubtastText(i) {
  let checkbox = document.getElementById(`subtask${i}`);
  checkbox.click();
}


//clear current task//
function clearTask() {
  clearPrio();
  newCategory();
  closeNewCategory();
  closeNewSubtask();
  acceptNewSubtask();
  clearDataAndInputs();
  renderSelectContact();
  renderOpenAssignedTo();
  if (slideCategory == true) {
    openCategory();
  }
  if (slideAssignTo == true) {
    openAssignedTo();
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


//-später vllt für Task done-//
//async function deleteCategory(c) {
//  let categorys = await backend.getItem("allTasks");
//  if (typeof categorys === "string") {
//    categorys = JSON.parse(categorys);
//  }
//  categorys.splice(c, 1);
//  await backend.setItem("allTasks", JSON.stringify(categorys));
//  renderCategorys();
//}
