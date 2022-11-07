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

const enviarFoto = async () =>{
  const fd = new FormData();
  // const xhr = new XMLHttpRequest();
  const imagemData = document.getElementById("imageFile").files[0];
  fd.append("image", imagemData);
  // xhr.open("POST", "./image", true);
  // xhr.onreadystatechange = function (response) {
  //   document.getElementById("result").innerHTML = xhr.responseText
  //   console.log(xhr.responseText)
  // };
  // xhr.send(fd);
  const result = await (await fetch("http:/localhost:3000/image", {
    method: "post",
    body: fd
  })).json();
  console.log(result)
}

const previewFile = () =>{
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
