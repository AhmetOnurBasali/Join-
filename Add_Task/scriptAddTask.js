let contacts = [
  {
    name: "david",
    email: "test@test.de",
    phone: 99999999999,
  },
];

let tasksData = [];

function createNewTask(event) {
  event.preventDefault();
  let creator = currentUser["name"];
  let prio = checkPrio();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let caregory = document.getElementById("category").value;
  let assignedTo = document.getElementById("assignedTo").value;
  let date = document.getElementById("date").value;
  let subtask = document.getElementById("subtask").value;

  let taskData = [
    {
      creator,
      title,
      description,
      caregory,
      assignedTo,
      date,
      prio,
      subtask,
    },
  ];
  setTaskData(taskData);
}

async function setTaskData(taskData) {
  await backend.setItem("tasksData", taskData);
  console.log("taskData is", taskData);
}

function checkPrio() {
  let urgentBtn = document.getElementById("urgentBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let lowBtn = document.getElementById("lowBtn");
  if (urgentBtn.checked === true) {
    console.log("prio is: Urgent");
    return "Urgent";
  }
  if (mediumBtn.checked === true) {
    console.log("prio is: Medium");
    return "Medium";
  }
  if (lowBtn.checked === true) {
    console.log("prio is: Low");
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

async function test() {
  await downloadFromServer();
  let item = await backend.getItem("tasksData");
  if (typeof item === "string") {
    tasksData = JSON.parse(item) || [];
  } else {
    tasksData = item;
  }
}
