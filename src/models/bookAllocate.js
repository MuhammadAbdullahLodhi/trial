const mongoose = require("mongoose");

const BookAllocateSchema = new mongoose.Schema
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
    Author : {
        type : String,
        required : true
    },
    StudentName:{
        type : String,
        required : true,
        minlength : 3
    },
    StudentID : {
        type : Number,
        required : true
    },
    RegistrationNo : {
        type : String,
        required : true
    },
    Semester : {
        type : Number,
        required : true
    },
    Department : {
        type : String,
        required : true
    },
    Degree : {
        type : String,
        required : true
    },
    IssueDate : {
        type : String,
        required : true
    },
    ReturnDate : {
        type : String,
        required : true
    },
    lateDays: {
        type: Number,
        default: 0
      },
    FineForLate: {
        type: Number,
        default: 0
      }
})


const BookAllocate = new mongoose.model('BookAllocate', BookAllocateSchema);

module.exports = BookAllocate;