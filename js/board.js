// let allTaskss = [
//     {
//         area: "todo",
//         assignedTo: "Philipp, Davide",
//         category: "Development",
//         creator: "Guest User",
//         date: "2023-02-24",
//         description: "lorem development lorem development lorem development lorem development lorem development",
//         id: 0,
//         prio: "High",
//         subtask: "",
//         title: "Website building",
//     },
//     {
//         area: "inProgress",
//         assignedTo: "Meier",
//         category: "Sales",
//         creator: "Guest User",
//         date: "2023-02-24",
//         description: "lorem Sales lorem Sales lorem Sales lorem Sales",
//         id: 1,
//         prio: "Low",
//         subtask: "",
//         title: "Call potencial clients",
//     },
//     {
//         area: "awaitingFeedback",
//         assignedTo: "Ahmet, Nick",
//         category: "Check",
//         creator: "Guest User",
//         date: "2023-02-24",
//         description: "lorem Check",
//         id: 2,
//         prio: "Normal",
//         subtask: "",
//         title: "Website checking",
//     },
//     {
//         area: "done",
//         assignedTo: "Alina",
//         category: "Design",
//         creator: "Guest User",
//         date: "2023-02-24",
//         description: "lorem Design lorem Design lorem Design",
//         id: 3,
//         prio: "High",
//         subtask: "Website building",
//         title: "Website design",
//     },
// ]

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
}

function renderCreatedTasks(area, task) {
    area.innerHTML += renderCreatedTasksInnerHTML(task);
    setTitleBg(task);
}


function allowDrop(ev, area) {
    ev.preventDefault();
    currentAreaOndragover = area;
}


function startDragging(id) {
    currentDraggedElement = id;
    
    dragAnimation(id);
}


async function moveTo() {
    allTasks[currentDraggedElement]['area'] = currentAreaOndragover;
    renderBoard();

    await backend.setItem("allTasks", allTasks);
}


function setTitleBg(task){
    document.getElementById(`task-category${task['id']}`).style.backgroundColor = `${task['titleBg']}`;
}


function dragAnimation(id){
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
    // document.getElementById(`taskNumber_${id}`).style.rotate = '10deg';
}


function highlightArea(areaID){
    // disregardArea();
    document.getElementById(`${areaID}`).style.backgroundColor = 'grey';
    
    if (taskPreview == false) {
        document.getElementById(`${areaID}`).innerHTML = `<div class="task-preview" id="test"></div>`;
        taskPreview = true;
    }
    
}

function disregardArea(){
    document.getElementById('tasks-to-do').style.backgroundColor = '#F5F5F5';
    document.getElementById('tasks-in-progress').style.backgroundColor = '#F5F5F5';
    document.getElementById('tasks-awaiting-feedback').style.backgroundColor = '#F5F5F5';
    document.getElementById('tasks-done').style.backgroundColor = '#F5F5F5';
    taskPreview = false;
    document.getElementById(`${areaID}`).innerHTML = '';
}

function renderCreatedTasksInnerHTML(task) {
    return /*html*/`
    <div id="taskNumber_${task['id']}" class="task" draggable="true" ondragend="disregardArea()" ondragstart="startDragging(${task['id']})">
        <span class="task-category" id="task-category${task['id']}">${task['category']}</span>
        <span class="task-title" id="task-title">${task['title']}</span>
        <span class="task-description" id="task-description">${task['description']}</span>
        <div class="task-subtasks">
            <div class="task-subtasks-progressbar">
                <div></div>
            </div>
            <span class="task-subtasks-progress">1/2 Done</span>
        </div>
        <div class="task-assigned-prio">
            <div class="task-assigned-to">
                <div>U1</div>
                <div>U2</div>
                <div>U3</div>
            </div>
            <div class="task-prio" id="task-prio">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00026 5.25476C9.19969 5.25443 9.39397 5.31633 9.55451 5.43137L17.123 10.8653C17.2215 10.9361 17.3046 11.025 17.3678 11.127C17.4309 11.2291 17.4727 11.3422 17.4909 11.4599C17.5276 11.6977 17.4656 11.9399 17.3186 12.1333C17.1716 12.3266 16.9516 12.4553 16.7071 12.4909C16.4625 12.5266 16.2134 12.4664 16.0145 12.3234L9.00026 7.2925L1.98602 12.3234C1.88754 12.3942 1.7757 12.4454 1.65687 12.4742C1.53803 12.5029 1.41455 12.5086 1.29345 12.4909C1.17235 12.4733 1.05602 12.4326 0.951088 12.3712C0.846159 12.3099 0.754691 12.229 0.681906 12.1333C0.609122 12.0375 0.556445 11.9288 0.526885 11.8132C0.497325 11.6977 0.491459 11.5776 0.509623 11.4599C0.527789 11.3422 0.569626 11.2291 0.632752 11.127C0.695876 11.025 0.779049 10.9361 0.877524 10.8653L8.44602 5.43137C8.60656 5.31633 8.80083 5.25443 9.00026 5.25476Z" fill="#FF3D00"/>
                <path d="M9.00002 0.499879C9.19945 0.499544 9.39372 0.561447 9.55427 0.676482L17.1228 6.11045C17.3216 6.25336 17.454 6.46724 17.4907 6.70502C17.5273 6.9428 17.4654 7.18501 17.3184 7.37837C17.1714 7.57173 16.9514 7.70039 16.7068 7.73606C16.4623 7.77173 16.2131 7.71147 16.0143 7.56856L9.00002 2.53761L1.98577 7.56856C1.78689 7.71147 1.53777 7.77173 1.2932 7.73606C1.04863 7.70039 0.828657 7.57173 0.681662 7.37837C0.534667 7.18501 0.472695 6.9428 0.509379 6.70502C0.546065 6.46723 0.678402 6.25336 0.87728 6.11044L8.44577 0.676482C8.60631 0.561447 8.80059 0.499544 9.00002 0.499879Z" fill="#FF3D00"/>
                </svg>
            </div>
        </div>
    </div>
`;
}