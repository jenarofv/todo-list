class BlankTodo {

  todo;
  title;
  dueDate;
  description;
  checklist;
  projects;
  priority;
  notes;

  constructor () {
    this.title = document.createElement("input");
    this.todoDiv = document.createElement("div");
    this.checklist = document.createElement("textarea");
    this.projects = document.createElement("input");
    this.dueDate = document.createElement("input");
    this.description = document.createElement("textarea");
    this.notes = document.createElement("textarea");
    this.priority = document.createElement("select");
    this.title.placeholder = "title";
    this.title.id = "title";
    this.checklist.id = "checklist";
    this.checklist.placeholder = "checklist, separated by newline";
    this.checklist.rows = 4;
    this.projects.id = "projects";
    this.projects.placeholder = "project list, separated by commas.";
    this.projects.size = "25";
    this.todoDiv.classList.add("todo");
    this.todoDiv.classList.add("blank-todo");
    this.dueDate.type = "date";
    this.dueDate.id = "due-date";
    this.description.id = "description";
    this.description.placeholder = "description";
    this.notes.id = "notes";
    this.notes.placeholder = "Notes...";
    this.priority.id = "priority";
  }

  #addBlankTitle (parent) {
    parent.appendChild(this.title);
  }

  #addBlankDescription (parent) {
    parent.appendChild(this.description);
  }

  #addBlankdueDate (parent) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = "due-date";
    label.textContent = "due date";
    parent.appendChild(div);
    div.appendChild(label);
    div.appendChild(this.dueDate);
  }

  #addBlankPriority (parent) {
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
    parent.appendChild(div);
    div.appendChild(label);
    div.appendChild(this.priority);
    this.priority.appendChild(prio0);
    this.priority.appendChild(prio1);
    this.priority.appendChild(prio2);
    this.priority.appendChild(prio3);
  }

  #addBlankNotes (parent) {
    const div = document.createElement("div");
    parent.appendChild(div);
    div.appendChild(this.notes);
  }

  #addBlankChecklist (parent) {
    parent.appendChild(this.checklist);
  }

  #addBlankProjects (parent) {
    parent.appendChild(this.projects);
  }

  render (where) {
    where.appendChild(this.todoDiv);
    this.#addBlankTitle(this.todoDiv);
    this.#addBlankDescription(this.todoDiv);
    this.#addBlankdueDate(this.todoDiv);
    this.#addBlankPriority(this.todoDiv);
    this.#addBlankNotes(this.todoDiv);
    this.#addBlankChecklist(this.todoDiv);
    this.#addBlankProjects(this.todoDiv);
  }

  clear () {
    this.title.value = "";
    this.dueDate.value = "";
    this.description.value = "";
    this.notes.value = "";
    this.priority.value = "no-priority";
    this.checklist.value = "";
    this.projects.value = "";
  }
}

export default BlankTodo;
