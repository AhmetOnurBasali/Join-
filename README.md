# Join
--Mini-Backend--
https://github.com/JunusErgin/smallest_backend_ever

Live server & Allow CORS nicht vergessen zu aktivieren!!


-VORSICHT-
-ALLE DATEN VOM BACKENDLÖSCHEN
deleteUser('users')
async function deleteUser() {
  await backend.deleteItem('users', users);
}
-


-Add a user with this function:

function addUser() {
    users.push('John');
    backend.setItem('users', JSON.stringify(users));
}
--
