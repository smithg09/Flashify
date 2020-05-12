import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashify:notifications';
const CHANNEL_ID = 'DailyReminder';

export function CLEAR_NOTIFICATION() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function NOTIFY_CONFIG() {
  return {
    title: 'Flashify Reminder',
    body: "👋 Don't forget to study for today!",
    ios: {
      sound: true
    },
    android: {
      channelId: CHANNEL_ID,
      sticky: false,
      color: 'red'
    }
  };
}

function createChannel() {
  return {
    name: 'Daily Reminder',
    description: 'This is a daily reminder for you to study your flashcards.',
    sound: true,
    priority: 'high'
  };
}

export function SET_NOTIFICATION() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      // if (true) {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          // console.log('got in');
          // console.log('data', data);
          if (status === 'granted') {
            // Notifications.presentLocalNotificationAsync(NOTIFY_CONFIG());
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(val => console.log('channel return:', val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
                // 2 minute from now
                // tomorrow.setTime(tomorrow.getTime() + 2 * 60000);

                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  NOTIFY_CONFIG(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}
