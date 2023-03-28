const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
     username:{type:String,required:true,unique:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     image:{type:String,default:""},
     cover_image:{type:String,default:""},
     description:{type:String},
     followers:{type:Array,default:[]},
     followings:{type:Array,default:[]},
     isAdmin:{type:Boolean,default:false},
     city:{type:String},
     from:{type:String},
     relationship:{type:Number,enum:[1,2,3]}
},{timestamps:true})
const User = mongoose.model("user",userSchema)
module.exports=User