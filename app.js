// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
  //* Add task event
  form.addEventListener('submit', addTask);
}

function addTask(e) {
  if (taskInput.value === '') { // Checking user input field
    alert('Add a task');
  }

  const li = document.createElement('li'); //* Create li element
  li.className = 'collection-item'; // Add class
  //* Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //* Create new link element for clearing tasks
  const link = document.createElement('a');
  //* Add class
  link.className = 'delete-item secondary-content'; //* For materialize CSS we need secondary-content to put the link on the right of the content
  link.innerHTML = '<i class = "fa fa-remove"></i>'; //* Add icon HTL
  li.appendChild(link) //* Append link to li

  taskList.appendChild(li) //* Append li to ul

  taskInput.value = ''; //* Clear input

  e.preventDefault(); // Prevent default behavior 
}
