module.exports = async function sendMsg(text) {
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  return await sails.helpers.response.with({ res, msg: text, statusCode: 400 });
};
