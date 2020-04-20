const logger = require("../logger/index");

module.exports = () => {
  process.on("uncaughtException", (ex) => {
    logger.error(ex.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    logger.error(ex.message);
    process.exit(1);
  });
};
