import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const ActiveStreak = ({ count }) => {
	return (
		<CircularProgress
			value={count}
			maxValue={10}
			progressValueColor="#383D54"
			progressValueFontSize={30}
			radius={45}
			strokeColorConfig={[
				{ color: "#3DC330", value: 0 },
				{ color: "#6627B8", value: 25 },
				{ color: "#279AB8", value: 50 },
				{ color: "#D8E867", value: 75 },
				{ color: "#FF2200", value: 100 },
			]}
			activeStrokeWidth={15}
			inActiveStrokeWidth={15}
			duration={500}
		/>
	);
};

export default ActiveStreak;
