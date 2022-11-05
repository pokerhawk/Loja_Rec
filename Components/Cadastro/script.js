const cadastrar = async () => {
  const cadastro_nome = document.getElementById("cadastro_nome").value;
  const cadastro_senha = document.getElementById("cadastro_senha").value;
  const imagemData = document.getElementById("imageFile").files[0];
  const fd = new FormData();
  fd.append("image", imagemData);
  const response = await fetch("http:/localhost:3000/cadastro", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: cadastro_nome,
      senha: cadastro_senha
    }),
  });
  const result = await response.json();
  const response_imagem = await fetch("http:/localhost:3000/image",{
    method: "post",
    headers: { "Content-Type": "multipart/form-data" }
  });
  const result_imagem = await response_imagem.json();
  document.getElementById("cadastro_nome").value = "";
  document.getElementById("cadastro_senha").value = "";
  alert(result, result_imagem);
};

function previewFile() {
  const preview = document.querySelector("img");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();
  reader.addEventListener("load", ()=>{
      // convert image file to base64 string
      preview.src = reader.result;
    },false);
  if (file) {
    reader.readAsDataURL(file);
  }
}

document
  .getElementById("cadastro_senha")
  .addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      cadastrar();
    }
  });

