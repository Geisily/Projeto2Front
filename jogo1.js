class JogoNumeroSecreto {
    constructor() {
        this.numeroSecreto = null;
        this.tentativas = 0;
        this.maxTentativas = 10;
        this.jogoAtivo = false;
        
        this.initElements();
        this.setupEvents();
    }
    
    initElements() {
        this.btnIniciar = document.getElementById('iniciarJogo');
        this.btnVoltar = document.getElementById('voltar');
        this.dicaElement = document.getElementById('dica');
        
        // Criação do elemento de tentativas
        this.tentativasElement = document.createElement('div');
        this.tentativasElement.className = 'tentativas-container';
        this.tentativasElement.innerHTML = `
            <div class="tentativas-bar">
                <div class="tentativas-progresso" style="width: 100%"></div>
            </div>
            <span class="tentativas-texto">Tentativas: 0/${this.maxTentativas}</span>
        `;
        // Corrigido: insere após o dicaElement
        this.dicaElement.parentNode.insertBefore(this.tentativasElement, this.dicaElement.nextSibling);
    }
    
    setupEvents() {
        this.btnIniciar.addEventListener('click', () => this.iniciarJogo());
        this.btnVoltar.addEventListener('click', () => window.location.href = 'index.html');
    }
    
    iniciarJogo() {
        this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
        this.tentativas = 0;
        this.jogoAtivo = true;
        
        // Resetar elementos visuais
        this.dicaElement.innerHTML = '<i class="fas fa-search"></i> Adivinhe o número entre 1 e 100';
        this.dicaElement.className = 'dica-inicio';
        this.btnIniciar.innerHTML = '<i class="fas fa-sync-alt"></i> Reiniciar';
        
        // Atualizar barra de progresso
        this.atualizarTentativas();
        
        // Efeito visual
        this.btnIniciar.classList.add('btn-pulse');
        setTimeout(() => this.btnIniciar.classList.remove('btn-pulse'), 500);
        
        this.jogar();
    }
    
    jogar() {
        if (!this.jogoAtivo || this.tentativas >= this.maxTentativas) {
            this.finalizarJogo(false);
            return;
        }
        
        const palpite = prompt(`Tentativa ${this.tentativas + 1}/${this.maxTentativas}\n\nDigite seu palpite (1 a 100):`);
        
        // Tratamento para cancelamento
        if (palpite === null) {
            if (confirm('Deseja sair do jogo atual?')) {
                this.jogoAtivo = false;
                this.dicaElement.textContent = 'Jogo interrompido. Clique em Reiniciar para jogar novamente.';
                this.dicaElement.className = 'dica-interrompido';
                return;
            }
            return this.jogar();
        }
        
        const numero = parseInt(palpite);
        
        // Validação do input
        if (isNaN(numero) || numero < 1 || numero > 100) {
            alert("Por favor, digite um número válido entre 1 e 100!");
            return this.jogar();
        }
        
        this.tentativas++;
        this.atualizarTentativas();
        
        // Verificação do palpite
        if (numero === this.numeroSecreto) {
            this.finalizarJogo(true);
        } else {
            const dica = numero < this.numeroSecreto ? 'MAIOR' : 'MENOR';
            alert(`❌ Errou! O número secreto é ${dica} que ${numero}.\n\nTentativas restantes: ${this.maxTentativas - this.tentativas}`);
            this.jogar();
        }
    }
    
    finalizarJogo(vitoria) {
        this.jogoAtivo = false;
        
        if (vitoria) {
            this.dicaElement.innerHTML = `
                <div class="resultado-vitoria">
                    <i class="fas fa-trophy"></i>
                    <h3>Parabéns!</h3>
                    <p>Você acertou em ${this.tentativas} tentativas!</p>
                    <p>O número era <span class="numero-secreto">${this.numeroSecreto}</span></p>
                </div>
            `;
            this.dicaElement.className = 'dica-vitoria';
            
            // Efeito de confete
            this.tentativasElement.classList.add('celebrate');
        } else {
            this.dicaElement.innerHTML = `
                <div class="resultado-derrota">
                    <i class="fas fa-hourglass-end"></i>
                    <h3>Game Over!</h3>
                    <p>O número era <span class="numero-secreto">${this.numeroSecreto}</span></p>
                </div>
            `;
            this.dicaElement.className = 'dica-derrota';
        }
    }
    
    atualizarTentativas() {
        const percentual = 100 - (this.tentativas / this.maxTentativas) * 100;
        const progresso = this.tentativasElement.querySelector('.tentativas-progresso');
        const texto = this.tentativasElement.querySelector('.tentativas-texto');
        
        progresso.style.width = `${percentual}%`;
        progresso.style.backgroundColor = percentual > 50 ? '#9b59b6' : percentual > 20 ? '#e67e22' : '#e74c3c';
        texto.textContent = `Tentativas: ${this.tentativas}/${this.maxTentativas}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JogoNumeroSecreto();
});