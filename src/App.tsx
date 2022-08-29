import React, { useState } from "react";
import Game from "./components/Game";
import "./styles/app.css";

function App() {
	var initialState = {
		game: ["", "", "", "", "", "", "", "", ""],
		turn: "X",
	};
	const [gameState, setGameState] = useState(initialState);
	return (
		<main>
			<Game gameState={gameState} setState={setGameState} />
			<div
				className="reset"
				onClick={() => {
					setGameState(initialState);
				}}
			>
				<div>&#11119;</div>
			</div>
		</main>
	);
}

export default App;
