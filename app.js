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
  form.addEventListener('submit', addTask); //// Add task event
  taskList.addEventListener('click', removeTask); //// Remove task event
}

function addTask(e) { //* Add task function
  if (taskInput.value === '') { // Checking user input field
    alert('Add a task');
  }
  const li = document.createElement('li'); // Create li element. "Task"
  li.className = 'collection-item'; // Add class name to created li
  li.appendChild(document.createTextNode(taskInput.value)); // Create text node & append to li
  const link = document.createElement('a'); //* Create new link element for clearing tasks
  link.className = 'delete-item secondary-content'; //* Add class name. For materialize CSS we need secondary-content to put the link on the right of the content
  link.innerHTML = '<i class = "fa fa-remove"></i>'; //* Add icon [X] HTML 
  li.appendChild(link) //* Append link to li

  taskList.appendChild(li) // Append li to ul [collection]

  taskInput.value = ''; // Clear input

  e.preventDefault(); // Prevent default behavior 
}

function removeTask(e) { //// Remove task function
  // If function to target the [X] icon for 'click'
  if (e.target.parentElement.classList.contains('delete-item')) {

  }

}