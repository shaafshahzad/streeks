import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActionSheetIOS } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const Streak = ({ streak, streakName, onPress, active, createdDate, frequency, onStreakTimeout, onDeleteStreak, onEditStreak }) => {
  const [count, setCount] = useState(1);
  const [canStreak, setCanStreak] = useState(false);
  const [seconds, setSeconds] = useState(null);
  const [lastStreaked, setLastStreaked] = useState('Never');

  const containerStyle = [
    styles.streakContainer,
    active ? styles.activeStreakContainer : styles.inactiveStreakContainer,
  ];

  const textStyle = active ? styles.activeStreakText : styles.inactiveStreakText;

  const handlePress = () => {
    if (active) {
      if (canStreak) {
        Alert.alert(
          'Confirm Streak',
          'Are you ready to add to your streak?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Confirm',
              onPress: () => {
                incrementCount();
                setSeconds(seconds * 2);
                setCanStreak(false);
              },
            },
          ]
        );
      } else {
        let interval;

        if (frequency === 'Hourly') {
          interval = 'hour';
        } else if (frequency === 'Daily') {
          interval = 'day';
        } else if (frequency === 'Weekly') {
          interval = 'week';
        } else if (frequency === 'Monthly') {
          interval = 'month';
        }

        Alert.alert('Cannot Streak', 'You can only add to this streak once every ' + interval + '');
      }
    } else {
      incrementCount();
    }
  };

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    onPress();
  };

  useEffect(() => {
    let interval;
    const today = new Date().setHours(0, 0, 0, 0);

    if (frequency === 'Hourly') {
      interval = 60 * 60 * 1000;
    } else if (frequency === 'Daily') {
      interval = 24 * 60 * 60 * 1000;
    } else if (frequency === 'Weekly') {
      interval = 7 * 24 * 60 * 60 * 1000;
    } else if (frequency === 'Monthly') {
      const currentMonth = new Date().getMonth();
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonth);
      nextMonthDate.setDate(1);
      nextMonthDate.setHours(0, 0, 0, 0);
      const timeUntilNextMonth = nextMonthDate - today;

      interval = timeUntilNextMonth;
    }

    setSeconds((interval / 1000) * 2);

    const timer = setTimeout(() => {
      setCanStreak(true);
    }, interval);

    return () => clearTimeout(timer);
  }, [frequency, canStreak]);

  useEffect(() => {
    let countdownTimer;

    if (active) {
      countdownTimer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0 && active) {
      clearInterval(countdownTimer);
      onStreakTimeout(streakName);
    }

    if (!active) {
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setLastStreaked(currentDate);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [seconds, streakName, onStreakTimeout, active]);

  const formattedDate = new Date(createdDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit', 'Deactivate', 'Delete'],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          onEditStreak(streak);
        } else if (buttonIndex === 2) {
          if (active) {
            onStreakTimeout(streakName);
          } else {
            Alert.alert('Cannot Deactivate', 'This streak is already inactive');
          }
        } else if (buttonIndex === 3) {
          onDeleteStreak();
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5} onLongPress={handleLongPress}>
      <View style={containerStyle}>
        <Text style={textStyle} numberOfLines={1}>
          {streakName}
        </Text>
        {active && (
          <CircularProgress
            value={count}
            maxValue={10}
            progressValueColor="#383D54"
            progressValueFontSize={30}
            radius={45}
            strokeColorConfig={[
              { color: '#3DC330', value: 0 },
              { color: '#6627B8', value: 25 },
              { color: '#279AB8', value: 50 },
              { color: '#D8E867', value: 75 },
              { color: '#FF2200', value: 100 },
            ]}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            duration={500}
          />
        )}
        {!active && (
          <View>
            <Text style={styles.info}>Last Streaked: {lastStreaked}</Text>
            <Text style={styles.info}>Date Added: {formattedDate}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Streak;

const styles = StyleSheet.create({
  streakContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inactiveStreakContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  activeStreakContainer: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    paddingTop: 15,
    paddingBottom: 15,
  },
  inactiveStreakText: {
    fontSize: 18,
    fontWeight: '300',
  },
  activeStreakText: {
    fontSize: 18,
    fontWeight: '300',
  },
  info: {
    fontSize: 12,
    fontWeight: '400',
    color: '#909090',
  },
});