const express = require("express");
const router = new express.Router();
const libraryRouter1 = require("../models/libraryadmin");
const Library = require("../models/library");


router.use(express.urlencoded ({ extended : true }) );

router.use(express.json());

//This is registration method

router.post("/registeradmin", async (req,res) => {
    try{

        const password = req.body.passwordad;
        const cpassword = req.body.cpasswordad;
        
        if(password === cpassword){
        lowfname = req.body.fnamead;
        lowlname = req.body.lnamead;
         
        const registerUser = new libraryRouter1 ({
            firstname : lowfname.toLowerCase(),
            lastname : lowlname.toLowerCase(),
            age: req.body.agead,
            email : req.body.emailad,
            phone : req.body.phonead,
            password : req.body.passwordad,
            confirmpassword : req.body.cpasswordad

        })
    
    const registered = await registerUser.save();
    res.status(201).render("index");
}
    else{
        res.send("password not matched");
    }
}
    catch(err) {
        res.status(400).send(err);
    }
})

//This is Login Method

router.post("/Admin", async (req,res) => {

    try {
        const email1 = req.body.emailad;
        const password1 = req.body.passwordad;
        
        const Adminemail = await libraryRouter1.findOne({email:email1});
        const name = Adminemail.firstname;
const slicedStr = name.substring(0, 1);
const slicedcap = slicedStr.toUpperCase();

        if(Adminemail.password === password1 ){
            res.render("Admin",{text:`${slicedcap}`});
        }
        else{
            res.send("user not found")
        }

    } catch (error) {

        res.send(error);

    }
})




router.post('/approveds', async (req, res) => {
    const {h1Value} = req.body;
  
    try {
      // Update the user to set isApproved to true
      const approval = await Library.updateOne(
        { registrationNo: h1Value },
        { $set: { isApproved: true } }
      );
      res.render("approve");
    } catch (error) {
      res.status(500).json({ error: 'Error approving user.' });
    }
  });





router.get('/showuser', async (req,res) => {
    try{
        const approveuser = await Library.find({isApproved:false});
        res.status(200).render("approve", { approveuser });
    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})


module.exports = router;