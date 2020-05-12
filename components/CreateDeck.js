import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import CustomBtn from '../helpers/CustomBtn';
import { connect } from 'react-redux';
import { INSERT_DECK } from '../actions/index';
import { SAVE_DECK_BY_TITLE } from '../helpers/async_handler';
import { StackActions, NavigationActions } from 'react-navigation';

export class CreateDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    INSERT_DECK: PropTypes.func.isRequired
  };
  state = {
    text: ''
  };
  Changehandler = text => {
    this.setState({ text });
  };
  SubmitHandler = () => {
    const { INSERT_DECK, navigation } = this.props;
    const { text } = this.state;

    INSERT_DECK(text);
    SAVE_DECK_BY_TITLE(text);

    const invoke_reset = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckAction',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(invoke_reset);

    this.setState(() => ({ text: '' }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.Changehandler}
            placeholder="Deck Name"
            placeholderTextColor="#b7b0c0"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.SubmitHandler}
          />
        </View>
        <CustomBtn
          btnStyle={{
            backgroundColor: '#e6e3f4',
            borderColor: 'transparent',
            width: '100%'
          }}
          txtStyle={{ color: '#61309d' }}
          onPress={this.SubmitHandler}
          disabled={this.state.text === ''}
        >
          Create Deck
        </CustomBtn>
        <Image
          source={require('../assets/Social.png')}
          style={{
            marginTop: 80,
            alignSelf: 'center',
            width: '100%',
            height: '100%'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: '#FFF'
  },
  block: {
    marginBottom: 20
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#291541'
  },
  input: {
    borderColor: 'transparent',
    backgroundColor: '#eeeefae3',
    padding: 10,
    borderRadius: 8,
    fontSize: 20,
    height: 50
  }
});

export default connect(
  null,
  { INSERT_DECK }
)(CreateDeck);
