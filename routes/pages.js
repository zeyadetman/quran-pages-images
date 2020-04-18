const express = require("express");
const path = require("path");
const router = express.Router();
const Joi = require("@hapi/joi");

const pageNumberSchema = Joi.number().min(1).max(604).required();

router.get("/:id", (req, res) => {
  const { error, value: pageNumber } = pageNumberSchema.validate(req.params.id);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  return res.sendFile(
    path.join(__dirname, "../quran-images/", `${pageNumber}.jpg`)
  );
});

module.exports = {
  router,
};
