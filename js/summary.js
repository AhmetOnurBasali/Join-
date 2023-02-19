// function setGreatingName() {
//   let greatingName = document.getElementById("greatingName");
//   greatingName.innerHTML = currentUser["name"];
// }

async function initSummary() {
  await loadTasks();
  showGreatingDayTime();
  showGreatingUser();
  loadTasksLength();
}


function showGreatingDayTime() {
  // new Date().toLocaleString()
}


function showGreatingUser() {
  try {
    let greatingName = document.getElementById("greating-user");
    greatingName.innerHTML = currentUser["name"];
  } catch (error) {
    console.log("no greating on this page");
  }
}


function loadTasksLength() {
  loadTasksInBoard();
  loadTasksInProgress();
  loadTasksAwaitingFeedback();
  loadTaskUpcomingDeadline();
  loadTasksTodo();
  loadTasksDone();
}


function loadTasksInBoard() {
  try {
    document.getElementById('tasks-in-board').innerHTML = allTasks.length - 1;
  } catch (error) {
    console.warn('no tasks');
  }

}


function loadTasksInProgress() {

  try {
    let inProgress = allTasks.filter((t) => t["area"] == "inProgress");
    document.getElementById('tasks-in-progress').innerHTML = inProgress.length;
  } catch (error) {
    console.log('no tasks in "inProgress"');
  }
}


function loadTasksAwaitingFeedback() {

  try {
    let awaitingFeedback = allTasks.filter((t) => t["area"] == "awaitingFeedback");
    document.getElementById('tasks-awaiting-feedback').innerHTML = awaitingFeedback.length;
  } catch (error) {
    console.log('no tasks in "awaitingFeedback"');
  }
}

function loadTasksTodo() {

  try {
    let todo = allTasks.filter((t) => t["area"] == "todo");
    document.getElementById('tasks-todo').innerHTML = todo.length;
  } catch (error) {
    console.log('no tasks in "todo"');
  }
}


function loadTasksDone() {

  try {
    let done = allTasks.filter((t) => t["area"] == "done");
    document.getElementById('tasks-done').innerHTML = done.length;
  } catch (error) {
    console.log('no tasks in "done"');
  }

}



function loadTaskUpcomingDeadline() {
  let prio;
  let tasksDate = [];
  try {
    prio = allTasks.filter((t) => t["prio"] == "urgent");
    document.getElementById('tasks-priority').innerHTML = prio.length;
  } catch (error) {
    console.log('no tasks in "done"');
  }
  for (let i = 0; i < prio.length; i++) {
    const taskDate = prio[i]['date'];
    taskDateConverted = taskDate.replace(/-/gi, ', ');
    tasksDate.push(taskDateConverted);
  }
  let ka = sortDates()
  console.log(ka);

  

  document.getElementById('tasks-date').innerHTML = `${convertNumberInMonth()} ${new Date().getDate()}, ${new Date().getFullYear()}`;



}

function sortDates(){
let tasksDates = [new Date(2012, 7, 1), new Date(2012, 7, 4), new Date(2012, 7, 5), new Date(2013, 2, 20)];
  let diffdate = new Date(2012, 7, 11);

  tasksDates.sort(function (a, b) {
    let distancea = Math.abs(diffdate - a);
    let distanceb = Math.abs(diffdate - b);
    return distancea - distanceb; // sort a before b when the distance is smaller
  });
}





function convertNumberInMonth() {
  switch (new Date().getMonth()) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
}

function switchToBoard() {
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 200);
}