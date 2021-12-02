const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

usersRouter.post("/authenticate", userController.Authenticate);
usersRouter.post("/createUser", userController.CreateUser);

module.exports = usersRouter;