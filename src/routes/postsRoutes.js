// Importações necessárias
import express from "express"; // Importa o framework Express para criar o servidor
import multer from "multer";    // Importa o Multer para lidar com uploads de arquivos (como imagens)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../Controllers/postsControllers.js"; // Importa funções para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos enviados (Multer)
const storage = multer.diskStorage({
  // Define o destino para os arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Armazena os arquivos na pasta 'uploads/'
  },
  // Define o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  // - Usa o middleware upload.single('imagem') para lidar com um único arquivo chamado 'imagem'
  // - Chama a função uploadImagem após o upload bem-sucedido
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função de rotas como padrão
export default routes;