import React from "react";
import { View, Text, ScrollView } from "react-native";
import Streak from "./Streak";
import styles from "../styles/InactiveStreaksContainerStyles";

const InactiveStreaksContainer = ({
	inactiveStreakContainer,
	handleActivateStreak,
	handleDelete,
	handleEdit,
}) => {
	return (
		<View style={styles.inactiveStreakContainerContainer}>
			<Text style={styles.titles}>Inactive Streeks</Text>
			{inactiveStreakContainer.length === 0 ? (
				<Text style={styles.placeholderText}>
					No streeks added yet...
				</Text>
			) : (
				<ScrollView vertical style={styles.inactiveStreakContainer}>
					{inactiveStreakContainer.map((streak, index) => (
						<Streak
							key={index}
							streakName={streak.name}
							createdDate={streak.createdDate}
							onPress={() => handleActivateStreak(streak)}
							onDeleteStreak={() => handleDelete(streak.name)}
							onEditStreak={() => handleEdit(streak.name)}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default InactiveStreaksContainer;
