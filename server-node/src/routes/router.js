const express = require("express");
const userRouter = require("./userRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Bem-vindo a API de Imobiliária");
});

router.use("/users", userRouter);

module.exports = router;