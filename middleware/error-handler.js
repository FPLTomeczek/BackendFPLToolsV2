const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
    fields: err.fields || [],
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
    customError.fields = Object.values(err.errors).map((item) => item.path);
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
    customError.fields = Object.keys(err.keyValue);
  }

  return res
    .status(customError.status)
    .json({ msg: customError.msg, fields: customError.fields });
};

module.exports = errorHandlerMiddleware;
