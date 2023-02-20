let today = new Date();


async function initSummary() {
  await loadTasks();
  showGreetingDayTime();
  showGreetingUser();
  loadTasksLength();
}


function showGreetingDayTime() {
  let greeting = document.getElementById("greeting");
  let localHours = new Date().getHours();
  if (localHours >= 0 && localHours < 5) {
    greeting.innerHTML = 'Hello, ';
  } else if (localHours >= 5 && localHours <= 11) {
    greeting.innerHTML = 'Good Morning, ';
  } else if (localHours >= 12 && localHours <= 17) {
    greeting.innerHTML = 'Good Afternoon, ';
  } else if (localHours >= 17 && localHours <= 23) {
    greeting.innerHTML = 'Good Evening, ';
  }
}


function showGreetingUser() {
  try {
    let greetingName = document.getElementById("greeting-user");
    greetingName.innerHTML = currentUser["name"];
  } catch (error) {
    console.error("no user logged in");
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
    console.log('no urgent tasks');
  }

  for (let i = 0; i < prio.length; i++) {
    const taskDate = prio[i]['date'];
    

    // Array mit Datumsangaben
    tasksDate.push(taskDate);
  }

  // Array sortieren nach Differenz zum heutigen Datum
  let sortedDates = tasksDate.sort(function (a, b) {
    return dateDifference(a) - dateDifference(b);
  });

  // Ausgabe des dringendsten Tasks
  console.log(sortedDates[0]);
  sortedDatesConverted = sortedDates[0].split(/-/gi);


  document.getElementById('tasks-date').innerHTML = convertNumberInMonth(sortedDatesConverted[1] - 1) + ' ' + sortedDatesConverted[2] + ', ' + sortedDatesConverted[0];
}


// Funktion zur Berechnung der Differenz zwischen zwei Daten
function dateDifference(date) {
  let difference = Math.abs(new Date(date) - today);
  return difference;
}


function convertNumberInMonth(sortedDatesMonth) {
  switch (parseInt(sortedDatesMonth)) {
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