setURL("https://gruppe-446.developerakademie.net/smallest_backend_ever");
let users = [];
let currentUser = [];
let allTasks = [{ id: 0 }];
let categoryColor = [];

async function init() {
    await initTemplates();
    await loadTasks();
    await loadCurrentUser();
    loadTasks();
    setSideBarFocus();
    getInitialForHeader()
    checkUndefined()
}

async function initHelpLegal() {
    await initTemplates();
    await loadCurrentUser();
    setSideBarFocus()
    getInitialForHeader()
}

function dateTodayISO() {
    let dateToday = new Date().getFullYear() + '-' + pad((new Date().getMonth() + 1), 2) + '-' + new Date().getDate();
    return dateToday;
}


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


function slideInAnimation(childID, parentID) {
    document.getElementById(parentID).classList.remove('visual-out');
    document.getElementById(parentID).classList.add('visual-in');
    if (window.innerWidth <= 1000) {
        document.getElementById(childID).classList.add('slide-in-bottom');
        document.getElementById(childID).classList.remove('slide-out-bottom');
        if (childID == 'addTask') {
            document.getElementById(childID).classList.remove('slide-in-bottom');
            document.getElementById(childID).classList.remove('slide-out');
            document.getElementById(childID).classList.add('slide-in');
            document.getElementById(parentID).classList.remove('visual-in');
        }
    } else {
        document.getElementById(childID).classList.remove('slide-out');
        document.getElementById(childID).classList.add('slide-in');
    }

}


function slideOutAnimation(childID, parentID) {
    document.getElementById(parentID).classList.remove('visual-in');
    document.getElementById(parentID).classList.add('visual-out');
    if (window.innerWidth <= 1000) {
        document.getElementById(childID).classList.remove('slide-in-bottom');
        document.getElementById(childID).classList.add('slide-out-bottom');
        if (childID == 'addTask') {
            document.getElementById(childID).classList.remove('slide-out-bottom');
            document.getElementById(childID).classList.add('slide-out');
            document.getElementById(childID).classList.remove('slide-in');
            document.getElementById(parentID).classList.remove('visual-out');
        }
    } else {
        document.getElementById(childID).classList.remove('slide-in');
        document.getElementById(childID).classList.add('slide-out');
    }
}


function checkUndefined() {
    if (currentUser.initialLetters === undefined) {
        location.reload();
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('click', function(event) {
      let assignedToDiv = document.getElementById('inputContainer');
      let categoryDiv = document.getElementById('openCategoryContainer');
      if (categoryDiv.contains(event.target)) {
        return;
      }
      if (assignedToDiv.contains(event.target)) {
        return
      }
      if (slideCategory === true && selectedCategory.innerHTML === "select a category") {
          openCategory();
      }
      if (slideAssignTo === true && selectedContacts) {
        openAssignedTo('arrayAssigned', 'contactDiv', 'contactList', 'contacts', 'contactInitials', 'inputContainer')
      }
    });
  });