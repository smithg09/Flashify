import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const DeckItem = props => {
  const { DeckActions } = props;

  if (DeckActions === undefined) {
    return <View style={styles.containerStyle} />;
  }
  return (
    <View style={styles.containerStyle}>
      <View>
        <Text style={styles.textStyle}>{DeckActions.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>
          {DeckActions.questions.length} cards
        </Text>
      </View>
    </View>
  );
};
DeckItem.propTypes = {
  DeckActions: PropTypes.object
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
    shadowOpacity: 0.8,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 5
  },
  textStyle: {
    fontSize: 28
  },
  cardText: {
    fontSize: 18,
    color: '#291541'
  }
});

const mapStateToProps = (state, { id }) => {
  const DeckActions = state[id];

  return {
    DeckActions
  };
};

export default connect(mapStateToProps)(DeckItem);
