// script.js - lógica SPA dos jogos

document.addEventListener('DOMContentLoaded', () => {
    // --- Navegação SPA ---
    const menu = document.getElementById('menu-principal');
    const botoes = document.querySelectorAll('.game-buttons button');
    const jogos = [
        document.getElementById('jogo1'),
        document.getElementById('jogo2'),
        document.getElementById('jogo3')
    ];

    botoes.forEach((botao, idx) => {
        botao.addEventListener('click', () => {
            if (menu) menu.style.display = 'none';
            jogos.forEach((j, i) => {
                if (j) j.style.display = i === idx ? 'flex' : 'none';
            });
        });
    });
    // Botão voltar (agora .btn-voltar)
    document.querySelectorAll('.secao-jogo .btn-voltar').forEach(btn => {
        btn.addEventListener('click', () => {
            if (menu) menu.style.display = 'flex';
            jogos.forEach(j => { if (j) j.style.display = 'none'; });
        });
    });

    const btnIniciarJogo1 = document.getElementById('iniciar-jogo1');
    if (btnIniciarJogo1) {
        btnIniciarJogo1.addEventListener('click', () => {
            alert("Bem-vindo ao Jogo da Média!");
            let quantidade = prompt("Quantos números você quer digitar?");
            quantidade = Number(quantidade);
            if (quantidade <= 0 || quantidade === null || quantidade === "" || typeof quantidade !== "number" || isNaN(quantidade)) {
                alert("Quantidade inválida. Tente novamente com um número maior que zero.");
                return;
            } else {
                let soma = 0;
                for (let i = 1; i <= quantidade; i++) {
                    let entrada = prompt(`Digite o ${i}º número:`);
                    let numero = Number(entrada);
                    if (entrada === null || entrada.trim() === "" || isNaN(numero)) {
                        alert("Valor inválido. Digite um número.");
                        i--; // repetir a rodada
                        continue;
                    }
                    soma += numero;
                }
                let media = soma / quantidade;
                alert(`A média calculada entre os ${quantidade} números digitados é: ${media.toFixed(2)}`);
            }
        });
    }

    // --- Jogo 2: alert/prompt, número secreto aleatório entre 1 e 10 ---
    const btnIniciarJogo2 = document.getElementById('btn-chutar-jogo2');
    if (btnIniciarJogo2) {
        btnIniciarJogo2.addEventListener('click', () => {
            alert('Seja bem-vindo ao nosso jogo!');
            // Gera número secreto aleatório entre 1 e 10
            let numeroSecreto = Math.floor(Math.random() * 10) + 1;
            let chute;
            let tentativas = 0;
            let cancelado = false;
            while (true) {
                let entrada = prompt('Escolha um número entre 1 e 10');
                if (entrada === null) {
                    cancelado = true;
                    break;
                }
                chute = parseInt(entrada);
                if (isNaN(chute) || chute < 1 || chute > 10) {
                    alert('Digite um número válido entre 1 e 10.');
                    continue;
                }
                tentativas++;
                if (chute == numeroSecreto) {
                    alert(`Parabéns! Você acertou o número secreto ${numeroSecreto} na tentativa ${tentativas}.`);
                    break;
                } else if (chute > numeroSecreto) {
                    alert(`O número secreto é menor que ${chute}. Tente novamente.`);
                } else {
                    alert(`O número secreto é maior que ${chute}. Tente novamente.`);
                }
            }
            if (cancelado) {
                alert('Jogo cancelado.');
            }
        });
    }

    // --- Jogo 3: Formulário de exportação para TXT ---
    const form = document.getElementById('formulario');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Coletar valores
            const valores = [];
            for (let i = 1; i <= 5; i++) {
                const valor = document.getElementById(`valor${i}`).value.trim();
                if (valor === "") {
                    alert(`O campo Valor ${i} está vazio.`);
                    return;
                }
                valores.push(valor);
            }
            // Criar conteúdo do TXT
            const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
            // Criar e baixar o arquivo TXT
            const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "valores.txt";
            link.click();
        });
    }
});
