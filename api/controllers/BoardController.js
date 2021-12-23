/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getBoards: async function (req, res) {
    const boards = await Board.find({});
    return res.sendData(boards, "All Boards");
  },
  create: async function (req, res) {
    const { title, description } = req.body;

    if (!title || !description)
      return res.badRequest("title and description both required");

    await Board.create({ title, description });
    return res.sendMsg("Board created");
  },
  update: async function (req, res) {
    const { title, description } = req.body;
    const id = req.params.id;

    if (!id || (!title && !description))
      return res.badRequest("Not enough details to process request");

    await Board.update({ id }, { title, description });

    return res.sendMsg("Board updated");
  },
  delete: async function (req, res) {
    const id = req.params.id;

    await Board.destroy({ id });

    return res.sendMsg("Board removed");
  },
};
