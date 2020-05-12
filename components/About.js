import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import CustomBtn from '../helpers/CustomBtn';
import { RESET_DECK } from '../helpers/async_handler.js';
import { connect } from 'react-redux';
import { RESET_DATA } from '../actions/index';

export class About extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    RESET_DATA: PropTypes.func.isRequired
  };
  handleRESET_DECK = () => {
    const { RESET_DATA, navigation } = this.props;

    RESET_DATA();
    RESET_DECK();
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> About </Text>
        <Text style={[styles.blockText, { fontSize: 20 }]}>Flashify</Text>
        <Text style={styles.blockText}>
          This Application allows users to create decks, add cards into the deck
          and quiz themselves. Developed using React Native By Smith Gajjar.
        </Text>
        <Text style={styles.blockText}>
          Do check out my website{' '}
          <Text
            style={{ color: '#569299' }}
            onPress={() => Linking.openURL('http://smithgajjar.me')}
          >
            {' '}
            smithgajjar.me
          </Text>
        </Text>
        <CustomBtn
          btnStyle={{
            backgroundColor: '#d8484866',
            borderColor: 'transparent',
            width: '100%',
            marginTop: 40
          }}
          txtStyle={{
            textTransform: 'uppercase',
            textAlign: 'center',
            color: '#d84848',
            fontSize: 16
          }}
          onPress={this.handleRESET_DECK}
        >
          Clicking on this will reset all the application data.
        </CustomBtn>
        <Image
          source={require('../assets/about.jpg')}
          style={{
            alignSelf: 'center',
            width: '100%',
            height: '50%',
            resizeMode: 'stretch'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#291541'
  },
  blockText: {
    color: '#aca9b5',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    margin: 10,
    lineHeight: 25
  }
});

export default connect(
  null,
  { RESET_DATA }
)(About);
