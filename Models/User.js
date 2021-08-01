const mongoose=require('mongoose');

const userschema = new mongoose.Schema({
    name:{type:String , reaquired:true},
    email:{type:String , required:true},
    phone:Number,
});

module.exports=user=mongoose.model("user",userschema);