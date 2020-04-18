const express = require("express");
const app = express();
const pagesRoute = require("./routes/pages").router;
const authRoute = require("./routes/auth").router;
const mongoose = require("mongoose");
require("dotenv").config();

process.setMaxListeners(Infinity);

const uri = process.env.MONGODB_URI;
new mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use("/api/pages", pagesRoute);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send({});
});

const port = process.env.PORT || 3000;
app.listen(port);
