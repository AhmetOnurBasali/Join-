let previousID = null;
let isAddTask = false;

function setSideBarFocus() {
    let sectionPathname = window.location.pathname;
    let sections = sectionPathname.split('/');
    let sectionName = sections[sections.length - 1].replace('.html', '');
    ifSummarySite(sectionName);
    ifBoardSite(sectionName);
    ifAddTaskSite(sectionName);
    ifContactsSite(sectionName);
    ifLegalSite(sectionName);
    ifHelpSite(sectionName);
}


function ifSummarySite(sectionName) {
    if (sectionName === "summary") {
        setTimeout(() => {
            setFocus("summary", "Side");
        }, 50);

        showGreetingUser();
    }
}


function ifBoardSite(sectionName) {
    if (sectionName === "board") {
        setFocus("board", "Side");
    }
}


function ifAddTaskSite(sectionName) {
    if (sectionName === "addTask") {
        setTimeout(() => {
            setFocus("addTask", "Side");
        }, 50);
        isAddTask = true;
    }
}


function ifContactsSite(sectionName) {
    if (sectionName === "contacts") {
        setTimeout(() => {
            setFocus("contacts", "Side");
        }, 50);
    }
}


function ifLegalSite(sectionName) {
    if (sectionName === "legal" && window.innerWidth > 1000) {
        setTimeout(() => {
            setFocus("legal", "Side");
        }, 10);
    }
}


function ifHelpSite(sectionName) {
    if (sectionName === "help") {
        let icon = document.getElementById('helpIcon')
        icon.classList.add('d-none')
    }
}


function setFocus(id, selectedID) {
    if (id !== 'contactContainer') {
        setFocusSideSection(id, selectedID);
    }

    setFocusContactContainer(id, selectedID);
    if (!isNaN(selectedID)) {
        previousID = selectedID;
    }
}


function setFocusSideSection(id, selectedID) {
    document.getElementById(`${id}${selectedID}`).focus();
    document.getElementById(`${id}${selectedID}`).classList.add("focusSidebar");
}


async function setFocusContactContainer(id, selectedID) {
    document.getElementById(`${id}${selectedID}`).focus();
    document.getElementById(`${id}${selectedID}`).classList.add("focusContact");
    document.getElementById(`${id}${selectedID}`).classList.remove("contactContainerhover");
    if (previousID !== null && previousID !== selectedID) {
        try {
            document.getElementById(`${id}${previousID}`).classList.remove("focusContact");
            document.getElementById(`${id}${previousID}`).classList.add("contactContainerhover");
            document.getElementById(`contactBubble${previousID}`).classList.remove("contactsBubbleBorder");
            document.getElementById(`${id}${selectedID}`).classList.remove("focusSidebar");
        } catch (error) {
        
        }
    }
}


function openLogout() {
    let logoutContainer = document.getElementById('headerPopupDiv')
    logoutContainer.classList.toggle('d-none')
    document.addEventListener('click', handleClickOutside)
}


function handleClickOutside(e) {//Die Funktion handleClickOutside wird aufgerufen, wenn es einen Klick gibt.
    let logoutContainer = document.getElementById('headerPopupDiv')//Der DOM-Element mit der ID headerPopupDiv wird in der Variable logoutContainer gespeichert.
    if (!e.target.closest('#headerPopupDiv') && !e.target.closest('#currentUserInitials')) {//Dann wird geprüft, ob das Element, auf das geklickt wurde, innerhalb des "headerPopupDiv"-Elements oder des "currentUserInitials"-Elements liegt. Wenn ja, wird nichts weiter gemacht.
        logoutContainer.classList.add('d-none')//  Wenn das geklickte Element nicht innerhalb dieser beiden Elemente liegt, wird die CSS-Klasse "d-none" dem "logoutContainer"-Element hinzugefügt, um es auszublenden.
        document.removeEventListener('click', handleClickOutside)//  Schließlich wird der Event-Listener für das "click"-Event entfernt, um zu verhindern, dass die Funktion erneut aufgerufen wird, wenn auf der Seite geklickt wird.
    }
}


function logout() {
    currentUser = ""
    localStorage.removeItem("currentUser")
    window.location.href = "/index.html?msg=Your Logout was successful";
}


function getInitialForHeader() {
    const initialLetters = currentUser.initialLetters;
    const color = currentUser.color;
    currentUserInitials.innerHTML = `
      <div onclick="openLogout()" style="background:${color}">${initialLetters}</div>
    `;
}

function goToEdit() {
    const name = currentUser.name;
    window.location.href = `contacts.html?edit=${name}`;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const nameToEdit = (getQueryParam('edit'));

if (nameToEdit) {
    setTimeout(() => {
        openContact('contactContainer', 0);
        openEditContact(0)
    }, 350);
}


function showCreateTaskBtnMobile() {
    let mobileBtn = document.getElementById('createTaskBtnMobile')
    let bubbleDiv = document.getElementById('loginContainer')
    if (mobileWidth() && isAddTask) {
        bubbleDiv.classList.add('d-none')
        mobileBtn.innerHTML = `
        <div onclick="createNewTask(event);">
            <button class="blueBtn">Create Task <img src="../assets/img/check.svg"></button>
        </div>`
    }
}


function hideCreateTaskBtnMobile() {
    let mobileBtn = document.getElementById('createTaskBtnMobile')
    let bubbleDiv = document.getElementById('loginContainer')
    bubbleDiv.classList.remove('d-none')
    mobileBtn.innerHTML = ""
    isAddTask = false;
}


function setFocusBubbleContact(selectedID) {
    document.getElementById(`contactBubble${selectedID}`).focus();
    document.getElementById(`contactBubble${selectedID}`).classList.add("contactsBubbleBorder");
}