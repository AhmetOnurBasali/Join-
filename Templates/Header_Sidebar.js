
function loadHelp() {
    document.getElementById("notice-help").classList.add('d-none');
    document.getElementById("help").classList.add('d-none');

}


function loadNotice() {
    document.getElementById("notice-help").classList.remove('d-none');
    document.getElementById("notice-info").classList.remove('d-none');

}


function loadSummary() {
    document.getElementById('Summary','Board','Add-Task','Contacts').classList.remove('dark-blue');
    document.getElementById('Summary').classList.add('dark-blue');}

function loadBoard() {
    document.getElementById('Summary','Board','Add-Task','Contacts').classList.remove('dark-blue');
    document.getElementById('Board').classList.add('dark-blue');
}


function loadAddTask() {
    document.getElementById('Summary','Board','Add-Task','Contacts').classList.remove('dark-blue');
    document.getElementById('Add-Task').classList.add('dark-blue');
}


function loadContacts() {
    document.getElementById('Summary','Board','Add-Task','Contacts').classList.remove('dark-blue');
    document.getElementById('Contacts').classList.add('dark-blue');
}