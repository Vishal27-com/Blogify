const User = require("../Model/user.model");
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ message: user, error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ message: users, error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate({ _id: id }, { $set: req.body });
    res.status(200).send({ message: "Updated", error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.status(200).send({ message: "Deleted", error: false });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const updateFollower = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).send({ message: "Followed", error: false });
    } else {
      res.status(400).send({ message: "Already following", error: true });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const updateUnFollower = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentuser = await User.findById(req.body.userId);
    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentuser.updateOne({ $pull: { followings: req.body.userId } });
      res.status(200).send({ message: "UnFollowed", error: false });
    } else {
      res
        .status(400)
        .send({ message: "Don't unfollow this user", error: true });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};

module.exports = {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateFollower,
  updateUnFollower,
};
