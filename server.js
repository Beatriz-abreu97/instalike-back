import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Array de posts de exemplo, caso não haja dados no banco de dados
const posts = [
  // ... seus posts
];

// Cria uma instância do servidor Express
const app = express();
routes(app)

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("servidor escutando...");
});