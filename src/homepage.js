import Todo from "./todo.js";
import Dom from "./dom.js";

const todoList = [];

function addToTodos (event) {
  const main = document.querySelector("main");
  const title = document.querySelector("#title").value;
  const dueDate = document.querySelector("#due-date").value;
  const description = document.querySelector("#description").value;
  const notes = document.querySelector("#notes").value;
  const prio = document.querySelector("#priority").value;
  const checklist = document.querySelector("#checklist").value;
  const projects = document.querySelector("#projects").value;
  const createdTodos = document.querySelector("#created-todos");

  const todo = new Todo(title, description, dueDate, prio, notes, checklist);
  todoList.push(todo);
  const todoElement = Dom.renderTodo(todo);
  createdTodos.appendChild(todoElement);
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
  addBtn.textContent = "Create Todo";
  addBtn.addEventListener("click", addToTodos);
  main.classList.add(divClass);
  main.classList.add("with-margins");
  const todoDom = new Dom(`.${divClass}`);
  todoDom.addBlankTodo();
  main.appendChild(addBtn);
  body.appendChild(createdTodos);
}
