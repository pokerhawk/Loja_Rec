const atualizarProdutos = async () => { //talvez mudar
  const divProdutos = document.getElementById("divProdutos");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "produtos");
  divProdutos.appendChild(ul);
  const response = await fetch("http:/localhost:3000/produtos")
  const result = await response.json();
  for(i in result){
    const produtos = document.getElementById("produtos");
    const li = document.createElement("li");
    const text = document.createTextNode(
      `${result[i].quantidade} ${result[i].produto} - ${result[i].preco}R$ / ID do Produto: ${result[i].ID}`
    );
    li.appendChild(text);
    produtos.appendChild(li);
  }
};
atualizarProdutos();

const removerProdutos = () => {
  const divProdutos = document.getElementById("divProdutos");
  const produtos = document.getElementById("produtos");
  divProdutos.removeChild(produtos);
};

const removerCarrinho = () => {
  // NOT BEING USED
  const divCarrinho = document.getElementById("divCarrinho");
  const carrinho = document.getElementById("carrinho");
  divCarrinho.removeChild(carrinho);
};

const atualizarCarrinho = async () =>{ ///NEED TO FIX THIS ///
  if (!document.getElementById("carrinho")) {
    const divCarrinho = document.getElementById("divCarrinho");
    const ul = document.createElement("ul");
    ul.setAttribute("id", "carrinho");
    divCarrinho.appendChild(ul);
  }
  const id_produto = document.getElementById("id_produto").value;
  const quantidade_produto = document.getElementById("quantidade_produto").value;
  const carrinho = document.getElementById("carrinho");
  const response_info = await fetch("http:/localhost:3000/produtos")
  const result_info = await response_info.json();
  let dbContador = 0;
  for(i in result_info){
    if(result_info[i].ID == id_produto){
      dbContador = Number(result_info[i].quantidade - quantidade_produto);
      const text = document.createTextNode(
        `${quantidade_produto} ${result_info[i].produto}`
      );
      if(document.getElementsByClassName("produtos_no_carrinho")){
        const prods_carrinho = document.getElementsByClassName("produtos_no_carrinho");
        for (i in prods_carrinho) {
          console.log(prods_carrinho.item(i))
          let splitNumero = (prods_carrinho[i].innerText).split(' ');
          const textVerifica = `${splitNumero[0]} ${result_info[i].produto}`;
          if (prods_carrinho[i].innerText == textVerifica) {
            Number(splitNumero += quantidade_produto);
            prods_carrinho[i].innerText = `${splitNumero} ${result_info[i].produto}`;
            break;
          }
        }
      } else {
        const li = document.createElement("li");
        li.setAttribute("class", "produtos_no_carrinho");
        li.appendChild(text);
        carrinho.appendChild(li);
        break;
      }
    }
  }
  const response = await fetch("http:/localhost:3000/carrinho", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ID_prod: id_produto,
      quantidade_prod: dbContador
    }),
  });
  const result = await response.json();
  console.log(result);
  // dbContador = 0;
  removerProdutos();
  atualizarProdutos();
}

///////////////////////FINE//////////////////////////
const conferirDivida = async () => { 
  const response = await fetch("http:/localhost:3000/divida");
  const result = await response.json();
  const login = document.getElementById("login_input").value;
  const senha = document.getElementById("senha_input").value;
  let divida = document.getElementById("resposta_dividendo");
  for (i in result) {
    if (login == result[i].nome && senha == result[i].senha) {
      divida.innerText = `${result[i].nome} você está devendo R$${result[i].divida}`;
      break;
    }
  }
};

const cadastrar = async () => {
  const cadastro_nome = document.getElementById("cadastro_nome").value;
  const cadastro_senha = document.getElementById("cadastro_senha").value;
  const response = await fetch("http:/localhost:3000/cadastro", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: cadastro_nome,
      senha: cadastro_senha,
      divida: 0,
    }),
  });
  const result = await response.json();
  console.log(result);
};

document
  .getElementById("senha_input")
  .addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      conferirDivida();
    }
  });

const getData = async () => { //TESTE: DELETAR DEPOIS
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const result = await response.json();
  console.log(result);
};

//PARTE DE TESTES
//

