import * as ACTIONS from '../actions/index'
import { initialDeckData } from '../config/initialState';


// var initialState = {
//   loading: true,
//   decks: {},
// };


export default function decks(state = initialDeckData, action) {
  switch (action.type) {
    case ACTIONS.ADD_DECK:
      return {
        ...state,
        [action.newDeck] : {
          title: action.newDeck,
          quizLength: 0,
          questions: []
        }
      }
    case ACTIONS.GET_DECKS:
      return {
        ...state,
        decks:JSON.parse(action.payload)
      }
      
    case ACTIONS.ADD_CARD:
      return {
        ...state,
        [action.deck] : {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card)
        }
      }
    default:
      return state
  }
}