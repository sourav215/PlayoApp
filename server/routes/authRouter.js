const express = require("express");
const authMiddleware =  require("../middlewares/authMiddleware");
const {registerNewUser, loginUser, getLoggedInUser} = require('../controllers/authController')


const authRouter = express.Router();

authRouter.post('/register', registerNewUser);
authRouter.post('/login', loginUser);
authRouter.get('/loggedInUser', authMiddleware, getLoggedInUser);

module.exports = authRouter;