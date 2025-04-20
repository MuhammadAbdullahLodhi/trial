const mongoose = require("mongoose");

const AddSchema = new mongoose.Schema
({
    Bookname:{
        type : String,
        required : true,
        minlength : 3
    },
    ISBN : {
        type : Number,
        required : true,
        unique : [true, "ISBN is already present"],
    },
    Location:{
        type : String,
        required : true,
        minlength : 3
    },
    Author : {
        type : String,
        required : true
    },
    Publisher : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    Quantity : {
        type : Number,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    image: {
        data: Buffer,
        contentType: String
      },
    pdf: {
        data: Buffer,
        contentType: String
      }
    // Image : {
    //     type : String,
    //     required : true
    // }
    // filename:{
    //     type : String,
    //     required : true
    // },
    // filepath:{
    //     type : String,
    //     required : true
    // }
})


const Add = new mongoose.model('add', AddSchema);

module.exports = Add;