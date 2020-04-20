const logger = require("../logger/index");
const LOGGER_LABEL = "Error Handler";

const errorHandler = (error, req, res, next) => {
  logger.error(`${LOGGER_LABEL}: ${error.message}`);
  return res.status(500).send({ message: error.message });
};

module.exports = {
  errorHandler,
};
