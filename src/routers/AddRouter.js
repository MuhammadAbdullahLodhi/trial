const express = require("express");
const router = new express.Router();
const AddBook = require("../models/AddModel");
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const authadmin = require("../middleware/authAdmin");


router.use(express.urlencoded ({ extended : true }) );

router.use(express.json());


// Multer setup
const storage = multer.memoryStorage(); // <-- change this
const upload = multer({ storage });

//Add Book Route
router.post("/upload",authadmin, upload.single('image') , async (req,res) => {
    try{
        const imgPath = req.file.path;
            const Insert = new AddBook  ({
                Bookname : req.body.BkName,
                ISBN : req.body.isbn,
                Location : req.body.location,
                Author : req.body.author,
                Publisher : req.body.publisher,
                Price : req.body.price,
                Quantity : req.body.quantity,
                Description : req.body.description,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                  }
            })
        
        const added = await Insert.save();
        res.status(201).render("AddBook");
    }
    catch(err) {
        res.status(400).send(err);
    }
});


//delete book route
router.post('/deletebook', authadmin, async (req, res) => {
    try {
        const ISBN = req.body.isbna;
        const BkName = req.body.BName;
        if(!ISBN || !BkName){
            return res.status(400).send("Please provide ISBN and Book Name");
        }
        console.log(ISBN)
        const delbook = await AddBook.findOneAndDelete({ ISBN: ISBN });

        if (!delbook) {
            return res.status(404).send("Book not found");
        }

        res.status(200).send(delbook);
    } catch (error) {
        res.status(500).send(error);
    }
});



// router.post('/updatebook', async (req, res) => {
//     try {
//         const ISBN = req.body.isbn;
//         const BkName = req.body.BkName;
//         const Location = req.body.location;
//         const Author = req.body.author;
//         const Publisher = req.body.publisher;
//         const Price = req.body.price;
//         const Quantity = req.body.quantity;
//         const Description = req.body.description;

//         if(!ISBN || !BkName){
//             return res.status(400).send("Please provide ISBN and Book Name");
//         }

//         const updatebook = await AddBook.findOneAndUpdate(
//             { ISBN: ISBN },
//             { $set: { Location, Author, Publisher, Price, Quantity, Description } },
//             { new: true }
//         );

//         if (!updatebook) {
//             return res.status(404).send("Book not found");
//         }

//         res.status(200).send(updatebook);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });


router.get("/ShowBooks", async (req, res) => {
    try {
        const books = await AddBook.find();

        const booksWithImages = books.map(books => {
            const base64Image = books.image?.data?.toString('base64');
            return {
                _id: books._id,
                Bookname: books.Bookname,
                ISBN: books.ISBN,
                Location: books.Location,
                Author: books.Author,
                Publisher: books.Publisher,
                Price: books.Price,
                Quantity: books.Quantity,
                Description: books.Description,
                image: base64Image ? `data:${books.image.contentType};base64,${base64Image}` : null
            };
        });

        res.render("AllBooks", { books: booksWithImages });

    } catch (err) {
        res.status(500).send("Error fetching books: " + err.message);
    }
});



// show all books route
// router.get('/ShowBooks', authadmin, async (req,res) => {
//     try{
//         const allbooks = await AddBook.find();
//         res.status(200).render("AllBooks", { allbooks });
//     }
//     catch (err) {
//         res.status(500).send("Error fetching data");
//     }
// })
router.get('/AllBook', auth, async (req,res) => {
    try{
        const allbooks = await AddBook.find();
        res.status(200).render("AllBooksUser", { allbooks });
    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})


//search book route
router.get('/search',  async (req,res) => {
    try{
        const Searchbooks = await AddBook.find({ Bookname: req.query.search })
        res.status(200).render("searchBook", { Searchbooks });

    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})








// const users = await User.find();


module.exports = router;