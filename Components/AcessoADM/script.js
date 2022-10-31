async function usuariosLista() {
  const response = await fetch("http:/localhost:3000/usuarios");
  const result = await response.json();
  console.log(result);
}

document
  .getElementById("pedidosLista")
  .addEventListener("click", async (event) => {
    const response = await fetch("http:/localhost:3000/pedidos");
    const result = await response.json();
    console.log(result);
  });
