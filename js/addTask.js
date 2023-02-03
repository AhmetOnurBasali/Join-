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

async function createNewTask(event) {
  if (allTasks === null) {
    allTasks = [];
  }
  event.preventDefault();
  await downloadFromServer();
  let currentID = allTasks.length;
  let newID = currentID + 1;
  let creatorNew = currentUser["name"];
  let prioNew = checkPrio();
  let titleNew = document.getElementById("title").value;
  let descriptionNew = document.getElementById("description").value;
  let caregoryNew = document.getElementById("category").value;
  let assignedToNew = document.getElementById("assignedTo").value;
  let dateNew = document.getElementById("date").value;
  let subtaskNew = document.getElementById("subtask").value;

  let newTask = {
    creator: creatorNew,
    title: titleNew,
    description: descriptionNew,
    caregory: caregoryNew,
    assignedTo: assignedToNew,
    date: dateNew,
    prio: prioNew,
    subtask: subtaskNew,
    id: newID,
  };
  setTaskData(newTask);
}

async function setTaskData(newTask) {
  allTasks.push(newTask);
  await backend.setItem("allTasks", allTasks);
  console.log("new task is", newTask);
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 1000);
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

function lowBtnCheckBox() {
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

function mediumBtnCheckBox() {
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

function urgentBtnCheckBox() {
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

function clearTask() {
  let titleInput = document.getElementById("title");
  let descriptionInput = document.getElementById("description");
  let caregoryInput = document.getElementById("category");
  let assignedToInput = document.getElementById("assignedTo");
  let dateInput = document.getElementById("date");
  let subtaskInput = document.getElementById("subtask");

  titleInput.value = "";
  descriptionInput.value = "";
  caregoryInput.value = "";
  assignedToInput.value = "";
  dateInput.value = "";
  subtaskInput.value = "";
  clearPrio();
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

function openCategory() {}
