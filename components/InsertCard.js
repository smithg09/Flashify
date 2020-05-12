import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import CustomBtn from '../helpers/CustomBtn';
import { connect } from 'react-redux';
import { MOVE_CARD_TO_DECK } from '../actions/index';
import { ADD_CARD_TO_DECK_BY_NAME } from '../helpers/async_handler';

export class InsertCard extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    MOVE_CARD_TO_DECK: PropTypes.func.isRequired
  };
  state = {
    question: '',
    answer: ''
  };
  QuestionChangeHandler = question => {
    this.setState({ question });
  };
  AnswerChangeHandler = answer => {
    this.setState({ answer });
  };
  SubmitHandler = () => {
    const { MOVE_CARD_TO_DECK, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };

    MOVE_CARD_TO_DECK(title, card);
    ADD_CARD_TO_DECK_BY_NAME(title, card);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add Card</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.QuestionChangeHandler}
              placeholder="Enter card question"
              placeholderTextColor="#b7b0c0"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.AnswerChangeHandler}
              placeholder="Enter answer"
              placeholderTextColor="#b7b0c0"
              ref={input => {
                this.answerTextInput = input;
              }}
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
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit
          </CustomBtn>
        </View>
        <View style={{ height: '30%' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    justifyContent: 'space-around'
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

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
  mapStateToProps,
  { MOVE_CARD_TO_DECK }
)(InsertCard);
