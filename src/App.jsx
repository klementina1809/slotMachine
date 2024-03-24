import { useState, useEffect } from "react";

import "./App.css";

function App() {
	const [cards, setCards] = useState(["lemon", "lemon", "lemon"]);
	const [credit, setCredit] = useState(0);

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
				if (i === 0) {
					setCredit((prevCredit) => prevCredit - 10);
				}
			
			}, 500 * i);
		}
		
	};

	useEffect(() => {
		if (isWin()) {
			let newCredit = credit + 100;
			setCredit(newCredit);
		}
		if (isJackpot()) {
			let newCredit = credit + 1000;
			setCredit(newCredit);
		}
	}, [cards]);
	

	const isWin = () => {
		if (cards[0] === cards[1] && cards[1] === cards[2]) {
			// let newCredit = credit + 1000000;
			// setCredit(newCredit);
			return true;
		}
		return false;
	};
	const isJackpot = () => {
		if (
			cards[0] === cards[1] &&
			cards[1] === cards[2] &&
			cards[2] === "seven"
		)
			return true;
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
						<img src={`/src/img/${e}.png`} alt="" />
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
