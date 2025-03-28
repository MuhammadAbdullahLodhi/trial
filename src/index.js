require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const authadmin = require("./middleware/authAdmin");

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

// app.get("/ShowBooks", authadmin, async (req, res) => {
//     try {
//         const allbooks = await AddBookModel.find({}); // Fetch books from MongoDB
//         res.render("AllBooks", { allbooks }); // Pass books to template
//     } catch (error) {
//         console.error("Error fetching books:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get("/ShowBooks" , (req,res) =>{
//     res.render("AllBooks");
// });
app.get("/AddBook", authadmin, (req, res) => {
  res.render("AddBook");
});
app.get("/delete", authadmin, (req, res) => {
  res.render("delete");
});
app.get("/update", authadmin, (req, res) => {
  res.render("update");
});

app.get("/BookAllocate", authadmin, (req, res) => {
  res.render("BookAllocate");
});
app.get("/AllBooks", auth, (req, res) => {
  res.render("AllBooks");
});

app.use(express.json());

app.use(libraryRouter1);
app.use(libraryRouter);
app.use(AddBookRouter);
app.use(BookAllocateRouter);

app.listen(port, () => {
  console.log(`listening to the port No  ${port}`);
});
