/**
 * PROJETO: Site em Manutenção Estruturado Premium
 * EMPRESA: EDCELLTECH
 * ANO: 2026
 * DEPENDÊNCIAS: Vanilla JS puro (Zero dependências externas)
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicialização dos módulos operacionais
    AppClock.init();
    AppMetrics.init();
    AppDynamicFeedback.init();
});

/**
 * Módulo 1: Relógio e Data em Tempo Real do Servidor/Cliente
 */
const AppClock = {
    dateEl: document.getElementById("current-date"),
    timeEl: document.getElementById("current-time"),

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    },

    updateTime() {
        const now = new Date();
        
        // Formatação de Data Simples e Elegante
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        this.dateEl.textContent = now.toLocaleDateString('pt-BR', dateOptions);
        
        // Formatação de Hora com preenchimento de zeros estruturado
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        this.timeEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
};

/**
 * Módulo 2: Simulador Realista de Contadores Dinâmicos (Live Metrics)
 * Garante variação contínua simulando processamento real sem travamentos
 */
const AppMetrics = {
    filesEl: document.getElementById("count-files"),
    servicesEl: document.getElementById("count-services"),
    packetsEl: document.getElementById("count-packets"),

    // Valores Iniciais estáveis
    state: {
        files: 1420,
        services: 98.4,
        packets: 4891
    },

    init() {
        this.startSimulation();
    },

    startSimulation() {
        // Varre os valores em pequenos tempos e intervalos variados evitando picos de CPU
        setInterval(() => {
            // Incremento suave de arquivos processados
            this.state.files += Math.floor(Math.random() * 3) + 1;
            this.filesEl.textContent = this.state.files.toLocaleString('pt-BR');
        }, 2500);

        setInterval(() => {
            // Oscilação fina na porcentagem de integridade dos microsserviços
            const drift = (Math.random() * 0.4 - 0.2); 
            this.state.services = Math.min(100, Math.max(95, this.state.services + drift));
            this.servicesEl.textContent = this.state.services.toFixed(1) + "%";
        }, 4000);

        setInterval(() => {
            // Entrada contínua de pacotes de dados validados
            this.state.packets += Math.floor(Math.random() * 5) + 2;
            this.packetsEl.textContent = this.state.packets.toLocaleString('pt-BR');
        }, 1800);
    }
};

/**
 * Módulo 3: Feedback Dinâmico da Barra de Progresso e Estados Internos
 */
const AppDynamicFeedback = {
    textEl: document.getElementById("progress-text"),
    percentEl: document.getElementById("progress-percent"),
    phrases: [
        "Atualizando sistema...",
        "Reindexando banco de dados...",
        "Validando certificados SSL...",
        "Otimizando pacotes estáticos...",
        "Limpando cache de aplicação...",
        "Executando testes de carga..."
    ],

    init() {
        this.cyclePhrases();
        this.simulatePercent();
    },

    cyclePhrases() {
        let index = 0;
        setInterval(() => {
            index = (index + 1) % this.phrases.length;
            this.textEl.style.opacity = 0;
            
            setTimeout(() => {
                this.textEl.textContent = this.phrases[index];
                this.textEl.style.opacity = 1;
            }, 300); // Sincronizado com fade discreto
            
        }, 6000);
    },

    simulatePercent() {
        let currentPercent = 65;
        // Simula uma barra que progride e reseta de forma controlada
        setInterval(() => {
            currentPercent += Math.floor(Math.random() * 4) + 1;
            if (currentPercent > 99) {
                currentPercent = 45; // Reseta para simular loops contínuos de microsserviços distintos
            }
            this.percentEl.textContent = `${currentPercent}%`;
        }, 3500);
    }
};