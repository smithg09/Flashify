import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Constants from 'expo-constants';
import BottomNavigation from './components/BottomNavigation';
import { SET_NOTIFICATION } from './helpers/notify_handler';

function ApplicationStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
ApplicationStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

const store = createStore(
  reducer /* preloadedState, */,
  applyMiddleware(thunk, logger)
);

export default class App extends React.Component {
  componentDidMount() {
    SET_NOTIFICATION();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ApplicationStatusBar
            backgroundColor="#291541"
            barStyle="light-content"
          />
          <BottomNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1}
});
