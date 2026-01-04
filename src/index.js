import "./style.css";
import DomManipulator from "./todo-dom.js";
import homepage from "./homepage.js";

homepage();

window.domManipulator = new DomManipulator(".container");
window.domManipulator.createTodo();

const addBtn = document.querySelector("#add-todo");

addBtn.addEventListener("click", () => {window.domManipulator.createTodo()});
