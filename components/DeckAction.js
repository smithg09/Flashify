import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import Deck from './DeckItem';
import CustomBtn from '../helpers/CustomBtn';
import { connect } from 'react-redux';
import { DELETE_DECK } from '../actions/index';
import { DELETE_DECK_BY_KEY } from '../helpers/async_handler';

export class DeckAction extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    DELETE_DECK: PropTypes.func.isRequired,
    deck: PropTypes.object
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  deleteHandler = id => {
    const { DELETE_DECK, navigation } = this.props;

    DELETE_DECK(id);
    DELETE_DECK_BY_KEY(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require('../assets/Thur.png')}
      >
        <View style={styles.container}>
          <View style={styles.pad}>
            <Deck id={deck.title} />
            <View style={styles.position}>
              <TouchableOpacity onPress={() => this.deleteHandler(deck.title)}>
                <Image
                  source={require('../assets/md-trash.png')}
                  style={[styles.icon, { tintColor: 'red' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <CustomBtn
              btnStyle={{
                backgroundColor: '#e6e3f4',
                width: '100%',
                borderColor: 'transparent'
              }}
              txtStyle={{ color: '#61309d' }}
              onPress={() =>
                this.props.navigation.navigate('InsertCard', {
                  title: deck.title
                })
              }
            >
              Add Card
            </CustomBtn>
            <CustomBtn
              btnStyle={{
                backgroundColor: '#e6e3f4',
                width: '100%',
                borderColor: 'transparent'
              }}
              txtStyle={{ color: '#61309d' }}
              onPress={() =>
                this.props.navigation.navigate('Quiz_Route', {
                  title: deck.title
                })
              }
            >
              Start Quiz
            </CustomBtn>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 80,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30
  },
  position: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 5,
    elevation: 999999
  },
  icon: {
    width: 30,
    height: 30
  },
  pad: {
    paddingBottom: 60
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { DELETE_DECK }
)(DeckAction);
