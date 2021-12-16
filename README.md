# tads-mobile-project

## Membros da equipe: 
### Nícolas Teixeira Guerra Garcia - GRR20193920
### José Adilson de Paula Cardoso - GRR20193771

## Inicializar a API do projeto
- cd server-node
- npm install
- atualizar o .env do projeto para conectar-se ao seu banco de dados
- npx sequelize db:create
- npx sequelize db:migrate
- npx sequelize db:seed:all 
- npm start
## Rodar a API do projeto para que o app possa se conectar
#### A recomendação é utilizar ngrok (https://ngrok.com)
- efetuar o download do ngrok e abri-lo
- executar ngrok http 3333
## Inicializar o app:
- cd app-react-native
- npm install
- atualizar o valor da API_URL em app-react-native\src\core\constants.js para a URL HTTPS do ngrok
- expo start -c

## Contas de teste: 
- e-mail: nicolasteixeira3856@outlook - senha: senha123
- e-mail: chrono.jap@gmail.com - senha: senha123

Enunciado:
Especificação do Trabalho Prático

Objetivo: Desenvolver um aplicativo utilizando React Native e os conteúdos vistos durante a disciplina.

Requisitos:
Utilizar componentes funcionais e Hooks;
Comunicar com uma API externa (criada por vocês ou disponibilizada por terceiros);
Possuir algum tipo de autenticação de usuário atrelada à API;
Impressionar o professor :)
O projeto deve ser disponibilizado em um repositório no gitlab do TADS e ter todos os membros do grupo cadastrados como desenvolvedores nesse projeto (utilizar o interface do Gitlab para isso).

Como informado no Plano de Ensino, a avaliação do trabalho será dividida em duas partes:
Análise do código fonte;
Vídeo de apresentação, com a participação de todos os integrantes do grupo (pode ser apenas voz), demonstrando o Aplicativo em funcionamento.
A nota será diretamente proporcional à complexidade e ao número de telas do Aplicativo desenvolvido.

Data de entrega: 16/12/2021

O projeto deve ser realizado em grupos entre 3 e 5 estudantes.
