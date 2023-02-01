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
      <div onclick="loadNotice()" onclick="" id="4" class="notice"><img class="notice-img"
              src="../assets/img/Group 4.png">
          <span>Legal Notice</span>
      </div>
  </div>
</div>
    `;
}

function addTaskHTML() {
  return /*html*/ `
    <div >
            <form class="addTaskContainer" onsubmit="createNewTask(event)"div>
            <div>
                <h1>Add Task</h1>
            </div>

            <div class="leftAndRightConatiner">    
                <div class="leftSection">
                    <div>Title 
                    <input id="title" type="text" required>
                    </div>
                    <div>Description
                     <input id="description" type="text" required>
                     </div>
                    <div>Category 
                    <input id="category" type="" required>
                    </div>
                    <div>Assigned to 
                    <input id="assignedTo" type="" required>
                    </div>
                </div>

                <div class="rightSection">
                    <div >Due date 
                        <input id="date" type="date" required>
                    </div>
                    <div class="prio">Prio
                        <div style="display:flex">
                          <div class="checkboxContainer">
                            <input onclick="urgentBtnCheckBox()" id="urgentBtn" class="checkboxPosi" type="checkbox">Urgent</div><!--required Problem-->
                            <div class="checkboxContainer">
                              <input onclick="mediumBtnCheckBox()" id="mediumBtn" class="checkboxPosi" type="checkbox">Medium</div><!--required Problem-->
                            <div class="checkboxContainer">
                              <input onclick="lowBtnCheckBox()" id="lowBtn" class="checkboxPosi" type="checkbox">Low</div><!--required Problem-->
                        </div>
                    </div>
                    <div >Subtasks 
                        <input id="subtask" type="" required>
                    </div>
                </div>
            </div>
       <div class="addTaskBtns">
          <div>
            <button onclick="clearTask()">Clear x</button>
          </div>
          <div>
            <button>Create Task</button>
          </div>
        </div> 
      </div>
            </form>
        
      </div>
        `;
}
