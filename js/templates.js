async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

async function initTemplates() {
  await includeHTML();
  try {
    document.getElementById("addTask").innerHTML = addTaskHTML();
    document.getElementById("header").innerHTML = headerHTML();
    document.getElementById("sidebar").innerHTML = sidebarHTML();
  } catch (error) {
    document.getElementById("header").innerHTML = headerHTML();
    document.getElementById("sidebar").innerHTML = sidebarHTML();
  }
}

function headerHTML() {
  return /*html*/`
  <div class="header">
  <div class="Parent-Kanban">
      <span class="Kanban">
          Kanban Project Management Tool
      </span>
  </div>
  <div class="help-log-parent">
      <div onclick="loadHelp()" id="help-img" class="help-img"><img src="../assets/img/Vector-.png"></div>
      <div class="log-in">
          <div class="log-in-img"><img style="width: 45px;" src="../assets/img/twitter-48.png"></div>
      </div>
  </div>
</div>
    `;
}

function sidebarHTML() {
  return /*html*/`
  <div class="Sidebar">
  <div>
      <div class="Parent-Logo">
          <img src="../assets/img/Capa 2.png">
      </div>
      <div>
          <a id="Summary" onclick="loadSummary()" id="0" href="../html/summary.html"><img class="link-img"
                  src="../assets/img/Summary.png">Summary</a><br>
          <a id="Board" onclick="loadBoard()" id="1" href='../html/board.html'><img class="link-img"
                  src="../assets/img/Board.png">Board</a><br>
          <a id="Add-Task" onclick="loadAddTask()" id="2" href="../html/addTask.html"><img style="margin-right: 10px;" class="link-img"
                  src="../assets/img/Add_Task.png">Add Task</a><br>
          <a id="Contacts" onclick="loadContacts()" id="3" href="../html/contacts.html"><img class="link-img"
                  src="../assets/img/Contacts.png">Contacts</a><br>
      </div>
  </div>
  <div class="notice-parent">
      <div onclick="loadNotice()" onclick="" id="4" class="notice"><img class="notice-img" src="../assets/img/Group 4.png">
          <span>Legal Notice</span>
      </div>
  </div>
</div>
    `;
}

function addTaskHTML() {
  return /*html*/ `
  <div >
    <form class="addTaskContainer" onsubmit="createNewTask(event)">
      <div class="paddLeRe40px">
        <h1>Add Task</h1>
      </div>
      <div class="leftAndRightConatiner">    
        <div class="leftSection">
          <div class="inputContainer">
            <b>Title</b> 
            <input id="title" type="text" required>
          </div>
          <div class="inputContainer">
            <b>Description</b>
            <input id="description" type="text" required>
          </div>
          <div class="inputContainer">
            <b>Category</b> 
            <input onclick="openCategory()" id="category" placeholder="Select task category"  required>
          </div>
          <div class="inputContainer">
            <b>Assigned to</b> 
            <input id="assignedTo" type="" required>
          </div>
        </div>
        <div class="rightSection">
          <div class="inputContainer" >
            <b>Due date</b> 
            <input id="date" type="date" required>
          </div>
          <div class="prio">
            <b>Prio</b>
            <div style="display: flex; justify-content: space-between;">
              <div class="checkboxContainer">
                <input onclick="urgentBtnCheckBox()" id="urgentBtn" class="checkboxPosi" type="checkbox"> 
                <img class="checkboxContainerimg" src="../assets/img/urgentPrio.svg" >
              </div><!--required Problem-->
              <div class="checkboxContainer">
                <input onclick="mediumBtnCheckBox()" id="mediumBtn" class="checkboxPosi" type="checkbox">
                <img class="checkboxContainerimg" src="../assets/img/mediumPrio.svg" >
              </div><!--required Problem-->
              <div class="checkboxContainer">
                <input onclick="lowBtnCheckBox()" id="lowBtn" class="checkboxPosi" type="checkbox">
                <img class="checkboxContainerimg" src="../assets/img/lowPrio.svg" >
              </div><!--required Problem-->
          </div>
        </div>
        <div class="inputContainer" >
          <b>Subtasks</b> 
            <input id="subtask" type="" required>
        </div>
      </div>
    </div>
      <div class="addTaskBtns">
        <div class="paddLeRe40px">
          <div class="whiteBtn" onclick="clearTask()">Clear x</div>
        </div>
          <div>
            <button class="blueBtn">Create Task</button>
          </div>
        </div> 
      </div>
    </form>
  </div>
        `;
}
