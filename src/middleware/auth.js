const jwt = require("jsonwebtoken");
const User = require("../models/library");
const admin = require("../models/libraryadmin");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
