setURL("https://gruppe-446.developerakademie.net/smallest_backend_ever");
let users = [];
let currentUser = [];
let allTasks = [{id: 0}];
let categoryColor = [];


async function init() {
    await loadCurrentUser();    
}

