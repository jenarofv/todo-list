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
    const todoListStr = localStorage.getItem("todoList");
    if (todoListStr === null) { return [] }
    const todoList = JSON.parse(todoListStr);
    return todoList;
  }

  static saveTodos (todoList) {
    const todoListStr = JSON.stringify(todoList);
    localStorage.setItem("todoList", todoListStr);
  }

}

export default StorageHandler;
