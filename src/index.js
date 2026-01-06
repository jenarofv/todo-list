import "./style.css";
import Dom from "./dom.js";
import homepage from "./homepage.js";

homepage();

window.Dom = new Dom(".container");
window.Dom.addBlankTodo();

const addBtn = document.querySelector("#add-todo");
