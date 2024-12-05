import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
// Chama a função para buscar os posts
const posts = await getTodosPosts();
// Envia uma resposta HTTP com status 200 (ok) e lista de posts em formato JSON.
res.status(200).json(posts);
}

// **Função para criar um novo post**
// Cria um novo post com base nos dados recebidos em uma requisição POST e salva no banco de dados.
// **Tratamento de erros:** Utiliza um bloco `try...catch` para capturar possíveis erros durante a criação do post.
export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

// **Função para fazer upload de uma imagem e criar um novo post**
// Cria um novo post associado a uma imagem enviada na requisição. 
// Salva a imagem em um diretório específico, renomeando-a com o ID do post.
// **Tratamento de erros:** Utiliza um bloco `try...catch` para capturar possíveis erros durante a criação do post e o upload da imagem.
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  }
  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
 
  try {
    
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    
    const  postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}
