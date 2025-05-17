const express = require("express");
const router = new express.Router();
const BookAllocate = require("../models/bookAllocate");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const AddBook = require("../models/AddModel");
const Library = require("../models/library");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());


//Book Allocate Route
router.post("/BookAllocate", authAdmin, async (req, res) => {
  const date = req.body.IssueDate.toString();
  const SlicedDate = date.slice(0, 10);
  const rdate = req.body.ReturnDate.toString();
  const retSlicedDate = rdate.slice(0, 10);
  try {

    const isbne = req.body.isbn;
    const book = await AddBook.findOne({ ISBN: isbne });
    const regNo = req.body.registrationNo;
    const student = await Library.findOne({ registrationNo: regNo });
    const Allocate = new BookAllocate({

      Bookname: book.Bookname,
      ISBN: book.ISBN,
      Author: book.Author,
      StudentName: student.firstname,
      StudentID: student.StudentId,
      RegistrationNo: student.registrationNo,
      Department: student.Department,
      Degree: student.Degree,
      IssueDate: SlicedDate,
      ReturnDate: retSlicedDate,
    });

    const allocated = await Allocate.save();
    res.status(201).render("BookAllocate");
  } catch (err) {
    res.status(400).send(err);
  }
});

//user Borrow page route

router.get("/BKAllocateUser", async (req, res) => {
  try {
    const regNo = req.cookies.regNo; // ✅ reading cookie here

    if (!regNo) return res.status(400).send("Registration number not found in cookies");

    const Borrowbook = await BookAllocate.find({ RegistrationNo: regNo });

    res.status(200).render("BKAllocatedUser", { Borrowbook, regNo });
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

// All Allocated Books page route
router.get("/allAllocatedBooks", authAdmin, async (req, res) => {
  try {
    const allocatedBooks = await BookAllocate.find();
    res.status(200).render("AllAllocatedBooks", { allocatedBooks });
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});


// const users = await User.find();

module.exports = router;
