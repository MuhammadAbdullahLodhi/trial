const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  registrationNo: {
    type: String,
    min: 15,
    required: true,
    unique: [true, "StudentId is already present"],
  },
  StudentId: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Degree: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  }, // Admin approval status

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Generate JWT Token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id, registrationNo: this.registrationNo}, process.env.SECRET_KEY);
    // console.log(token);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    res.send("the error part" + err);
  }
};


//Hashing Password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
