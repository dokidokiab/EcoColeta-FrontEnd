document.addEventListener("DOMContentLoaded", function () {
    const botaoMenu = document.getElementById("botao-flutuante");
    const opcoesMenu = document.getElementById("opcoes-menu");
  
    botaoMenu.addEventListener("click", function () {
      opcoesMenu.classList.toggle("esconder");
    });
  });
  