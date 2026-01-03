class Game2048 {
    constructor() {
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.size = 4;
        this.tileContainer = document.getElementById('tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameMessage = document.getElementById('game-message');
        this.messageTitle = document.getElementById('message-title');
        this.messageText = document.getElementById('message-text');
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        this.updateScore();
        this.clearTiles();
        this.addRandomTile();
        this.addRandomTile();
        this.updateDisplay();
        this.hideMessage();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        document.getElementById('new-game-btn').addEventListener('click', () => this.init());
        document.getElementById('retry-btn').addEventListener('click', () => this.init());
        
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            let touchEndX = e.changedTouches[0].clientX;
            let touchEndY = e.changedTouches[0].clientY;
            
            let dx = touchEndX - touchStartX;
            let dy = touchEndY - touchStartY;
            
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    this.move('right');
                } else {
                    this.move('left');
                }
            } else {
                if (dy > 0) {
                    this.move('down');
                } else {
                    this.move('up');
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        });
    }
    
    handleKeyPress(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.move('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.move('down');
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.move('left');
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.move('right');
        }
    }
    
    move(direction) {
        const previousGrid = this.grid.map(row => [...row]);
        let moved = false;
        
        if (direction === 'left') {
            moved = this.moveLeft();
        } else if (direction === 'right') {
            moved = this.moveRight();
        } else if (direction === 'up') {
            moved = this.moveUp();
        } else if (direction === 'down') {
            moved = this.moveDown();
        }
        
        if (moved) {
            this.addRandomTile();
            this.updateDisplay();
            this.updateScore();
            
            if (this.isGameOver()) {
                this.showMessage('Game Over!', 'Final score: ' + this.score);
            } else if (this.hasWon()) {
                this.showMessage('You Win!', 'You reached 2048!');
            }
        }
    }
    
    moveLeft() {
        let moved = false;
        
        for (let row = 0; row < this.size; row++) {
            const newRow = this.slideAndMerge(this.grid[row]);
            if (newRow.toString() !== this.grid[row].toString()) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        
        return moved;
    }
    
    moveRight() {
        let moved = false;
        
        for (let row = 0; row < this.size; row++) {
            const reversed = [...this.grid[row]].reverse();
            const newRow = this.slideAndMerge(reversed).reverse();
            if (newRow.toString() !== this.grid[row].toString()) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        
        return moved;
    }
    
    moveUp() {
        let moved = false;
        
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            
            const newColumn = this.slideAndMerge(column);
            
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== newColumn[row]) {
                    moved = true;
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        
        return moved;
    }
    
    moveDown() {
        let moved = false;
        
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            
            const reversed = [...column].reverse();
            const newColumn = this.slideAndMerge(reversed).reverse();
            
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== newColumn[row]) {
                    moved = true;
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        
        return moved;
    }
    
    slideAndMerge(arr) {
        const filtered = arr.filter(val => val !== 0);
        const merged = [];
        
        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i] === filtered[i + 1]) {
                merged.push(filtered[i] * 2);
                this.score += filtered[i] * 2;
                i++;
            } else {
                merged.push(filtered[i]);
            }
        }
        
        while (merged.length < this.size) {
            merged.push(0);
        }
        
        return merged;
    }
    
    addRandomTile() {
        const emptyCells = [];
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    updateDisplay() {
        this.clearTiles();
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] !== 0) {
                    this.createTile(this.grid[row][col], row, col);
                }
            }
        }
    }
    
    createTile(value, row, col) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        tile.textContent = value;
        tile.style.left = `${col * 116.25}px`;
        tile.style.top = `${row * 116.25}px`;
        
        this.tileContainer.appendChild(tile);
    }
    
    clearTiles() {
        this.tileContainer.innerHTML = '';
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        this.bestScoreElement.textContent = this.bestScore;
    }
    
    isGameOver() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) return false;
                
                if (col < this.size - 1 && this.grid[row][col] === this.grid[row][col + 1]) return false;
                if (row < this.size - 1 && this.grid[row][col] === this.grid[row + 1][col]) return false;
            }
        }
        
        return true;
    }
    
    hasWon() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 2048) return true;
            }
        }
        return false;
    }
    
    showMessage(title, text) {
        this.messageTitle.textContent = title;
        this.messageText.textContent = text;
        this.gameMessage.classList.add('show');
    }
    
    hideMessage() {
        this.gameMessage.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
