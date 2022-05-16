let form = document.getElementById("form");
let task_name = document.getElementById("task_name");
let date = document.getElementById("date");
let description = document.getElementById("description");
let required = document.getElementById("required");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (task_name.value === "") {
    required.innerHTML = "Field cannot be empty.Please enter task name.";
  } else {
    required.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: task_name.value,
    date: date.value,
    description: description.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y} class="task_input">
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p class="para">${x.description}</p>

  <span class="options">

            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit">Edit</i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt">Delete</i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  task_name.value = selectedTask.children[0].innerHTML;
  date.value = selectedTask.children[1].innerHTML;
  description.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  task_name.value = "";
  date.value = "";
  description.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  createTasks();
})();
