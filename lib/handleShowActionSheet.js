import { ActionSheetIOS } from "react-native";

const handleShowActionSheet = (setFrequency) => {
	ActionSheetIOS.showActionSheetWithOptions(
		{
			options: ["Cancel", "Test", "Hourly", "Daily", "Weekly", "Monthly"],
			cancelButtonIndex: 0,
		},
		(buttonIndex) => {
			if (buttonIndex === 0) {
			} else if (buttonIndex === 1) {
				setFrequency("Test");
			} else if (buttonIndex === 2) {
				setFrequency("Hourly");
			} else if (buttonIndex === 3) {
				setFrequency("Daily");
			} else if (buttonIndex === 4) {
				setFrequency("Weekly");
			} else if (buttonIndex === 5) {
				setFrequency("Monthly");
			}
		}
	);
};

export default handleShowActionSheet;
