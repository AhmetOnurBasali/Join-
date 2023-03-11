setURL("https://gruppe-446.developerakademie.net/smallest_backend_ever");
let users = [];
let currentUser = [];
let allTasks = [{ id: 0 }];
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
        
    } else{
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
    } else{
        document.getElementById(childID).classList.remove('slide-in');
        document.getElementById(childID).classList.add('slide-out');
    }
    
}


async function init() {
    await loadCurrentUser();
}


function checkUndefined() {
    if (currentUser.initialLetters === undefined) {
        location.reload();
    }    
}