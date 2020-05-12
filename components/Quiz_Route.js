import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import Android_View from './platform-specific/Android_View';
import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../helpers/notify_handler';

export class Quiz_Route extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    CLEAR_NOTIFICATION().then(SET_NOTIFICATION);
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    // Constants.platform.android
    return <Android_View title={title} />;
  }
}

export default Quiz_Route;
