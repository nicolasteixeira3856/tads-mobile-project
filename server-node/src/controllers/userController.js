const User = require("../models/User");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 18000, // Token expira em 5 horas
    });
    return token;
}

module.exports = {
    async CreateUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ msg: "Preencha todos os dados obrigatórios corretamente." });
            } else {
                const userExists = await User.findOne({
                    where: { email },
                });

                if (userExists) {
                    res.status(403).json({ msg: "O e-mail informado já está vinculado a um usuário." });
                } else {
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(password, salt);
                    const user = await User.create({
                        companyName,
                        cnpj,
                        password: hash,
                        address
                    }).catch((error) => {
                        res.status(500).json({ msg: "Não foi possível cadastrar no sistema - " + error });
                    });
                    if (user)
                        res.status(201).json({ msg: "Usuário cadastrado com sucesso." });
                    else
                        res.status(404).json({ msg: "Não foi possível cadastrar um novo usuário." });
                }
            }
        } catch (error) {
            res.status(500).json({ msg: "Não foi possivel cadastrar um novo associado - Erro: " + error })
        }
    },
}