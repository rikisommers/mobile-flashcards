import * as actions from './types'
import * as API from '../utils/api'

import { AsyncStorage } from 'react-native'
import { STORAGE_KEY } from '../utils/helpers'



export function addDeck(deck) {
  return {
    type: actions.ADD_DECK,
    deck: deck
  }
}

export function getDecks(decks) {
  return {
    type: actions.GET_DECKS,
    decks: decks
  }
}


// export function getDecksFromStorage() {
//   return function(dispatch) {
//     AsyncStorage.getItem(DECK_STORAGE_KEY).then((response) => {
//       return dispatch(getDecks(response))
//     })
//   }
// }



// export const decksGet = () => async dispatch => {
//   try {
//     let decks = await API.recieveDecks();
//     decks = JSON.parse(decks);
//     if (decks === null) {
//       decks = {};
//     }
//     dispatch({ type: types.GET_DECKS, payload: decks });
//   } catch (error) {
//     console.log(error);
//   }
// };




export function addCard(deck, card) {
  return {
    type: actions.ADD_CARD,
    deck: deck,
    card: card
  }
}
