import Todo from "./todo.js";
import Projects from "./projects.js";

class dom {

  content;

  constructor (content) {
    this.content = document.querySelector(content);
  }

  createTodo () {
    const todo = document.createElement("div");
    const title = document.createElement("input");
    const description = document.createElement("textarea");
    const duedate = document.createElement("input");
    const priority = document.createElement("input");
    const notes = document.createElement("input");
    const checklist = document.createElement("input");
    const done = document.createElement("input");
    const projects = document.createElement("input");
    todo.classList.add("todo");
    // add placeholders
    title.placeholder = "title";
    description.placeholder = "description";
    priority.placeholder = "priority";
    notes.placeholder = "notes";
    // modify types
    duedate.type = "date";
    done.type = "checkbox";


    const todoProperties = [
      title, description, duedate, priority, notes, checklist, projects, done
    ]

    this.content.appendChild(todo);
    for (const item of todoProperties) {
      todo.appendChild(item);
    }
  }
}

export default dom;
