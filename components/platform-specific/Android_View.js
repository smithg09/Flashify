import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewPagerAndroid
} from 'react-native';
import CustomBtn from '../../helpers/CustomBtn';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export class Android_View extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0),
    deckDetails: this.props.deck
  };
  handlePageChange = evt => {
    // console.log('evt.nativeEvent.position', evt.nativeEvent.position);
    this.setState({
      show: screen.QUESTION
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        // console.log('this.state.answered', this.state.answered);
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          // console.log('this.state.page', this.state.page);
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <Text
            style={[
              styles.count,
              { margin: 0, paddingVertical: 0, fontSize: 14 }
            ]}
          >
            Quiz Complete!
          </Text>
          <View style={styles.block}>
            <Text
              style={[
                styles.title,
                { paddingVertical: 0, marginVertical: 0, textAlign: 'center' }
              ]}
            >
              Your Score
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Percentage correct
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <CustomBtn
              btnStyle={{
                backgroundColor: '#e6e3f4',
                borderColor: 'transparent',
                width: '100%'
              }}
              txtStyle={{ color: '#61309d' }}
              onPress={this.handleReset}
            >
              Restart Quiz
            </CustomBtn>
            <CustomBtn
              btnStyle={{
                backgroundColor: '#e6e3f4',
                borderColor: 'transparent',
                width: '100%'
              }}
              txtStyle={{ color: '#61309d' }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
            >
              Home
            </CustomBtn>
          </View>
        </View>
      );
    }

    return (
      <ViewPagerAndroid
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  marginBottom: 15,
                  marginTop: 20,
                  color: '#291541',
                  textAlign: 'center'
                }}
              >
                {this.state.deckDetails.title} Deck
              </Text>
              <Text style={styles.count}>
                Page {idx + 1} of {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            <View style={styles.actioncards}>
              <TouchableOpacity
                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
                style={[styles.common, { backgroundColor: '#45b48966' }]}
              >
                <Image
                  source={require('../../assets/check.png')}
                  style={[styles.icon, { tintColor: '#45b489' }]}
                />
              </TouchableOpacity>
              {show === screen.QUESTION ? (
                <TouchableOpacity
                  onPress={() => this.setState({ show: screen.ANSWER })}
                  style={[styles.common, { backgroundColor: '#dff2f4' }]}
                >
                  <Image
                    source={require('../../assets/eye.png')}
                    style={[styles.icon, { tintColor: '#569299' }]}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ show: screen.QUESTION })}
                  style={[styles.common, { backgroundColor: '#dff2f4' }]}
                >
                  <Image
                    source={require('../../assets/eye.png')}
                    style={[styles.icon, { tintColor: '#569299' }]}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
                style={[styles.common, { backgroundColor: '#d8484866' }]}
              >
                <Image
                  source={require('../../assets/x.png')}
                  style={[styles.icon, { tintColor: '#d84848' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  count: {
    textTransform: 'uppercase',
    color: '#aca9b5',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 20
  },
  title: {
    fontSize: 45,
    color: '#291541',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20
  },
  questionContainer: {
    borderColor: 'transparent',
    backgroundColor: '#e6e3f4',
    borderRadius: 7,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textTransform: 'uppercase',
    color: '#aca9b5',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginVertical: 10,
    textAlign: 'center'
  },
  resultTextGood: {
    color: '#45b489',
    fontSize: 46,
    textAlign: 'center'
  },
  resultTextBad: {
    color: '#d84848',
    fontSize: 46,
    textAlign: 'center'
  },
  actioncards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  icon: {
    width: 50,
    height: 50
  },
  common: {
    borderRadius: 50,
    width: 30,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    padding: 20
  }
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(Android_View));
