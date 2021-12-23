module.exports = {
  friendlyName: "Response",

  description: "It creates response and send it",

  inputs: {
    res: {
      type: "ref",
      description: "Response object for current request",
      required: true,
    },
    data: {
      type: "json",
      description: "Data that need to send",
    },
    msg: {
      type: "string",
      description: "Response message",
      required: true,
    },
    isError: {
      type: "boolean",
      description: "For checking if response is error",
      defaultsTo: false,
    },
    statusCode: {
      type: "number",
      description: "Response code",
      defaultsTo: 200,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const { res, data, isError, msg, statusCode } = inputs;
    return await res.status(statusCode).json({
      msg,
      isError,
      data,
    });
  },
};
