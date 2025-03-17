const mongoose = require("mongoose");

const DB = 'mongodb+srv://abdullahlodhi656:abdullahlodhi123@cluster0.0z8lx.mongodb.net/usersdata?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DB).then( () => {
    console.log("successfull connection");
})
.catch( (err) => {
    console.log("No connection");
});