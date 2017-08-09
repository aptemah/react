import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends React.Component {
	constructor(){
		super();
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			isNextX: true,
			stepNumber: 0,
		}
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
			'Move #' + move :
				'Game start';

			const boldClass = this.state.stepNumber == move ? 'bold' : '';
			return (
				<li key={move} className={boldClass}>
					<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.isNextX ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						onClick={(i) => {this.handleClick(i)}}
						squares={current.squares}
					/>
				</div>
				<div className="game-info">
					<div>{status} move: {this.state.stepNumber}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.isNextX ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			isNextX: !this.state.isNextX,
		});
	}

	jumpTo(move) {
		this.setState({
			stepNumber: move,
			isNextX: (move % 2) === 0,
		})
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default Game;