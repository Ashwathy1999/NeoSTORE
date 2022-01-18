const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer  = require('multer');
const jwtSecret = "wewr32vsdfgswfwr2343ert";
//dbconnection
const db = "mongodb://localhost:27017/Neostore";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//end

const registermodel = require("../db/RegisterSchema");
const productmodel = require("../db/productSchema");
const colormodel = require("../db/colorSchema");
const categorymodel = require("../db/categorySchema");
const otpmodel = require("../db/otpSchema");
const cartmodel = require("../db/cartSchema");
const ordersmodel = require('../db/orderSchema')

const DIR ="../Neostore/public/images";
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,DIR);
  },
  filename:(req,file,cb)=>{
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,"user"+'-' + filename)
  }
});
let upload = multer({
  storage :storage,
  fileFilter :(req,file,cb)=>{
    if(file.mimetype =="images/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null,true);
    }
    else{
      cb(null,false);
      return cb(new Error('Only .png , .jpg , .jpeg format allowed'))
    }
  }
})

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

router.post("/adduser", (req, res) => {
  // req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  registermodel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Something went wrong in checking data" });
    } else if (data == null) {
      let ins = new registermodel({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        gender : req.body.gender,
      });
      ins.save((e) => {
        if (e) {
          res.json({ err: 1, msg: "Something went wrong in adding data" });
        } else {
          res.json({ err: 0, msg: "Registered Successfully !" });
        }
      });
    } else {
      res.json({ err: 0, msg: "User already exist" });
    }
  });
});
router.post("/login", (req, res) => {
  // let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  registermodel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } 
    // else {
    //   const token = encryptData(data);
    //   res.json({ err: 0, msg: "Login Success", token: token });
    // }
    else {
      let payload = {
          uid: email
      }
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
      res.json({ "err": 0, "msg": "Login Success", "token": token })
  }
  });
});
const encryptData = (data) => {
  let payload = {
    ...data._doc,
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
  return token;
};

router.get("/fetchpost", (req, res) => {
  productmodel
    .find()
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      res.json({ product: product });
    });
});

router.get("/fetchpopularpost", (req, res) => {
  productmodel
    .find({"category_id":["61cc46653286b9503dfa203e","61cc46653286b9503dfa203c"]})
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      res.json({ product: product });
    });
});

router.get("/fetchproduct", (req, res) => {
  productmodel
    .find()
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      // res.send("Data Fetch")
      res.json({ product: product });
    });
});

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "panikeraparna@gmail.com",
    pass: "suryaponnu",
  },
});

router.post("/email", async (req, res) => {
  let data = await registermodel.findOne({ email: req.body.email });
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpdata = new otpmodel({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    otpdata.save((e) => {
      if (e) {
        res.json({ err: 1, msg: "Something went wrong in adding data" });
      } else {
        res.json({ err: 0, msg: "OTP sent to your email. Please check it !" });
      }
    });
    let mailDetails = {
      from: "panikeraparna@gmail.com",
      to: "ashwathyraghunath@gmail.com",
      subject: "Your OTP for password reset",
      text: "...",
      html: `<!DOCTYPE html>
    <html>
    <head>
    <style>
   span {
        color:red;
      }

    </style>
    </head>
    <body>
    <h1>Neo<span>STORE</span><h1><hr/>
    
    <h3>To authenticate, please use the following One Time Password (OTP):

    <h1>${otpdata.code}</h1>
    
    Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.
    
    We hope to see you again soon.</h3>
    </body>
    </html> `,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  } else {
    res.json({ err: 1, msg: "Email id doesn't exist" });
  }
});

router.post("/changepassword", async (req, res) => {
  let data = await otpmodel.findOne({
    email: req.body.email,
    code: req.body.code,
  });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    if (diff < 0) {
      res.json({ err: 1, msg: " Token Expires" });
    } else {
      let user = await registermodel.findOne({ email: req.body.email });
      if (user) {
        user.password = req.body.password;
        user.save();
        res.json({ err: 0, msg: "Password Changed Successfully !" });
      } else {
        console.log("Something went wrong :(");
      }
    }
  } else {
    res.json({ err: 1, msg: "Enter Correct OTP " });
  }
});

router.get("/singleproduct/:id", (req, res) => {
  let id = req.params.id;

  productmodel
    .findOne({ _id: id })
    .populate("color_id")
    .then((product) => {
      console.log(product);

      res.json({
        product: product,
        err: "0",
        image: product.product_subimages,
      });
    });
});

router.get("/fetchdata", (req, res) => {
  let email = req.body.email;
  registermodel.findOne({ email: email }, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});

router.post("/additem", (req, res) => {
  cartmodel.findOne({ user: req.user._id }).then((err, cart) => {
    if (err) return res.json({ err: 1, msg: "something went wrong" });
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;
      if (item) {
        condition = { "user": req.user._id, "cartItems.product": product };
        update = {
          "$set": {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.body.user._id };
        update = {
          "$push": {
            "cartItems": req.body.cartItems,
          },
        };
      }
      cartmodel.findOneAndUpdate(condition, update).then((err, _cart) => {
        if (err) return res.json({ err: 1, msg: "something went wrong" });
        if (_cart) {
          return res.json({ err: 0, cart: _cart });
        }
      });
    } else {
      const cart = new cartmodel({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((err, cart) => {
        if (err) return res.json({ err: 1, msg: "something went wrong" });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
});

//add address
router.post("/addaddress", (req, res) => {
  // let Address=[];
  console.log("address section")
  console.log(req.body)
  registermodel.find({ email: req.body.email }, (err, data) => {
      if (err) {
          res.json({ err: 1, 'msg': "Unable to Add Address" })
      }
      else {
          let email = req.body.email;
          let address = req.body.address;
          let pincode = req.body.pincode;
          let city = req.body.city;
          let state = req.body.state;
          let country = req.body.country;
          let update = req.body.update;
          // let Address=req.body.Address;
          // console.log(Address)
          let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, state: state, country: country }
          console.log(addressData)
          data[0].Address.push(addressData)
          console.log(data)
          registermodel.updateOne({ email: email }, { $set: { Address: data[0].Address } }, (err, data) => {
              if (err) {
                  res.json({ 'err': 1, "msg": "Address Not Added" })
              }
              else {
                  res.json({ "err": 0, "msg": "Address added successfully", user_details: data });
                  console.log(data.Address)
              }
          })
      }
  })
})
//edit address
router.post("/editaddress", (req, res) => {
  console.log("address edit section")
  console.log(req.body)
  registermodel.updateMany({}, { $set: { "Address.$[elem].address": req.body.address, "Address.$[elem].pincode": req.body.pincode, "Address.$[elem].city": req.body.city, "Address.$[elem].state": req.body.state, "Address.$[elem].country": req.body.country } }, { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] }, (err, data) => {
      if (err) {
          console.log(err);
          res.json({ err: 1, 'msg': "unable to Update address" })
      }
      else {

          registermodel.find({ email: req.body.email }, (err, data) => {
              if (!data[0]) {
                  console.log('inside email not found');
                  res.json({ err: 1, "msg": "Unable to genrate jwt" })
              }
              else {
                  let payload = { uid: data }
                  const token = jwt.sign(payload, jwtSecret, { expiresIn: 360 })
                  res.status(200).json({ "err": 0, "msg": "Address Updated Successfully", "token": token })
              }
          })
      }
  })
})
//delete address
router.delete('/deleteadd/:Address._id', (req, res) => {
  let id = req.params.id;
  registermodel.deleteOne({Address_id: id }, (err) => {
      if (err) throw err;
      res.json({ msg: "Do you want to delete" })
  })
})
//changepassword
router.put("/changepass/:id", (req, res) => {
  let id = req.params.id;
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword
  registermodel.updateOne({ _id: id }, { $set: { password: password, confirmpassword: confirmpassword } }, (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Password Updated Succesfully" });
  })
})
//update profile
router.put('/updprofile/:id', (req, res) => {
  let id = req.params.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let mobile= req.body.mobile;
  console.log(fname)
  // let password = req.body.password;
  registermodel.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, email: email, mobile: mobile } }, (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Userprofile has Updated Succesfully" });
  })
})

router.get("/profile/:email",autenticateToken, (req, res) => {
  let email = req.params.email;
  registermodel.findOne({ email: email }, (err, data) => {
      if (err) res.json({ err: err })
      // console.log(data.Address)
      res.json({ user: data})
      // res.json({ user: data})
      // console.log(data)
  })
})
router.get("/socialprofile/:email",(req, res) => {
  let email = req.params.email;
  registermodel.findOne({ email: email }, (err, data) => {
      if (err) {
        res.json({ err: err })
      }
      else{
      res.json({socialuser:data})
      // console.log(socialuser)

      }
      
  })
})

router.get("/getaddress/:email",autenticateToken, (req, res) => {
  let email = req.params.email;
  registermodel.findOne({ email: email }, (err, data) => {
      if (err) res.json({ err: err })
      // console.log(data.Address)
      res.json({ address: data.Address })
      // res.json({ user: data})
      // console.log(data)
  })
})
//order data
router.get("/getorder/:email", (req, res) => {
  let email = req.params.email;
  ordersmodel.find({ email: email }, (err, data) => {
      if (err) {
          throw err;
      }
      res.json({ user: data, "err": 1 })
  })
})

router.get('/loginfirst', autenticateToken, (req, res) => {
  res.json({ "err": 0 })

})

//checkout
router.post("/carddetails", (req, res) => {
  let field = {
      Orderno: req.body.orderno,
      email: req.body.email,
      items: req.body.items,
      //cardnumber: req.body.cardnumber,
      total: req.body.total,
  };
  console.log(field)
  let ins = new ordersmodel({ ...field });
  ins.save((err) => {
      if (err) {
          console.log(err)
          res.send("Error");
      } else {
          res.send({ flag: 1, msg: "Details Added" });

      }

  });
});
router.post("/cardaddress",autenticateToken, (req, res) => {
  let email = req.body.email;
  ordersmodel.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "ORDER PLACED" });
  })

});

router.get("/getinvoice/:orderno",autenticateToken, (req, res) => {
  let orderno = req.params.orderno;
  ordersmodel.find({ Orderno:orderno }, (err, data) => {
      if (err) {
          throw err;
      }
      res.json({ orderdetail: data, "err": 1 })
  })
})

router.post("/sendmail", upload.single("file"), (req, res) => {
  console.log("insendmail");
  console.log(req.file);
  // let transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //         user: "panikeraparna@gmail.com",
  //         pass: "suryaponnu",
  //     },
  // });
  let mailOptions = {
      from: "panikeraparna@gmail.com",
      to: ["ashwathyraghunath@gmail.com"],
      subject: "Invoice Details",
      text: "Invoice Details",
      attachments: [
          {
              filename: "text2.pdf",
              content: req.file.buffer,
          },
      ],
  };
  mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log("Email sent: " + info.response);
      }
  });
});

router.put("/Rating/:id", (req, res) => {
  let id = req.params.id;
  let product_rating = req.body.newrating

  console.log(id)

  console.log(product_rating)
  console.log(req.body)

  productmodel.updateOne({ _id: id }, { $set: { product_rating: product_rating } }, (err) => {
      if (err) {
          res.json({ err: err })
      }
      else {
          res.json({ msg: "Rating Updated Succesfully" });
      }

  })
})

module.exports = router;

// router.post("/profilePic")

// router.post("/updateprofile",autenticateToken, (req, res) => {
//   // let id = req.params.id;
//   let fname = req.body.fname;
//   let lname = req.body.lname;
//   let email = req.body.email;
//   let mobile = req.body.mobile;
//   console.log(name);
//   // let password = req.body.password;
//   registermodel.findOneAndUpdate(
//     { email: email },
//     { $set: { fname: fname, lname: lname, email: email, mobile: mobile } },
//     (err,data) => {
//       if (err) {
//         res.json({ err:1,msg:"Sommething went wrong"  });
//       }
//       else{
//         const token = encryptData(data);
//         res.json({err:0, msg: "Userprofile has Updated Succesfully",token: token });
//       }
//     }
//   );
// });