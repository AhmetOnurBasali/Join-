setURL("https://gruppe-446.developerakademie.net/smallest_backend_ever");
let users = [];
let currentUser = [];
let allTasks = [{id: 0}];
let categoryColor = [];


function dateTodayISO() {
    let dateToday = new Date().getFullYear() + '-' + pad((new Date().getMonth() + 1), 2) + '-' + new Date().getDate();
    return dateToday;
  }
  
  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  
  function slideInAnimation(parentID, childID) {
    document.getElementById(parentID).classList.remove('slide-out');
    document.getElementById(childID).classList.remove('visual-out');
    document.getElementById(parentID).classList.add('slide-in');
    document.getElementById(childID).classList.add('visual-in');
  }
  
  function slideOutAnimation(parentID, childID) {
    document.getElementById(parentID).classList.remove('slide-in');
    document.getElementById(childID).classList.remove('visual-in');
    document.getElementById(parentID).classList.add('slide-out');
    document.getElementById(childID).classList.add('visual-out');
  }

async function init() {
    await loadCurrentUser();    
}

