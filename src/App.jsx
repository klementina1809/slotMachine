import { useState, useEffect } from "react";

import "./App.css";

function App() {
	const [cards, setCards] = useState([
		{ name: "cherries", jackpot: 15 },
		{ name: "seven", jackpot: 100 },
		{ name: "orange", jackpot: 20 },
		{ name: "plum", jackpot: 15 },
		{ name: "seven", jackpot: 100 },
		{ name: "watermelon", jackpot: 20 },
		{ name: "plum", jackpot: 15 },
		{ name: "seven", jackpot: 100 },
		{ name: "watermelon", jackpot: 20 },
	]);

	const [credit, setCredit] = useState(1000);
	const [win, setWin] = useState(0);
	const [bet, setBet] = useState(10);
	const [loading, setLoading] = useState(false);
	const [isWin, setIsWin] = useState(false);
	const [isJackpot, setIsJackpot] = useState(false);

	const elements = [
		{ name: "cherries", jackpot: 15 },
		{ name: "lemon", jackpot: 10 },
		{ name: "orange", jackpot: 20 },
		{ name: "plum", jackpot: 15 },
		{ name: "seven", jackpot: 100 },
		{ name: "watermelon", jackpot: 20 },
	];

	const randomIcon = () => {
		const index = Math.floor(Math.random() * elements.length);
		return elements[index];
	};

	const handleGenerate = () => {
		setLoading(true);
		setWin(0);
		setIsWin(false);
		setIsJackpot(false);
		setCredit((prevCredit) => prevCredit - bet);
		let newCards = [];
		for (let i = 0; i < 9; i++) {
			setTimeout(() => {
				newCards.push(randomIcon());
				setCards([...newCards]);
				if (i === 8) {
					setLoading(false);
				}
			}, 50 * i);
		}
	};

	// const handleGenerate = () => {
	// 	setWin(0);
	// 	setIsWin(false);
	// 	setIsJackpot(false);
	// 	let newCards = [];
	// 	for (let i = 0; i < 3; i++) {
	// 		setTimeout(() => {
	// 			const index = Math.floor(Math.random() * elements.length);
	// 			newCards.push(elements[index]);
	// 			setCards([...newCards]);
	// 			if (i === 0) {
	// 				setCredit((prevCredit) => prevCredit - bet);
	// 			}
	// 		}, 500 * i);
	// 	}
	// };

	useEffect(() => {
		console.log(credit);
		if (!loading) {
			if (
				cards[1]?.name === cards[4]?.name &&
				cards[4]?.name === cards[7]?.name
			) {
				setIsWin(true);
				console.log("cards", cards);
				let newCredit = credit + cards[1].jackpot * bet;
				setCredit(newCredit);
				setWin(cards[1].jackpot * bet);
			}
			if (
				cards[1]?.name === cards[4]?.name &&
				cards[4]?.name === cards[7]?.name &&
				cards[7]?.name === "seven"
			) {
				setIsJackpot(true);
				let newCredit = credit + bet * 100;
				setCredit(newCredit);
				setWin(cards[1].jackpot * bet);
			}
		}
	}, [loading]);

	const handleIncreace = (number) => {
		let newBet = bet + number;
		setBet(newBet);
	};

	return (
		<>
			{isWin && <h3>You win</h3>}
			{isJackpot && <h3>JACKPOOOOT</h3>}
			<div className="money">
				<div className="credits">
					<p>Credits</p>
					<input type="number" className="output" value={credit} />
				</div>
				<div className="win">
					<p>Win</p>
					<input type="number" className="output" value={win} />
				</div>
			</div>
			<div className="machine">
				{cards.map((e, index) => (
					<div className="card" key={index}>
						<img
							src={`/src/img/${e.name}.png`}
							alt=""
							className={
								index === 1 || index === 4 || index === 7
									? "win-card"
									: ""
							}
						/>
					</div>
				))}

				{/* <div className="line">
					{cards.map((e, index) => (
						<div className="card" key={index}>
							<img src={`/src/img/${e.name}.png`} alt="" />
						</div>
					))}
				</div>
				<div className="line">
					{cards.map((e, index) => (
						<div className="card" key={index}>
							<img src={`/src/img/${e.name}.png`} alt="" />
						</div>
					))}
				</div> */}
			</div>

			<div className="bet-box">
				<p>Bet</p>
				<div className="bet-container">
					<input type="number" className="output" value={bet} />
					<button
						onClick={handleGenerate}
						type="button"
						className="btn btn-danger"
					>
					Spin!
				</button>
				</div>
				<div className="chips">
					<div className="chip">
						<img
							src="src/img/10.png"
							alt=""
							onClick={() => handleIncreace(10)}
						/>
						<span className="chip-value">10</span>
					</div>
					<div className="chip">
						<img
							src="src/img/50.png"
							alt=""
							onClick={() => handleIncreace(50)}
						/>
						<span className="chip-value">50</span>
					</div>
					<div className="chip">
						<img
							src="src/img/100.png"
							alt=""
							onClick={() => handleIncreace(100)}
						/>
						<span className="chip-value">100</span>
					</div>
					<div className="chip">
						<img
							src="src/img/1000.png"
							alt=""
							onClick={() => handleIncreace(1000)}
						/>
						<span className="chip-value">1000</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
