const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";
// const fs=require('fs')
//dbconnection 
const nodemailer = require('nodemailer');

const db = "mongodb://localhost:27017/Neostore";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
connectDB();
//end
const productmodel = require('../db/productSchema')
const colormodel = require('../db/colorSchema')
const categorymodel = require('../db/categorySchema')
const displaymodel = require('../db/displaySchema')
const ordersmodel = require('../db/OrdersSchema')
const registermodel = require('../db/RegisterSchema')
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.post("/adduser", (req, res) => {
    // console.log(req.body)
    let ins = new registermodel({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, password: req.body.password });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
})
// router.get("/verify",(req,res)=>{
//     registermodel.find({}, (err, data) => {
//         if (err) throw err;
//         res.json({ 'data': data })
//     })

// })


router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    registermodel.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }
    })
})
router.get("/fetchpost", (req, res) => {
    // displaymodel.find({}, (err, data) => {
    //     if (err) throw err;
    //     res.json({ "err": 0, 'data': data })
    // })
    // productmodel.find({}, (data))
    //     .populate(["category_id", "color_id"])
    //     .then(product => {
    //         console.log(product);
    //         res.send("Data Fetch")

    //         res.json({ 'product': product })
    //     })
    productmodel.find().populate(["category_id", "color_id"])
        .then(product => {
            console.log(product);
            // res.send("Data Fetch")
            res.json({ product: product })
        })

})
router.get("/fetchproduct", (req, res) => {

    productmodel.find().populate(["category_id", "color_id"])
        .then(product => {
            console.log(product);
            // res.send("Data Fetch")
            res.json({ product: product })
        })

})

router.get("/fetchorders", autenticateToken, (req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err": 0, 'data': data })
    })

})
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kameshrane99@gmail.com',
        pass: 'kpr.20499'
    }
});
router.post("/addorder", (req, res) => {
    //    console.log()
    // console.log("post called")

    //     console.log(`add post called `);
    console.log(req.body.cart)
    let name = [];
    let price = 0;
    for (let i = 0; i < req.body.cart.length; i++) {
        price = price + req.body.cart[i].price;
        if (i != (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name + ",")


        }
        else if (i = (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)

        }



    }
    let ins = new ordersmodel({ name: name, card: req.body.card, price: price, user: req.body.user });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })


    let mailDetails = {
        from: 'kameshrane99@gmail.com',
        to: 'kameshrane99@gmail.com',
        subject: ' Pizz orderdetails',
        text: `Total details:
                
            Order data- ${name}
            Total -${price}`

    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });


})



module.exports = router;