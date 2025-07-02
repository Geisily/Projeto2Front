class CalculadoraMedia {
    constructor() {
        this.numeros = [];
        
        this.initElements();
        this.setupEvents();
        this.atualizarResultados();
    }
    
    initElements() {
        this.inputNumero = document.getElementById('numero-input');
        this.btnAdicionar = document.getElementById('adicionar');
        this.btnCalcular = document.getElementById('calcular');
        this.btnLimpar = document.getElementById('limpar');
        this.btnVoltar = document.getElementById('voltar');
        this.numberItems = document.getElementById('number-items');
        this.quantidadeElement = document.getElementById('quantidade');
        this.somaElement = document.getElementById('soma');
        this.mediaElement = document.getElementById('media');
    }
    
    setupEvents() {
        this.btnAdicionar.addEventListener('click', () => this.adicionarNumero());
        this.btnCalcular.addEventListener('click', () => this.calcularMedia());
        this.btnLimpar.addEventListener('click', () => this.limparTudo());
        this.btnVoltar.addEventListener('click', () => window.location.href = 'index.html');
        
        this.inputNumero.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.adicionarNumero();
        });
        
        this.inputNumero.focus();
    }
    
    adicionarNumero() {
        const valor = this.inputNumero.value.trim();
        
        if (!valor) {
            this.mostrarFeedback('Por favor, digite um número!', 'error');
            return;
        }
        
        const numero = parseFloat(valor);
        
        if (isNaN(numero)) {
            this.mostrarFeedback('Por favor, digite um número válido!', 'error');
            return;
        }
        
        if (numero < 0 || numero > 100) {
            this.mostrarFeedback('O número deve estar entre 0 e 100!', 'error');
            return;
        }
        
        this.numeros.push(numero);
        this.atualizarListaNumeros();
        this.atualizarResultados();
        this.inputNumero.value = '';
        this.inputNumero.focus();
        
        this.btnAdicionar.classList.add('btn-pulse');
        setTimeout(() => this.btnAdicionar.classList.remove('btn-pulse'), 300);
    }
    
    atualizarListaNumeros() {
        this.numberItems.innerHTML = '';
        
        this.numeros.forEach((num, index) => {
            const item = document.createElement('div');
            item.className = 'number-item';
            item.innerHTML = `
                <span class="number-index">${index + 1}.</span>
                <span class="number-value">${num.toFixed(2)}</span>
                <button class="btn-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            this.numberItems.appendChild(item);
        });
        
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                this.removerNumero(index);
            });
        });
    }
    
    removerNumero(index) {
        this.numeros.splice(index, 1);
        this.atualizarListaNumeros();
        this.atualizarResultados();
        
        this.numberItems.classList.add('list-updated');
        setTimeout(() => this.numberItems.classList.remove('list-updated'), 300);
    }
    
    calcularMedia() {
        if (this.numeros.length === 0) {
            this.mostrarFeedback('Adicione números para calcular a média!', 'warning');
            return;
        }
        
        this.mostrarFeedback('Média calculada com sucesso!', 'success');
        
        this.mediaElement.parentElement.classList.add('result-highlight');
        setTimeout(() => {
            this.mediaElement.parentElement.classList.remove('result-highlight');
        }, 1000);
    }
    
    atualizarResultados() {
        this.quantidadeElement.textContent = this.numeros.length;
        
        if (this.numeros.length > 0) {
            const soma = this.numeros.reduce((acc, num) => acc + num, 0);
            const media = soma / this.numeros.length;
            
            this.somaElement.textContent = soma.toFixed(2);
            this.mediaElement.textContent = media.toFixed(2);
        } else {
            this.somaElement.textContent = '0.00';
            this.mediaElement.textContent = '0.00';
        }
    }
    
    limparTudo() {
        if (this.numeros.length === 0) return;
        
        if (!confirm('Deseja realmente limpar todos os números?')) return;
        
        this.numeros = [];
        this.atualizarListaNumeros();
        this.atualizarResultados();
        this.inputNumero.focus();
        
        this.btnLimpar.classList.add('btn-pulse');
        setTimeout(() => this.btnLimpar.classList.remove('btn-pulse'), 300);
    }
    
    mostrarFeedback(mensagem, tipo) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-${tipo}`;
        feedback.textContent = mensagem;
        
        const container = document.querySelector('.calculator-main');
        container.insertBefore(feedback, container.firstChild);
        
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraMedia();
});