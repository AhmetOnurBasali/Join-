let currentCategoryColor = [];

let contacts = [
  {
    name: "david",
    email: "test@test.de",
    phone: 99999999999,
  },
];

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
  let assignedToNew = document.getElementById("assignedTo").value;
  let dateNew = document.getElementById("date").value;
  let subtaskNew = document.getElementById("subtask").value;
  return {
    creator: creatorNew,
    title: titleNew,
    description: descriptionNew,
    category: categoryNew,
    titleBg: currentCategoryColor[0],
    assignedTo: assignedToNew,
    date: dateNew,
    prio: prioNew,
    subtask: subtaskNew,
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
  if (!newTask.assignedTo || !newTask.date || !newTask.subtask) {
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
  newCategory.classList.toggle("d-none");
  let allCategorys = document.getElementById("allCategorys");
  allCategorys.classList.toggle("d-none");
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

//clear current task//
function clearTask() {
  let titleInput = document.getElementById("title");
  let descriptionInput = document.getElementById("description");
  let categoryInput = document.getElementById("createCategory");
  let assignedToInput = document.getElementById("assignedTo");
  let dateInput = document.getElementById("date");
  let subtaskInput = document.getElementById("subtask");
  titleInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
  assignedToInput.value = "";
  dateInput.value = "";
  subtaskInput.value = "";
  clearPrio(); //TODO: btn´s?
  newCategory();
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
