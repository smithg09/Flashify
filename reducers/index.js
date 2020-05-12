import {
  fetchDecks,
  insertDeck,
  deleteDeckByTitle,
  insertCard,
  resetStorage
} from '../actions/index';
import { decks as INITIAL_STATE } from '../helpers/Dummy_Data';

export default function decks(state = {}, action) {
  switch (action.type) {
    case fetchDecks:
      return {
        ...state,
        ...action.decks
      };
    case insertDeck:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    case deleteDeckByTitle:
      const { id } = action;
      // return ({ [id]: value, ...remainingDecks } = state);
      const { [id]: value, ...remainingDecks } = state;
      // console.log(remainingDecks);
      return remainingDecks;
    case insertCard:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card)
        }
      };
    case resetStorage:
      return INITIAL_STATE;
    default:
      return state;
  }
}
