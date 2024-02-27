import { Alert } from "react-native";

const handlePress = (
	active,
	canStreak,
	incrementCount,
	seconds,
	setSeconds,
	setCanStreak,
	frequency
) => {
	if (active) {
		if (frequency === "Test") {
			incrementCount();
			return;
		}

		if (canStreak) {
			Alert.alert(
				"Confirm Streak",
				"Are you ready to add to your streak?",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Confirm",
						onPress: () => {
							incrementCount();
							setSeconds(seconds * 2);
							setCanStreak(false);
						},
					},
				]
			);
		} else {
			let interval;

			if (frequency === "Hourly") {
				interval = "hour";
			} else if (frequency === "Daily") {
				interval = "day";
			} else if (frequency === "Weekly") {
				interval = "week";
			} else if (frequency === "Monthly") {
				interval = "month";
			}

			Alert.alert(
				"Cannot Streak",
				"You can only add to this streak once every " + interval + ""
			);
		}
	} else {
		incrementCount();
	}
};

export default handlePress;
