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


<!-- Änderung newArea -->

1. In allen Klammern der funktionen (Übergabeparameter) 'area' und 'newArea' gelöscht.

2. Script von addTask.html zu addtask.js verschoben (ist das selbe nur übersichtlicher).

3. Onclick Funktion von Aside Header 'loadAddTask()' verwendet um globale variable -> newArea Zeile 12 von addTask.js standardmäßig Zeile 22-24 "todo" zuzuweisen und 


5. Header und Aside header z-index auf 2 damit immer über text