let slideAssignTo = false;
let slideCategory = false;

let currentCategoryColor = [];
let displayedCategories = [];
let displayedCategoriesColor = [];

let newCreateSubtask = [];
let newSubtask = [];

let selectedContacts = [];
let allContacts = [];

async function initTask() {
  await init();
  await openAddTask();
  await loadUsers();
  await loadCategory();
}


async function loadTasks() {
  await downloadFromServer();
  let item = await backend.getItem("allTasks");
  if (typeof item === "string") {
    allTasks = JSON.parse(item) || [];
  } else {
    allTasks = item;
  }
  await proofAndSetTasks()
}


async function proofAndSetTasks() {
  if (!allTasks) {
    allTasks = [{ id: 0, category: "Design", titleBg: "Red" }];
    await backend.setItem("allTasks", allTasks);
  }
}


async function createNewTask(event) {
  proofEvent(event);
  await loadTasks();
  let newTask = await getTaskData();
  let proof = taskProofSection(newTask);
  if (proof === true) {
    await setTaskData(newTask);
  }
}


function proofEvent(event) {
  if (event) {
    event.preventDefault();
  }
}


async function getTaskData() {
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
  if (newTask.creator == "Guest User") {
    alert("The guest user can't create a task.");
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


async function setTaskData(newTask) {
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
  document.getElementById(`${uncheckBtn1}Btn${taskEdit}`).checked = false;
  document.getElementById(`${uncheckBtn2}Btn${taskEdit}`).checked = false;

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


document.addEventListener('DOMContentLoaded', function(){
let addTaskDiv = document.getElementById("addTask");
addTaskDiv.addEventListener('click', function(event) {
  if (slideCategory === true || slideAssignTo === true){
    let assignedToDiv = document.getElementById('inputContainer');
    let categoryDiv = document.getElementById('openCategoryContainer');
    let createContactPopup = document.getElementById('createContactPopup');
    if (categoryDiv.contains(event.target) || assignedToDiv.contains(event.target)) {
      return;
    }
    if (createContactPopup) {
      createContactPopup.classList.contains('d-none')
    }
    if (slideCategory === true && selectedCategory.innerHTML === "select a category") {
      openCategory();
    }
    if (slideAssignTo === true && selectedContacts) {
      openAssignedTo('arrayAssigned', 'contactDiv', 'contactList', 'contacts', 'contactInitials', 'inputContainer')
    }
  }
});})

