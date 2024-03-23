import { useState } from "react";

import "./App.css";

function App() {
	const [cards, setCards] = useState(["cherries", "lemon", "seven"]);
	const elements = [
		"cherries",
		"lemon",
		"orange",
		"plum",
		"seven",
		"watermelon",
	];
	const handleGenerate = () => {
		let newCards = [];
		for (let i = 0; i < 3; i++) {
			setTimeout(() => {
				const index = Math.floor(Math.random() * elements.length);
				newCards.push(elements[index]);
				setCards([...newCards]);
			}, 500 * i);
		}
	};

	return (
		<>
			{cards[0] === cards[1] && cards[1] === cards[2] && <h3>You win</h3>}
			{cards[0] === cards[1] &&
				cards[1] === cards[2] &&
				cards[2] === "seven" && <h3>JACKPOOOOT</h3>}
			<div className="machine">
				{cards.map((e, index) => (
					<div className="card" key={index}>
						<img src={`/src/img/${e}.png`} alt="" />
					</div>
				))}

			</div>
				<button onClick={handleGenerate}>Start</button>
		</>
	);
}

export default App;
