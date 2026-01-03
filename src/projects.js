// project module

class Projects {
  constructor () {
    this.projects = new Set();
  }

  addProject (item) {
    this.projects.add(item);
  }

  deleteProject (item) {
    this.projects.delete(item);
  }
}

export default Projects;
