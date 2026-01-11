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

export default function (divClass) {
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  const main = document.createElement("main");
  const addBtn = document.createElement("button");
  const newTodoContainer = document.createElement("div");
  const createdTodos = document.createElement("div");
  createdTodos.id = "created-todos";
  addBtn.id = "add-todo";
  addBtn.classList.add("with-margins");
  addBtn.textContent = "Create Todo";
  addBtn.addEventListener("click", addToTodos);
  main.classList.add(divClass);
  title.innerText = "Todo List";
  body.appendChild(title);
  body.appendChild(main);
  const todoDom = new Dom(`.${divClass}`);
  todoDom.addBlankTodo();
  main.appendChild(addBtn);
  body.appendChild(createdTodos);
}
