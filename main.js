document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.game-buttons button');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const jogo = botao.getAttribute('data-jogo');
            window.location.href = `${jogo}.html`;
        });
    });
});