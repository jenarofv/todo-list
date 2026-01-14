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
}

export default StorageHandler;