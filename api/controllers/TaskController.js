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
    const { title, description, board } = req.body;

    if (!title || !description || !board)
      return res.badRequest("title, description and board id all required");

    const boardData = await Board.findOne({ id: board });

    if (!boardData) return res.badRequest(`No board with id ${board} found.`);

    const task = await Task.create({ title, description, board }).fetch();
    return res.sendData(task, "task created");
  },
  update: async function (req, res) {
    const { title, description, isComplete } = req.body;
    const id = req.params.id;

    if (!id || (!title && !description && typeof isComplete != "boolean"))
      return res.badRequest("Not enough details to process request");

    const task = await Task.update(
      { id },
      { title, description, isComplete }
    ).fetch();

    return res.sendData(task, "Task updated");
  },
  delete: async function (req, res) {
    const id = req.params.id;

    await Task.destroy({ id });

    return res.sendMsg("Task removed");
  },
};
