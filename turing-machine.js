class TuringMachine {
    constructor() {
        this.tape = [];
        this.position = 0;
        this.currentState = 'q0';
        this.isRunning = false;
        this.speed = 1000;
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.tapeElement = document.getElementById('tapeReel');
        this.headElement = document.getElementById('tapeHead');
        this.highlightElement = document.getElementById('activeCell');
        this.stateElement = document.getElementById('currentState');
        this.symbolElement = document.getElementById('currentSymbol');
        this.positionElement = document.getElementById('currentPosition');
        this.resultElement = document.getElementById('result');
        this.consoleElement = document.getElementById('console');
    }

    bindEvents() {
        document.getElementById('loadBtn').addEventListener('click', () => this.loadTape());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('runBtn').addEventListener('click', () => this.run());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    loadTape() {
        const input = document.getElementById('inputString').value;
        this.tape = input.split('').map(char => char === ' ' ? '□' : char);
        this.position = 0;
        this.currentState = 'q0';
        
        this.renderTape();
        this.updateDisplay();
        this.addConsoleMessage('Cadena cargada en la cinta: ' + input);
    }

    renderTape() {
        this.tapeElement.innerHTML = '';
        
        this.tape.forEach((symbol, index) => {
            const cell = document.createElement('div');
            cell.className = `slot-cell ${index === this.position ? 'active' : ''}`;
            cell.setAttribute('data-position', index);
            
            const content = document.createElement('div');
            content.className = 'slot-content';
            content.textContent = symbol;
            
            cell.appendChild(content);
            this.tapeElement.appendChild(cell);
        });

        this.updateHeadPosition();
    }

    updateHeadPosition() {
        const cells = this.tapeElement.querySelectorAll('.slot-cell');
        if (cells[this.position]) {
            const cellRect = cells[this.position].getBoundingClientRect();
            const tapeRect = this.tapeElement.getBoundingClientRect();
            const relativeLeft = cellRect.left - tapeRect.left + cellRect.width / 2;
            
            this.headElement.style.left = `calc(50% + ${relativeLeft - tapeRect.width / 2}px)`;
            this.highlightElement.style.left = `${cellRect.left - tapeRect.left}px`;
        }
    }

    step() {
        if (this.tape.length === 0) {
            this.addConsoleMessage('Error: Primero carga una cadena en la cinta', 'error');
            return;
        }

        const currentSymbol = this.tape[this.position];
        
        this.addConsoleMessage(`Leyendo símbolo en posición ${this.position}: "${currentSymbol}"`);
        
        this.position++;
        if (this.position >= this.tape.length) {
            this.tape.push('□');
        }
        
        this.renderTape();
        this.updateDisplay();
        
        this.addConsoleMessage(`Moviendo cabezal a posición ${this.position}`);
    }

    run() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.addConsoleMessage('Iniciando ejecución automática...');
        
        const executeStep = () => {
            if (this.position < this.tape.length && this.isRunning) {
                this.step();
                setTimeout(executeStep, this.speed);
            } else {
                this.isRunning = false;
                this.addConsoleMessage('Ejecución completada');
            }
        };
        
        executeStep();
    }

    reset() {
        this.tape = [];
        this.position = 0;
        this.currentState = 'q0';
        this.isRunning = false;
        
        this.renderTape();
        this.updateDisplay();
        this.addConsoleMessage('Máquina reiniciada');
    }

    updateDisplay() {
        this.stateElement.textContent = this.currentState;
        this.symbolElement.textContent = this.tape[this.position] || '-';
        this.positionElement.textContent = this.position;
    }

    addConsoleMessage(message, type = 'info') {
        const line = document.createElement('div');
        line.className = 'console-line';
        
        const icon = this.getConsoleIcon(type);
        line.innerHTML = `${icon}${message}`;
        
        this.consoleElement.appendChild(line);
        this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
    }

    getConsoleIcon(type) {
        const icons = {
            info: '<svg class="console-icon" viewBox="0 0 24 24"><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"/></svg>',
            success: '<svg class="console-icon" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>',
            error: '<svg class="console-icon" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg>'
        };
        
        return icons[type] || icons.info;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TuringMachine();
});