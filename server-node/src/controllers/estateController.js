const Estate = require("../models/Estate");

module.exports = {
    async listAllEstates(req, res) {
        const estate = await Estate.findAll({
            order: [
                ["price", "DESC"]
            ],
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (estate) {
            res.status(200).json({ estate });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar imóveis." });
        }
    },

    async findStateById(req, res) {
        const id = req.body.id;
		if (!id)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const estate = await Estate.findOne({
				where: { id },
			});
			if (!estate) {
                return res.status(404).json({ msg: "Não foi possível encontrar o imóvel"});	
            } else {
                return res.status(200).json({ estate });
			}
		} catch (error) {
			res.status(500).json({ msg: "Erro de conexão com o servidor!" });
            console.log(error);
		}
    }
}