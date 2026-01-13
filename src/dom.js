import Projects from "./projects.js";

class Dom {

  content;

  constructor (content) {
    this.content = document.querySelector(content);
  }

  static removeTodo (parent) {
    const confirmation = window.confirm("Do you really want to delete this item?");
    if (confirmation) {
      parent.remove();
    }
  }

  static ClearBlankTodo () {
     document.querySelector("#title").value = "";
     document.querySelector("#due-date").value = "";
     document.querySelector("#description").value = "";
     document.querySelector("#notes").value = "";
     document.querySelector("#priority").value = "no-priority";
     document.querySelector("#checklist").value = "";
     document.querySelector("#projects").value = "";
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
    prio0.value = "no-priority";
    prio1.value = "low";
    prio2.value = "medium";
    prio3.value = "high";
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
    const checklist = document.createElement("textarea");
    checklist.id = "checklist";
    checklist.placeholder = "checklist, separated by newline"
    const projects = document.createElement("input");
    projects.id = "projects";
    todo.classList.add("todo");
    todo.classList.add("blank-todo");
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

  static markAsDone (event) {
    const parent = event.target.parentElement;
    parent.classList.toggle("checked");
  }

  static generateChecklist (checklist) {
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    for (const item in checklist) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      const description = document.createElement("label");
      description.textContent = item;
      checkbox.type = "checkbox";
      description.addEventListener("click", (event) => {
        checkbox.checked = !checkbox.checked;
      });
      li.appendChild(checkbox);
      li.appendChild(description);
      ul.appendChild(li);
    }
    return ul;
  }

  static generateProjectList (projectSet) {
    if (projectSet.size === 0) {
      return false;
    }
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    projectSet.forEach( item => {
      const li = document.createElement("li");
      const description = document.createElement("label");
      console.log(item);
      description.textContent = item;
      li.appendChild(description);
      ul.appendChild(li);
    })
    return ul;
  }

  static renderTodo (todo) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");
    todoContainer.classList.add(todo.priority);
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");
    const notes = document.createElement("p");
    const checklist = Dom.generateChecklist(todo.checklist);
    const done = document.createElement("input");
    const doneLabel = document.createElement("label");
    const projectCointaner = document.createElement("div");
    const projects = Dom.generateProjectList(todo.projects);
    if (typeof projects !== "boolean") {
      projectCointaner.textContent = "Projects:"
      projectCointaner.appendChild(projects);
    } else {
      projectCointaner.textContent = "(no projects)";
    }
    const deleteButton = document.createElement("button");
    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    priority.classList.add(todo.priority);
    notes.textContent = todo.notes;
    done.type = "checkbox";
    // crypto.createUUID does not work without HTTPS
    doneLabel.textContent = "Mark as done";
    doneLabel.addEventListener("click", (event) => {
      done.checked = !done.checked;
      Dom.markAsDone(event);
    })
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click",  () => {Dom.removeTodo(todoContainer)});
    deleteButton.classList.add("red-bg");
    done.addEventListener("input", Dom.markAsDone);
    const items = [
      title, description, dueDate, priority, notes, checklist,
      projectCointaner,
      done, doneLabel, deleteButton
    ]
    for (const item of items) {
      todoContainer.appendChild(item);
    }
    return todoContainer;
  }
}

export default Dom;
