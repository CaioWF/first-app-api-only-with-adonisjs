"use strict";

const Project = use("App/Models/Project");

class CheckExistingProject {
  async handle({ request, response }, next) {
    const { project_id } = request.post();
    const project = await Project.find(project_id);

    if (!project) {
      return response.status(404).json({
        message: "Project not exists.",
        project_id
      });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = CheckExistingProject;
