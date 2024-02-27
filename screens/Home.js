import React, { useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import Header from "../components/Header";
import ActiveStreaksContainer from "../components/ActiveStreaksContainer";
import InactiveStreaksContainer from "../components/InactiveStreaksContainer";
import AddStreakModal from "../components/AddStreakModal";
import EditStreakModal from "../components/EditStreakModal";
import styles from "../styles/HomeStyles";

const Home = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [streakName, setStreakName] = useState("");
	const [editedStreakName, setEditedStreakName] = useState("");
	const [activeStreaks, setActiveStreaks] = useState([]);
	const [inactiveStreakContainer, setInactiveStreakContainer] = useState([]);
	const [frequency, setFrequency = { setFrequency }] = useState("Daily");

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const handleCreateStreak = () => {
		const createdDate = new Date().toDateString();
		setInactiveStreakContainer([
			...inactiveStreakContainer,
			{ name: streakName, createdDate },
		]);
		setStreakName("");
		closePopup();
	};

	const handleActivateStreak = (streakName) => {
		setActiveStreaks([...activeStreaks, streakName]);
		setInactiveStreakContainer(
			inactiveStreakContainer.filter((streak) => streak !== streakName)
		);
	};

	const handleStreakTimeout = (streakName) => {
		setActiveStreaks(
			activeStreaks.filter((streak) => streak.name !== streakName)
		);
		setInactiveStreakContainer([
			...inactiveStreakContainer,
			{ name: streakName, createdDate: new Date().toDateString() },
		]);
	};

	const handleDelete = (streakName) => {
		setActiveStreaks(
			activeStreaks.filter((streak) => streak.name !== streakName)
		);
		setInactiveStreakContainer(
			inactiveStreakContainer.filter(
				(streak) => streak.name !== streakName
			)
		);
	};

	const handleEdit = (streakName) => {
		openEditModal(streakName);
	};

	const openEditModal = (streakName) => {
		setEditedStreakName(streakName);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setEditedStreakName("");
		setShowEditModal(false);
	};

	const handleEditStreak = () => {
		const updatedActiveStreaks = activeStreaks.map((streak) => ({
			...streak,
			name: editedStreakName,
		}));
		const updatedInactiveStreaks = inactiveStreakContainer.map(
			(streak) => ({ ...streak, name: editedStreakName })
		);

		setActiveStreaks(updatedActiveStreaks);
		setInactiveStreakContainer(updatedInactiveStreaks);
		closeEditModal();
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<Header openPopup={openPopup} />
			<SafeAreaView style={styles.content}>
				<ActiveStreaksContainer
					activeStreaks={activeStreaks}
					frequency={frequency}
					handleStreakTimeout={handleStreakTimeout}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
				<InactiveStreaksContainer
					inactiveStreakContainer={inactiveStreakContainer}
					handleActivateStreak={handleActivateStreak}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			</SafeAreaView>

			<AddStreakModal
				showPopup={showPopup}
				closePopup={closePopup}
				handleCreateStreak={handleCreateStreak}
				streakName={streakName}
				setStreakName={setStreakName}
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<EditStreakModal
				showEditModal={showEditModal}
				closeEditModal={closeEditModal}
				handleEditStreak={handleEditStreak}
				editedStreakName={editedStreakName}
				setEditedStreakName={setEditedStreakName}
				frequency={frequency}
				setFrequency={setFrequency}
			/>
		</View>
	);
};

export default Home;
