'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "estates", [{
            title: "APOLAR VENDE IMÓVEL NO BAIRRO ALTO EM CURITIBA.",
            description: "A CASA É MUITO ACONCHEGANTE, BEM PLANEJADA, BEM ENSOLARADA, E ESTÁ DIVIDIDA ASSIM: 3 DORM, SENDO 1 SUITE COM PISO LAMINADO;",
            img_path: "http://localhost:3333/public/174449b836396fc0669d501d7ae904cb.jpg",
            lat: "-25.40301675241798",
            lng: "-49.206608909004295",
            price: 400000,
            city: "Curitiba",
            neighborhood: "Bairro Alto",
            phone: "(41) 3093-1212"
          },
          {
            title: "Sobrado a venda no bairro Boa Vista",
            description: "Sobrado a venda no bairro Boa Vista de 400m² de área construída total, imóvel não averbado. (Não pode ser financiado). Casa com 5 quartos sendo 01 suítes, 3 banheiros e 3 vagas de garagem. O imóvel fica localizado entre as ruas Francisco Prestes Maia e Benevenuto Gusso. Com amplo quintal nos fundos de 75m² Observação: Imóvel necessita de uma pequena reforma.Terreno de 343m².(mar) -",
            img_path: "http://localhost:3333/public/bbe43c5aca4848109f53e218fc6bc537.jpg",
            lat: "-25.38292782455913",
            lng: "-49.2537948096291",
            price: 649000,
            city: "Curitiba",
            neighborhood: "Boa Vista",
            phone: "(41) 3209-0909"
          },
          {
            title: "Apartamento Garden",
            description: "Apartamento Garden localizado proximo ao Parque Barigui, há 5 minutos do Batel. Rua arborizada e tranquila, armários embutidos, iluminação em LED, ar condicionado. Totalmente mobiliado, pronto para morar.",
            img_path: "http://localhost:3333/public/084421659376bfe07437556f9665c156.jpg",
            lat: "-25.442448742013624",
            lng: "-49.31043101523497",
            price: 820000,
            city: "Curitiba",
            neighborhood: "Campina da Siqueira",
            phone: "(41) 3093-1214"
          }
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
