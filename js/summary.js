let today = new Date();


async function initSummary() {
  await init();
  showGreetingDayTime();
  showGreetingUser();
  loadTasksLength();
  checkUndefined()
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
  let greetingName = document.getElementById("greeting-user");
  greetingName.innerHTML = currentUser["name"];

  setTimeout(() => {
    if (window.innerWidth <= 1000) {
      document.querySelector('.welcome').style.display = 'none';
    }
  }, 2400);
}


function loadTasksLength() {
  loadTasksInBoard();
  loadTasksInProgress();
  loadTasksAwaitingFeedback();
  loadTaskUpcomingDeadline();
  loadTasksTodo();
  loadTasksDone();
}


function countTo(num, taskNumID) {
  let from = 0;
  let to = num;
  let step = to > from ? 1 : -1;
  let interval = 200;

  if (from == to) {
    document.getElementById(taskNumID).innerHTML = from;
    return;
  }

  let counter = setInterval(function () {
    from += step;
    document.getElementById(taskNumID).innerHTML = from;

    if (from == to) {
      clearInterval(counter);
    }
  }, interval);
}


function loadTasksInBoard() {
  try {
    countTo(allTasks.length - 1, 'tasks-in-board');
  } catch (error) {
    console.warn('no tasks');
  }

}


function loadTasksInProgress() {

  try {
    let inProgress = allTasks.filter((t) => t["area"] == "inProgress");
    countTo(inProgress.length, 'tasks-in-progress');
  } catch (error) {
    console.log('no tasks in "inProgress"');
  }
}


function loadTasksAwaitingFeedback() {

  try {
    let awaitingFeedback = allTasks.filter((t) => t["area"] == "awaitingFeedback");
    countTo(awaitingFeedback.length, 'tasks-awaiting-feedback');
  } catch (error) {
    console.log('no tasks in "awaitingFeedback"');
  }
}


function loadTasksTodo() {

  try {
    let todo = allTasks.filter((t) => t["area"] == "todo");
    countTo(todo.length, 'tasks-todo');
  } catch (error) {
    console.log('no tasks in "todo"');
  }
}


function loadTasksDone() {

  try {
    let done = allTasks.filter((t) => t["area"] == "done");
    countTo(done.length, 'tasks-done');
  } catch (error) {
    console.log('no tasks in "done"');
  }

}


function loadTaskUpcomingDeadline() {
  let prio;
  let tasksDate = [];

  try {
    prio = allTasks.filter((t) => t["prio"] == "urgent");
    countTo(prio.length, 'tasks-priority');


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
    sortedDatesConverted = sortedDates[0].split(/-/gi);
    document.getElementById('tasks-date').innerHTML = convertNumberInMonth(sortedDatesConverted[1] - 1) + ' ' + sortedDatesConverted[2] + ', ' + sortedDatesConverted[0];

  } catch (error) {
    console.log('no urgent tasks');
  }
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