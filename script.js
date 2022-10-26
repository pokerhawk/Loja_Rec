let conferePessoa = '';

const atualizarProdutos = async () => {
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
      `${result[i].quantidade} ${result[i].produto} - ${result[i].preco}R$ | ID Produto: ${result[i].ID}`
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

const removerCarrinhoBtn = () => {
  document.getElementById('carrinho').innerHTML ='';
};

const atualizarCarrinhoBtn = async () => {
  let id_produto = document.getElementById("id_produto").value;
  let quantidade_produto = document.getElementById("quantidade_produto").value;
  const carrinho = document.querySelector("#carrinho");
  const produtosDB = await fetch("http:/localhost:3000/produtos");
  const produtosDB_result = await produtosDB.json();
  for (i in produtosDB_result) {
    if (
      produtosDB_result[i].ID == id_produto ||
      produtosDB_result[i].produto == id_produto
    ) {
      if(quantidade_produto <= produtosDB_result[i].quantidade){
        if (document.getElementsByClassName("itemLista").length == 0) {
          const itemLista = document.createElement("p");
          itemLista.setAttribute("class", "itemLista");
          const textNode = document.createTextNode(
            `${quantidade_produto} ${produtosDB_result[i].produto}`
          );
          itemLista.appendChild(textNode);
          carrinho.appendChild(itemLista);
        } else {
          for (
            let j = 0;
            j < document.getElementsByClassName("itemLista").length;
            j++
          ) {
            const itens = document.getElementsByClassName("itemLista").item(j);
            const oldProduto = itens.innerText.split(" ")[1];
            let verificaNumero = Number(itens.innerText.split(" ")[0]);
            let adicionaValor = verificaNumero + Number(quantidade_produto);
            if (oldProduto == produtosDB_result[i].produto && adicionaValor<= produtosDB_result[i].quantidade) {
              itens.innerText = `${adicionaValor} ${produtosDB_result[i].produto}`;
              break;
            }
            if(oldProduto == produtosDB_result[i].produto && !adicionaValor <= produtosDB_result[i].quantidade){
              alert("Quantia insuficiente");
              break;
            }
            if (j == document.getElementsByClassName("itemLista").length-1 && produtosDB_result[i].produto != oldProduto) {
              const itemLista = document.createElement("p");
              itemLista.setAttribute("class", "itemLista");
              const textNode = document.createTextNode(
                `${quantidade_produto} ${produtosDB_result[i].produto}`
              );
              itemLista.appendChild(textNode);
              carrinho.appendChild(itemLista);
              break;
            }
          }
        }
      } else {
        alert("Quantia insuficiente")
      }
    }
  }
  removerProdutos();
  atualizarProdutos();
  document.getElementById("id_produto").value = "";
  document.getElementById("quantidade_produto").value = "";
};

const efetuarCompraBtn = async () => {
  const login = document.getElementById("login_input").value;
  const senha = document.getElementById("senha_input").value;
  const produtosDB = await fetch("http:/localhost:3000/produtos");
  const produtosDB_result = await produtosDB.json();
  const codigo = [];
  const data = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  for (
    let j = 0;
    j < document.getElementsByClassName("itemLista").length;
    j++
  ) {
    const itens = document.getElementsByClassName("itemLista").item(j);
    const item = itens.innerText.split(" ")[1];
    const quantidade = itens.innerText.split(" ")[0];
    for (i in produtosDB_result) {
      if (item == produtosDB_result[i].produto) {
        codigo.push(produtosDB_result[i].ID);
        codigo.push(Number(quantidade));
      }
    }
  }
  const login_response = await fetch("http:/localhost:3000/usuarios");
  const login_result = await login_response.json();
  for (i in login_result) {
    if (login == login_result[i].login && senha == login_result[i].senha) {
      const response = await fetch("http:/localhost:3000/pedido", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: login,
          codigo: codigo.toString(),
          data: data,
        }),
      });
      const result = await response.json();
      adicionarDivida(login);
      for(let j = 0; j < document.getElementsByClassName("itemLista").length; j++){
        const itens = document.getElementsByClassName("itemLista").item(j);
        const item = itens.innerText.split(" ")[1];
        const quantidade = Number(itens.innerText.split(" ")[0]);
        let dbContador = 0;
        for(k in produtosDB_result){
          if(produtosDB_result[k].produto == item){
            dbContador = produtosDB_result[k].quantidade - quantidade
          }
        }
        const attDividaDB = await fetch("http:/localhost:3000/carrinho", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            produto: item,
            quantidade_prod: dbContador,
          }),
        });
        const attDividaDB_result = await attDividaDB.json();//NOT USED
      }
      alert(result);
      break;
    }
    if(i == login_result.length-1){
      alert("Usuário ou senha incorretos!")
    }
  }
  document.getElementById("login_input").value = "";
  document.getElementById("senha_input").value = "";
  removerProdutos();
  atualizarProdutos();
  removerCarrinho();
};

const adicionarDivida = async (Usuario) => {
  const responseUsuarios = await fetch("http:/localhost:3000/usuarios");
  const listaUsuarios = await responseUsuarios.json();
  const responseProdutos = await fetch("http:/localhost:3000/produtos");
  const listaProdutos = await responseProdutos.json();
  const responsePedidos = await fetch("http:/localhost:3000/pedidos");
  const listaPedidos = await responsePedidos.json();
  const codigo = listaPedidos[listaPedidos.length - 1].codigo.split(",");
  let sum = 0;
  let cost = [];
  for (i in codigo) {
    if (!i % 2 == 0) {
      for (j in listaProdutos) {
        if (codigo[i - 1] == listaProdutos[j].ID) {
          const preco = Number(listaProdutos[j].preco);
          const quantidade = Number(codigo[i]);
          sum = preco * quantidade;
          cost.push(sum);
          break;
        }
      }
    }
  }
  // cost.splice(cost.length - 1, 1); //solve this problem
  for (i in listaUsuarios) {
    if (listaUsuarios[i].login == Usuario) {
      const divida = Number(listaUsuarios[i].divida);
      cost.push(divida);
    }
  }
  const finalCost = cost.reduce((partialSum, a) => partialSum + a, 0);
  const response = await fetch("http:/localhost:3000/atualizaDivida", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cost: finalCost,
      nome: Usuario,
    }),
  });
  const result = await response.json();
  console.log(result);
};

const reconhecimentoFacialBtn = async () => {
  const pessoaReconhecida = conferePessoa;
  const produtosDB = await fetch("http:/localhost:3000/produtos");
  const produtosDB_result = await produtosDB.json();
  const codigo = [];
  const data = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  for (
    let j = 0;
    j < document.getElementsByClassName("itemLista").length;
    j++
  ) {
    const itens = document.getElementsByClassName("itemLista").item(j);
    const item = itens.innerText.split(" ")[1];
    const quantidade = itens.innerText.split(" ")[0];
    for (i in produtosDB_result) {
      if (item == produtosDB_result[i].produto) {
        codigo.push(produtosDB_result[i].ID);
        codigo.push(Number(quantidade));
      }
    }
  }
  const login_response = await fetch("http:/localhost:3000/usuarios");
  const login_result = await login_response.json();
  for (i in login_result) {
    if (pessoaReconhecida == login_result[i].login) {
      const response = await fetch("http:/localhost:3000/pedido", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: pessoaReconhecida,
          codigo: codigo.toString(),
          data: data,
        }),
      });
      const result = await response.json();
      adicionarDivida(pessoaReconhecida);
      for(let j = 0; j < document.getElementsByClassName("itemLista").length; j++){
        const itens = document.getElementsByClassName("itemLista").item(j);
        const item = itens.innerText.split(" ")[1];
        const quantidade = Number(itens.innerText.split(" ")[0]);
        let dbContador = 0;
        for(k in produtosDB_result){
          if(produtosDB_result[k].produto == item){
            dbContador = produtosDB_result[k].quantidade - quantidade
          }
        }
        const attDividaDB = await fetch("http:/localhost:3000/carrinho", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            produto: item,
            quantidade_prod: dbContador,
          }),
        });
        const attDividaDB_result = await attDividaDB.json();//NOT USED
      }
      alert(result);
      break;
    }
    if(i == login_result.length-1){
      alert("Usuário ou senha incorretos!")
    }
  }
  removerProdutos();
  atualizarProdutos();
  removerCarrinho();
}

document.getElementById("pedidosLista").addEventListener("click", async(event)=>{
  const response = await fetch("http:/localhost:3000/pedidos");
  const result = await response.json();
  console.log(result)
})

document.getElementById("senha_input").addEventListener("keydown",function(event){
  if (event.key == "Enter") {
    efetuarCompra();
  }
})

document.getElementById("quantidade_produto").addEventListener("keydown",(event)=>{
  if(event.key == "Enter"){
    atualizarCarrinho();
    document.getElementById("id_produto").focus();
  }
})

window.setInterval(async function(){
  const response = await fetch("http:/localhost:3000/pessoaReconhecida");
  const result = await response.json();
  if(conferePessoa != result){
    console.log(result)
    conferePessoa = result;
    document.getElementById("pessoaReconhecida").innerText = result;
  }
}, 1000); //2 segundos
// clearInterval(pessoaReconhecida) 