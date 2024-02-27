import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import handlePress from "../lib/handlePress";
import handleLongPress from "../lib/handleLongPress";
import useStreakInterval from "../lib/hooks/useStreakInterval";
import useCountdownTimer from "../lib/hooks/useCountdownTimer";
import ActiveStreak from "./ActiveStreak";
import InactiveStreak from "./InactiveStreak";
import styles from "../styles/StreakStyles";

const Streak = ({
	streak,
	streakName,
	onPress,
	active,
	createdDate,
	frequency,
	onStreakTimeout,
	onDeleteStreak,
	onEditStreak,
}) => {
	const [count, setCount] = useState(1);
	const [canStreak, setCanStreak] = useState(false);
	const [seconds, setSeconds] = useState(null);
	const [lastStreaked, setLastStreaked] = useState("Never");

	const containerStyle = [
		styles.streakContainer,
		active ? styles.activeStreakContainer : styles.inactiveStreakContainer,
	];

	const textStyle = active
		? styles.activeStreakText
		: styles.inactiveStreakText;

	const handleStreakPress = () => {
		handlePress(
			active,
			canStreak,
			incrementCount,
			seconds,
			setSeconds,
			setCanStreak,
			frequency
		);
	};

	const handleStreakLongPress = () => {
		handleLongPress(
			active,
			streak,
			streakName,
			onDeleteStreak,
			onEditStreak,
			onStreakTimeout
		);
	};

	const incrementCount = () => {
		const newCount = count + 1;
		setCount(newCount);
		onPress();
	};

	useStreakInterval(frequency, setCanStreak, setSeconds);

	useCountdownTimer(
		active,
		seconds,
		setSeconds,
		setLastStreaked,
		onStreakTimeout,
		streakName
	);

	const formattedDate = new Date(createdDate).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<TouchableOpacity
			onPress={handleStreakPress}
			activeOpacity={0.5}
			onLongPress={handleStreakLongPress}
		>
			<View style={containerStyle}>
				<Text style={textStyle} numberOfLines={1}>
					{streakName}
				</Text>
				{active && <ActiveStreak count={count} />}
				{!active && (
					<InactiveStreak
						lastStreaked={lastStreaked}
						formattedDate={formattedDate}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default Streak;
