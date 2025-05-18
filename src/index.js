require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const authadmin = require("./middleware/authAdmin");
const cron = require("node-cron");

require("./db/conn");

// user database connection
const Library = require("./models/libraryadmin");
const libraryRouter1 = require("./routers/libadmin");

// Admin database connection
const Library1 = require("./models/library");
const libraryRouter = require("./routers/lib");

console.log(process.env.SECRET_KEY);

// Addbook Connection
const AddBookModel = require("./models/AddModel");
const AddBookRouter = require("./routers/AddRouter");

//BookAllocate Connection
const BookAllocate = require("./models/bookAllocate");
const BookAllocateRouter = require("./routers/BookAllocateRouter");

// students route connection
const AllStudentsRouter = require("./routers/AllStudentsRouter");

const path = require("path");
const app = express();
const hbs = require("hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// console.log(__dirname)
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/Registeration", (req, res) => {
  res.render("Registeration");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/User", auth, (req, res) => {
  res.render("User");
});

app.get("/Admin", authadmin, (req, res) => {
  res.render("Admin");
});


app.get("/AddBook", authadmin, (req, res) => {
  res.render("AddBook");
});
app.get("/AddBookSuper", (req, res) => {
  res.render("AddBookSuper");
});
app.get("/delete", authadmin, (req, res) => {
  res.render("delete");
});
app.get("/deleteSuper", authadmin, (req, res) => {
  res.render("deleteSuper");
});
app.get("/update", authadmin, (req, res) => {
  res.render("update");
});

app.get("/BookAllocate", authadmin, (req, res) => {
  res.render("BookAllocate");
});
app.get("/BookAllocateSuper", (req, res) => {
  res.render("BookAllocateSuper");
});
app.get("/AllBooks", auth, (req, res) => {
  res.render("AllBooks");
});
app.get("/StudentsSuper", authadmin, (req, res) => {
  res.render("StudentsSuper");
});
app.get("/SuperAdmin",  (req, res) => {
  res.render("SuperAdminMain");
});
app.get("/ApproveSuper",  (req, res) => {
  res.render("ApproveSuper");
});
app.get("/allAllocatedBooksSuper",  (req, res) => {
  res.render("AllAllocatedBooksSuper");
});
app.get("/SuperAdminMain",  (req, res) => {
  res.render("SuperAdminMain");
});




cron.schedule("*/10 * * * *", async () => {
  try {
    const today = new Date();
    const books = await BookAllocate.find();

    for (let book of books) {
      const returnDate = new Date(book.ReturnDate);

      if (!isNaN(returnDate)) {
        const daysLate = today > returnDate
          ? Math.floor((today - returnDate) / (1000 * 60 * 60 * 24))
          : 0;

        await BookAllocate.updateOne(
          { _id: book._id },
          { $set: { lateDays: daysLate } }
        );
        const fine = daysLate * 10; // Assuming a fine of 10 units per day
        await BookAllocate.updateOne(
          { _id: book._id },
          { $set: { FineForLate: fine } }
        );
      }
    }

    console.log("lateDays updated successfully");
  } catch (error) {
    console.error("Error updating lateDays:", error);
  }
});


app.use(express.json());

app.use(libraryRouter1);
app.use(libraryRouter);
app.use(AddBookRouter);
app.use(BookAllocateRouter);
app.use(AllStudentsRouter);

app.listen(port, () => {
  console.log(`listening to the port No  ${port}`);
});
