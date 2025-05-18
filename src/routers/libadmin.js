const express = require("express");
const router = new express.Router();
const libraryRouter1 = require("../models/libraryadmin");
const Library = require("../models/library");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const authadmin = require("../middleware/authAdmin");

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
        const cookieParser = require("cookie-parser"); 
        router.use(cookieParser());

        const email1 = req.body.emailad;
        const password1 = req.body.passwordad;
        
        const Adminemail = await libraryRouter1.findOne({email:email1});

        if (Adminemail) {
            const isMatch = await bcrypt.compare(password1, Adminemail.password);

        

        if (isMatch) {
  if (Adminemail.isApproved === true) {
    res.cookie("email", Adminemail.email, { httpOnly: true });
    res.render("Admin");
  } else {
    res.render("login", { error: "Your account is not approved by Superadmin" });
  }
} else {
      res.render("login", { showModal: true, message: "Password not correct" });
    }
  } 
            } catch (error) {

                res.send(error);

            }
    })



//approving by admin route
router.post('/approveds', authadmin, async (req, res) => {
    const { registrationNo } = req.body; // <-- Also used as "registerationNo = req.body.registerationNo"
  
    try {
      // Update the user to set isApproved to true
      const approval = await Library.updateOne(
        { registrationNo: registrationNo },
        { $set: { isApproved: true } }
      );
  
      // You can choose to send a response back to the frontend
      res.json({ success: true, message: 'User approved successfully', result: approval });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error approving user.' });
    }
  });

  // Approve Admin By SuperAdmin
  router.post('/ApproveAdmin', async (req, res) => {
    const { email } = req.body; // <-- Also used as "registerationNo = req.body.registerationNo"
  
    try {
      // Update the user to set isApproved to true
      const approval = await libraryRouter1.updateOne(
        { email: email },
        { $set: { isApproved: true } }
      );
  
      // You can choose to send a response back to the frontend
      res.json({ success: true, message: 'User approved successfully', result: approval });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error approving user.' });
    }
  });
  
// Reject user


router.get("/reject/:regNo", async (req, res) => {
  try {
    const regNo = req.params.regNo;

    // Delete user by registration number
    const deletedUser = await Library.findOneAndDelete({ registrationNo: regNo });

    res.render("approve");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Error deleting user");
  }
});



//show all users route
router.get('/showuser', authadmin, async (req,res) => {
    try{
        const approveuser = await Library.find({isApproved:false});
        res.status(200).render("approve", { approveuser });
    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})

//show all Admin route
router.get('/ApproveAdminBySuper', authadmin, async (req,res) => {
    try{
        const approveadmin = await libraryRouter1.find({isApproved:false});
        res.status(200).render("ApproveAdminBySuper", { approveadmin });
    }
    catch (err) {
        res.status(500).send("Error fetching data");
    }
})


module.exports = router;