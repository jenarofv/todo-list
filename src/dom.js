import StorageHandler from "./StorageHandler";

class Dom {

  #todoList;

  constructor (todoList) {
    this.todoList = todoList;
    this.projects = new Set();
    this.updateProjectList();
  }


  get todoList () {
    return this.#todoList;
  }

  set todoList (newTodoList) {
    this.#todoList = newTodoList;
    this.updateProjectList();
  }

  updateProjectList () {
    let listOfProjects = [];
    this.#todoList.forEach(todo => {
      listOfProjects = listOfProjects.concat(todo.projects);
    });
    const foo = new Set(listOfProjects);
    this.projects = foo;
    return foo;
  }

  renderProjects () {
    const projectDiv = document.querySelector(".project-container");
    projectDiv.innerHTML = "";
    const projects = this.projects;
    projects.forEach(project => {
      const projectItem = document.createElement("div");
      projectItem.classList.add("project")
      projectItem.textContent = project;
      projectDiv.appendChild(projectItem);
    });
  }

  addTodo (todo) {
    this.#todoList.push(todo);
    this.updateProjectList();
  }

  markAsDone (event) {
    event.target.parentElement.classList.toggle("checked");
    const todoId = event.target.parentElement.id;
    const index = this.todoList.findIndex(x => x.id === todoId);
    this.#todoList[index].done = !this.#todoList[index].done;
    StorageHandler.saveTodos(this.todoList);
  }

  generateChecklist (checklist) {
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    ul.classList.add("checklist");
    ul.addEventListener("input", (event) => {
      const label = event.target.parentElement.lastChild.textContent;
      const todoId = ul.parentElement.id;
      const todoIndex = this.#todoList.findIndex(x => x.id === todoId);
      this
        .#todoList[todoIndex]
        .checklist[label] = !this.#todoList[todoIndex].checklist[label];
      StorageHandler.saveTodos(this.todoList);
    });
    for (const item in checklist) {
      // console.log("foo");
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      const description = document.createElement("label");
      description.textContent = item;
      checkbox.type = "checkbox";
      if (checklist[item]) {
        checkbox.checked = true;
      }
      description.addEventListener("click", (event) => {
        checkbox.checked = !checkbox.checked;
        const myEvent = new InputEvent("input", {bubbles: true});
        description.dispatchEvent(myEvent);
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

  renderTodo (todo) {
    const todoContainer = document.createElement("div");
    todoContainer.id = todo.id;
    for (const project of todo.projects) {
      todoContainer.classList.add(project.replaceAll(" ", "-"));
    }
    todoContainer.classList.add("todo");
    todoContainer.classList.add(todo.priority);
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");
    const notes = document.createElement("p");
    const checklist = this.generateChecklist(todo.checklist);
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
    if (todo.done) {
      todoContainer.classList.add('checked');
      done.checked = true;
    }
    // crypto.createUUID does not work without HTTPS
    doneLabel.textContent = "Mark as done";
    doneLabel.addEventListener("click", (event) => {
      done.checked = !done.checked;
      this.markAsDone(event);
    })
    deleteButton.textContent = "delete";
    deleteButton.classList.add("red-bg");
    deleteButton.classList.add("delete");
    deleteButton.addEventListener('click', event => {
      const confirmation = window.confirm("Do you really want to delete this item?");
      if (!confirmation) { return }
      const todo = event.target.parentElement;
      const id = todo.id;
      const todoList = this.#todoList.filter(todo => todo.id !== id);
      this.todoList = todoList;
      StorageHandler.saveTodos(todoList);
      this.renderProjects();
      todo.remove();
    })
    done.addEventListener("input", Dom.markAsDone);
    const items = [
      title, description, dueDate, priority, notes, checklist,
      projectCointaner,
      done, doneLabel, deleteButton
    ]
    for (const item of items) {
      todoContainer.appendChild(item);
    }
    this.renderProjects();
    return todoContainer;
  }
}

export default Dom;
