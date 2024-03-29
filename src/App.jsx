import { useState, useEffect } from "react";
import Confetti from "./components/Confetti";
import SmallConfetti from "./components/SmallConfetti";

import "./App.css";

function App() {
	const [cards, setCards] = useState([]);

	const [credit, setCredit] = useState(1000);
	const [win, setWin] = useState(0);
	const [bet, setBet] = useState(10);
	const [loading, setLoading] = useState(true);
	const [isWin, setIsWin] = useState(false);
	const [isJackpot, setIsJackpot] = useState(false);

	useEffect(() => {
		setRandomCards();
	}, []);

	useEffect(() => {
		if (!loading) {
			let userWon =
				cards[1]?.name === cards[4]?.name && cards[4]?.name === cards[7]?.name;
			if (userWon) {
				if (cards[1]?.name === "seven") {
					setIsJackpot(true);
				}
				setIsWin(true);
				let newCredit = credit + cards[1].jackpot * bet;
				setCredit(newCredit);
				setWin(cards[1].jackpot * bet);
			} else {
				setWin(0);
				setIsWin(false);
				setIsJackpot(false);
			}
		}
	}, [loading]);

	const elements = [
		{
			name: "cherries",
			img: "./img/cherries.png",
			jackpot: 15,
			prob: 20,
		},
		{ name: "lemon", img: "./img/lemon.png", jackpot: 10, prob: 30 },
		{ name: "orange", img: "./img/orange.png", jackpot: 20, prob: 15 },
		{ name: "plum", img: "./img/plum.png", jackpot: 15, prob: 20 },
		{ name: "seven", img: "./img/seven.png", jackpot: 100, prob: 5 },
		{
			name: "watermelon",
			img: "./img/watermelon.png",
			jackpot: 20,
			prob: 10,
		},
	];

	const setRandomCards = () => {
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
			setCredit((prevCredit) => prevCredit - bet);
			setRandomCards();
		}
	};

	return (
		<>
			{isWin && <SmallConfetti />}
			{isJackpot && <Confetti />}
			<div className="row-container">
				<div className="input-container">
					<span>Credits</span>
					<input type="number" value={credit} readOnly />
				</div>
				<div className="input-container">
					<span>Win</span>
					<input type="number" value={win} readOnly />
				</div>
			</div>
			<div className="machine">
				{cards.map((card, index) => (
					<div className="card" key={index}>
						<img
							src={card.img}
							alt=""
							className={
								index === 1 || index === 4 || index === 7
									? "win-card"
									: "other-card"
							}
						/>
					</div>
				))}
			</div>

			<div className="row-container">
				<div className="input-container">
					<span>Bet</span>
					{credit - bet < 0 && (
						<span>You can't play, decrease the bet amount</span>
					)}
					<input type="number" value={bet} readOnly />
				</div>
				<button onClick={handleGenerate} type="button" className="btn-primary">
					Spin!
				</button>
			</div>

			<div className="chips">
				<div className="chip" data-value="10">
					<img src="./img/10.png" alt="" onClick={() => setBet(10)} />
				</div>
				<div className="chip" data-value="20">
					<img src="./img/20.png" alt="" onClick={() => setBet(20)} />
				</div>
				<div className="chip" data-value="50">
					<img src="./img/50.png" alt="" onClick={() => setBet(50)} />
				</div>
				<div className="chip" data-value="100">
					<img src="./img/100.png" alt="" onClick={() => setBet(100)} />
				</div>
			</div>

			{bet === 0 && <p>You can't spin the reel if the bet is equal to 0.</p>}
		</>
	);
}

export default App;
