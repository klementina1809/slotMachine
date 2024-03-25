import { useState, useEffect } from "react";

import "./App.css";

function App() {
	const [cards, setCards] = useState([
		{ name: "cherries", jackpot: 150 },
		{ name: "lemon", jackpot: 100 },
		{ name: "watermelon", jackpot: 200 },
	]);

	const [credit, setCredit] = useState(100);
	const [bet, setBet] = useState(10);

	const elements = [
		{ name: "cherries", jackpot: 15 },
		{ name: "lemon", jackpot: 10 },
		{ name: "orange", jackpot: 20 },
		{ name: "plum", jackpot: 15 },
		{ name: "seven", jackpot: 10 },
		{ name: "watermelon", jackpot: 20 },
	];
	const handleGenerate = () => {
		let newCards = [];
		for (let i = 0; i < 3; i++) {
			setTimeout(() => {
				const index = Math.floor(Math.random() * elements.length);
				newCards.push(elements[index]);
				setCards([...newCards]);
				if (i === 0) {
					setCredit((prevCredit) => prevCredit - bet);
				}
			}, 500 * i);
		}
	};

	useEffect(() => {
		console.log(credit);
		if (isWin()) {
			let newCredit = credit + (cards[0].jackpot)*bet;
			setCredit(newCredit);
		}
		if (isJackpot()) {
			let newCredit = credit + bet*100;
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
	const handleChangeBet = (e) => {
		const newBet = e.target.value;
		setBet(newBet);
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
			<div className="bet">
				<p>Scomettere</p>
				<input type="number" className="output" value={bet} onChange={(e) => handleChangeBet(e)} />
			</div>
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
