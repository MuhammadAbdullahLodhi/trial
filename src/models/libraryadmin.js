const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema
({
    firstname:{
        type : String,
        required : true,
        minlength : 3
    },
    lastname:{
        type : String,
        required : true,
        minlength : 3
    },
    age:{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
                
            }
        }
    },
    phone : {
        type : Number,
        min : 10,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    }
})
adminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
    next();
})

const Admin = mongoose.model('useradmin', adminSchema);

module.exports = Admin;