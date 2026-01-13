import Todo from "./todo.js";
import Dom from "./dom.js";
import BlankTodo from "./BlankTodo.js";

const todoList = [];
const todoForm = new BlankTodo();

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

  const todo = new Todo(title, description, dueDate, prio, notes, checklistObj,
    projectsString
  );
  todoList.push(todo);
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
}
