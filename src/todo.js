// Todo module

class Todo {

  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;
  #done;
  #projects;

  constructor (id, title, description, dueDate, prio, notes, checklist, projects) {
    this.id = `todo-${id}`;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = prio;
    this.notes = notes;
    this.checklist = checklist;
    this.done = false;
    this.projects = projects;
  }
  
  set title (newTitle) {
    this.#title = newTitle;
  }

  set description (newDescription) {
    this.#description = newDescription;
  }

  set dueDate (newDueDate) {
    this.#dueDate = newDueDate;
  }

  set priority (newPriority) {
    this.#priority = newPriority;
  }

  set notes (newNotes) {
    this.#notes = newNotes.replaceAll("\n", "\\n");
  }

  set checklist (newChecklist) {
    this.#checklist = newChecklist;
  }

  set projects (projectString) {
    if (typeof projectString !== "undefined" && projectString !== "") {
      this.#projects = new Set(projectString
                                .replaceAll(", ", ",")
                                .replaceAll(/ +/g, " ")
                                .replaceAll(/ +$/g, "")
                                .replaceAll(/^ +/g, "")
                                .replaceAll(/[^a-zA-Z0-9\-_#, ]+/g, "")
                                .toLowerCase().split(","));
    } else {
      this.#projects = new Set();
    }
  }

  addToProject (project) {
    this.projects.add(project);
  }

  deleteFromProject (project) {
    this.projects.delete(project);
  }

  get title () {
    return this.#title;
  }

  get description () {
    return this.#description;
  }

  get dueDate () {
    return this.#dueDate;
  }

  get priority () {
    return this.#priority;
  }

  get notes () {
    return this.#notes;
  }

  get checklist () {
    return this.#checklist;
  }

  get done () {
    return this.#done;
  }

  get projects () {
    return this.#projects;
  }

  set done (bool) {
    if (typeof bool === "boolean") {
      this.#done = bool;
    } else {
      throw new Error ("property `done ` should be bool");
    }
  }

  toJSON () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      checklist: this.checklist,
      done: this.done,
      projects: Array.from(this.projects)
    };
  }
}

export default Todo;
