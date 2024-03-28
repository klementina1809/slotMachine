import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const SmallConfetti = () => {
	useEffect(() => {
		startConfetti();
	}, []);

	const startConfetti = () => {
		var duration = 3 * 1000; // smaller duration
		var animationEnd = Date.now() + duration;
		var defaults = { startVelocity: 10, spread: 90, ticks: 60, zIndex: 0 };

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		var interval = setInterval(function () {
			var timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			var particleCount = 20 * (timeLeft / duration);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: {
						x: randomInRange(0.1, 0.9),
						y: randomInRange(0.1, 0.3),
					}, // smaller spread
				})
			);
		}, 250);
	};

	return null; // This component doesn't render anything, it just triggers the confetti animation
};

export default SmallConfetti;
