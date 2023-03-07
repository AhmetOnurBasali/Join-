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
  let newTask = getTaskData();
  let proof = taskProofSection(newTask);
  if (proof === true) {
    await setTaskData(newTask);
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


function getTaskData() {
  let prioNew = checkPrio('');
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
  let title = proofTitle(newTask, "Task");
  let description = proofDescription(newTask, "Task");
  let category = proofCategory(newTask, "Task");
  let assigned = proofAssigned(newTask, "Task");
  let date = proofDate(newTask, "Task");
  let prio = proofPrio(newTask, "Task");
  let subtask = true;
  if (checkProofOf(data, title, description, category, assigned, date, prio, subtask) === true) {
    return true;
  }
  return false;
}


function checkProofOf(data, title, description, category, assigned, date, prio, subtask) {
  return (data === true && title === true && description === true && category === true &&
    assigned === true && date === true && prio === true && subtask === true);
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


function proofTitle(newTask, Edit) {
  if (!newTask.title) {
    let msgBox = document.getElementById(`msgBoxTitle${Edit}`);
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofDescription(newTask, Edit) {
  if (!newTask.description) {
    let msgBox = document.getElementById(`msgBoxDescription${Edit}`);
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofCategory(newTask, Edit) {
  if (newTask.category == "select a category" || newTask.category == "" || !newTask.titleBg) {
    let msgBox = document.getElementById(`msgBoxCategory${Edit}`);
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofAssigned() {
  if (selectedContacts.length === 0) {
    let msgBox = document.getElementById("msgBoxAssignedTask");
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofDate(newTask, Edit) {
  if (!newTask.date) {
    let msgBox = document.getElementById(`msgBoxDate${Edit}`);
    showRequiredText(msgBox);
    return false;
  }
  return true;
}


function proofPrio(newTask, Edit) {
  if (!newTask.prio) {
    let msgBox = document.getElementById(`msgBoxPrio${Edit}`);
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

async function loadTasks2() {
  await downloadFromServer();
  let item = await backend.getItem("allTasks");
  if (item != null) {
    allTasks = JSON.parse(item);
  }
}

async function setTaskData(newTask) {
  await loadTasks2();
  allTasks.push(newTask);
  await backend.setItem("allTasks", allTasks);
  slidePopup.classList.remove("d-none");
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 1000);
}


//Prio section//

function checkPrio(edit) {
  let urgentBtn = document.getElementById(`urgentBtn${edit}`);
  let mediumBtn = document.getElementById(`mediumBtn${edit}`);
  let lowBtn = document.getElementById(`lowBtn${edit}`);
  if (urgentBtn.checked === true) {
    return "urgent";
  }
  if (mediumBtn.checked === true) {
    return "medium";
  }
  if (lowBtn.checked === true) {
    return "low";
  }
}

function setPrioCheckBox(prio, taskEdit) {
  if (prio === "low") {
    resetAllPrioBtn('medium', 'urgent', taskEdit);
    setLowPrioBtn(taskEdit);
  }
  if (prio === "medium") {
    resetAllPrioBtn('low', 'urgent', taskEdit);
    setNormalPrioBtn(taskEdit);
  }
  if (prio === "urgent") {
    resetAllPrioBtn('low', 'medium', taskEdit);
    setHighPrioBtn(taskEdit);
  }
}

function resetAllPrioBtn(uncheckBtn1, uncheckBtn2, taskEdit) {
  document.getElementById(`${uncheckBtn1}Btn`).checked = false;
  document.getElementById(`${uncheckBtn2}Btn`).checked = false;

  document.getElementById(`svgLow${taskEdit}`).classList.remove("prioIconWhite");
  document.getElementById(`svgNormal${taskEdit}`).classList.remove("prioIconWhite");
  document.getElementById(`svgHigh${taskEdit}`).classList.remove("prioIconWhite");

  document.getElementById(`lowPrioText${taskEdit}`).style = "color: black;";
  document.getElementById(`normalPrioText${taskEdit}`).style = "color: black;";
  document.getElementById(`highPrioText${taskEdit}`).style = "color: black;";

  document.getElementById(`lowBtnContainer${taskEdit}`).classList.remove("prioLowContainerOnClick");
  document.getElementById(`normalBtnContainer${taskEdit}`).classList.remove("prioNormalContainerOnClick");
  document.getElementById(`highBtnContainer${taskEdit}`).classList.remove("prioHighContainerOnClick");
}


function setLowPrioBtn(taskEdit) {
  let lowBtn = document.getElementById(`lowBtn${taskEdit}`);
  lowBtn.checked = true;
  setLowPrioSvgColor(taskEdit);
  setLowPrioTextColor(taskEdit);
  setLowPrioBtnColor(taskEdit);
}


function setNormalPrioBtn(taskEdit) {
  let mediumBtn = document.getElementById(`mediumBtn${taskEdit}`);
  mediumBtn.checked = true;
  setNormalPrioSvgColor(taskEdit);
  setNormalPrioTextColor(taskEdit);
  setNormalPrioBtnColor(taskEdit);
}


function setHighPrioBtn(taskEdit) {
  let urgentBtn = document.getElementById(`urgentBtn${taskEdit}`);
  urgentBtn.checked = true;
  setHighPrioSvgColor(taskEdit);
  setHighPrioTextColor(taskEdit);
  setHighPrioBtnColor(taskEdit);
}


function setLowPrioSvgColor(taskEdit) {
  let svgLowColor = document.getElementById(`svgLow${taskEdit}`);
  svgLowColor.classList.add("prioIconWhite");
}


function setLowPrioTextColor(taskEdit) {
  let lowPrioText = document.getElementById(`lowPrioText${taskEdit}`);
  lowPrioText.style = "color: white;";
}


function setLowPrioBtnColor(taskEdit) {
  let lowContainer = document.getElementById(`lowBtnContainer${taskEdit}`);
  lowContainer.classList.add("prioLowContainerOnClick");
}

function setNormalPrioSvgColor(taskEdit) {
  let svgNormalColor = document.getElementById(`svgNormal${taskEdit}`);
  svgNormalColor.classList.add("prioIconWhite");
}


function setNormalPrioTextColor(taskEdit) {
  let normalPrioText = document.getElementById(`normalPrioText${taskEdit}`);
  normalPrioText.style = "color: white;";
}


function setNormalPrioBtnColor(taskEdit) {
  let normalBtnContainer = document.getElementById(`normalBtnContainer${taskEdit}`);
  normalBtnContainer.classList.add("prioNormalContainerOnClick");
}


function setHighPrioSvgColor(taskEdit) {
  let svgHighColor = document.getElementById(`svgHigh${taskEdit}`);
  svgHighColor.classList.add("prioIconWhite");
}


function setHighPrioTextColor(taskEdit) {
  let highPrioText = document.getElementById(`highPrioText${taskEdit}`);
  highPrioText.style = "color: white;";
}


function setHighPrioBtnColor(taskEdit) {
  let highBtnContainer = document.getElementById(`highBtnContainer${taskEdit}`);
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
function openAssignedTo(assignedToIconID, hideBoarderID, expandContactsID, showContactsID, contactInitialsID) {
  let arrayAssigned = document.getElementById(assignedToIconID);
  let inputContainer = document.getElementById("inputContainer");
  arrayAssigned.classList.toggle("rotateIcon");
  if (slideAssignTo === false) {
    inputContainer.classList.add('responsiveAssigned')
    slideOutAssignedTo(hideBoarderID, expandContactsID);
    renderOpenAssignedTo(showContactsID, contactInitialsID);
    slideAssignTo = true;
  } else {
    inputContainer.classList.remove('responsiveAssigned')
    slideInAssignedTo(hideBoarderID, expandContactsID);
  }

}


function slideInAssignedTo(hideBoarderID, expandContactsID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.add("slide-in-top");
  contactList.classList.remove("slide-out-top");
  contactList.classList.toggle("d-none");
  slideAssignTo = false;
  if (hideBoarderID === 'contactDivEdit') {
    assignedToBlockShiftIn('input-container');
  }
  if (hideBoarderID === 'contactDiv') {
    assignedToBlockShiftIn('inputContainer');
  }



}

function assignedToBlockShiftIn(inputID) {
  document.getElementById(inputID).style.marginBottom = '10px';
}


function slideOutAssignedTo(hideBoarderID, expandContactsID) {
  let contactDiv = document.getElementById(hideBoarderID);
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById(expandContactsID);
  contactList.classList.remove("slide-in-top");
  contactList.classList.add("slide-out-top");
  contactList.classList.toggle("d-none");
  if (hideBoarderID === 'contactDivEdit') {
    assignedToBlockShiftOut('input-container');
  }
  if (hideBoarderID === 'contactDiv') {
    assignedToBlockShiftOut('inputContainer');
  }
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