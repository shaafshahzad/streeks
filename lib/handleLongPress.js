import { ActionSheetIOS, Alert } from "react-native";

const handleLongPress = (
	active,
	streak,
	streakName,
	onDeleteStreak,
	onEditStreak,
	onStreakTimeout
) => {
	ActionSheetIOS.showActionSheetWithOptions(
		{
			options: ["Cancel", "Edit", "Deactivate", "Delete"],
			destructiveButtonIndex: 3,
			cancelButtonIndex: 0,
		},
		(buttonIndex) => {
			if (buttonIndex === 1) {
				onEditStreak(streak);
			} else if (buttonIndex === 2) {
				if (active) {
					onStreakTimeout(streakName);
				} else {
					Alert.alert(
						"Cannot Deactivate",
						"This streak is already inactive"
					);
				}
			} else if (buttonIndex === 3) {
				onDeleteStreak();
			}
		}
	);
};

export default handleLongPress;
