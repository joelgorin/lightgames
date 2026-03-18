import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Circle, X } from 'lucide-react';

type Player = 'X' | 'O' | null;

export default function TicTacToePage() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const calculateWinner = (squares: Player[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: lines[i] };
            }
        }
        return null;
    };

    const winInfo = calculateWinner(board);
    const winner = winInfo?.winner;
    const winningLine = winInfo?.line || [];
    const isDraw = !winner && board.every((square) => square !== null);

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    const getStatusMessage = () => {
        if (winner) return `Winner: ${winner}`;
        if (isDraw) return 'Draw!';
        return `Next player: ${xIsNext ? 'X' : 'O'}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 flex-1">
            <div className="max-w-md w-full flex flex-col items-center gap-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Tic Tac Toe</h1>

                <div className="text-2xl font-semibold text-foreground">
                    {getStatusMessage()}
                </div>

                <div className="grid grid-cols-3 w-full max-w-[300px]">
                    {board.map((cell, index) => {
                        const isWinningSquare = winningLine.includes(index);
                        const isRightCol = index % 3 === 2;
                        const isBottomRow = index >= 6;

                        return (
                            <button
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`
                  aspect-square flex items-center justify-center text-4xl sm:text-5xl font-bold
                  transition-colors
                  ${!isRightCol ? 'border-r-4 border-border' : ''}
                  ${!isBottomRow ? 'border-b-4 border-border' : ''}
                  ${!cell && !winner ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default'}
                  ${cell === 'X' ? 'text-primary' : ''}
                  ${cell === 'O' ? 'text-destructive' : ''}
                  ${isWinningSquare ? (winner === 'X' ? 'bg-primary/20' : 'bg-destructive/20') : 'bg-transparent'}
                `}
                                disabled={!!cell || !!winner}
                            >
                                {cell === 'X' && (<X size={48} />)}
                                {cell === 'O' && (<Circle size={42} />)}
                            </button>
                        );
                    })}
                </div>

                <Button onClick={resetGame} size="lg" className="w-full max-w-[200px]">
                    Reset Game
                </Button>
            </div>
        </div>
    );
}
