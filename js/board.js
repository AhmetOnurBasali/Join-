
let currentDraggedElement;
let currentAreaOndragover;
let taskPreview;
/**
 * This function is used to initialise all functions thats needed for the board page.
 * 
 */
async function initBoard() {
    await loadTasks(),
        await init(),
        initTemplates(),

        renderBoard();

}
/**
 * 
 * 
 */
function renderBoard() {
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
            renderCreatedTasks(areaToDo, task);
        }
        let inProgress = allTasks.filter((t) => t["area"] == "inProgress");
        for (let i = 0; i < inProgress.length; i++) {
            const task = inProgress[i];
            renderCreatedTasks(areaInProgress, task);
        }
        let awaitingFeedback = allTasks.filter((t) => t["area"] == "awaitingFeedback");
        for (let i = 0; i < awaitingFeedback.length; i++) {
            const task = awaitingFeedback[i];
            renderCreatedTasks(areaAwaitingFeedback, task);
        }
        let done = allTasks.filter((t) => t["area"] == "done");
        for (let i = 0; i < done.length; i++) {
            const task = done[i];
            renderCreatedTasks(areaDone, task);
        }
    } catch (error) {
        console.log('no Tasks avialable');
    }


}


async function renderCreatedTasks(area, task) {
    area.innerHTML +=  renderCreatedTasksInnerHTML(task);
    renderAssignTo(task);
    
    setTitleBg(task);
}


function renderAssignTo(task){
    document.getElementById(`task-assigned-to${task['id']}`).innerHTML = '';
    for (let i = 0; i < task['assignedTo'].length; i++) {
        const assignetTo = task['assignedTo'][i]['initial'];
        document.getElementById(`task-assigned-to${task['id']}`).innerHTML += `<div style="background-color:${task['assignedTo'][i]['color']};">${assignetTo}</div>`;
    }
}


function progressSubtasks(task){
    return 100/task['openSubtask'].length*0;
}

function taskDetails(taskID){
   document.getElementById(`${taskID}`)
}


function taskPreviewLoaded() {
    taskPreviewLoaded = true;
    if (taskPreviewLoaded == true) {

    }
}


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
    taskPreviewRemoved = true;
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


function setTitleBg(task) {
    document.getElementById(`task-category${task['id']}`).style.backgroundColor = `${task['titleBg']}`;
}


function dragAnimation(id) {
    // document.getElementById(`taskNumber_${task['id']}`).style.backgroundColor = `${task['titleBg']}`;
    // document.getElementById(`taskNumber_${id}`).animate([
    //     // keyframes
    //     { transform: 'rotate(20deg)' },
    //     // { transform: 'translateY(-300px)' }
    //   ], {
    //     // timing options
    //     duration: 100,
    //     iterations: 1
    //   });
    // document.getElementById(`taskNumber_${id}`).style.rotate = '3deg';
    // document.getElementById(`taskNumber_${id}`).style.opacity = '1';
    // document.getElementById(`taskNumber_${id}`).style.backgroundColor = 'blue';
    // document.getElementById(`taskNumber_${id}`).target.style.backgroundColor = "#59F2F7";
    // endDragAnimation();
}


function addTaskBoard(){
    document.getElementById('popup-add-task-board').classList.remove('d-none');
    document.getElementById('close-add-task').innerHTML = addTaskHTMLBoard();
}


function addTaskHTMLBoard(){
    return `<div class="whiteBtn" onclick="closeAddTaskBoard()">Close <img src="../assets/img/clear.svg"></div>`;
}


function closeAddTaskBoard(){
    document.getElementById('popup-add-task-board').classList.add('d-none');
}

function taskPrio(prio) {
    switch (prio) {
        case 'Low':
            return `<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.49974 7.74524C8.30031 7.74557 8.10603 7.68367 7.94549 7.56863L0.376998 2.13467C0.278524 2.06391 0.195351 1.97498 0.132227 1.87296C0.069103 1.77094 0.0272642 1.65784 0.00909954 1.5401C-0.0275856 1.30232 0.0343859 1.06011 0.181381 0.866747C0.328377 0.67339 0.548355 0.544725 0.792923 0.509057C1.03749 0.47339 1.28661 0.533642 1.48549 0.676559L8.49974 5.7075L15.514 0.67656C15.6125 0.605795 15.7243 0.55458 15.8431 0.52584C15.962 0.4971 16.0855 0.491398 16.2066 0.509058C16.3277 0.526719 16.444 0.567397 16.5489 0.628769C16.6538 0.690142 16.7453 0.771007 16.8181 0.866748C16.8909 0.962489 16.9436 1.07123 16.9731 1.18677C17.0027 1.3023 17.0085 1.42236 16.9904 1.5401C16.9722 1.65784 16.9304 1.77094 16.8672 1.87296C16.8041 1.97498 16.721 2.06391 16.6225 2.13467L9.05398 7.56863C8.89344 7.68367 8.69917 7.74557 8.49974 7.74524Z" fill="#7AE229"/>
            <path d="M8.49998 12.5001C8.30055 12.5005 8.10628 12.4386 7.94574 12.3235L0.377242 6.88955C0.178366 6.74664 0.0460289 6.53276 0.00934368 6.29498C-0.0273415 6.0572 0.0346301 5.81499 0.181625 5.62163C0.328621 5.42827 0.548599 5.29961 0.793167 5.26394C1.03773 5.22827 1.28686 5.28853 1.48574 5.43144L8.49998 10.4624L15.5142 5.43144C15.7131 5.28853 15.9622 5.22827 16.2068 5.26394C16.4514 5.29961 16.6713 5.42827 16.8183 5.62163C16.9653 5.81499 17.0273 6.0572 16.9906 6.29498C16.9539 6.53276 16.8216 6.74664 16.6227 6.88956L9.05423 12.3235C8.89369 12.4386 8.69941 12.5005 8.49998 12.5001Z" fill="#7AE229"/>
            </svg>`;
        case 'Medium':
            return `<svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5685 6.66658L1.43151 6.66658C1.18446 6.66658 0.947523 6.56773 0.772832 6.39177C0.598141 6.21581 0.5 5.97716 0.5 5.72831C0.5 5.47947 0.598141 5.24081 0.772832 5.06485C0.947523 4.88889 1.18446 4.79004 1.43151 4.79004L16.5685 4.79004C16.8155 4.79004 17.0525 4.88889 17.2272 5.06485C17.4019 5.24081 17.5 5.47947 17.5 5.72831C17.5 5.97716 17.4019 6.21581 17.2272 6.39177C17.0525 6.56773 16.8155 6.66658 16.5685 6.66658Z" fill="#FFA800"/>
            <path d="M16.5685 2.2098L1.43151 2.2098C1.18446 2.2098 0.947523 2.11094 0.772832 1.93498C0.598141 1.75902 0.5 1.52037 0.5 1.27152C0.5 1.02268 0.598141 0.784025 0.772832 0.608065C0.947523 0.432105 1.18446 0.333252 1.43151 0.333252L16.5685 0.333252C16.8155 0.333252 17.0525 0.432105 17.2272 0.608065C17.4019 0.784025 17.5 1.02268 17.5 1.27152C17.5 1.52037 17.4019 1.75902 17.2272 1.93498C17.0525 2.11094 16.8155 2.2098 16.5685 2.2098Z" fill="#FFA800"/>
            </svg>`;
        case 'Urgent':
            return `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00026 5.25476C9.19969 5.25443 9.39397 5.31633 9.55451 5.43137L17.123 10.8653C17.2215 10.9361 17.3046 11.025 17.3678 11.127C17.4309 11.2291 17.4727 11.3422 17.4909 11.4599C17.5276 11.6977 17.4656 11.9399 17.3186 12.1333C17.1716 12.3266 16.9516 12.4553 16.7071 12.4909C16.4625 12.5266 16.2134 12.4664 16.0145 12.3234L9.00026 7.2925L1.98602 12.3234C1.88754 12.3942 1.7757 12.4454 1.65687 12.4742C1.53803 12.5029 1.41455 12.5086 1.29345 12.4909C1.17235 12.4733 1.05602 12.4326 0.951088 12.3712C0.846159 12.3099 0.754691 12.229 0.681906 12.1333C0.609122 12.0375 0.556445 11.9288 0.526885 11.8132C0.497325 11.6977 0.491459 11.5776 0.509623 11.4599C0.527789 11.3422 0.569626 11.2291 0.632752 11.127C0.695876 11.025 0.779049 10.9361 0.877524 10.8653L8.44602 5.43137C8.60656 5.31633 8.80083 5.25443 9.00026 5.25476Z" fill="#FF3D00" />
            <path d="M9.00002 0.499879C9.19945 0.499544 9.39372 0.561447 9.55427 0.676482L17.1228 6.11045C17.3216 6.25336 17.454 6.46724 17.4907 6.70502C17.5273 6.9428 17.4654 7.18501 17.3184 7.37837C17.1714 7.57173 16.9514 7.70039 16.7068 7.73606C16.4623 7.77173 16.2131 7.71147 16.0143 7.56856L9.00002 2.53761L1.98577 7.56856C1.78689 7.71147 1.53777 7.77173 1.2932 7.73606C1.04863 7.70039 0.828657 7.57173 0.681662 7.37837C0.534667 7.18501 0.472695 6.9428 0.509379 6.70502C0.546065 6.46723 0.678402 6.25336 0.87728 6.11044L8.44577 0.676482C8.60631 0.561447 8.80059 0.499544 9.00002 0.499879Z" fill="#FF3D00" />
        </svg>`;
        default:
            break;
    }
}



function renderCreatedTasksInnerHTML(task) {
    return /*html*/`
    <div onclick="taskDetails('taskNumber_${task['id']}')" id="taskNumber_${task['id']}" class="task" draggable="true" ondragend="disregardArea()" ondragstart="startDragging(${task['id']}), dragAnimation(${task['id']})">
        <span class="task-category" id="task-category${task['id']}">${task['category']}</span>
        <span class="task-title">${task['title']}</span>
        <span class="task-description">${task['description']}</span>
        <div class="task-subtasks">
            <div class="task-subtasks-progressbar">
                <div style="width: ${progressSubtasks(task)}%;"></div>
            </div>
            <span class="task-subtasks-progress">0/${task['openSubtask'].length+task['closedSubtask'].length} Done</span>
        </div>
        <div class="task-assigned-prio">
            <div class="task-assigned-to" id="task-assigned-to${task['id']}">
                <div>U1</div>
                <div>U2</div>
                <div>U3</div>
            </div>
            <div class="task-prio">
                ${taskPrio(task['prio'])}
            </div>
        </div>
    </div>
`;
}