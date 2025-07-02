class JogoNumeroSecreto {
    constructor() {
        this.numeroSecreto = null;
        this.tentativas = 0;
        this.maxTentativas = 10;
        this.jogoAtivo = false;
        
        this.initElements();
        this.setupEvents();
        this.iniciarJogo(); // Inicia automaticamente ao carregar
    }
    
    initElements() {
        this.btnReiniciar = document.getElementById('reiniciarJogo');
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
        this.btnReiniciar.addEventListener('click', () => this.iniciarJogo());
        this.btnVoltar.addEventListener('click', () => window.location.href = 'index.html');
        this.btnVerificar = document.getElementById('verificar');
        this.inputPalpite = document.getElementById('palpite');
        this.btnVerificar.addEventListener('click', () => this.verificarPalpite());
        this.inputPalpite.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verificarPalpite();
        });
    }
    
    iniciarJogo() {
        this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
        this.tentativas = 0;
        this.jogoAtivo = true;
        
        // Resetar elementos visuais
        this.dicaElement.innerHTML = '<i class="fas fa-search"></i> Adivinhe o número entre 1 e 100';
        this.dicaElement.className = 'dica-inicio';
        this.btnReiniciar.innerHTML = '<i class="fas fa-rotate-right"></i> Reiniciar';
        
        // Atualizar barra de progresso
        this.atualizarTentativas();
        
        // Efeito visual
        this.btnReiniciar.classList.add('btn-pulse');
        setTimeout(() => this.btnReiniciar.classList.remove('btn-pulse'), 500);
        this.inputPalpite.value = '';
        this.inputPalpite.focus();
    }
    
    verificarPalpite() {
        if (!this.jogoAtivo) return;
        const palpite = parseInt(this.inputPalpite.value);
        if (isNaN(palpite) || palpite < 1 || palpite > 100) {
            this.dicaElement.textContent = 'Por favor, digite um número válido entre 1 e 100!';
            this.dicaElement.className = 'feedback-error shake';
            setTimeout(() => this.dicaElement.classList.remove('shake'), 500);
            this.inputPalpite.focus();
            return;
        }
        this.tentativas++;
        this.atualizarTentativas();
        if (palpite === this.numeroSecreto) {
            this.finalizarJogo(true);
        } else {
            const dica = palpite < this.numeroSecreto ? 'MAIOR' : 'MENOR';
            this.dicaElement.innerHTML = `❌ Não é ${palpite}! O número secreto é <strong>${dica}</strong>.`;
            this.dicaElement.className = 'feedback-warning pulse';
            this.inputPalpite.value = '';
            this.inputPalpite.focus();
        }
        if (this.tentativas >= this.maxTentativas && palpite !== this.numeroSecreto) {
            this.finalizarJogo(false);
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