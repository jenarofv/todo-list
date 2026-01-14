class Dom {

  content;

  constructor (content) {
    this.content = document.querySelector(content);
  }

  static removeTodo (parent) {
    const confirmation = window.confirm("Do you really want to delete this item?");
    if (confirmation) {
      const id = parent.id;
      console.log("id: "+ id);
      localStorage.removeItem(id);
      parent.remove();
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
      description.textContent = item;
      li.appendChild(description);
      ul.appendChild(li);
    })
    return ul;
  }

  static renderTodo (todo) {
    const todoContainer = document.createElement("div");
    todoContainer.id = todo.id;
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
