import express from "express";
import { listarPosts } from "../Controllers/postsControllers.js";

const routes = (app) =>{
    // Permite que o servidor receba dados no formato JSON
    app.use(express.json());
    //Rota para buscar todos os posts
    app.get("/posts", listarPosts)
}

export default routes;