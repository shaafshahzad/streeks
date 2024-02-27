import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	popupContainer: {
		backgroundColor: "#FFF",
		width: "90%",
		height: "40%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 20,
		top: "15%",
	},
	inputContainer: {
		backgroundColor: "#E8E8E8",
		width: "100%",
		height: 65,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	inputTitle: {
		fontSize: 12,
		fontWeight: 600,
		color: "grey",
	},
	input: {
		fontSize: 18,
		width: "100%",
		height: 40,
	},
	inputSwitchContainer: {
		width: "100%",
		height: 30,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	createButton: {
		backgroundColor: "#007AFF",
		width: "47%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 10,
		borderRadius: 10,
	},
	cancelButton: {
		backgroundColor: "#D9EBFF",
		width: "47%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		borderRadius: 10,
	},
});

export default styles;
