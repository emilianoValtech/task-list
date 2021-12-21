//Define UI Vars

const form = document.querySelector('#task-form');
const taksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners()

//load all

function loadEventListeners(){
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event
    form.addEventListener('submit', addTask)
    //remove task event
    taksList.addEventListener('click', removeTask)
    //remove all tasks
    clearBtn.addEventListener('click', clearTasks)
    //filter event
    filter.addEventListener('keyup', filterTasks)

}

//Get task function
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        console.log(task)
        //create li element
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create text node and append to the li
        li.appendChild(document.createTextNode(task))
        //create new link
        const link = document.createElement('a');
        //add a class
        link.className = 'delete-item secondary-content';
        //add icon HTML
        link.innerHTML = '<i class="fas fa-minus"></i>'
        //append the link to the li
        li.appendChild(link)
        //apend the li to the ul
        taksList.appendChild(li)
    })
}

function addTask(e){
    e.preventDefault()
    if(taskInput.value === ''){
        alert('Add a task')
        return;
    };

    //create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value))
    //create new link
    const link = document.createElement('a');
    //add a class
    link.className = 'delete-item secondary-content';
    //add icon HTML
    link.innerHTML = '<i class="fas fa-minus"></i>'
    //append the link to the li
    li.appendChild(link)
    //apend the li to the ul
    taksList.appendChild(li)
    //store in local storage
    storeTaskInLocalStorage(taskInput.value)
    //clear the input
    taskInput.value = '';
}

//Store function

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove()
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks(){
    // taksList.innerHTML = '';

    //faster way
    while(taksList.firstChild){
        taksList.removeChild(taksList.firstChild)
    }

    clearTasksFromLocaleStorage()
}

function clearTasksFromLocaleStorage(){
    localStorage.clear()
}

function filterTasks(e){
    //read the input and lower case it to have no differences
    const inputValue = e.target.value.toLowerCase()

    //select all the collection items and loop them with foreach
    document.querySelectorAll('.collection-item').forEach(function(task){
        //loop through all the items and text content
        const item = task.firstChild.textContent;
        //make a condition based on idexOf to show the item if there is a coincidence
        if(item.toLowerCase().indexOf(inputValue) != -1){
            task.style.display = 'block'
        }else {
            //if no coincidence hide it
            task.style.display = 'none'
        }
    })
}