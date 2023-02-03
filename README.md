# Join
--Mini-Backend--
https://github.com/JunusErgin/smallest_backend_ever

Live server & Allow CORS nicht vergessen zu aktivieren!!


-VORSICHT--DATEN VOM BACKENDLÖSCHEN-
deleteUser('users')
async function deleteUser() {
  await backend.deleteItem('users', currentUser);
}

deleteUser('allTasks')
async function deleteUser() {
  await backend.deleteItem('allTasks');
}

deleteUser('users')
async function deleteUser() {
  await backend.deleteItem('users');
}
-


-Add a user with this function:

function addUser() {
    users.push('John');
    backend.setItem('users', JSON.stringify(users));
}
--
