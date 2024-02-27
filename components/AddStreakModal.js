import React, { useState } from "react";
import {
	View,
	Text,
	Modal,
	TextInput,
	Switch,
	TouchableOpacity,
	Image,
} from "react-native";
import handleShowActionSheet from "../lib/handleShowActionSheet";
import styles from "../styles/ModalStyles";

const AddStreakModal = ({
	showPopup,
	closePopup,
	handleCreateStreak,
	streakName,
	setStreakName,
	frequency,
	setFrequency,
}) => {
	const [isNotifEnabled, setIsNotifEnabled] = useState(false);
	const [isTimeEnabled, setIsTimeEnabled] = useState(false);

	const createStreak = (text) => {
		setStreakName(text);
	};

	const toggleNotifs = () => {
		console.log("Toggle Notifs");
		setIsNotifEnabled((previousState) => !previousState);
	};

	const toggleTime = () => {
		console.log("Toggle Time");
		setIsTimeEnabled((previousState) => !previousState);
	};

	const showActionSheet = () => {
		handleShowActionSheet(setFrequency);
	};

	return (
		<Modal visible={showPopup} animationType="fade" transparent>
			<View style={styles.modalContainer}>
				<View style={styles.popupContainer}>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>
						Add a New Streek
					</Text>
					<View style={styles.inputContainer}>
						<Text style={styles.inputTitle}>Streek Name</Text>
						<TextInput
							style={styles.input}
							placeholder="Type here..."
							placeholderTextColor="#aaa"
							value={streakName}
							onChangeText={createStreak}
						/>
					</View>
					<View style={styles.inputSwitchContainer}>
						<Image
							source={require("../assets/notif.png")}
							style={{
								height: 30,
								width: 30,
								marginRight: 10,
							}}
						/>
						<Text style={{ fontSize: 18 }}>Allow Reminders</Text>
						<Switch
							style={{ marginLeft: "auto" }}
							trackColor={{
								false: "#767577",
								true: "#34C759",
							}}
							onValueChange={toggleNotifs}
							value={isNotifEnabled}
						/>
					</View>
					<View style={styles.inputSwitchContainer}>
						<Image
							source={require("../assets/time.png")}
							style={{
								height: 30,
								width: 30,
								marginRight: 10,
							}}
						/>
						<Text style={{ fontSize: 18 }}>Time</Text>
						<Switch
							style={{ marginLeft: "auto" }}
							trackColor={{
								false: "#767577",
								true: "#34C759",
							}}
							onValueChange={toggleTime}
							value={isTimeEnabled}
						/>
					</View>
					<View style={styles.inputSwitchContainer}>
						<Image
							source={require("../assets/repeat.png")}
							style={{
								height: 30,
								width: 30,
								marginRight: 10,
							}}
						/>
						<Text style={{ fontSize: 18 }}>Frequency</Text>
						<TouchableOpacity
							style={{ marginLeft: "auto" }}
							onPress={showActionSheet}
						>
							<Text
								style={{
									color: "#007AFF",
									fontSize: 18,
									color: "#8E8E92",
								}}
							>
								{frequency}
							</Text>
						</TouchableOpacity>
						<Image
							source={require("../assets/rightarrow.png")}
							style={{ height: 12, width: 16 }}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<TouchableOpacity
							onPress={closePopup}
							style={styles.cancelButton}
						>
							<Text style={{ color: "#007AFF", fontSize: 18 }}>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleCreateStreak}
							style={[
								styles.createButton,
								streakName.trim() === "" && {
									opacity: 0.5,
								},
							]}
							disabled={streakName.trim() === ""}
						>
							<Text style={{ color: "white", fontSize: 18 }}>
								Done
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddStreakModal;
