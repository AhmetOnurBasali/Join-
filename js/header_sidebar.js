let previousID = null;

if (window.location.pathname === window.location.pathname) {
    let sectionPathname = window.location.pathname;
    let sections = sectionPathname.split('/');
    let sectionName = sections[sections.length - 1].replace('.html', '');
    if (sectionName === "summary") {
        setTimeout(() => {
            setFocus("summary", "Side")
        }, 100);
    }
    if (sectionName === "board") {
        setTimeout(() => {
            setFocus("board", "Side")
        }, 100);
    }
    if (sectionName === "addTask") {
        setTimeout(() => {
            setFocus("addTask", "Side")
        }, 100);
    }
    if (sectionName === "contacts") {
        setTimeout(() => {
            setFocus("contacts", "Side")
        }, 100);
    }
}


function setFocus(id, selectedID) {
    if (id !== 'contactContainer') {
        document.getElementById(`${id}${selectedID}`).focus();
        document.getElementById(`${id}${selectedID}`).classList.add("focusSidebar");
    } if (id == 'contactBubble') {
        document.getElementById(`contactBubble${selectedID}`).focus();
        document.getElementById(`contactBubble${selectedID}`).classList.add("contactsBubbleBorder");
    }
    document.getElementById(`${id}${selectedID}`).focus();
    document.getElementById(`${id}${selectedID}`).classList.add("focusContact");
    document.getElementById(`${id}${selectedID}`).classList.remove("contactContainerhover");
    if (previousID !== null && previousID !== selectedID) {
        document.getElementById(`${id}${previousID}`).classList.remove("focusContact");
        document.getElementById(`${id}${previousID}`).classList.add("contactContainerhover");
        document.getElementById(`contactBubble${previousID}`).classList.remove("contactsBubbleBorder");
        document.getElementById(`${id}${selectedID}`).classList.remove("focusSidebar");
    }
    if (!isNaN(selectedID)) {
        previousID = selectedID;
    }
}