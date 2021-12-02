const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");

router.get("/", (req, res) => {
    res.status(200).json("Bem-vindo a API de Imobiliária");
});

router.use("/users", userRouter);

module.exports = router;