import React from 'react';
import { createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Image } from 'react-native';
import * as Icon from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import DeckItemList from './DeckItemList';
import CreateDeck from './CreateDeck';
import DeckAction from './DeckAction';
import InsertCard from './InsertCard';
import Quiz_Route from './Quiz_Route';
import About from './About';

const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
  Decks: {
    screen: DeckItemList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/home.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/create.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/code.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    }
  }
};

routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.CreateDeck.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.About.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const tabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    activeTintColor: '#291541',
    style: {
      height: 65,
      backgroundColor: '#fff',
      shadowColor: 'rgba(0,0,0, 0.8)',
      shadowOffset: {
        width: 0,
        height: -20
      },
      shadowRadius: 35,
      elevation: 25,
      shadowOpacity: 1,
      borderTopWidth: 0
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    showIcon: true
  }
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckAction: {
      screen: DeckAction,
      navigationOptions: {
        headerTintColor: '#291541',
        headerStyle: {
          backgroundColor: '#FFF'
        },
        title: 'Back'
      }
    },
    InsertCard: {
      screen: InsertCard,
      navigationOptions: {
        headerTintColor: '#291541',
        headerStyle: {
          backgroundColor: '#FFF'
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Back'
      }
    },
    Quiz_Route: {
      screen: Quiz_Route,
      navigationOptions: {
        headerTintColor: '#291541',
        headerStyle: {
          backgroundColor: '#FFF'
        },
        title: 'Back'
      }
    }
  },
  { headerLayoutPreset: 'left' }
);

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

export default createAppContainer(MainNavigator);
