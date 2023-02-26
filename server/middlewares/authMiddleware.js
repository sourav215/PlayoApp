const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (authorization) {
    const token = authorization.split(" ").pop();

    if (token) {
      try {
        jwt.verify(token, config.JWT_SECRET_KEY);

        let user = jwt.decode(token);
        userInDB = await User.findById(user._id);
        user = userInDB.toJSON();
        delete user.password;

        req.user = user;
        next();
      } catch (err) {
        return res.status(401).send({ messege: "Invalid token provided" });
      }
    } else {
      return res.status(401).send({ messege: "No Auth token present" });
    }
  } else {
    return res.status(401).send({ messege: "User is not logged In" });
  }
};

module.exports = authMiddleware;
