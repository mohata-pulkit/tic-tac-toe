import React, { useState } from "react";
import Art from "./components/Art";
import Game from "./components/Game";
import "./styles/app.css";

function App() {
	var initialState = {
		game: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		turn: "X",
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	const [gameState, setGameState] = useState(initialState);
	return (
		<main>
			<div className="game">
				<Game gameState={gameState} setState={setGameState} />
				<div
					className="reset"
					onClick={() => {
						setGameState(initialState);
					}}
				>
					<div>&#11119;</div>
				</div>
			</div>
			<Art gameState={gameState}></Art>
			{/* <div>
				{gameState.updatedAt.getTime() - gameState.createdAt.getTime()}
			</div> */}
		</main>
	);
}

export default App;
