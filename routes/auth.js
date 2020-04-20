const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const User = require("../models/Users").User;
const logger = require("../logger/index");
const LOGGER_LABEL = "Auth";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/", async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { error, value: authObject } = userSchema.validate(req.body);
    if (error) {
      logger.error(`${LOGGER_LABEL}: ${error.details[0].message}`);
      return res.status(400).send({ message: error.details[0].message });
    }

    authObject.password = await bcrypt.hash(authObject.password, saltRounds);

    const user = new User({
      ...authObject,
    });

    await user.save();
    const token = user.generateAuth();

    return res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
