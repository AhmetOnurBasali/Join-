let slideAssignTo = false;
let slideCategory = false;

let currentCategoryColor = [];

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

async function createNewTask(newAera, event) {
  await proofEventAndTasksJSON(event);
  let newTask = getTaskData(newAera);
  let proof = proofInputs(newTask);
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

function getTaskData(newAera) {
  let prioNew = checkPrio();
  let currentID = allTasks.length;
  let creatorNew = currentUser["name"];
  let titleNew = document.getElementById("title").value;
  let descriptionNew = document.getElementById("description").value;
  let categoryNew = document.getElementById("selectedCategory").innerText;
  let dateNew = document.getElementById("date").value;
  // let subtaskNew = document.getElementById("subtask").value;
  return {
    creator: creatorNew,
    title: titleNew,
    description: descriptionNew,
    category: categoryNew,
    titleBg: currentCategoryColor[0],
    assignedTo: selectedContacts,
    date: dateNew,
    prio: prioNew,
    subtask: newSubtask,
    id: currentID,
    area: newAera,
  };
}

function proofInputs(newTask) {
  if (
    !newTask.prio ||
    newTask.category == "select a category" ||
    newTask.category == ""
  ) {
    console.log("proof Prio btn or category");
    return false;
  }
  if (!newTask.creator || !newTask.title || !newTask.description) {
    // newTask.creator == "Guest User"
    console.log("proof creator");
    return false;
  }
  if (
    selectedContacts.length === 0 ||
    !newTask.date ||
    newSubtask.length === 0
  ) {
    console.log("proof assignedTo, subtask");
    return false;
  }
  if (newTask.id === undefined || !newTask.area || !newTask.titleBg) {
    console.log("proof id, area or titleBg");
    return false;
  }
  return true;
}

async function setTaskData(newTask) {
  allTasks.push(newTask);
  await backend.setItem("allTasks", allTasks);
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 1000);
}

//Prio section//

function setPrioCheckBox(prio) {
  if (prio === "low") {
    setLowPrioBtn();
  }
  if (prio === "normal") {
    setNormalPrioBtn();
  }
  if (prio === "high") {
    setHighPrioBtn();
  }
}

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

function setLowPrioBtn() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (lowBtn.checked) {
    lowBtn.checked = true;
    mediumBtn.checked = false;
    urgentBtn.checked = false;
    setLowPrioSvgColor();
    setLowPrioTextColor();
    setLowPrioBtnColor();
  }
}

function setNormalPrioBtn() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (mediumBtn.checked) {
    mediumBtn.checked = true;
    lowBtn.checked = false;
    urgentBtn.checked = false;
    setNormalPrioSvgColor();
    setNormalPrioTextColor();
    setNormalPrioBtnColor();
  }
}

function setHighPrioBtn() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (urgentBtn.checked) {
    urgentBtn.checked = true;
    mediumBtn.checked = false;
    lowBtn.checked = false;
    setHighPrioSvgColor();
    setHighPrioTextColor();
    setHighPrioBtnColor();
  }
}

function setLowPrioSvgColor() {
  let svgLowColor = document.getElementById("svgLow");
  let svgNormalColor = document.getElementById("svgNormal");
  let svgHighColor = document.getElementById("svgHigh");
  svgLowColor.classList.add("prioIconWhite");
  svgNormalColor.classList.remove("prioIconWhite");
  svgHighColor.classList.remove("prioIconWhite");
}

function setLowPrioTextColor() {
  let lowPrioText = document.getElementById("lowPrioText");
  let normalPrioText = document.getElementById("normalPrioText");
  let highPrioText = document.getElementById("highPrioText");
  lowPrioText.style = "color: white;";
  normalPrioText.style = "color: black;";
  highPrioText.style = "color: black;";
}

function setLowPrioBtnColor() {
  let highBtnContainer = document.getElementById("highBtnContainer");
  let normalBtnContainer = document.getElementById("normalBtnContainer");
  let lowContainer = document.getElementById("lowBtnContainer");
  lowContainer.classList.add("prioLowContainerOnClick");
  highBtnContainer.classList.remove("prioHighContainerOnClick");
  normalBtnContainer.classList.remove("prioNormalContainerOnClick");
}

function setNormalPrioSvgColor() {
  let svgLowColor = document.getElementById("svgLow");
  let svgNormalColor = document.getElementById("svgNormal");
  let svgHighColor = document.getElementById("svgHigh");
  svgLowColor.classList.remove("prioIconWhite");
  svgNormalColor.classList.add("prioIconWhite");
  svgHighColor.classList.remove("prioIconWhite");
}

function setNormalPrioTextColor() {
  let lowPrioText = document.getElementById("lowPrioText");
  let normalPrioText = document.getElementById("normalPrioText");
  let highPrioText = document.getElementById("highPrioText");
  lowPrioText.style = "color: black;";
  normalPrioText.style = "color: white;";
  highPrioText.style = "color: black;";
}

function setNormalPrioBtnColor() {
  let highBtnContainer = document.getElementById("highBtnContainer");
  let normalBtnContainer = document.getElementById("normalBtnContainer");
  let lowBtnContainer = document.getElementById("lowBtnContainer");
  normalBtnContainer.classList.add("prioNormalContainerOnClick");
  lowBtnContainer.classList.remove("prioLowContainerOnClick");
  highBtnContainer.classList.remove("prioHighContainerOnClick");
}

function setHighPrioSvgColor() {
  let svgLowColor = document.getElementById("svgLow");
  let svgNormalColor = document.getElementById("svgNormal");
  let svgHighColor = document.getElementById("svgHigh");
  svgLowColor.classList.remove("prioIconWhite");
  svgNormalColor.classList.remove("prioIconWhite");
  svgHighColor.classList.add("prioIconWhite");
}

function setHighPrioTextColor() {
  let lowPrioText = document.getElementById("lowPrioText");
  let normalPrioText = document.getElementById("normalPrioText");
  let highPrioText = document.getElementById("highPrioText");
  lowPrioText.style = "color: black;";
  normalPrioText.style = "color: black;";
  highPrioText.style = "color: white;";
}

function setHighPrioBtnColor() {
  let highBtnContainer = document.getElementById("highBtnContainer");
  let normalBtnContainer = document.getElementById("normalBtnContainer");
  let lowBtnContainer = document.getElementById("lowBtnContainer");
  normalBtnContainer.classList.remove("prioNormalContainerOnClick");
  lowBtnContainer.classList.remove("prioLowContainerOnClick");
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
  renderCategorys();
}

function toggleOpenFunction() {
  let newCategory = document.getElementById("newCategory");
  let allCategorys = document.getElementById("allCategorys");
  if (slideCategory === false) {
    newCategory.classList.toggle("d-none");
    allCategorys.classList.toggle("d-none");
    slideInCategory(newCategory, allCategorys);
  } else {
    slideOutCategory(newCategory, allCategorys);
    setTimeout(() => {
      newCategory.classList.toggle("d-none");
      allCategorys.classList.toggle("d-none");
    }, 200);
  }
}

function slideOutCategory(newCategory, allCategorys) {
  newCategory.classList.add("slide-out-top");
  newCategory.classList.remove("slide-in-top");
  allCategorys.classList.add("slide-out-top");
  allCategorys.classList.remove("slide-in-top");
  slideCategory = false;
}

function slideInCategory(newCategory, allCategorys) {
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

async function renderCategorys() {
  let allCategorys = document.getElementById(`allCategorys`);
  allCategorys.innerHTML = "";
  for (let c = 0; c < allTasks.length; c++) {
    let category = allTasks[c].category;
    let color = allTasks[c].titleBg;
    allCategorys.innerHTML += renderCategorysHTML(c, category, color);
  }
}

function chooseCategory(category, color) {
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

//
//Assigned to section//
function openAssignedTo() {
  if (slideAssignTo === false) {
    slideInAssignTo();
    renderOpenAssignedTo();
    slideAssignTo = true;
  } else {
    slideOutAssignTo();
  }
}

function slideOutAssignTo() {
  let contactDiv = document.getElementById("contactDiv");
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById("contactList");
  contactList.classList.add("slide-out-top");
  setTimeout(() => {
    contactList.classList.remove("slide-in-top");
    contactList.classList.toggle("d-none");
    slideAssignTo = false;
  }, 200);
}

function slideInAssignTo() {
  let contactDiv = document.getElementById("contactDiv");
  contactDiv.classList.toggle("noneBottomBorder");
  let contactList = document.getElementById("contactList");
  contactList.classList.remove("slide-out-top");
  contactList.classList.add("slide-in-top");
  contactList.classList.toggle("d-none");
}

function renderOpenAssignedTo() {
  let contacts = document.getElementById("contacts");
  contacts.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let contactName = users[i].name;
    let contactColor = users[i].color;
    let contactInitials = users[i].initialLetters;
    let checked = false;
    for (let j = 0; j < selectedContacts.length; j++) {
      if (selectedContacts[j].name === contactName) {
        checked = true;
        break;
      }
    }
    contacts.innerHTML += `
      <div class="contact">
        <input type="checkbox" onclick="selectContact(event,'${contactName}', '${contactColor}','${contactInitials} ')" ${
      checked ? "checked" : ""
    }> 
        <div>${contactName}</div>
      </div>`;
  }
}

function selectContact(event, contactName, contactColor, contactInitials) {
  let checkbox = event.target;
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

function renderSelectContact() {
  let contactInitials = document.getElementById("contactInitials");
  contactInitials.innerHTML = ``;
  for (let i = 0; i < selectedContacts.length; i++) {
    let color = selectedContacts[i].color;
    let initials = selectedContacts[i].initial;
    contactInitials.innerHTML += `
    <div class="assignBubble">
      <div class="slide-in-bottom" style="background: ${color};">${initials}</div>
    </div>`;
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
    subtaskCheckboxArea.innerHTML += `
  <div class="subtaskPosi">
    <input onclick="checkSubtask(event,'${subtask}')" type="checkbox">
    <div>${subtask}</div>
  </div>
  `;
  }
  closeNewSubtask();
}

function checkSubtask(event, subtask) {
  let checkbox = event.target;
  if (checkbox.checked) {
    newSubtask.push(subtask);
  }
}

//clear current task//
function clearTask() {
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
  clearPrio(); //TODO: btn´s?
  newCategory();
  renderSelectContact();
  renderOpenAssignedTo();
  closeNewSubtask();
  acceptNewSubtask();
}

function clearPrio() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (urgentBtn.checked === true) {
    urgentBtn.checked = false;
  }
  if (mediumBtn.checked === true) {
    mediumBtn.checked = false;
  }
  if (lowBtn.checked === true) {
    lowBtn.checked = false;
  }
}

//-später für Task done-//
//async function deleteCategory(c) {
//  let categorys = await backend.getItem("allTasks");
//  if (typeof categorys === "string") {
//    categorys = JSON.parse(categorys);
//  }
//  categorys.splice(c, 1);
//  await backend.setItem("allTasks", JSON.stringify(categorys));
//  renderCategorys();
//}
