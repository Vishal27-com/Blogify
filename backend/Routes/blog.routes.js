const express = require("express");
const {
  postBlog,
  updateBlog,
  deleteBlog,
  actionOnBlog,
  getBlog,
  getTimelineBlog,
} = require("../Controller/blog.controller");
const app = express.Router();

// create a post
app.post("/", postBlog);
// update a post
app.patch("/:id", updateBlog);
// delete a post
app.delete("/:id", deleteBlog);
// like & dislike a post
app.patch("/:id/like", actionOnBlog);
// get a post
app.get("/:id", getBlog);
// get timeline posts
app.get("/timeline/all", getTimelineBlog);

module.exports = app;
