const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const registerApi = (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, (err, hashed)=> {
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
      bcrypt.compare(password, user.password,  (err, result)=> {
        if (result) {
          const token=jwt.sign({email:user.email,password:user.password},process.env.SECRET_KEY,{expiresIn:"7 days"});
          const {password,...other}=user._doc;
          const cookieConfig={
            httpOnly:false,
            maxAge:900000,
            samesite:'none',
            secure:true
          }
          res.cookie("access_token",token,cookieConfig);
          res.status(200).send({ message: {...other}, error: false });
        } else res.status(401).send({ message: "Invalid Credentials", error: true });
      });
    } else res.status(401).send({ message: "User doesn't exist", error: true });
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};
module.exports = { registerApi, loginApi };
