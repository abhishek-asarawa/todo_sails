/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getTasks: async function (req, res) {
    const tasks = await Task.find({});
    return res.sendData(tasks, "All Tasks");
  },
  create: async function (req, res) {
    const { title, description } = req.body;

    if (!title || !description)
      return res.badRequest("title and description both required");

    const task = await Task.create({ title, description });
    return res.sendData(task, "task created");
  },
  update: async function (req, res) {
    const { title, description, isComplete } = req.body;
    const id = req.params.id;

    if (!id || (!title && !description && !isComplete))
      return res.badRequest("Not enough details to process request");

    const task = await Task.update({ id }, { title, description, isComplete });

    return res.sendData(task, "Task updated");
  },
  delete: async function (req, res) {
    const id = req.params.id;

    const task = await Task.destroy({ id });

    return res.sendMsg("Task removed");
  },
};
