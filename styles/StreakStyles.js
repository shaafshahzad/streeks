import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	streakContainer: {
		width: "100%",
		height: 70,
		backgroundColor: "white",
		borderRadius: 5,
		marginRight: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},
	inactiveStreakContainer: {
		alignItems: "flex-start",
		justifyContent: "space-evenly",
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	activeStreakContainer: {
		backgroundColor: "white",
		height: 150,
		width: 150,
		paddingTop: 15,
		paddingBottom: 15,
	},
	inactiveStreakText: {
		fontSize: 18,
		fontWeight: "300",
	},
	activeStreakText: {
		fontSize: 18,
		fontWeight: "300",
	},
});

export default styles;
