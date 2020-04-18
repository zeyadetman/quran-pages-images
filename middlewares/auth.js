const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) res.status(401).send({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token.");
  }
};

module.exports = {
  verifyToken,
};
