const express = require("express");
const router = new express.Router();
const BookAllocate = require("../models/bookAllocate");


router.use(express.urlencoded ({ extended : true }) );

router.use(express.json());

router.post("/BookAllocate", async (req,res) => {
    const date = req.body.IssueDate.toString();
    const SlicedDate = date.slice(0, 10);
    const rdate = req.body.ReturnDate.toString();
    const retSlicedDate = rdate.slice(0, 10);
    try{
            const Allocate = new BookAllocate  ({
                Bookname : req.body.BkName,
                ISBN : req.body.isbn,
                Author : req.body.Author,
                StudentName : req.body.StdName,
                StudentID : req.body.StdID,
                RegistrationNo : req.body.registrationNo,
                Semester : req.body.Semester,
                Department : req.body.Department,
                Degree : req.body.Degree,
                IssueDate : SlicedDate,
                ReturnDate : retSlicedDate
            })
        
        const allocated = await Allocate.save();
        res.status(201).render("BookAllocate");
    }
    catch(err) {
        res.status(400).send(err);
    }
});




router.get('/BKAllocateUser', async (req,res) => {
    try{
        const Borrowbook = await BookAllocate.find();
        res.status(200).render("BKAllocatedUser", { Borrowbook });
    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})



// const users = await User.find();


module.exports = router;