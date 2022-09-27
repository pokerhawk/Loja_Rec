const lista_de_participantes = [
  {
    id: 01,
    login: "Eliabe",
    senha: "hubs",
    divida: "20,50",
  },
  {
    id: 02,
    login: "lizuly",
    senha: "123",
    divida: "10,00",
  },
];

const lista_de_produtos = [
  {
    codigo: "0001",
    produto: "caixinha",
    preco: "13,20",
  },
  {
    codigo: "0002",
    produto: "livro",
    preco: "10,90",
  },
];

const conferir = () => {
  const login = document.getElementById("login_input").value;
  const senha = document.getElementById("senha_input").value;
  let divida = document.getElementById("resposta_dividendo").innerText;
  console.log(login, senha);
  for (i in lista_de_participantes) {
    if (
      login == lista_de_participantes[i].login &&
      senha == lista_de_participantes[i].senha
    ) {
      console.log(lista_de_participantes[i].divida);
      divida = `${lista_de_participantes[i].login} você está devendo ${lista_de_participantes[i].divida}`;
      break;
    }
  }
};

// if(true){
//     const pessoa_reconhecida = document.getElementById("pessoa_reconhecida");
//     pessoa_reconhecida.innerText = lista_de_participantes[0].login
// }
