"use strict";

const Project = use("App/Models/Project");

class FindProject {
  async handle({ request, response, params: { id } }, next) {
    const project = await Project.find(id);

    if (!project) {
      return response.status(404).json({
        message: "Project not found.",
        id
      });
    }

    request.project = project;

    // call next to advance the request
    await next();
  }
}

module.exports = FindProject;
