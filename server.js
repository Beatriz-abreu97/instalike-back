import express from "express";

const posts = [
    {
      descricao: "Uma foto teste",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
      descricao: "Gato fazendo yoga",
      imagem: "https://placekitten.com/200/300"
    },
    {
      descricao: "Gatinho dormindo",
      imagem: "https://placekitten.com/400/200"
    },
    {
      descricao: "Gato curioso",
      imagem: "https://placekitten.com/300/300"
    },
    {
      descricao: "Gato brincando com um novelo de lã",
      imagem: "https://placekitten.com/500/400"
    },
    {
      descricao: "Gato olhando pela janela",
      imagem: "https://placekitten.com/200/200"
    }
  ];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});
