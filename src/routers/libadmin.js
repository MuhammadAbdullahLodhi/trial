const express = require("express");
const router = new express.Router();
const libraryRouter1 = require("../models/libraryadmin");
const Library = require("../models/library");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        })
    
        const token = await registerUser.generateAuthToken();
        // console.log("the token part " + token);

        res.cookie("jwtadmin", token, {
            expires:new Date(Date.now() + 30000),
            httpOnly:true
        })

    const registered = await registerUser.save();
        // console.log("the page part" + registered);

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

        const isMatch = await bcrypt.compare(password1, Adminemail.password);

        const token = await Adminemail.generateAuthToken();
        console.log("the token part " + token);

        res.cookie("jwtadmin", token, {
            expires:new Date(Date.now() + 300000),
            httpOnly:true
        })

        if(isMatch){
            res.render("Admin");
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