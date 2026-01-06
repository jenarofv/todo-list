import Todo from "./todo.js";
import dom from "./dom.js";

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

  const todo = new Todo(title, description, dueDate, prio, notes, checklist);
  todoList.push(todo);
  const todoElement = Dom.renderTodo(todo);
  main.appendChild(todoElement);
}

export default function () {
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  const main = document.createElement("main");
  const addBtn = document.createElement("button");
  addBtn.id = "add-todo";
  addBtn.textContent = "Create Todo";
  addBtn.addEventListener("click", addToTodos);
  main.classList.add("container");
  title.innerText = "Todo List";
  body.appendChild(title);
  body.appendChild(main);
  body.appendChild(addBtn);
}
