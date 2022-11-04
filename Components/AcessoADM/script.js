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

document.getElementById("usuario").addEventListener("keydown", async(event)=>{
  if(event.key == "Enter"){
    const usuario = document.getElementById("usuario").value;
    const listaPedidos = document.getElementById("listaPedidos");
    const ul = document.createElement("ul");
    ul.setAttribute("id", "pedidos");
    listaPedidos.appendChild(ul);
    document.getElementById("pedidos").appendChild(document.createElement("li").appendChild(document.createTextNode(`Usuário || Quant || Produto || Val_unit || Data`)));
    const result_pedidos = await (await fetch("http:/localhost:3000/pedidos")).json();
    const result_produtos = await (await fetch("http:/localhost:3000/produtos")).json();
    for (i in result_pedidos) {
      if(result_pedidos[i].usuario == usuario){
        const pedido_array = (result_pedidos[i].codigo).split(",");
        for(j in pedido_array){
          if(j%2==1){
            const quant_pedido = pedido_array[j];
            const id_pedido = pedido_array[j-1];
            for(k in result_produtos){
              if(id_pedido == result_produtos[k].ID){
                const pedidos = document.getElementById("pedidos");
                const li = document.createElement("li");
                const text = document.createTextNode(
                  `${result_pedidos[i].usuario}: ${quant_pedido} ${result_produtos[k].produto} || val_unit: ${result_produtos[k].preco} || data: ${(result_pedidos[i].data).split("T")[0]}`
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
  }
});

async function usuariosLista() {
  const response = await fetch("http:/localhost:3000/usuarios");
  const result = await response.json();
  console.log(result);
}

const limparLista = () =>{
  const listaPedidos = document.getElementById("listaPedidos");
  const pedidos = document.getElementById("pedidos");
  const _button = document.getElementById("limparLista")
  listaPedidos.removeChild(pedidos);
  listaPedidos.removeChild(_button);
}

document
  .getElementById("pedidosLista")
  .addEventListener("click", async (event) => {
    const response = await fetch("http:/localhost:3000/pedidos");
    const result = await response.json();
    console.log(result);
  });
