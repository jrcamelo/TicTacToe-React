import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./Helper";
import { History } from "./types/History";

const TicTacToe: React.FC = () => {
	const blankHistory: History[] = [
		{ squares: Array(9).fill(null) }
	];
	const [history, setHistory] = useState<History[]>(blankHistory);
	const [turnNumber, setTurnNumber] = useState<number>(0);

	const [xIsNext, setXIsNext] = useState<boolean>(true);
	const [showPlayerSelection, setShowPlayerSelection] = useState<boolean>(true);

	const handleSquareClick = (i: number): void => {
		const newHistory = history.slice(0, turnNumber + 1);
		const current = newHistory[newHistory.length - 1];
		const squares = current.squares.slice();

		// Return if there is a winner or the square is already filled
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		// Inserts the move and updates the turn
		squares[i] = xIsNext ? "X" : "O";
		setHistory(newHistory.concat([ { squares: squares } ]));
		setTurnNumber(newHistory.length);
		setXIsNext(!xIsNext);
		setShowPlayerSelection(false);
	};

	const jumpToTurn = (turn: number): void => {
		setTurnNumber(turn);
		setXIsNext((turn % 2) === 0);
	};

	// Get the current turn's state
	const current = history[turnNumber];
	const winner = calculateWinner(current.squares);
    
	let finished = false;
	const moves = history.map((board, turn) => {
		finished = board.squares.every((square) => square !== null);
		const desc = turn ? "Go to turn #" + turn : "Go to the start";
		return (
			<li key={turn}>
				<button onClick={() => jumpToTurn(turn)}>{desc}</button>
			</li>
		);
	});

	// Determine the status message
	const status = winner ? "Winner: " + winner : (finished ? "Draw!" : "Next: " + (xIsNext ? "X" : "O"));

	return (
		<div className="game">

			{showPlayerSelection && <div className="player-selection">
				<button onClick={() => {
					setXIsNext(true);
					setShowPlayerSelection(false);
				}}>X</button>
				<button onClick={() => {
					setXIsNext(false);
					setShowPlayerSelection(false);
				}}>O</button>
			</div>}

			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={(i: number) => handleSquareClick(i)}
				/>
			</div>

			<div className="game-info">
				<div>{status}</div>
				{(winner || finished) && <button onClick={() => {
					jumpToTurn(0);
					setShowPlayerSelection(true);
				}}>New game</button>}
				<ul>{moves}</ul>
			</div>

		</div>
	);
};

export default TicTacToe;