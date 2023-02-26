const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");

const generateToken = (user) => {
  const { _id, name, email } = user;
  let token = jwt.sign({ _id, name, email }, config.JWT_SECRET_KEY);

  return token;
};

const registerNewUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        error: "Incomplete data",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        error: "User with email already exists",
      });
    }

    password = bcrypt.hashSync(password);

    user = await User.create({ name, email, password });

    return res.send({
      message: "Registration Successful",
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        error: "User with email does not exist",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        error: "Wrong password",
      });
    }

    const token = generateToken(user);
    const { _id, name } = user;

    return res.send({
      message: "Login Successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;

    return res.send({
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
};

module.exports = { registerNewUser, loginUser, getLoggedInUser };
