# Amiko_res

## Descrição: 

-Implementação de Endpoints Restful para Gestão de Chamados.
-Utiliza Node.js v20.14.0
-Utiliza conexão com MongoDB como banco de dados (pela biblioteca Mongoose)

Dependências:
Express:   "4.19.2",
Mongoose:  "8.4.3",
Nodemon:   "3.1.3",

## Execução:

-Para executar esse arquivo basta ter node.js instalado com as dependencias.

-Comando para instalar dependencias é:

**npm i express, mongoose, nodemon**

-Instale algum app como **insomnia**, **postman**, ou alguma outra aplicação (plugin **Thunder** no Vscode) que possa fazer de forma fácil requisições HTTP.

-Entre em **src/index.js** e digite os seus dados de conexão com o MongoDB nos campos abaixo :

await mongoose.connect('**link_de_conexão_MongoDB**');

-Exemplo:

await mongoose.connect('mongodb+srv://**joaozinho**:**senha123**@**cluster0**.1tqagfh.mongodb.net/?retryWrites=true&w=majority&appName=**Cluster0**');

-Acesse pelo powershell a pasta AMIKO-API e execute:

**node src/index.js** ou **nodemon src/index.js**