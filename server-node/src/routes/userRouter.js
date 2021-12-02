const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

usersRouter.post("/", userController.CreateUser);

module.exports = usersRouter;