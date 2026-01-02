// Todo module

class Todo {
  constructor (title, description, dueDate, prio, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = prio;
    this.notes = notes;
    this.checklist = checklist;
  }
  
  set title (newTitle) {
    this.title = newTitle;
  }

  set description (newDescription) {
    this.description = newDescription;
  }

  set dueDate (newDueDate) {
    this.dueDate = newDueDate;
  }

  set priority (newPriority) {
    this.priority = newPriority;
  }

  set notes (newNotes) {
    this.notes = newNotes;
  }

  set checklist (newChecklist) {
    this.checklist = newChecklist;
  }
}
