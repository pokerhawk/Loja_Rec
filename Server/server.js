//const { exec } = require('child_process');
const fs = require("fs");
const express = require("express"); // remove cors and pg-promise
var cors = require("cors");
const app = express();
const port = 3000;
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "hubs",
    database: "lojaDB",
  },
});
app.use(cors());
app.use(express.json());
////////////////////////////////////// SERVER

app.get("/usuarios", (req, res) => {
  knex
    .select("*")
    .from("usuarios")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/produtos", (req, res) => {
  knex
    .select("*")
    .from("produtos")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/pedidos", (req, res) => {
  knex
    .select("*")
    .from("pedidos")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/image.png", (req, res) => {
//   res.sendFile(path.join(__dirname, "../face-rec/images/Itamar.jpeg"));
// });

app.put("/carrinho", async (req, res) => {
  const { produto, quantidade_prod } = req.body;
  knex("produtos")
    .where("produto", produto)
    .update({
      quantidade: quantidade_prod,
    })
    .then(res.json("Quantidade Atualizada"))
    .catch((err) => {
      res.json(`ERROR: ${err}`);
    });
});

app.put("/atualizaDivida", async (req, res) => {
  const { cost, nome } = req.body;
  knex("usuarios")
    .where("login", nome)
    .update({
      divida: cost,
    })
    .then(res.json("Divida Atualizado"))
    .catch((err) => {
      res.json(`ERROR: ${err}`);
    });
});

app.post("/cadastro", async (req, res) => {
  const { nome, senha, imagem } = req.body;
  if (!nome || !senha) {
    return res.status(400).json("Dados incorretos!");
  }
  knex
    .transaction((trx) => {
      trx
        .insert({
          login: nome,
          senha: senha,
          divida: 0,
        })
        .into("usuarios")
        .then(trx.commit)
        .catch(trx.rollback)
        .then(res.json("Cadastrado com sucesso!"));
    })
    .catch((err) => {
      console.log(err);
      return res.json("Login existente, tente novamente!");
    });
  fs.writeFile("../face-rec/images/test.jpg", imagem);
});

app.post("/pedido", async (req, res) => {
  const nome = req.body.nome;
  const codigo = req.body.codigo;
  const data = req.body.data;
  if (!nome || !codigo || !data) {
    return res.status(400).json("Dados incorretos!");
  }
  knex
    .transaction((trx) => {
      trx
        .insert({
          usuario: nome,
          codigo: codigo,
          data: data,
        })
        .into("pedidos")
        .then(trx.commit)
        .catch(trx.rollback)
        .then(res.json("Pedido Efetuado"));
    })
    .catch((err) => {
      console.log(err);
      res.json("Algo deu errado!");
    });
});

// app.delete('/deletarUsuario', (req, res)=>{ // CHECK
//   knex('usuarios').dropColumn().where('nome', 'joao');
//   knex('usuarios').where('nome', 'joao').del()
//   .then(res=>{console.log(res)})
//   .catch(err=>{console.log(err)})
// })

////////////////////////////////////// CONSOLE LOG DISPLAYS

// knex
// .select("*")
// .from("usuarios")
// .then((data) => {
//   console.log(data);
// })
// .catch((error) => {
//   console.log(error);
// });

// knex
// .select("*")
// .from("usuarios")
// .where({
//   login: "eliabe",
// })
// .then((data) => {
//   console.log(data);
// });

// knex.select("*").from("produtos")
// .then((data)=>{
//   console.log(data)
// })

// knex.select("*").from("pedidos")
// .then((data)=>{
//   console.log(data)
// })

///////////////////////////////////////

//READING FILE//

fs.writeFile("../face-rec/pessoa.txt", "Unknown", function (err) {
  if (err) return console.log(err);
  console.log('Unknown > pessoa.txt');
}); //resetting face rec person before start

app.get("/pessoaReconhecida", async (req, res) => {
  fs.readFile("../face-rec/pessoa.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    const textfile = data.toString().split();
    const pessoaReconhecida = textfile[textfile.length - 1];
    res.json(pessoaReconhecida);
  });
});

///////////////////////////////////////
app.listen(port, () => {
  console.log(`Server running at https:localhost:${port}`);
});
