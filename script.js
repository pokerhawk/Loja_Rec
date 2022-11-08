let conferePessoa = "";

const logar = async () => {
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;
  const response = await (await fetch("http:/localhost:3000/usuarios")).json();
  for (i in response) {
    if (
      conferePessoa == response[i].login ||
      (response[i].login == login && response[i].senha == senha)
    ) {
      location.href = "./Components/Loja/index.html";
    } else {
      alert("Usuário e senha errados ou inexistentes")
      break;
    }
  }
};

const logarADM = async () => {
  const senha = document.getElementById("senha").value;
  const response = await (await fetch("http:/localhost:3000/usuarios")).json();
  for (i in response) {
    if (
      (response[i].login == "eliabe" && response[i].senha == senha) ||
      conferePessoa == "eliabe"
    ) {
      location.href = "./Components/AcessoADM/index.html";
      break;
    } else {
      alert("Não é um administrador! ou informações incorretas");
      break;
    }
  }
};

const novoRosto = async (pessoa) => {
  const response = await fetch("http:/localhost:3000/usuarios");
  const result = await response.json();
  let divida = document.getElementById("pessoaReconhecida");
  for (i in result) {
    if (pessoa == "Unknown") {
      divida.innerText = "Olá";
    }
    if (pessoa == result[i].login) {
      divida.innerText = `Olá ${result[i].login}, você está devendo R$${result[i].divida}`;
      break;
    }
  }
};

window.setInterval(async function () {
  const response = await fetch("http:/localhost:3000/pessoaReconhecida");
  const result = await response.json();
  if (conferePessoa != result) {
    conferePessoa = result;
    novoRosto(result);
  }
}, 1000);
