const cadastrar = async () => {
  const cadastro_nome = document.getElementById("cadastro_nome").value;
  const cadastro_senha = document.getElementById("cadastro_senha").value;
  const imagemData = document.getElementById("imageFile").files[0];
  const bufferedImagem = new Buffer(imagemData, "base64");
  formData.append("fileToUpload", imagem);
  const response = await fetch("http:/localhost:3000/cadastro", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: cadastro_nome,
      senha: cadastro_senha,
      imagem: bufferedImagem,
    }),
  });
  const result = await response.json();
  document.getElementById("cadastro_nome").value = "";
  document.getElementById("cadastro_senha").value = "";
  alert(result);
};

function previewFile() {
  const preview = document.querySelector("img");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

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

