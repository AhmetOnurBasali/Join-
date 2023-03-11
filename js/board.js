
let currentDraggedElement;
let currentAreaOndragover;
let taskPreview;
let newArea;
let currentTaskID;

/**
 * This function is used to initialise all functions thats needed for the board page.
 * 
 */
async function initBoard() {
    await init();
    await loadUsers();
    renderBoard();
}


/**
 * 
 * 
 */
function renderBoard() {
    let taskInput = document.getElementById('find-task');
    inputValueLC = taskInput.value.toLowerCase();
    let areaToDo = document.getElementById('tasks-to-do');
    let areaInProgress = document.getElementById('tasks-in-progress');
    let areaAwaitingFeedback = document.getElementById('tasks-awaiting-feedback');
    let areaDone = document.getElementById('tasks-done');
    areaToDo.innerHTML = "";
    areaInProgress.innerHTML = "";
    areaAwaitingFeedback.innerHTML = "";
    areaDone.innerHTML = "";

    try {
        let todo = allTasks.filter((t) => t["area"] == "todo");
        for (let i = 0; i < todo.length; i++) {
            const task = todo[i];
            const taskCategory = task['category'].toLowerCase();
            const taskDescription = task['description'].toLowerCase();
            const taskTitle = task['title'].toLowerCase();
            if (taskCategory.includes(inputValueLC) || taskDescription.includes(inputValueLC) || taskTitle.includes(inputValueLC) || inputValueLC == '') {
                renderCreatedTasks(areaToDo, task);
            }
        }
        let inProgress = allTasks.filter((t) => t["area"] == "inProgress");
        for (let i = 0; i < inProgress.length; i++) {
            const task = inProgress[i];
            const taskCategory = task['category'].toLowerCase();
            const taskDescription = task['description'].toLowerCase();
            const taskTitle = task['title'].toLowerCase();
            if (taskCategory.includes(inputValueLC) || taskDescription.includes(inputValueLC) || taskTitle.includes(inputValueLC) || inputValueLC == '') {
                renderCreatedTasks(areaInProgress, task);
            }
        }
        let awaitingFeedback = allTasks.filter((t) => t["area"] == "awaitingFeedback");
        for (let i = 0; i < awaitingFeedback.length; i++) {
            const task = awaitingFeedback[i];
            const taskCategory = task['category'].toLowerCase();
            const taskDescription = task['description'].toLowerCase();
            const taskTitle = task['title'].toLowerCase();
            if (taskCategory.includes(inputValueLC) || taskDescription.includes(inputValueLC) || taskTitle.includes(inputValueLC) || inputValueLC == '') {
                renderCreatedTasks(areaAwaitingFeedback, task);
            }
        }
        let done = allTasks.filter((t) => t["area"] == "done");
        for (let i = 0; i < done.length; i++) {
            const task = done[i];
            const taskCategory = task['category'].toLowerCase();
            const taskDescription = task['description'].toLowerCase();
            const taskTitle = task['title'].toLowerCase();
            if (taskCategory.includes(inputValueLC) || taskDescription.includes(inputValueLC) || taskTitle.includes(inputValueLC) || inputValueLC == '') {
                renderCreatedTasks(areaDone, task);
            }
        }
    } catch (error) {
        console.log('no Tasks created');
    }


}


async function renderCreatedTasks(area, task) {
    area.innerHTML += renderCreatedTasksInnerHTML(task);
    renderAssignTo(task, 'task-assigned-to');
    checkValueOfSubtasks(task);
    setTitleBg(task, 'task-category');
}


function renderAssignTo(task, eID) {
    let i;
    for (i = 0; i < task['assignedTo'].length; i++) {
        const assignedTo = task['assignedTo'][i]['initial'];
        if (eID == 'task-assigned-to' && i < 2 || eID != 'task-assigned-to') {
            document.getElementById(`${eID}${task['id']}`).innerHTML += `<div style="background-color:${task['assignedTo'][i]['color']};">${assignedTo}</div>`;
        }
        if (eID == 'task-details-assigned-to') {
            document.getElementById(`task-details-assigned-to-name${task['id']}`).innerHTML += `<div>${task['assignedTo'][i]['name']}</div>`;
        }
    }
    if (eID == 'task-assigned-to' && i > 2) {
        document.getElementById(`task-assigned-to${task['id']}`).innerHTML += `<div style="background-color:#2A3647;">${i - 2}+</div>`;
    }
}


function progressSubtasks(task) {
    if (task['closedSubtask'] == 0) {
        return 0;
    } else {
        return 100 / (task['openSubtask'].length + task['closedSubtask'].length) * task['closedSubtask'].length;
    }

}


//---------------------------Drag and Drop Tasks---------------------------
function allowDrop(ev, area, areaID) {
    ev.preventDefault();
    currentAreaOndragover = area;
    if (area != allTasks[currentDraggedElement]['area'] && taskPreview == false) {
        if (document.getElementById('task-preview') != null) {
            document.getElementById('task-preview').remove();
        }
        highlightArea(areaID);
    } else if (area == allTasks[currentDraggedElement]['area'] && document.getElementById('task-preview') != null) {
        document.getElementById('task-preview').remove();

    }

}


function disregardArea() {
    taskPreview = false;
}


function highlightArea(areaID) {
    document.getElementById(`${areaID}`).innerHTML += `<div class="task-preview" id="task-preview"></div>`;
    checkDraggedTaskSize();
    taskPreview = true;
}


function startDragging(id) {
    currentDraggedElement = id;
}


function checkDraggedTaskSize() {
    let task = document.getElementById(`taskNumber_${currentDraggedElement}`);
    let actTaskHeight = task.offsetHeight;
    document.getElementById('task-preview').style.minHeight = actTaskHeight + 'px';
}

async function moveTo() {
    allTasks[currentDraggedElement]['area'] = currentAreaOndragover;
    renderBoard();

    await backend.setItem("allTasks", allTasks);
}


function setTitleBg(task, eID) {
    document.getElementById(`${eID}${task['id']}`).style.backgroundColor = `${task['titleBg']}`;
}


function dragAnimation(id) {

    document.getElementById(`taskNumber_${id}`).style.rotate = '4deg';
    document.getElementById(`taskNumber_${id}`).style.opacity = '0.75';

}


function addTaskBoard(area) {
    isAddTask = true;
    document.getElementById("addTask").innerHTML = addTaskHTML();
    selectArea(area);
    slideInAnimation('addTask', 'popup-add-task-board');
    document.getElementById('popup-add-task-board').classList.remove('d-none');
    addTaskCloseTopRight();

    document.getElementById('close-add-task').innerHTML = addTaskHTMLBoard();

    navbarBottomHide();
    showCreateTaskBtnMobile();
    body.style.overflow = "hidden"
}


function selectArea(area) {
    newArea = area;
}


function addTaskHTMLBoard() {
    return `<div class="whiteBtn" onclick="closeAddTaskBoard(), clearTask()">Close 
    <svg  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="clearSvg" d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></div>`;
}


function closeAddTaskBoard() {
    slideOutAnimation('addTask', 'popup-add-task-board');
    setTimeout(() => {
        document.getElementById('popup-add-task-board').classList.add('d-none');
    }, animationTimeout);
    if (window.innerWidth <= 1000) {
        let navbar = document.getElementById('navbar-bottom')
        navbar.classList.remove("d-none")
        hideCreateTaskBtnMobile();
    }
    body.style.overflow = "auto"
}


function doNotCloseAddTaskBoard(event) {
    event.stopPropagation();
}


//---------------------------Move to Mobile---------------------------
function selectAreaOnMobile(taskID) {
    let moveToButtonIDs = ['mobile-move-todo', 'mobile-move-inProgress', 'mobile-move-awaitingFeedback', 'mobile-move-done'];
    for (let i = 0; i < moveToButtonIDs.length; i++) {
        const moveToButtonID = moveToButtonIDs[i];
        if (moveToButtonID.includes(allTasks[taskID]['area'])) {
            document.getElementById(moveToButtonID).style.display = 'none';
        }
    }
    
}


function moveToOnMobile(taskID, selectedArea){
    allTasks[taskID]['area'] = selectedArea;
    renderBoard();
    openTaskDetailsFront(taskID);
    selectAreaOnMobile(taskID);

    backend.setItem("allTasks", allTasks);
}


//---------------------------Details Tasks---------------------------
function openTaskDetailsFront(taskID) {
    currentTaskID = taskID;
    document.getElementById('popup-task-details').classList.remove('d-none');
    slideInAnimation('task-details', 'popup-task-details');
    document.getElementById('task-details').innerHTML = renderTaskDetailsFrontHTML(currentTaskID);
    document.getElementById('body').style.overflow = 'hidden';
    setTitleBg(allTasks[currentTaskID], 'task-details-category');
    renderAssignTo(allTasks[currentTaskID], 'task-details-assigned-to');
    renderSubtasks(allTasks[currentTaskID], 'task-details-subtasks');
    setPriorityBg();
}


function renderSubtasks(task, eID) {
    document.getElementById(`${eID}${task['id']}`).innerHTML = '';
    for (let i = 0; i < task['openSubtask'].length; i++) {
        const openSubtask = task['openSubtask'][i];
        document.getElementById(`${eID}${task['id']}`).innerHTML += /*html*/`
         <div class="subtasks-details"><input class="checkbox-subtask" onclick="statusSubtask(${i}, 'openSubtask${i}_T${currentTaskID}')" type="checkbox" id="openSubtask${i}_T${currentTaskID}">${openSubtask}</div>
        `;
    }

    for (let i = 0; i < task['closedSubtask'].length; i++) {
        const closedSubtask = task['closedSubtask'][i];
        document.getElementById(`${eID}${task['id']}`).innerHTML += /*html*/`
        <div class="subtasks-details"><input class="checkbox-subtask" checked onchange="statusSubtask(${i}, 'closedSubtask${i}_T${currentTaskID}')" type="checkbox" id="closedSubtask${i}_T${currentTaskID}">${closedSubtask}</div>
        `;
    }
}


async function statusSubtask(i, subtaskID) {
    let statusSubtask = document.getElementById(subtaskID);
    if (statusSubtask.checked) {
        allTasks[currentTaskID]['closedSubtask'].push(allTasks[currentTaskID]['openSubtask'][i]);
        allTasks[currentTaskID]['openSubtask'].splice(i, 1);
    } else {
        allTasks[currentTaskID]['openSubtask'].push(allTasks[currentTaskID]['closedSubtask'][i]);
        allTasks[currentTaskID]['closedSubtask'].splice(i, 1);
    }

    renderSubtasks(allTasks[currentTaskID], 'task-details-subtasks');
    renderBoard();
    await backend.setItem("allTasks", allTasks);
}


function setPriorityBg() {
    document.getElementById(`task-details-prio-sign${currentTaskID}`).style.backgroundColor = `${setPriorityBgColor()}`;
}


function setPriorityBgColor() {
    switch (allTasks[currentTaskID]['prio']) {
        case 'low':

            return '#7AE229'
        case 'medium':

            return '#FFA800'
        case 'urgent':

            return '#FF3D00'
        default:
            break;
    }
}


function closeTaskDetails() {
    document.getElementById('body').style.overflow = 'auto';
    slideAssignTo = false;
    slideCategory = false;
    slideOutAnimation('task-details', 'popup-task-details');
    setTimeout(() => {
        document.getElementById('popup-task-details').classList.add('d-none');
    }, animationTimeout);
}


function editDetailsTask() {
    document.getElementById('task-details').innerHTML = renderEditDetailsTaskHTML();
    renderSelectContactEdit();
    renderOpenAssignedTo('contactsEdit', 'contactInitialsEdit');
    setPrioCheckBox(allTasks[currentTaskID]['prio'], 'Edit');
}

function renderSelectContactEdit() {
    let contactInitials = document.getElementById('contactInitialsEdit');
    contactInitials.innerHTML = ``;
    for (let i = 0; i < allTasks[currentTaskID]['assignedTo'].length; i++) {
        let color = allTasks[currentTaskID]['assignedTo'][i]['color'];
        let initialLetters = allTasks[currentTaskID]['assignedTo'][i]['initial'];
        contactInitials.innerHTML += renderSelectContactHTML(color, initialLetters);
    }
}


function checkValueOfSubtasks(task) {
    if (task['openSubtask'].length + task['closedSubtask'].length == 0) {
        document.getElementById(`task-subtasks${task['id']}`).remove();
    }
}


async function editExistingTask(event) {
    proofEvent(event);
    let editTask = getTaskDataEdit();
    let proof = taskProofSectionEdit(editTask);
    if (proof === true) {
        editTaskData(editTask);
        // clearContactCheckboxes();
    }

}


function getTaskDataEdit() {
    let titleEdit = document.getElementById("titleEdit").value;
    let descriptionEdit = document.getElementById("descriptionEdit").value;
    let dateEdit = document.getElementById("dateEdit").value;
    let prioEdit = checkPrio('Edit');
    return {
        title: titleEdit,
        description: descriptionEdit,
        assignedTo: selectedContacts,
        date: dateEdit,
        prio: prioEdit,
    };
}


function taskProofSectionEdit(editTask) {
    let title = proofTitle(editTask, 'Edit');
    let description = proofDescription(editTask, 'Edit');
    let assigned = proofAssigned();
    let date = proofDate(editTask, 'Edit');
    let prio = proofPrio(editTask, 'Edit');
    if (checkProofOfEdit(title, description, assigned, date, prio) === true) {
        return true;
    }
    return false;
}


function checkProofOfEdit(title, description, assigned, date, prio) {
    return (
        title === true &&
        description === true &&
        assigned === true &&
        date === true &&
        prio === true
    );
}


async function editTaskData(editTask) {
    allTasks[currentTaskID]['title'] = editTask['title'];
    allTasks[currentTaskID]['description'] = editTask['description'];
    allTasks[currentTaskID]['date'] = editTask['date'];
    allTasks[currentTaskID]['prio'] = editTask['prio'];
    allTasks[currentTaskID]['assignedTo'] = editTask['assignedTo'];

    await backend.setItem("allTasks", allTasks);
    renderBoard();
    console.log('task changed' + currentTaskID);
    closeTaskDetails();
}


