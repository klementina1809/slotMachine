import { useState, useEffect } from "react";
import Confetti from './Confetti';

import "./App.css";

function App() {
	const [cards, setCards] = useState([
		{ name: "cherries", jackpot: 15, prob: 20 },
		{ name: "lemon", jackpot: 10, prob: 30 },
		{ name: "orange", jackpot: 20, prob: 15 },
		{ name: "plum", jackpot: 15, prob: 20 },
		{ name: "lemon", jackpot: 10, prob: 30 },
		{ name: "watermelon", jackpot: 20, prob: 10 },
		{ name: "plum", jackpot: 15, prob: 20 },
		{ name: "lemon", jackpot: 10, prob: 30 },
		{ name: "watermelon", jackpot: 20, prob: 10 },
	]);

	const [credit, setCredit] = useState(1000);
	const [win, setWin] = useState(0);
	const [bet, setBet] = useState(10);
	const [loading, setLoading] = useState(false);
	const [isWin, setIsWin] = useState(false);
	const [isJackpot, setIsJackpot] = useState(false);

	const elements = [
		{ name: "cherries", jackpot: 15, prob: 20 },
		{ name: "lemon", jackpot: 10, prob: 30 },
		{ name: "orange", jackpot: 20, prob: 15 },
		{ name: "plum", jackpot: 15, prob: 20 },
		{ name: "seven", jackpot: 100, prob: 5 },
		{ name: "watermelon", jackpot: 20, prob: 10 },
	];

	const randomIcon = () => {
		const random = Math.floor(Math.random() * 100);
		let count = 0;
		for (let i = 0; i < elements.length; i++) {
			count += elements[i].prob;
			if (random <= count) return elements[i];
		}
	};

	const handleGenerate = () => {
		if (credit - bet >= 0) {
			setLoading(true);
			setWin(0);
			setIsWin(false);
			setIsJackpot(false);
			if (credit - bet === 0) {
				setCredit(1000);
			} else {
				setCredit((prevCredit) => prevCredit - bet);
			}

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

	return (
		<>
			{isWin && <Confetti />}
			{isJackpot && <Confetti />}
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
				<div className="bet-label-container">
					<span className="bet">Bet</span>
					{credit - bet < 0 && (
						<span>You can't play, decrease the bet amount</span>
					)}
					{credit === 1000 && (
						<span>We're giving you 1000 credits</span>
					)}
				</div>
				<div className="bet-container">
					<input type="number" className="output" value={bet} />
					<button onClick={handleGenerate} type="button">
						Spin!
					</button>
				</div>
				<div className="chips">
					<div className="chip">
						<img
							src="src/img/10.png"
							alt=""
							onClick={() => setBet(10)}
						/>
						<span className="chip-value">10</span>
					</div>
					<div className="chip">
						<img
							src="src/img/25.png"
							alt=""
							onClick={() => setBet(25)}
						/>
						<span className="chip-value">25</span>
					</div>
					<div className="chip">
						<img
							src="src/img/50.png"
							alt=""
							onClick={() => setBet(50)}
						/>
						<span className="chip-value">50</span>
					</div>
					<div className="chip">
						<img
							src="src/img/100.png"
							alt=""
							onClick={() => setBet(100)}
						/>
						<span className="chip-value">100</span>
					</div>
				</div>
				{bet === 0 && (
					<p>You can't spin the reel if the bet is equal to 0.</p>
				)}
			</div>
		</>
	);
}

export default App;
