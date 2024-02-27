import React from "react";
import { View, Text, ScrollView } from "react-native";
import Streak from "./Streak";
import styles from "../styles/ActiveStreaksContainerStyles";

const ActiveStreaksContainer = ({
	activeStreaks,
	frequency,
	handleStreakTimeout,
	handleDelete,
	handleEdit,
}) => {
	return (
		<View style={styles.activeStreaksContainer}>
			<Text style={styles.titles}>Active Streeks</Text>
			{activeStreaks.length === 0 ? (
				<Text style={styles.placeholderText}>
					No active streeks yet...
				</Text>
			) : (
				<ScrollView horizontal style={styles.activeStreaks}>
					{activeStreaks.map((streak, index) => (
						<Streak
							key={index}
							streakName={streak.name}
							active={true}
							onPress={() => {}}
							frequency={frequency}
							onStreakTimeout={handleStreakTimeout}
							onLongPress={() => handleLongPress(streak)}
							onDeleteStreak={() => handleDelete(streak.name)}
							onEditStreak={() => handleEdit(streak.name)}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default ActiveStreaksContainer;
