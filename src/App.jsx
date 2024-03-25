import { useState, useEffect } from "react";

import "./App.css";

function App() {
	const [cards, setCards] = useState([
		{ name: "cherries", jackpot: 150 },
		{ name: "lemon", jackpot: 100 },
		{ name: "watermelon", jackpot: 200 },
	]);

	const [credit, setCredit] = useState(0);

	const elements = [
		{ name: "cherries", jackpot: 150 },
		{ name: "lemon", jackpot: 100 },
		{ name: "orange", jackpot: 200 },
		{ name: "plum", jackpot: 150 },
		{ name: "seven", jackpot: 100 },
		{ name: "watermelon", jackpot: 200 },
	];
	const handleGenerate = () => {
		let newCards = [];
		for (let i = 0; i < 3; i++) {
			setTimeout(() => {
				const index = Math.floor(Math.random() * elements.length);
				newCards.push(elements[index]);
				setCards([...newCards]);
				if (i === 0) {
					setCredit((prevCredit) => prevCredit - 10);
				}
			}, 500 * i);
		}
	};

	useEffect(() => {
		if (isWin()) {
			let newCredit = credit + cards[0].jackpot;
			setCredit(newCredit);
		}
		if (isJackpot()) {
			let newCredit = credit + 1000;
			setCredit(newCredit);
		}
	}, [cards]);

	const isWin = () => {
		if (
			cards[0]?.name === cards[1]?.name &&
			cards[1]?.name === cards[2]?.name
		)
			return true;

		return false;
	};
	const isJackpot = () => {
		if (
			cards[0]?.name === cards[1]?.name &&
			cards[1]?.name === cards[2]?.name &&
			cards[2]?.name === "seven"
		) {
			return true;
		}
		return false;
	};

	const handleIncreace = (number) => {
		let newCredit = credit + number;
		setCredit(newCredit);
	};

	return (
		<>
			{isWin() && <h3>You win</h3>}
			{isJackpot() && <h3>JACKPOOOOT</h3>}
			<div className="machine">
				{cards.map((e, index) => (
					<div className="card" key={index}>
						<img src={`/src/img/${e.name}.png`} alt="" />
					</div>
				))}
			</div>
			<button onClick={handleGenerate}>Start</button>
			<div className="credits">
				<p>Credits</p>
				<input type="number" className="output" value={credit} />
				<p>Ricarica credits</p>
				<div className="buttons">
					<button onClick={() => handleIncreace(10)}>+10</button>
					<button onClick={() => handleIncreace(100)}>+100</button>
					<button onClick={() => handleIncreace(1000)}>+1000</button>
				</div>
			</div>
		</>
	);
}

export default App;
