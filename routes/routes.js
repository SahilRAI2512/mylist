const express = require('express');
const router = express.Router();
const user = require('../models/user');
const multer = require('multer');

//image
var storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
})

var upload = multer({
    storage: storage,
}).single("image");

// insert user into db
router.post('/add ', upload,(req, res) => {
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
        
    });
    user.save((err) => {
        if (err){
            res.json({ message: err.message, type: "danger" });
        } else {
            req.session.message = {
                type: "success",
                message: "User added successfully",
            };
            res.redirect("/");
        }
    });
})

router.get("/", (req, res) =>{
    res.render("index", { title: "Home Page"})
});

router.get("/add", (req, res) =>{
    res.render("add_user", { title: "Add Users"})
});

module.exports = router;