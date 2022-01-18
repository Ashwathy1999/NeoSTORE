const mongoose=require('mongoose');
const RegisterSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    // 
    Address: [
        { Address_id: { type: Number }, address: { type: String }, pincode: { type: Number }, city: { type: String }, state: { type: String }, country: { type: String } }
    ],
    profileImg: {
        type: String,
        required: false
    }, 

    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("register",RegisterSchema);