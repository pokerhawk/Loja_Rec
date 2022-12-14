const listaUsuarios = async () => {
  const listaUsuarios = document.getElementById("listaUsuarios");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "usuarios");
  listaUsuarios.appendChild(ul);
  const result = await (await fetch("http:/localhost:3000/usuarios")).json();
  for (i in result) {
    const usuarios = document.getElementById("usuarios");
    const li = document.createElement("li");
    const text = document.createTextNode(
      `${result[i].login} || Dívida: ${result[i].divida}R$`
    );
    li.appendChild(text);
    usuarios.appendChild(li);
  }
};
listaUsuarios();

document
.getElementById("usuario")
.addEventListener("keydown", async (event) => {
  if (event.key == "Enter") {
    const usuario = document.getElementById("usuario").value;
    const listaPedidos = document.getElementById("listaPedidos");
    const ul = document.createElement("ul");
    ul.setAttribute("id", "pedidos");
    listaPedidos.appendChild(ul);
    document
      .getElementById("pedidos")
      .appendChild(
        document
          .createElement("li")
          .appendChild(
            document.createTextNode(
              `Usuário || Quant || Produto || Val_unit || Data`
            )
          )
      );
    const result_pedidos = await (
      await fetch("http:/localhost:3000/pedidos")
    ).json();
    const result_produtos = await (
      await fetch("http:/localhost:3000/produtos")
    ).json();
    for (i in result_pedidos) {
      if (result_pedidos[i].usuario == usuario) {
        const pedido_array = result_pedidos[i].codigo.split(",");
        for (j in pedido_array) {
          if (j % 2 == 1) {
            const quant_pedido = pedido_array[j];
            const id_pedido = pedido_array[j - 1];
            for (k in result_produtos) {
              if (id_pedido == result_produtos[k].ID) {
                const pedidos = document.getElementById("pedidos");
                const li = document.createElement("li");
                li.setAttribute("class", "pedidoLista");
                const text = document.createTextNode(
                  `${result_pedidos[i].usuario}: ${quant_pedido} ${
                    result_produtos[k].produto
                  } || val_unit: ${result_produtos[k].preco} || data: ${
                    result_pedidos[i].data.split("T")[0]
                  }`
                );
                li.appendChild(text);
                pedidos.appendChild(li);
              }
            }
          }
        }
      }
    }
    const _button = document.createElement("button");
    _button.setAttribute("id", "limparLista");
    _button.setAttribute("type", "button");
    _button.setAttribute("onclick", "limparLista()");
    _button.innerHTML = "Limpar lista";
    listaPedidos.appendChild(_button);
    const _2button = document.createElement("button");
    _2button.setAttribute("id", "toDocument");
    _2button.setAttribute("type", "button");
    _2button.setAttribute("onclick", "toDocument()");
    _2button.innerHTML = "Transformar em Documento";
    listaPedidos.appendChild(_2button);
  }
});

const addProduto = async () =>{
  const addProduto = document.getElementById("addProduto").value;
  const addQuantidade = Number(document.getElementById("addQuantidade").value);
  const addPreco = Number(document.getElementById("addPreco").value);
  if(!isNaN(addQuantidade) && !isNaN(addPreco) && isNaN(addProduto)){
    const response = await fetch("http:/localhost:3000/addProduto", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produto: addProduto,
        quantidade: addQuantidade,
        preco: addPreco
      })
    });
    const result = await response.json();
    console.log(result)
  } else {
    alert("Informações erradas")
  }
  location.reload();
}

const attProduto = async () =>{
  let selectProduto = document.getElementById("produto_select").value;
  const novaQuantidade = Number(document.getElementById("novaQuantidade").value);
  const novoPreco = Number(document.getElementById("novoPreco").value);
  if(!isNaN(novaQuantidade) && !isNaN(novoPreco)){
    if(novaQuantidade == 0 && novoPreco == 0){
      alert("Nenhuma Informação")
    }
    if(novaQuantidade == 0 && !novoPreco == 0){
      const response = await fetch("http:/localhost:3000/attProduto", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produto: selectProduto,
          preco: novoPreco
        })
      });
      const result = await response.json();
      console.log(result);
    }
    if(!novaQuantidade == 0 && novoPreco == 0){
      const response = await fetch("http:/localhost:3000/attProduto", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produto: selectProduto,
          quantidade: novaQuantidade
        })
      });
      const result = await response.json();
      console.log(result);
    }
    if(!novaQuantidade == 0 && !novoPreco == 0){
      const response = await fetch("http:/localhost:3000/attProduto", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produto: selectProduto,
          quantidade: novaQuantidade,
          preco: novoPreco
        })
      });
      const result = await response.json();
      console.log(result);
    }
  } else {
    alert("Informações incorretas")
  }
  location.reload();
}

const attDividaADM = async () =>{
  const novaDivida = document.getElementById("attDivida");
  const usuario = document.getElementById("attDividaUsuario").value;
  const response = await fetch("http:/localhost:3000/attDividaADM", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: usuario,
      divida: novaDivida.value
    })
  });
  const result = await response.json()
  console.log(result)
  novaDivida.value = '';
  location.reload();
}

const limparLista = () => {
  const usuario = document.getElementById("usuario");
  const listaPedidos = document.getElementById("listaPedidos");
  const pedidos = document.getElementById("pedidos");
  const _button = document.getElementById("limparLista");
  listaPedidos.removeChild(pedidos);
  listaPedidos.removeChild(_button);
  usuario.value = '';
  usuario.focus();
};

const toDocument = async () => {
  // const result = await (await fetch("http:/localhost:3000/toDocument")).json(); DELETAR
  let itensFinalArray = [];
  for(
    let j = 0;
    j < document.getElementsByClassName("pedidoLista").length;
    j++
  ){
    const itens = document.getElementsByClassName("pedidoLista").item(j);
    const listaDividida = itens.innerText.split(": ");
    const itensArray = [];
    for(i in listaDividida){
      if(i == 0 || i == 3){
        itensArray.push(listaDividida[i])
      }
      if(i == 1 || i == 2){
        itensArray.push(listaDividida[i].split(" || ")[0])
      }
    }
    let quantidade = Number(itensArray[1].split(" ")[0]);
    const produtoArrayName = itensArray[1].split(" ");
    produtoArrayName.shift();
    let produto = "";
    for(i in produtoArrayName){
      produto += `${produtoArrayName[i]} `;
    }
    let valor = Number(itensArray[2]);
    let valorFinal = Number(quantidade*valor);
    if(itensFinalArray.length == 0){
      itensFinalArray.push({
        quantidade: quantidade,
        produto: produto,
        valorUnitario: valor,
        valorTotal: valorFinal
      });
    } else {
      for(i in itensFinalArray){
        if(itensFinalArray[i].produto == produto){
          itensFinalArray[i].quantidade = Number(itensFinalArray[i].quantidade + quantidade);
          itensFinalArray[i].valorTotal = Number(itensFinalArray[i].valorTotal + valorFinal);
          break;
        } else { // PAROU AQUI
          itensFinalArray.push({
            quantidade: quantidade,
            produto: produto,
            valorUnitario: valor,
            valorTotal: valorFinal
          });
          break;
        }
      }
    }
  }
  console.log(itensFinalArray)
}

const delListaUsuario = () =>{
  const listaUsuarios = document.getElementById("listaUsuarios");
  const usuarios = document.getElementById("usuarios");
  usuarios.innerHTML = '';
  listaUsuarios.removeChild(usuarios);
}

const delUsuario = async () => {
  const usuario = document.getElementById("delUsuario");
  const response = await fetch("http:/localhost:3000/deletarUsuario", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuarioDel: usuario.value
    })
  });
  const result = await response.json();
  console.log(result)
  usuario.innerText = "";
  delListaUsuario();
  listaUsuarios();
  location.reload();
};

const delProduto = async () =>{
  let selectProduto = document.getElementById("produto_select2").value;
  const result = await (await fetch("http:/localhost:3000/deletarProduto",{
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuarioDel: selectProduto
    })
  })).json();
  console.log(result);
  location.reload();
}

const fillSelect = async () =>{
  const select = document.getElementById("produto_select");
  const result = await (await fetch("http:/localhost:3000/produtos")).json();
  for(i in result){
    const option = document.createElement("option");
    option.setAttribute("value", result[i].produto);
    option.innerText = result[i].produto;
    select.appendChild(option);
  }
}

const fillSelect2 = async () =>{
  const select = document.getElementById("produto_select2");
  const result = await (await fetch("http:/localhost:3000/produtos")).json();
  for(i in result){
    const option = document.createElement("option");
    option.setAttribute("value", result[i].produto);
    option.innerText = result[i].produto;
    select.appendChild(option);
  }
}

const fillSelect3 = async () =>{
  const select = document.getElementById("attDividaUsuario");
  const result = await (await fetch("http:/localhost:3000/usuarios")).json();
  for(i in result){
    const option = document.createElement("option");
    option.setAttribute("value", result[i].login);
    option.innerText = result[i].login;
    select.appendChild(option);
  }
}

async function usuariosLista() {
  const response = await fetch("http:/localhost:3000/usuarios");
  const result = await response.json();
  console.log(result);
}

async function mostrarProdutos() {
  const result = await (await fetch("http:/localhost:3000/produtos")).json();
  console.log(result)
}

async function delListaPedidos() {
  const result = await ( await fetch("http:/localhost:3000/deletarListaPedidos",{
    method: "delete",
    headers: { "Content-Type": "application/json" }
  })).json();
  console.log(result);
}

function promptTest() {
  const answer = prompt("Are you sure?")
  if(answer.match(/^s\w*/gim)){
    alert("yes")
  } else if (answer.match(/^n\w*/gim)){
    alert("no")
  }else{
    alert("yikes")
  }
}

document
  .getElementById("delUsuario")
  .addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      delUsuario();
    }
  });

document
.getElementById("pedidosLista")
.addEventListener("click", async (event) => {
  const response = await fetch("http:/localhost:3000/pedidos");
  const result = await response.json();
  console.log(result);
});
fillSelect();
fillSelect2();
fillSelect3();