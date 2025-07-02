class JogoInterativo {
    constructor() {
        this.numeroSecreto = null;
        this.tentativas = 0;
        this.recorde = localStorage.getItem('recorde') || null;
        this.jogoAtivo = false;
        
        this.initElements();
        this.setupEvents();
        this.novoJogo();
    }
    
    initElements() {
        this.inputPalpite = document.getElementById('palpite');
        this.btnVerificar = document.getElementById('verificar');
        this.btnNovoJogo = document.getElementById('novoJogo');
        this.btnVoltar = document.getElementById('voltar');
        this.feedback = document.getElementById('feedback');
        this.historyItems = document.getElementById('history-items');
        this.recordeElement = document.getElementById('recorde');
        this.tentativaAtual = document.getElementById('tentativa-atual');
    }
    
    setupEvents() {
        this.btnVerificar.addEventListener('click', () => this.verificarPalpite());
        this.btnNovoJogo.addEventListener('click', () => {
            if (this.jogoAtivo && !confirm('Deseja reiniciar o jogo atual?')) return;
            this.novoJogo();
        });
        this.btnVoltar.addEventListener('click', () => window.location.href = 'index.html');
        
        this.inputPalpite.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verificarPalpite();
        });
        
        this.inputPalpite.addEventListener('focus', () => {
            if (!this.jogoAtivo) {
                this.feedback.textContent = 'Clique em "Novo Jogo" para começar!';
                this.feedback.className = 'feedback-info';
            }
        });
    }
    
    novoJogo() {
        this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
        this.tentativas = 0;
        this.jogoAtivo = true;
        
        this.feedback.innerHTML = '<i class="fas fa-lightbulb"></i> Jogo iniciado! Faça seu primeiro palpite.';
        this.feedback.className = 'feedback-info';
        this.historyItems.innerHTML = '';
        this.inputPalpite.value = '';
        this.inputPalpite.disabled = false;
        this.inputPalpite.focus();
        this.atualizarTentativa();
        this.atualizarRecorde();
        
        // Animação
        this.btnNovoJogo.classList.add('btn-rotate');
        setTimeout(() => this.btnNovoJogo.classList.remove('btn-rotate'), 500);
    }
    
    verificarPalpite() {
        if (!this.jogoAtivo) {
            this.feedback.textContent = 'Clique em "Novo Jogo" para começar!';
            this.feedback.className = 'feedback-error';
            return;
        }
        
        const palpite = parseInt(this.inputPalpite.value);
        
        if (isNaN(palpite) || palpite < 1 || palpite > 100) {
            this.feedback.textContent = 'Por favor, digite um número entre 1 e 100!';
            this.feedback.className = 'feedback-error shake';
            this.inputPalpite.focus();
            
            setTimeout(() => {
                this.feedback.classList.remove('shake');
            }, 500);
            return;
        }
        
        this.tentativas++;
        this.atualizarTentativa();
        this.adicionarHistorico(palpite);
        
        if (palpite === this.numeroSecreto) {
            this.finalizarJogo(true);
        } else {
            const dica = palpite < this.numeroSecreto ? 'MAIOR' : 'MENOR';
            this.feedback.innerHTML = `❌ Não é ${palpite}! O número secreto é <strong>${dica}</strong>.`;
            this.feedback.className = 'feedback-warning pulse';
            this.inputPalpite.value = '';
            this.inputPalpite.focus();
        }
    }
    
    finalizarJogo(vitoria) {
        this.jogoAtivo = false;
        this.inputPalpite.disabled = true;
        
        if (vitoria) {
            this.feedback.innerHTML = `
                <div class="resultado-vitoria">
                    <i class="fas fa-trophy"></i>
                    <h3>Parabéns!</h3>
                    <p>Você acertou em ${this.tentativas} tentativas!</p>
                </div>
            `;
            this.feedback.className = 'feedback-success celebrate';
            this.verificarRecorde();
        }
    }
    
    adicionarHistorico(palpite) {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <span class="history-attempt">Tentativa ${this.tentativas}</span>
            <span class="history-guess">${palpite}</span>
            <span class="history-hint">
                ${palpite === this.numeroSecreto ? '✅' : palpite < this.numeroSecreto ? '⬆️' : '⬇️'}
            </span>
        `;
        this.historyItems.appendChild(item);
        this.historyItems.scrollTop = this.historyItems.scrollHeight;
    }
    
    verificarRecorde() {
        if (this.recorde === null || this.tentativas < this.recorde) {
            this.recorde = this.tentativas;
            localStorage.setItem('recorde', this.recorde);
            this.atualizarRecorde();
            this.recordeElement.classList.add('tada');
            setTimeout(() => this.recordeElement.classList.remove('tada'), 1000);
        }
    }
    
    atualizarRecorde() {
        this.recordeElement.querySelector('p').textContent = 
            this.recorde ? `${this.recorde} tentativas` : '--';
    }
    
    atualizarTentativa() {
        this.tentativaAtual.textContent = this.tentativas;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JogoInterativo();
});