const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");

const generateToken = (user) => {
  const { _id, username } = user;
  let token = jwt.sign({ _id, username }, config.JWT_SECRET_KEY);

  return token;
};

const registerNewUser = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        error: "Incomplete data",
      });
    }

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send({
        error: "User with username already exists",
      });
    }

    password = bcrypt.hashSync(password);

    user = await User.create({ username, password });

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
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({
        error: "User with this username does not exist",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        error: "Wrong password",
      });
    }

    const token = generateToken(user);
    const { _id } = user;

    return res.send({
      message: "Login Successful",
      data: {
        token,
        user: {
          _id,
          username,
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
    const { _id, username } = user;
    return res.send({
      data: { _id, username },
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
};

module.exports = { registerNewUser, loginUser, getLoggedInUser };
