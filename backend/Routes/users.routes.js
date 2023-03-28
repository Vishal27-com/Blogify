const express =require("express")
const { getUser, getAllUser, updateUser, deleteUser } = require("../Controller/user.controller")
const app=express.Router()

// get one user 
app.get("/:id",getUser)
// get all user 
app.get("/",getAllUser)
// update user 
app.patch("/:id",updateUser)
// delete user 
app.delete("/:id",deleteUser)
// follow a user
app.patch('/:id/follow',updateFollower)
// unfollow a user
app.patch('/:id/unfollow',updateUnFollower)

module.exports=app
