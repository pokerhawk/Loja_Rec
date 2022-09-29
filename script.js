let contador = 0; // CHANGE/REMOVE THIS

const lista_de_participantes = [ //PLACEHOLDER
  {
    login: "eliabe",
    senha: "123",
    divida: 20.50,
  },
  {
    login: "lizuly",
    senha: "123",
    divida: 10.00,
  },
];

const lista_de_produtos = [ //PLACEHOLDER
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
    const li = document.createElement("li");
    const text = document.createTextNode(`${lista_de_produtos[i].quantidade} ${lista_de_produtos[i].produto} - ${lista_de_produtos[i].preco}R$ / Codigo do Produto: ${lista_de_produtos[i].codigo}`);
    li.appendChild(text);
    produtos.appendChild(li)
  }
}
atualizarProdutos();

function removerProdutos(){
  const divProdutos = document.getElementById("divProdutos");
  const produtos = document.getElementById("produtos");
  divProdutos.removeChild(produtos)
}

function removerCarrinho(){
  const divCarrinho = document.getElementById("divCarrinho");
  const carrinho = document.getElementById("carrinho");
  divCarrinho.removeChild(carrinho);
}

function atualizarCarrinho() { // CHANGE COUNTER, FIX VARIABLES, FIND BETTER WAY TO DO ALL THIS
  if(!document.getElementById("carrinho")){
    const divCarrinho = document.getElementById("divCarrinho");
    const ul = document.createElement("ul");
    ul.setAttribute('id','carrinho');
    divCarrinho.appendChild(ul);
  }
  const codigo_produto = document.getElementById("codigo_produto").value;
  const quantidade_produto = Number(document.getElementById("quantidade_produto").value);
  const carrinho = document.getElementById("carrinho");
  for(i in lista_de_produtos){
    if(codigo_produto == lista_de_produtos[i].codigo){
      lista_de_produtos[i].quantidade = lista_de_produtos[i].quantidade - quantidade_produto
      contador += quantidade_produto;
      const text = document.createTextNode(`${contador} ${lista_de_produtos[i].produto}`);
      const textVerifica = `${contador-quantidade_produto} ${lista_de_produtos[i].produto}`;
      const pnc = document.getElementsByClassName("produtos_no_carrinho");
      for(i in pnc){ // FIX NEEDED
        if(pnc[i].innerText == textVerifica){
          pnc[i].innerText = `${contador} ${lista_de_produtos[i].produto}`;
          break;
        } else{
          const li = document.createElement("li");
          li.setAttribute('class','produtos_no_carrinho')
          li.appendChild(text);
          carrinho.appendChild(li)
          break;
        } // WE NEED TO RESET COUNTER: DO AN IF CONDITION TO RESET IT WHEN THEN CODE OF THE PRODUCT CHANGES LIKE A ONCHANGE
      }
      break;
    }
  }
  removerProdutos()
  atualizarProdutos()
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

