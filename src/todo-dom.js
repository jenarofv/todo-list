import Todo from "./todo.js";
import Projects from "./projects.js";

class DomManipulator {

  content;

  constructor (content) {
    this.content = document.querySelector(content);
  }

  createTodo () {
    const todo = document.createElement("div");
    const title = document.createElement("input");
    const description = document.createElement("input");
    const duedate = document.createElement("input");
    const priority = document.createElement("input");
    const notes = document.createElement("input");
    const checklist = document.createElement("input");
    const done = document.createElement("input");
    const projects = document.createElement("input");
    todo.classList.add("todo");
    this.content.appendChild(todo);
  }
}

export default DomManipulator;
