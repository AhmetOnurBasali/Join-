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
  document.getElementById('tasks-in-board').innerHTML = allTasks.length;
}


function loadTasksInProgress() {
  let inProgress = allTasks.filter((t) => t["area"] == "inProgress");
  document.getElementById('tasks-in-progress').innerHTML = inProgress.length;
}


function loadTasksAwaitingFeedback() {
  let awaitingFeedback = allTasks.filter((t) => t["area"] == "awaitingFeedback");
  document.getElementById('tasks-awaiting-feedback').innerHTML = awaitingFeedback.length;
}

function loadTasksTodo() {
  let todo = allTasks.filter((t) => t["area"] == "todo");
  document.getElementById('tasks-todo').innerHTML = todo.length;
}


function loadTasksDone() {
  let done = allTasks.filter((t) => t["area"] == "done");
  document.getElementById('tasks-done').innerHTML = done.length;
}


function loadTaskUpcomingDeadline() {
  // let done = allTasks.filter((t) => t["prio"] == "done");
 
  document.getElementById('tasks-date').innerHTML = `${convertNumberInMonth()} ${new Date().getDate()}, ${new Date().getFullYear()}`;



}

function convertNumberInMonth(){
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