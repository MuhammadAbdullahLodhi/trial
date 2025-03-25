const jwt = require("jsonwebtoken");
const admin = require("../models/libraryadmin");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwtadmin;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyUser);

    // const user = await Library.findOne({_id:verifyUser._id});
    // console.log(user.firstname);

    // req.token = token;
    // req.user = user;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = authAdmin;
