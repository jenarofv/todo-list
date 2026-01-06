import "./style.css";
import dom from "./dom.js";
import homepage from "./homepage.js";

homepage();

window.dom = new dom(".container");
window.dom.addBlankTodo();

const addBtn = document.querySelector("#add-todo");

// addBtn.addEventListener("click", () => {window.dom.createTodo()});
