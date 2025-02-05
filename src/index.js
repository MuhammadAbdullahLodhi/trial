const express = require("express");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");

require("./db/conn");

// user database connection
const Library = require("./models/libraryadmin");
const libraryRouter1 = require("./routers/libadmin");


// Admin database connection
const Library1 = require("./models/library");
const libraryRouter = require("./routers/lib");

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
app.use(express.urlencoded({ extended: true }));

// console.log(__dirname)
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.static(staticPath));

app.set("view engine" , "hbs");
app.set("views" , templatePath);
hbs.registerPartials(partialsPath);



app.get( "/" , (req , res) => {
   res.render("index")
}); 
app.get("/about" , (req , res) => {
    res.render("about");
});
app.get("/Registeration" , (req , res) => {
    res.render("Registeration");
});
app.get("/login", (req,res) => {
    res.render("login");
});
app.get("/contact", (req,res) => {
    res.render("contact");
});
app.get("/User", (req,res) =>{
    res.render("User");
});

app.get("/Admin", (req,res) =>{
    res.render("Admin");
});
app.get("/AddBook", (req,res) =>{
    res.render("AddBook");
});
app.get("/delete", (req,res) =>{
    res.render("delete");
});
app.get("/update", (req,res) =>{
    res.render("update");
});
app.get("/AllBooks", (req,res) =>{
    res.render("AllBooks");
});
app.get("/approve", (req,res) =>{
    res.render("approve");
});
app.get("/approveds", (req,res) =>{
    res.render("approve");
});
app.get("/BKAllocatedUser", (req,res) =>{
    res.render("BKAllocatedUser");
});
app.get("/BookAllocate", (req,res) =>{
    res.render("BookAllocate");
});

app.use(express.json());

app.use(libraryRouter1);
app.use(libraryRouter);
app.use(AddBookRouter);
app.use(BookAllocateRouter);

app.listen(port, () => {
    console.log(`listening to the port No  ${port}`)
});