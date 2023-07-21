import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, Modal, TextInput, Switch, ActionSheetIOS } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Streak from '../components/Streak';

const Home = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [streakName, setStreakName] = useState('');
    const [inactiveStreakContainer, setInactiveStreakContainer] = useState([]);
    const [activeStreaks, setActiveStreaks] = useState([]);
    const [isNotifEnabled, setIsNotifEnabled] = useState(false);
    const [isTimeEnabled, setIsTimeEnabled] = useState(false);
    const [frequency, setfrequency] = useState('Daily');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedStreakName, setEditedStreakName] = useState('');

    const openPopup = () => {
        setShowPopup(true);
    };
    
    const closePopup = () => {
        setShowPopup(false);
    };

    const createStreak = (text) => {
        setStreakName(text);
    };

    const handleCreateStreak = () => {
        const createdDate = new Date().toDateString();
        setInactiveStreakContainer([...inactiveStreakContainer, { name: streakName, createdDate }]);
        setStreakName('');
        closePopup();
    };

    const handleActivateStreak = (streakName) => {
        setActiveStreaks([...activeStreaks, streakName]);
        setInactiveStreakContainer(inactiveStreakContainer.filter((streak) => streak !== streakName));
    }

    const handleStreakTimeout = (streakName) => {
        setActiveStreaks(activeStreaks.filter((streak) => streak.name !== streakName));
        setInactiveStreakContainer([...inactiveStreakContainer, { name: streakName, createdDate: new Date().toDateString() }]);
    };  

    const toggleNotifs = () => {
        console.log('Toggle Notifs');
        setIsNotifEnabled(previousState => !previousState);
    }

    const toggleTime = () => {
        console.log('Toggle Time');
        setIsTimeEnabled(previousState => !previousState);
    }

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Hourly', 'Daily', 'Weekly', 'Monthly'],
                cancelButtonIndex: 0,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                } else if (buttonIndex === 1) {
                    setfrequency('Hourly');
                } else if (buttonIndex === 2) {
                    setfrequency('Daily');
                } else if (buttonIndex === 3) {
                    setfrequency('Weekly');
                } else if (buttonIndex === 4) {
                    setfrequency('Monthly');
                }
            }
        );
    }

    const handleDelete = (streakName) => {
        setActiveStreaks(activeStreaks.filter((streak) => streak.name !== streakName));
        setInactiveStreakContainer(inactiveStreakContainer.filter((streak) => streak.name !== streakName));
    };

    const handleEdit = (streakName) => {
        openEditModal(streakName);
    };

    const openEditModal = (streakName) => {
        setEditedStreakName(streakName);
        setShowEditModal(true);
    };      
      
    const closeEditModal = () => {
        setEditedStreakName('');
        setShowEditModal(false);
    };

    const handleEditStreak = () => {
        const updatedActiveStreaks = activeStreaks.map((streak) => ({ ...streak, name: editedStreakName }));
        const updatedInactiveStreaks = inactiveStreakContainer.map((streak) => ({ ...streak, name: editedStreakName }));
      
        setActiveStreaks(updatedActiveStreaks);
        setInactiveStreakContainer(updatedInactiveStreaks);
        closeEditModal();
    };
        
    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                    <Image source={require('../assets/Logo.png')} style={styles.logo} />
                    <TouchableOpacity 
                        onPress={openPopup} 
                        style={{
                            position: 'absolute',
                            right: 25,
                            bottom: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                    }}>
                        <AntDesign name='pluscircleo' size={28} />
                    </TouchableOpacity>
            </View>



            <SafeAreaView style={styles.content}>    
                <View style={styles.activeStreaksContainer}>
                    <Text style={styles.titles}>Active Streeks</Text>
                    {activeStreaks.length === 0 ? (
                        <Text style={styles.placeholderText}>No active streeks yet...</Text>
                        ) : (
                        <ScrollView horizontal style={styles.activeStreaks}>
                            {activeStreaks.map((streak, index) => (
                                <Streak key={index} streakName={streak.name} active={true} onPress={() => {}} frequency={frequency} onStreakTimeout={handleStreakTimeout} onLongPress={() => handleLongPress(streak)} onDeleteStreak={() => handleDelete(streak.name)} onEditStreak={() => handleEdit(streak.name)} />
                            ))}
                        </ScrollView>
                    )}
                </View>
                <View style={styles.inactiveStreakContainerContainer}>
                    <Text style={styles.titles}>Inactive Streeks</Text>
                    {inactiveStreakContainer.length === 0 ? (
                        <Text style={styles.placeholderText}>No streeks added yet...</Text>
                        ) : (
                        <ScrollView vertical style={styles.inactiveStreakContainer}>
                            {inactiveStreakContainer.map((streak, index) => (
                                <Streak key={index} streakName={streak.name} createdDate={streak.createdDate} onPress={() => handleActivateStreak(streak)} onDeleteStreak={() => handleDelete(streak.name)} onEditStreak={() => handleEdit(streak.name)} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </SafeAreaView>



            <Modal visible={showPopup} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.popupContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add a New Streek</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>
                                Streek Name
                            </Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Type here..."
                                placeholderTextColor="#aaa"
                                value={streakName}
                                onChangeText={createStreak}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/notif.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Allow Reminders</Text>
                            <Switch
                                style={{ marginLeft: 'auto' }}
                                trackColor={{ false: "#767577", true: "#34C759" }}
                                onValueChange={toggleNotifs}
                                value = {isNotifEnabled}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/time.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Time</Text>
                            <Switch
                                style={{ marginLeft: 'auto' }}
                                trackColor={{ false: "#767577", true: "#34C759" }}
                                onValueChange={toggleTime}
                                value = {isTimeEnabled}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/repeat.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Frequency</Text>
                            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={showActionSheet}>
                                <Text style={{ color: '#007AFF', fontSize: 18, color: '#8E8E92' }}>{frequency}</Text>
                            </TouchableOpacity>
                            <Image source={require('../assets/rightarrow.png')} style={{ height: 12, width: 16 }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity 
                                onPress={closePopup}
                                style={styles.cancelButton}
                            >
                                <Text style={{ color: '#007AFF', fontSize: 18 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleCreateStreak} 
                                style={[styles.createButton, streakName.trim() === '' && { opacity: 0.5 }]}
                                disabled={streakName.trim() === ''}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            


            <Modal visible={showEditModal} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.popupContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit Streek</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>
                                Streek Name
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Type here..."
                                placeholderTextColor="#aaa"
                                value={editedStreakName}
                                onChangeText={setEditedStreakName}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/notif.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Allow Reminders</Text>
                            <Switch
                                style={{ marginLeft: 'auto' }}
                                trackColor={{ false: "#767577", true: "#34C759" }}
                                onValueChange={toggleNotifs}
                                value = {isNotifEnabled}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/time.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Time</Text>
                            <Switch
                                style={{ marginLeft: 'auto' }}
                                trackColor={{ false: "#767577", true: "#34C759" }}
                                onValueChange={toggleTime}
                                value = {isTimeEnabled}
                            />
                        </View>
                        <View style={styles.inputSwitchContainer}>
                            <Image source={require('../assets/repeat.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Frequency</Text>
                            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={showActionSheet}>
                                <Text style={{ color: '#007AFF', fontSize: 18, color: '#8E8E92' }}>{frequency}</Text>
                            </TouchableOpacity>
                            <Image source={require('../assets/rightarrow.png')} style={{ height: 12, width: 16 }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity 
                                onPress={closeEditModal}
                                style={styles.cancelButton}
                            >
                                <Text style={{ color: '#007AFF', fontSize: 18 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleEditStreak(editedStreakName)}
                                style={[styles.createButton, editedStreakName.trim() === '' && { opacity: 0.5 }]}
                                disabled={editedStreakName.trim() === ''}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#76DBD1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 120,
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        
    },
    logo: {
        height: 30,
        width: 125,
        right: 2,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        backgroundColor: '#76DBD1',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    activeStreaksContainer: {
        height: '30%',
        width: '100%',
        backgroundColor: '#76DBD1',
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    activeStreaks: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
    },
    inactiveStreakContainerContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#76DBD1',
        paddingHorizontal: 20,
    },
    inactiveStreakContainer: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
    },
    titles: {
        fontSize: 18,
        fontWeight: 600,
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: 400,
        color: '#5A9FA4',
        marginTop: 75,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    popupContainer: {
        backgroundColor: '#FFF',
        width: '90%',
        height: '40%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        top: '15%',
    },
    inputContainer: {
        backgroundColor: '#E8E8E8',
        width: '100%',
        height: 65,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    inputTitle: {
        fontSize: 12,
        fontWeight: 600,
        color: 'grey',
    },
    input: {
        fontSize: 18,
        width: '100%',
        height: 40,
    },
    inputSwitchContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    createButton: {
        backgroundColor: '#007AFF',
        width: '47%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 10,
    },
    cancelButton: {
        backgroundColor: '#D9EBFF',
        width: '47%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 10,
    },
});