class Timer {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        
        this.secondsDisplay = document.querySelector('.seconds');
        this.millisecondsDisplay = document.querySelector('.milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.timerCard = document.querySelector('.timer-card');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateDisplay(), 10);
            this.isRunning = true;
            this.updateButtons();
            this.timerCard.classList.add('running');
        }
    }
    
    stop() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.elapsedTime = Date.now() - this.startTime;
            this.isRunning = false;
            this.updateButtons();
            this.timerCard.classList.remove('running');
        }
    }
    
    reset() {
        clearInterval(this.timerInterval);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.updateDisplay();
        this.updateButtons();
        this.timerCard.classList.remove('running');
    }
    
    updateDisplay() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const milliseconds = this.elapsedTime % 1000;
        
        this.secondsDisplay.textContent = this.formatNumber(totalSeconds, 2);
        this.millisecondsDisplay.textContent = this.formatNumber(milliseconds, 3);
    }
    
    formatNumber(num, digits) {
        return num.toString().padStart(digits, '0');
    }
    
    updateButtons() {
        if (this.isRunning) {
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
        } else {
            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;
        }
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Timer();
});

