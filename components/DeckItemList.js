import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Deck from './DeckItem';
import { INITIAL_LOAD } from '../actions/index';

function ShowDate() {
  var dayOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    monthName = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
  var date = new Date();
  var disDate =
    dayOfWeek[date.getDay() - 1] +
    ', ' +
    monthName[date.getMonth()] +
    ' ' +
    date.getDate();

  return <Text style={styles.date}>{disDate}</Text>;
}
export class DeckItemList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    INITIAL_LOAD: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.INITIAL_LOAD();
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <ShowDate />
        <Text style={styles.title}>Explore Decks</Text>
        {Object.values(decks).map(deck => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.navigate('DeckAction', { title: deck.title })
              }
            >
              <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#291541'
  },
  date: {
    textTransform: 'uppercase',
    color: '#aca9b5',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginVertical: 10,
    marginTop: 15
  }
});

const mapStateToProps = state => ({ decks: state });

export default connect(
  mapStateToProps,
  { INITIAL_LOAD }
)(DeckItemList);
