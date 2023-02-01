let contacts = [
  {
    name: "david",
    email: "test@test.de",
    phone: 99999999999,
  },
];


async function createNewTask(event) {
  if (allTasks === null) {
    allTasks = [];
  }
  event.preventDefault();
  await downloadFromServer();
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
  }
}


async function loadTasks() {
  await downloadFromServer();
  let item = await backend.getItem("allTasks");
  if (typeof item === "string") {
    allTasks = JSON.parse(item) || [];
  } else {
    allTasks = item;
  }
}
