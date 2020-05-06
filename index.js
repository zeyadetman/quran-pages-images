const express = require("express");
const app = express();

require("dotenv").config();

process.setMaxListeners(Infinity);

require("./startup/errorsHandle")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port);
