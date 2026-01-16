import Todo from "./todo.js";
import Dom from "./dom.js";
import BlankTodo from "./BlankTodo.js";
import Projects from "./projects.js";
import StorageHandler from "./StorageHandler.js";

let todoList = StorageHandler.loadTodos();
const projects = new Projects();
const todoForm = new BlankTodo();
const idSet = todoList.reduce(
  (set, todo) => {
    set.add(todo.id);
    return set;
  },
  new Set()
)

const myDom = new Dom(todoList);

function generateID (idSet) {
  const chars = "abcdefghijklmnoprqstuvwxyz0123456789";
  const numOfCharacters = chars.length;
  while (true) {
    let randomID= "";
    for (let i = 0; i < 12; i++) {
      randomID += chars[Math.floor(Math.random() * numOfCharacters)];
    }
    if (!(randomID in idSet)) {
      return randomID;
    }
  }

}

function addToTodos (event) {
  const title = document.querySelector("#title").value;
  const dueDate = document.querySelector("#due-date").value;
  const description = document.querySelector("#description").value;
  const notes = document.querySelector("#notes").value;
  const prio = document.querySelector("#priority").value;
  const checklistString = document.querySelector("#checklist").value;
  const projectsString = document.querySelector("#projects").value;
  const createdTodos = document.querySelector("#created-todos");

  let checklistObj = {};
  if (checklistString !== "") {
    checklistObj = checklistString
                          .split("\n")
                          .reduce((acc, cur) => {
                            acc[cur] = false;
                            return acc;
                          }, {});
  }
  const todoId = generateID(idSet);

  const todo = new Todo(todoId, title, description, dueDate, prio, notes, checklistObj,
    projectsString
  );
  const todoProjects = todo.projects;
  todoProjects.forEach(element => {
    projects.addProject(element);
  });
  StorageHandler.saveProjects(projects.projects);
  myDom.addTodo(todo);
  StorageHandler.saveTodos(myDom.todoList);
  const todoElement = Dom.renderTodo(todo);
  createdTodos.appendChild(todoElement);
  todoForm.clear();
}

function layout () {
  const main = document.createElement("main");
  const header = document.createElement("div");
  header.id = "header";
  header.style.position = "fixed";
  header.style.width = "100%";
  header.style.top = "0";
  const sidePanel = document.createElement("div");
  sidePanel.id = "panel";
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  title.innerText = "Todo List";
  header.appendChild(title);
  body.appendChild(header);
  body.appendChild(sidePanel);
  body.appendChild(main);
  main.style.marginTop = `${header.offsetHeight + 10}px`;
}

export default function (divClass) {
  layout();
  const body = document.querySelector("body");
  const main = document.querySelector("main");
  const addBtn = document.createElement("button");
  const createdTodos = document.createElement("div");
  createdTodos.id = "created-todos";
  addBtn.id = "add-todo";
  addBtn.classList.add("with-margins");
  addBtn.classList.add("blue-bg");
  addBtn.textContent = "Create Todo";
  addBtn.addEventListener("click", addToTodos);
  main.classList.add(divClass);
  main.classList.add("with-margins");
  todoForm.render(main);
  main.appendChild(addBtn);
  body.appendChild(createdTodos);
  todoList.forEach(todo => {
    createdTodos.appendChild(myDom.renderTodo(todo));
  });
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(x => {
    x.addEventListener("click", event => {
      const confirmation = window.confirm("Do you really want to delete this item?");
      if (confirmation) {
        const todo = event.target.parentElement;
        const id = todo.id;
        todoList = todoList.filter(todo => todo.id !== id);
        StorageHandler.saveTodos(todoList);
        todo.remove();
      }
    })
  });
}
