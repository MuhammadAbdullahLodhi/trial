const express = require("express");
const router = new express.Router();
const Library = require("../models/library");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

//This is registration method

router.post("/registration", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      lowfname = req.body.fname;
      lowlname = req.body.lname;
      const registerUser = new Library({
        firstname: lowfname.toLowerCase(),
        lastname: lowlname.toLowerCase(),
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        registrationNo: req.body.registrationNo,
        StudentId: req.body.StudentId,
        Department: req.body.Department,
        Degree: req.body.Degree,
        password: password,
        confirmpassword: cpassword,
        isApproved: false,
        createdAt: Date.now,
      });

      const token = await registerUser.generateAuthToken();

      res.cookie("jwt", token, {
        httpOnly: true,
      });

      const registered = await registerUser.save();

      res.status(201).render("index");
    } else {
      res.send("password not matched");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//This is Login Method

const cookieParser = require("cookie-parser"); 
router.use(cookieParser());

router.post("/User", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Library.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    if (isMatch) {
  if (useremail.isApproved === true) {
    res.cookie("regNo", useremail.registrationNo, { httpOnly: true });
    res.render("User");
  } else {
    res.render("login", { error: "Your account is not approved by admin" });
  }
} else {
      res.render("login", { showModal: true, message: "Password not correct" });
    }
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;
