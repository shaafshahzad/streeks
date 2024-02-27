import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles/HeaderStyles";

const Header = ({ openPopup }) => {
	return (
		<View style={styles.header}>
			<Image source={require("../assets/Logo.png")} style={styles.logo} />
			<TouchableOpacity
				onPress={openPopup}
				style={{
					position: "absolute",
					right: 25,
					bottom: 20,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<AntDesign name="pluscircleo" size={28} />
			</TouchableOpacity>
		</View>
	);
};

export default Header;
