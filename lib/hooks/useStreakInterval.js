import { useEffect } from "react";

const useInterval = (frequency, setCanStreak, setSeconds) => {
	useEffect(() => {
		let interval;
		const today = new Date().setHours(0, 0, 0, 0);

		if (frequency === "Hourly") {
			interval = 60 * 60 * 1000;
		} else if (frequency === "Daily") {
			interval = 24 * 60 * 60 * 1000;
		} else if (frequency === "Weekly") {
			interval = 7 * 24 * 60 * 60 * 1000;
		} else if (frequency === "Monthly") {
			const currentMonth = new Date().getMonth();
			const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
			const nextMonthDate = new Date();
			nextMonthDate.setMonth(nextMonth);
			nextMonthDate.setDate(1);
			nextMonthDate.setHours(0, 0, 0, 0);
			const timeUntilNextMonth = nextMonthDate - today;

			interval = timeUntilNextMonth;
		}

		setSeconds((interval / 1000) * 2);

		const timer = setTimeout(() => {
			setCanStreak(true);
		}, interval);

		return () => clearTimeout(timer);
	}, [frequency]);
};

export default useInterval;
