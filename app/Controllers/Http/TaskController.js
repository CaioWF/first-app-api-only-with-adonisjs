"use strict";

const Task = use("App/Models/Task");

class TaskController {
  async index({ response }) {
    const tasks = await Task.all();

    response.status(200).json({
      message: "Here are your tasks.",
      data: tasks
    });
  }

  async store({ request, response }) {
    const { name, description, project_id } = request.post();

    const task = await Task.create({ name, description, project_id });

    response.status(201).json({
      message: "Successfully created a new task",
      data: task
    });
  }

  async show({ request, response, params: { id } }) {
    const task = request.task;

    response.status(200).json({
      message: "Here is your task.",
      data: task
    });
  }

  async update({ request, response, params: { id } }) {
    const { name, description, project_id } = request.post();
    const task = request.task;

    task.name = name;
    task.description = description;
    task.project_id = project_id;

    await task.save();

    response.status(200).json({
      message: "Successfully updated this task.",
      data: task
    });
  }

  async destroy({ request, response, params: { id } }) {
    const task = request.task;

    await task.delete();

    response.status(200).json({
      message: "Successfully deleted this task.",
      id
    });
  }
}

module.exports = TaskController;
