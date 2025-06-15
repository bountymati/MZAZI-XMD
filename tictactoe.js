class TicTacToe {
    // Define constants for better readability
    static PLAYER_X = 'X';
    static PLAYER_O = 'O';
    static EMPTY = ' ';
    static GAME_STATES = {
        ONGOING: 0,
        X_WON: 1,
        O_WON: 2,
        DRAW: 3,
        INVALID_MOVE: -1
    };

    constructor(playerX = TicTacToe.PLAYER_X, playerO = TicTacToe.PLAYER_O) {
        // Validate player markers
        if (typeof playerX !== 'string' || playerX.length !== 1) {
            throw new Error('Player X marker must be a single character');
        }
        if (typeof playerO !== 'string' || playerO.length !== 1) {
            throw new Error('Player O marker must be a single character');
        }
        if (playerX === playerO) {
            throw new Error('Players must have different markers');
        }

        this.playerX = playerX;
        this.playerO = playerO;
        this.currentPlayer = playerX;
        this.board = Array(9).fill(TicTacToe.EMPTY);
        this.gameState = TicTacToe.GAME_STATES.ONGOING;
        this.moveHistory = [];
    }

    makeMove(position) {
        // Validate game state
        if (this.gameState !== TicTacToe.GAME_STATES.ONGOING) {
            return {
                status: this.gameState,
                message: 'Game has already ended'
            };
        }

        // Validate position
        if (typeof position !== 'number' || position < 0 || position > 8) {
            return {
                status: TicTacToe.GAME_STATES.INVALID_MOVE,
                message: 'Position must be between 0 and 8'
            };
        }

        // Check if position is empty
        if (this.board[position] !== TicTacToe.EMPTY) {
            return {
                status: TicTacToe.GAME_STATES.INVALID_MOVE,
                message: 'Position already occupied'
            };
        }

        // Make the move
        this.board[position] = this.currentPlayer;
        this.moveHistory.push({
            player: this.currentPlayer,
            position: position,
            board: [...this.board]
        });

        // Check for win
        if (this.checkWin()) {
            this.gameState = this.currentPlayer === this.playerX 
                ? TicTacToe.GAME_STATES.X_WON 
                : TicTacToe.GAME_STATES.O_WON;
            return {
                status: this.gameState,
                message: `${this.currentPlayer} wins!`
            };
        }

        // Check for draw
        if (this.board.every(cell => cell !== TicTacToe.EMPTY)) {
            this.gameState = TicTacToe.GAME_STATES.DRAW;
            return {
                status: this.gameState,
                message: 'Game ended in a draw'
            };
        }

        // Switch player
        this.currentPlayer = this.currentPlayer === this.playerX 
            ? this.playerO 
            : this.playerX;

        return {
            status: TicTacToe.GAME_STATES.ONGOING,
            message: 'Move successful'
        };
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return (
                this.board[a] !== TicTacToe.EMPTY &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            );
        });
    }

    getBoard() {
        return [...this.board]; // Return a copy to prevent direct manipulation
    }

    getGameState() {
        return this.gameState;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    displayBoard() {
        let display = '';
        this.board.forEach((cell, index) => {
            display += cell === TicTacToe.EMPTY ? index : cell;
            display += (index + 1) % 3 === 0 ? '\n' : ' | ';
        });
        return display;
    }
}

// Example usage:
const game = new TicTacToe();
console.log(game.displayBoard());

// Make some moves
game.makeMove(0); // X moves
game.makeMove(4); // O moves
game.makeMove(1); // X moves
game.makeMove(5); // O moves
game.makeMove(2); // X moves and wins

console.log(game.displayBoard());
console.log(game.getGameState());
