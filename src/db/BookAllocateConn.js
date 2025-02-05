const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/usersdata')
.then( () => {
    console.log("successfull connection");
})
.catch( (err) => {
    console.log("No connection");
});