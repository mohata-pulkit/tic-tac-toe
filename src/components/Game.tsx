import React from "react";
var _ = require("lodash");

function Game(props: { gameState: any; setState: any }) {
	function handleClick(index: number) {
		if (
			props.gameState.game[index] === "" &&
			!checkWin(props.gameState.game)
		) {
			var newState = _.cloneDeep(props.gameState);
			newState.game[index] = newState.turn;
			if (checkWin(newState.game)) {
				newState.game.forEach((state: any, index: number) => {
					if (newState.game[index] === newState.turn) {
						newState.game[index] = "W";
					} else if (newState.game[index] !== "") {
						newState.game[index] = "L";
					}
				});
			} else if (checkWin(newState.game) === null) {
				newState.game.forEach((state: any, index: number) => {
					newState.game[index] = "D";
				});
			}
			if (newState.turn === "X") {
				newState.turn = "O";
			} else if (newState.turn === "O") {
				newState.turn = "X";
			}

			newState.updatedAt = new Date();

			props.setState(newState);
		}
	}

	function checkWin(state: string[]) {
		var win = false;
		var nulls = 0;
		state.forEach((value, index) => {
			if (value === "") {
				nulls++;
			} else if (
				value !== "" &&
				index % 4 === 0 &&
				value === state[index + 1] &&
				value === state[index + 2] &&
				value === state[index + 3]
			) {
				win = true;
			} else if (
				value !== "" &&
				index < 4 &&
				value === state[index + 4] &&
				value === state[index + 8] &&
				value === state[index + 12]
			) {
				win = true;
			} else if (
				value !== "" &&
				index === 3 &&
				value === state[6] &&
				value === state[9] &&
				value === state[12]
			) {
				win = true;
			} else if (
				value !== "" &&
				index === 0 &&
				value === state[5] &&
				value === state[10] &&
				value === state[15]
			) {
				win = true;
			}
		});
		if (win) {
			return win;
		} else if (nulls === 0) {
			return null;
		} else {
			return win;
		}
	}

	console.log("here");

	return (
		<div className="board">
			{props.gameState.game.map((position: string, index: number) => (
				<div
					className={"square " + position}
					key={index}
					onClick={() => handleClick(index)}
				>
					<p>{position}</p>
				</div>
			))}
		</div>
	);
}

export default Game;
