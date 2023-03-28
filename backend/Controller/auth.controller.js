const User = require("../Model/user.model");
const bcrypt = require("bcrypt");

const registerApi = (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, function (err, hashed) {
      if (err) res.status(500).send({ message: err.message, error: true });
      else {
        let user = new User({ username, email, password: hashed });
        user.save();
        res.status(200).send({ message: "Signup Successfully", error: false });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
const loginApi = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          res.status(200).send({ message: "Login Successfully", error: false });
        } else res.status(401).send({ message: "Invalid Credentials", error: true });
      });
    } else res.status(401).send({ message: "User doesn't exist", error: true });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
module.exports = { registerApi, loginApi };
