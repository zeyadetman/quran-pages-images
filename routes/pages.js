const express = require("express");
const path = require("path");
const User = require("../models/Users").User;
const router = express.Router();
const Joi = require("@hapi/joi");
const verifyToken = require("../middlewares/auth").verifyToken;
const logger = require("../logger/index");
const LOGGER_LABEL = "Pages";

const pageNumberSchema = Joi.number().min(1).max(604).required();

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const _id = req.user.id;
    const userObj = await User.findOne({ _id });
    if (userObj) {
      const { error, value: pageNumber } = pageNumberSchema.validate(
        req.params.id
      );

      if (error) {
        logger.error(`${LOGGER_LABEL}: ${error.details[0].message}`);
        return res.status(400).send({ message: error.details[0].message });
      }

      return res.sendFile(
        path.join(__dirname, "../quran-images/", `${pageNumber}.jpg`)
      );
    } else {
      logger.error(`${LOGGER_LABEL}: Unauthorized.`);
      return res.status(401).send("Unauthorized.");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
