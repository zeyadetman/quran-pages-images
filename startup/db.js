const mongoose = require("mongoose");
const logger = require("../logger/index");

module.exports = () => {
  const uri = process.env.MONGODB_URI;

  new mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);

  logger.info("connected to database...");
};
