const Blog = require('../Model/blog.model');
const Blog=require('../Model/blog.model')
const User=require('../Model/user.model')
const postBlog = async (req, res) => {
  try {
    const newBlog=new Blog(req.body)
    await newBlog.save()
    res.status(200).send({ message:'Posted', error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const updateBlog = async (req, res) => {
  try {
      await Blog.findByIdAndUpdate({_id:req.params.id},{$set:req.body})
      res.status(200).send({ message:'Updated', error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndRemove({_id:req.params.id},{$set:req.body})
    res.status(200).send({ message:'Deleted', error: false }); 
  }catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const actionOnBlog = async (req, res) => {
  try {
    const blog=await Blog.findById(req.params.id)
    if(!blog.likes.includes(req.body.userId)){
        await blog.updateOne({$push:{likes:req.body.userId}})
        res.status(200).send({ message:'Liked', error: false });
    }
    else {
        await post.updateOne({$pull:{likes:req.body.userId}})
        res.status(200).send({message:'Disliked',error:false})
    }
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const getBlog = async (req, res) => {
  try {
    const blog=await Blog.findById(req.params.id)
    res.status(200).send({ message: blog, error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const getTimelineBlog = async (req, res) => {
  try {
    const currentUser=await User.findById(req.body.userId)
    const userPosts=await Blog.find({userId:currentUser._id})
    const friendPosts=await Promise.all(currentUser.followings.map((friendId)=>{
         Blog.find({userId:friendId})
    }))
    res.status(200).send({ message: userPosts.concat(...friendPosts), error: true });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};

module.exports = {
  postBlog,
  updateBlog,
  deleteBlog,
  actionOnBlog,
  getBlog,
  getTimelineBlog,
};
