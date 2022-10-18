const cadastrar = async () => {
    const cadastro_nome = document.getElementById("cadastro_nome").value;
    const cadastro_senha = document.getElementById("cadastro_senha").value;
    const response = await fetch("http:/localhost:3000/cadastro", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: cadastro_nome,
        senha: cadastro_senha,
      }),
    });
    const result = await response.json();
    document.getElementById("cadastro_nome").value = "";
    document.getElementById("cadastro_senha").value = "";
    alert(result);
  };

document.getElementById("cadastro_senha").addEventListener("keydown",(event)=>{
    if(event.key=="Enter"){
      cadastrar();
    }
  })