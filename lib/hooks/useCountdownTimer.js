import { useEffect } from "react";

const useCountdownTimer = (
	active,
	seconds,
	setSeconds,
	setLastStreaked,
	onStreakTimeout,
	streakName
) => {
	useEffect(() => {
		let countdownTimer;

		if (active) {
			countdownTimer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		}

		if (seconds === 0 && active) {
			clearInterval(countdownTimer);
			onStreakTimeout(streakName);
		}

		if (!active) {
			const currentDate = new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
			setLastStreaked(currentDate);
		}

		return () => {
			clearInterval(countdownTimer);
		};
	}, [seconds, streakName, onStreakTimeout, active]);
};

export default useCountdownTimer;
