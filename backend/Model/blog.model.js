const mongoose =require("mongoose")
const blogSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    desc:{type:String},
    img:{type:String},
    likes:{type:Array,default:[]}
},{timestamps:true})

const Blog=mongoose.model('blog',blogSchema)
module.exports=Blog;