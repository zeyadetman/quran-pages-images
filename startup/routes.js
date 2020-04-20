const express = require("express");

const pagesRoute = require("../routes/pages").router;
const authRoute = require("../routes/auth").router;
const errorHandler = require("../middlewares/error").errorHandler;

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/pages", pagesRoute);
  app.use("/api/auth", authRoute);
  app.get("/", (req, res) => {
    res.send({});
  });
  app.use(errorHandler);
};
