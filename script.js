const lista_de_participantes = [
  {
    login: "eliabe",
    senha: "hubs",
    divida: 20.50,
  },
  {
    login: "lizuly",
    senha: "123",
    divida: 10.00,
  },
];

const lista_de_produtos = [
  {
    codigo: "0001",
    produto: "caixinha",
    preco: 13.20,
    quantidade: 13
  },
  {
    codigo: "0002",
    produto: "livro",
    preco: 10.90,
    quantidade: 4
  },
  {
    codigo: "0003",
    produto: "caderno",
    preco: 15.90,
    quantidade: 7
  }
];

function atualizarProdutos(){
  const divProdutos = document.getElementById("divProdutos");
  const ul = document.createElement("ul");
  ul.setAttribute('id','produtos')
  divProdutos.appendChild(ul)
  for(i in lista_de_produtos){
    const produtos = document.getElementById("produtos");
    const newElement = document.createElement("li");
    const text = document.createTextNode(`${lista_de_produtos[i].quantidade} ${lista_de_produtos[i].produto} - ${lista_de_produtos[i].preco}R$ / Codigo do Produto: ${lista_de_produtos[i].codigo}`);
    newElement.appendChild(text);
    produtos.appendChild(newElement)
  }
}
atualizarProdutos();

function removerProdutos(){
  const divProdutos = document.getElementById("divProdutos");
  const produtos = document.getElementById("produtos");
  divProdutos.removeChild(produtos)
}

function adicionarCarrinho() {
  const codigo_produto = document.getElementById("codigo_produto").value;
  const quantidade_produto = document.getElementById("quantidade_produto").value;
  const carrinho = document.getElementById("carrinho");
  const newElement = document.createElement("li");
  for(i in lista_de_produtos){
    if(codigo_produto == lista_de_produtos[i].codigo){
      lista_de_produtos[i].quantidade = lista_de_produtos[i].quantidade - quantidade_produto
      const text = document.createTextNode(`${quantidade_produto} ${lista_de_produtos[i].produto}`);
      newElement.appendChild(text);
      carrinho.appendChild(newElement)
      break;
    }
  }
  removerProdutos()
  atualizarProdutos()
}

function atualizarCarrinho(){
  //arrumar função acima e atualizar carrinho
}

const conferirDivida = () => {
  const login = document.getElementById("login_input").value;
  const senha = document.getElementById("senha_input").value;
  let divida = document.getElementById("resposta_dividendo");
  for (i in lista_de_participantes) {
    if (
      login == lista_de_participantes[i].login &&
      senha == lista_de_participantes[i].senha
    ) {
      divida.innerText = `${lista_de_participantes[i].login} você está devendo ${lista_de_participantes[i].divida}R$`;
      break;
    }
  }
};

document.getElementById("senha_input").addEventListener("keydown", function(event){ //se der enter na senha
  if(event.key == "Enter"){
    conferirDivida()
  }
})

//PARTE DE TESTES
//
