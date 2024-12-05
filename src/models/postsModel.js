// Importa a função para estabelecer conexão com o banco de dados.
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_cONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
  }

// Esta função assíncrona insere um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação.
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}