class StorageHandler {
  constructor () {
  }

  static readProjects () {
      const projectString = localStorage.getItem("projects");
      if (projectString === null) {
        return new Set();
      }
      return new Set(projectString.split(","));
  }

  static saveProjects (projectSet) {
    const oldProjectSet = StorageHandler.readProjects();
    const newProjectSet = projectSet.union(oldProjectSet);
    const newProjectString = Array.from(newProjectSet).join();
    localStorage.setItem("projects", newProjectString);
  }

  static loadTodos () {
    let enoughTodos = true;
    let counter = 0;
    let todoArr = [];
    while (enoughTodos) {
      const todoItem = localStorage.getItem(`todo-${counter}`);
      if (todoItem === null) { return todoArr; }
      const processedTodoItem = JSON.parse(todoItem);
      processedTodoItem.projects = new Set(processedTodoItem.projects.split(","));
      todoArr.push(processedTodoItem);
      counter++;
    }
    return todoArr;
  }

  static saveTodo (todo, counter) {
    console.log(todo.toJSON());
    localStorage.setItem(`todo-${counter}`, todo.toJSON());
  }

}

export default StorageHandler;