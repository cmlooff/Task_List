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
  document.addEventListener('DOMContentLoaded', getTasks) //// DOM Load Event
  form.addEventListener('submit', addTask); //// Add task event
  taskList.addEventListener('click', removeTask); //// Remove task event
  clearBtn.addEventListener('click', clearTasks); //// Clear task event
  filter.addEventListener('keyup', filterTasks); //// Filters tasks
}

function getTasks() { ////Get Tasks from LS
  let tasks;
  if (localStorage.getItem('tasks') === null) { // Initialize tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    li.appendChild(link) //* Append link to li
    taskList.appendChild(li) // Append li to ul [collection]
  });

}

function addTask(e) { //* Add task function
  if (taskInput.value === '') { // Checking user input field
    alert('Add a task');
  }
  const li = document.createElement('li'); // Create li element. "Task"
  li.className = 'collection-item'; // Add class name to created li
  li.appendChild(document.createTextNode(taskInput.value)); // Create text node & append to li
  const link = document.createElement('a'); //* Create new link element for clearing tasks. [X]
  link.className = 'delete-item secondary-content'; //* Add class name [X]. For materialize CSS we need secondary-content to put the link on the right of the content
  link.innerHTML = '<i class = "fa fa-remove"></i>'; //* Add icon [X] 

  li.appendChild(link) //* Append link to li
  taskList.appendChild(li) // Append li to ul [collection]

  storeTaskInLocalStorage(taskInput.value); //? Store in Local Storage

  taskInput.value = ''; // Clear input
  e.preventDefault(); // Prevent default behavior 
}

function storeTaskInLocalStorage(task) { //// Store task in LS
  let tasks;
  if (localStorage.getItem('tasks') === null) { // Initialize tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    //! Set tasks to w/e in local storage. But LS only stores strings
    //! So have to use JSON.parse
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Have to stringify to store in LS

}

function removeTask(e) { //// Remove task function
  // If the parent element [<a> tag] contains the class name 'delete item'
  //* This targets the [X] icon
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      // deleteItem -> parentElement [<a> tag] -> parentElement [<li>]
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // Initialize tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() { //// Clear task function
  //* Two ways to do this
  //? First method
  // taskList.innerHTML = ''; //* taskList is connected to .collection

  //? Second method (Faster)
  while (taskList.firstChild) { // While there is a child/list
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage(); ////Clear from local storage
}

function clearTasksFromLocalStorage() { //// Clears tasks from local storage via button
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase(); // Give us w/e is being typed in

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}