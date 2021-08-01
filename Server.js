const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User');
const router = express.Router();
const app = express();
//Environment variables
require('dotenv').config();

//Connect To DataBase
const connectDB = async ()=>{
    try {
        let result = mongoose.connect("mongodb://localhost:27017/PersonDB",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DataBase Connected");
    } catch (error) {
        console.log(error);
    }
};
connectDB();

//Routes
// GET :  RETURN ALL USERS
router.get('/',async (req,res)=>{
    try {
        const detail=await User.find();
        res.send({response:detail , message:"Get All Users"});
    } catch (error) {
        console.log(error);
        res.status(400).send('Can Not Get All Users');
    }
});

// POST :  ADD A NEW USER TO THE DATABASE
router.post('/', async (req,res)=>{
    try {
        let newUser = new User(req.body);
        const detail = await newUser.save();
        res.send({response:detail , message:"New User Added"});
    } catch (error) {
        console.log(error);
        res.status(401).send("Can Not Added User");
        
    }
});

// PUT : EDIT A USER BY ID 
router.put('/:id', async(req,res)=>{
    try {
        const detail=await User.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}}
        );
        detail.nModified
            ? res.send({message:"User Updated"})
            : res.send({message:"User Already Updated"});
    } catch (error) {
        console.log(error);
        res.status(402).send("Can Not Update User");
    }
});

// DELETE : REMOVE A USER BY ID 
router.delete('/:id', async(req,res)=>{
    try {
        const detail = await User.deleteOne({_id:req.params.id});
        detail.deletedCount
            ? res.send({message:"User Deleted"})
            : res.send({message:"User Already Deleted"});
    } catch (error) {
        console.log(error);
        res.status(403).send("Can Not Delete User");
    }
});







// Start Server
const port=process.env.PORT ;
app.listen(port,(err)=>{
    if (err) console.log(err);
    console.log(`The Server is Listening On Port ${port}`);
});