const easyHttp = new EasyHTTP();

const taskList = document.querySelector("ul.task-list");
let completed = 0;
let incompleted = 0;

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  document.querySelector(".save_task").addEventListener("click", saveTask);
  taskList.addEventListener("click", removeTask);
}

//Get Tasks when page reloaded
async function getTasks(e) {
  try {
    const res = await easyHttp.get("/tasks");
    res.forEach((task) => createTask(task));
  } catch (err) {
    console.error(err);
  }
}

//Saving the task in the database
async function saveTask(e) {
  let task = document.querySelector("#newTask").value;
  const body = {
    description: task,
  };
  try {
    const res = await easyHttp.post("/tasks", body);
    const savedTask = await res.json();
    if (res.status === 201) {
      createTask(savedTask);
    }
  } catch (err) {
    console.log(err);
  }
  e.preventDefault();
}

const createTask = (task) => {
  const li = document.createElement("li");
  li.className = `list-group-item bg-light`;
  li.setAttribute("id", task._id);
  let p = document.createElement("p");
  if (task.completed) {
    p.className = `text-success`;
    completed = completed + 1;
    document.querySelector(".completed_tasks").innerHTML = `${completed}`;
  } else {
    p.className = `text-danger`;
    incompleted = incompleted + 1;
    document.querySelector(".incompleted_tasks").innerHTML = `${incompleted}`;
  }
  p.appendChild(document.createTextNode(task.description));
  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.innerHTML = '<span class="close">&times;</span>';
  p.appendChild(a);
  li.appendChild(p);

  //Append li to ul
  taskList.appendChild(li);
  document.querySelector("#newTask").value = "";
};

async function removeTask(e) {
  try {
    if (e.target.classList.contains("close")) {
      const res = await easyHttp.delete(
        `/tasks/${e.target.parentElement.parentElement.parentElement.id}`
      );
      if (res === 202) {
        e.target.parentElement.parentElement.parentElement.remove();
        location.reload();
      } else {
        throw new Error("Something went wrong, deletion was not possible!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
  e.preventDefault();
}
