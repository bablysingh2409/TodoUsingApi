const form = document.querySelector('.form');
const todoInput = document.querySelector('.todo-input');
const listContainer = document.querySelector('.list-container');
const totalData = document.querySelector('.total-data');

let tasks = [];

async function fetchedTodo() {
  // fetch('https://jsonplaceholder.typicode.com/todos')
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     tasks = data.slice(0, 10);
  //     render();
  //   })
  //   .catch((err) => {
  //   console.log(err);
  // });
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks = data.slice(0, 10);
    render();
  } catch (err) {
    console.log(err);
  }
}
fetchedTodo();

//creating item
function addItem(e) {
  e.preventDefault();
  listContainer.innerHTML = '';
  let task = {
    id: Date.now(),
    title: todoInput.value,
    completed: false,
  };
  tasks.push(task);
  render();
  todoInput.value = '';
}

//adding list to dom
function addTaskToDom(task) {
  let li = document.createElement('li');
  li.innerHTML = `
  <input type="checkbox" class='check-box' id=${task.id} ${task.completed ? 'checked' : ''}/>
  <label class="todo-name" for=${task.id}>${task.title}</label>
  <i class="fa-solid fa-trash dustbin" data-id=${task.id}></i>
`;
  li.classList.add('list');
  listContainer.append(li);
}

//rendering list
function render() {
  listContainer.innerHTML = '';
  totalData.textContent = tasks.length;
  tasks.forEach((task, i) => {
    addTaskToDom(task);
  });
}

//remove
function removeTodo(id) {
  id = +id;
  let newTasks = tasks.filter((task) => {
    return task.id !== id;
  });
  tasks = newTasks;
  render();
}

//checked
function toggleTask(id) {
  id = +id;
  let newTasks = tasks.filter((task) => {
    return task.id === id;
  });
  newTasks[0].completed = !newTasks[0].completed;
  render();
  return;
}

//handling events
function handleEvent(e) {
  let target = e.target;
  if (target.classList.contains('dustbin')) {
    let id = target.getAttribute('data-id');
    removeTodo(id);
  } else if (target.classList.contains('check-box')) {
    let id = target.getAttribute('id');
    toggleTask(id);
  }
}

function events() {
  form.addEventListener('submit', addItem);
  listContainer.addEventListener('click', handleEvent);
}
events();
