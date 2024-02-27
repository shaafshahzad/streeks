import React from "react";
import { Text, View, StyleSheet } from "react-native";

const InactiveStreak = ({ lastStreaked, formattedDate }) => {
	return (
		<View>
			<Text style={styles.info}>Last Streaked: {lastStreaked}</Text>
			<Text style={styles.info}>Date Added: {formattedDate}</Text>
		</View>
	);
};

export default InactiveStreak;

const styles = StyleSheet.create({
	info: {
		fontSize: 12,
		fontWeight: "400",
		color: "#909090",
	},
});
