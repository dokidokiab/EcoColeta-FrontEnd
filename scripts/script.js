/*Script chamado que pega os dados da tela de cadastro com o form sendo a
tag e os .algo sendo os ids dos campos*/
const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Isenha = document.querySelector(".senha");
const Iemail = document.querySelector(".email");
const IconfirmarSenha = document.querySelector(".senhaConfirm");


//valida os campos
function verificaCampos(){
    if((Isenha.value == "") || (Iemail.value == "") || (Inome.value == "")){
        alert("Há campos vazios");
        return false;
    }else if(Isenha.value != IconfirmarSenha.value){
        alert("Senhas não coincidem");
        return false;
    } else{
        return true;
    }
}


//A verificação retornando true, ele fecha a api e passa os dados em json para o método 'post'
function cadastrar(){

    if(verificaCampos() == true){

    fetch("http://localhost:8080/usuario/save",
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
            method: 'POST',
            body: JSON.stringify({
                nome: Inome.value,
                email: Iemail.value,
                senha: Isenha.value
            })


        })
        .then(function(res) {console.log(res)})
        .catch(function(res) {console.log(res)});
        alert("Cadastro feito com sucesso");
        close('register.html');
        open('login.html');
        limpar();
    }

};

function limpar(){
    Inome.value = "";
    Iemail.value = "";
    Isenha.value = "";
    IconfirmarSenha.value = "";
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();
    cadastrar();
});