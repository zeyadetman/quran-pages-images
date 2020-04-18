const express = require("express");
const app = express();
const pagesRoute = require("./routes/pages").router;

process.setMaxListeners(Infinity);
app.use("/api/pages", pagesRoute);
app.get("/", (req, res) => {
  res.send({});
});

const port = process.env.NODE_PORT || 3000;
app.listen(port);
