const atualizarProdutos = async () => {
  //MAYBE CHANGE THIS??? (IT IS WORKING KO)
  const divProdutos = document.getElementById("divProdutos");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "produtos");
  divProdutos.appendChild(ul);
  const response = await fetch("http:/localhost:3000/produtos");
  const result = await response.json();
  for (i in result) {
    const produtos = document.getElementById("produtos");
    const li = document.createElement("li");
    const text = document.createTextNode(
      `${result[i].quantidade} ${result[i].produto} - ${result[i].preco}R$ | ID do Produto: ${result[i].ID}`
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

const atualizarCarrinho = async () => { //remover DB thing
  let id_produto = document.getElementById("id_produto").value;
  let quantidade_produto = document.getElementById("quantidade_produto").value;
  const carrinho = document.querySelector("#carrinho");
  const response_info = await fetch("http:/localhost:3000/produtos");
  const result_info = await response_info.json();
  let dbContador = 0;
  for (i in result_info) {
    if (result_info[i].ID == Number(id_produto)) {
      dbContador = Number(result_info[i].quantidade - quantidade_produto);
      if (document.getElementsByClassName("itemLista").length == 0){
        const itemLista = document.createElement("p");
        itemLista.setAttribute("class", "itemLista");
        const textNode = document.createTextNode(`${quantidade_produto} ${result_info[i].produto}`)
        itemLista.appendChild(textNode);
        carrinho.appendChild(itemLista);
      } else{
        for(let j = 0; j < document.getElementsByClassName("itemLista").length; j++){
          const itens = document.getElementsByClassName("itemLista").item(j);
          const oldProduto = itens.innerText.split(" ")[1]
          let verificaNumero = Number(itens.innerText.split(" ")[0]);
          let adicionaValor = verificaNumero + Number(quantidade_produto);
          if(oldProduto == result_info[i].produto){
            itens.innerText = `${adicionaValor} ${result_info[i].produto}`;
            break;
          } 
          if (j == document.getElementsByClassName("itemLista").length-1) {
            const itemLista = document.createElement("p");
            itemLista.setAttribute("class", "itemLista");
            const textNode = document.createTextNode(`${quantidade_produto} ${result_info[i].produto}`)
            itemLista.appendChild(textNode);
            carrinho.appendChild(itemLista);
            break;
          }
        }

      }
    }
  }
  const response = await fetch("http:/localhost:3000/carrinho", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ID_prod: id_produto,
      quantidade_prod: dbContador,
    }),
  });
  const result = await response.json();
  console.log(result);
  removerProdutos();
  atualizarProdutos();
  document.getElementById('id_produto').value = '';
  document.getElementById('quantidade_produto').value = '';
};

const efetuarCompra = async () => {
  const login = document.getElementById("login_input").value;
  const senha = document.getElementById("senha_input").value;
  const response_info = await fetch("http:/localhost:3000/produtos");
  const result_info = await response_info.json();
  const codigo = [];
  let divida = 0;
  const data = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
  for(let j = 0; j < document.getElementsByClassName("itemLista").length; j++){
    const itens = document.getElementsByClassName("itemLista").item(j);
    const item = itens.innerText.split(" ")[1];
    const quantidade = itens.innerText.split(" ")[0];
    for(i in result_info){
      if(item == result_info[i].produto){
        codigo.push(result_info[i].ID)
        codigo.push(Number(quantidade))
      }
    }
  }
  const login_response = await fetch("http:/localhost:3000/usuarios")
  const login_result = await login_response.json();
  for(i in login_result){
    if (login == login_result[i].nome && senha == login_result[i].senha) {
      const response = await fetch("http:/localhost:3000/pedido",{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: login,
          codigo: codigo.toString(),
          data: data
        })
      })
      const result = await response.json();
      adicionarDivida(login);
      console.log(result)
      break;
    }
  }
}

const adicionarDivida = async (Usuario) => {
  const responseUsuarios = await fetch("http:/localhost:3000/usuarios")
  const listaUsuarios =  await responseUsuarios.json();
  const responseProdutos = await fetch("http:/localhost:3000/produtos")
  const listaProdutos =  await responseProdutos.json();
  const responsePedidos = await fetch("http:/localhost:3000/pedidos")
  const listaPedidos =  await responsePedidos.json();
  const codigo = (listaPedidos[listaPedidos.length-1].codigo).split(',')
  let sum = 0;
  let cost = [];
  for(i in codigo){
    if(!i%2==0){
      for(j in listaProdutos){
        if(codigo[i-1] == listaProdutos[j].ID){
          const preco = Number(listaProdutos[j].preco)
          const quantidade = Number(codigo[i])
          sum = preco*quantidade
          cost.push(sum)
          break;
        }
      }
    }
  }
  cost.splice(cost.length-1, 1) //solve this problem
  for(i in listaUsuarios){
    if(listaUsuarios[i].nome == Usuario){
      const divida = Number(listaUsuarios[i].divida)
      cost.push(divida)
    }
  }
  const finalCost = cost.reduce((partialSum, a) => partialSum + a, 0);
  const response = await fetch("http:/localhost:3000/atualizaDivida", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cost: finalCost,
      nome: Usuario
    }),
  });
  const result = await response.json();
  console.log(result)
}

const conferirDivida = async () => {
  const response = await fetch("http:/localhost:3000/usuarios");
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
      senha: cadastro_senha
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