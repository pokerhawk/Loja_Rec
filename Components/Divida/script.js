let conferePessoa = 'Unknown';

window.setInterval(async function(){
    const response = await fetch("http:/localhost:3000/pessoaReconhecida");
    const result = await response.json();
    if(conferePessoa != result){
        console.log(result)
        conferePessoa = result;
        novoRosto(result);
    }
}, 1000);

const novoRosto = async (pessoa) => {
    const response = await fetch("http:/localhost:3000/usuarios");
    const result = await response.json();
    let divida = document.getElementById("resposta_dividendo");
    for (i in result) {
        if(pessoa == "Unknown"){
            divida.innerText = 'Dívida'
        }
        if (pessoa == result[i].login) {
            divida.innerText = `${result[i].login} você está devendo R$${result[i].divida}`;
            break;
        }
    }
}

const conferirDivida = async () => {
    const response = await fetch("http:/localhost:3000/usuarios");
    const result = await response.json();
    const login = document.getElementById("login_divida").value;
    const senha = document.getElementById("senha_divida").value;
    let divida = document.getElementById("resposta_dividendo");
    for (i in result) {
        if (login == result[i].login && senha == result[i].senha) {
        divida.innerText = `${result[i].login} você está devendo R$${result[i].divida}`;
        break;
        } else {
        divida.innerText ="Usuário ou senha incorretos!";
        document.getElementById("login_divida").value = '';
        document.getElementById("senha_divida").value = '';
        document.getElementById("login_divida").focus();
        }
    }
};

document.getElementById("senha_divida").addEventListener("keydown", (event)=>{
    if(event.key == "Enter"){
        conferirDivida();
    }
})