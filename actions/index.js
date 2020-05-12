import { GET_DECK_HANDLER } from '../helpers/async_handler';

export const fetchDecks = 'fetchDecks';
export const insertDeck = 'insertDeck';
export const deleteDeckByTitle = 'deleteDeckByTitle';
export const insertCard = 'insertCard';
export const resetStorage = 'resetStorage';

export function RECEIVE_DECKS(decks) {
  return {
    type: fetchDecks,
    decks
  };
}

export function INSERT_DECK(title) {
  return {
    type: insertDeck,
    title
  };
}

export function DELETE_DECK(id) {
  return {
    type: deleteDeckByTitle,
    id
  };
}

export function MOVE_CARD_TO_DECK(deckId, card) {
  return {
    type: insertCard,
    deckId,
    card
  };
}

export function RESET_DATA() {
  return {
    type: resetStorage
  };
}
export function INITIAL_LOAD() {
  return dispatch => {
    return GET_DECK_HANDLER().then(decks => {
      dispatch(RECEIVE_DECKS(decks));
    });
  };
}
