

function closeAddNewContact(){
    let container = document.getElementById('addContactPopup')
    container.classList.add('d-none')
}

function openAddNewContact(){
    let container = document.getElementById('addContactPopup')
    container.classList.remove('d-none')
}