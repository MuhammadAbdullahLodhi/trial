const express = require("express");
const router = new express.Router();
const Library = require("../models/library");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const authadmin = require("../middleware/authAdmin");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());


router.get("/AllStd", authadmin, async (req, res) => {
    try {
  
      const std = await Library.find();
  
      res.status(200).render("Students", { std });
    } catch (err) {
      res.status(500).send("Error fetching data");
    }
  });



module.exports = router;