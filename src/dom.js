import Todo from "./todo.js";
import Projects from "./projects.js";

class dom {

  content;

  constructor (content) {
    this.content = document.querySelector(content);
  }

  #addTitle (parent) {
    const div = document.createElement("div");
    const title = document.createElement("input");
    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.textContent = "Title";
    title.id = "title";
    parent.appendChild(div);
    div.appendChild(titleLabel);
    div.appendChild(title);
  }

  #addDescription (parent) {
    const div = document.createElement("div");
    const description = document.createElement("textarea");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "description";
    descriptionLabel.textContent = "description";
    description.id = "description";
    parent.appendChild(div);
    div.appendChild(descriptionLabel);
    div.appendChild(description);
  }

  #addDueDate (parent) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = "due-date";
    label.textContent = "due date";
    const duedate = document.createElement("input");
    duedate.type = "date";
    duedate.id = "due-date";
    parent.appendChild(div);
    div.appendChild(label);
    div.appendChild(duedate);
  }

  #addPriority (parent) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const prio0 = document.createElement("option");
    const prio1 = document.createElement("option");
    const prio2 = document.createElement("option");
    const prio3 = document.createElement("option");
    prio0.textContent = "(select a priority)";
    prio1.textContent = "Low";
    prio2.textContent = "Medium";
    prio3.textContent = "High";
    label.htmlFor = "priority";
    label.textContent = "priority";
    const priority = document.createElement("select");
    priority.id = "priority";
    parent.appendChild(div);
    div.appendChild(label);
    div.appendChild(priority);
    priority.appendChild(prio0);
    priority.appendChild(prio1);
    priority.appendChild(prio2);
    priority.appendChild(prio3);
  }

  #addNotes (parent) {
    const div = document.createElement("div");
    const field = document.createElement("textarea");
    field.id = "notes";
    field.placeholder = "Notes...";
    parent.appendChild(div);
    div.appendChild(field);
  }

  addBlankTodo () {
    const todo = document.createElement("div");
    const todoForm = document.createElement("form");
    const checklist = document.createElement("input");
    checklist.id = "checklist";
    const projects = document.createElement("input");
    projects.id = "projects";
    todo.classList.add("todo");
    // add placeholders
    // modify types


    const todoProperties = [
      checklist, projects
    ]

    todo.appendChild(todoForm);
    this.#addTitle(todoForm);
    this.#addDescription(todoForm);
    this.#addDueDate(todoForm);
    this.#addPriority(todoForm);
    this.#addNotes(todoForm);
    this.content.appendChild(todo);
    for (const item of todoProperties) {
      todoForm.appendChild(item);
    }
  }

  static renderList (list) {
    for (const todo in list) {
      // do something and render todo in website.
      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo");
      const title = document.createElement("h2");
      console.log(todo.title);
      title.textContent = todo.title;
      todoContainer.appendChild(title);
      return todoContainer;
    }
  }
}

export default dom;
