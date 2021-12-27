/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { isEmpty, reduce, map } = require("lodash");

module.exports = {
  getBoards: async function (req, res) {
    const needTaskAgg = req.query["task-aggregates"] === "required";

    if (!needTaskAgg) {
      const boards = await Board.find({});
      return res.sendData(boards, "All Boards");
    }

    const populated = await Board.find({}).populate("tasks");

    const result = map(populated, (board) => {
      const { tasks, ...rest } = board;

      // creating aggregates
      const { total, completed, pending } = reduce(
        tasks,
        (agg, task) => {
          agg = { ...agg, total: agg.total + 1 };
          if (task.isComplete) agg = { ...agg, completed: agg.completed + 1 };
          else agg = { ...agg, pending: agg.pending + 1 };
          return { ...agg };
        },
        { total: 0, completed: 0, pending: 0 }
      );

      return { ...rest, tasksAgg: { total, completed, pending } };
    });

    return res.sendData(result, "All Boards");
  },
  getBoard: async function (req, res) {
    const id = req.params.id;

    const board = await Board.findOne({ id }).populate("tasks");

    if (!board) return res.notFound(`Board with id ${id} not found`);

    return res.sendData(board, "Board found");
  },
  create: async function (req, res) {
    const { title, description } = req.body;

    if (!title || !description)
      return res.badRequest("title and description both required");

    const board = await Board.create({ title, description }).fetch();
    return res.sendData(board, "Board created");
  },
  update: async function (req, res) {
    const { title, description } = req.body;
    const id = req.params.id;

    if (!id || (!title && !description))
      return res.badRequest("Not enough details to process request");

    const board = await Board.update({ id }, { title, description }).fetch();

    return res.sendData(board, "Board updated");
  },
  delete: async function (req, res) {
    const id = req.params.id;

    // removing all tasks associated to board
    await Task.destroy({ board: id });

    // removing board
    await Board.destroy({ id });

    return res.sendMsg("Board removed");
  },
};
