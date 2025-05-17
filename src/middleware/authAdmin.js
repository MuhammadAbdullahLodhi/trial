const jwt = require("jsonwebtoken");
const admin = require("../models/libraryadmin");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwtadmin;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = authAdmin;
