import { AsyncStorage } from 'react-native'
import { STORAGE_KEY,formatDeckResults } from './decks'
import * as ACTIONS from '../actions' 



export function submitDeck ({key,deck}) {

    //const deck = data.deck

    // return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify( {deck} ))
    // .then(
    //   console.log('data from api',key)
    // ).then(
    //   console.log('data from api',deck)
    // )


    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deck.title] : {title : deck.title, cards: []}
     // key : { title : entry, questions: [] }
      
    })).then(
      console.log(JSON.stringify(
        deck
      ))
    )
    
}

// export function submitCard ({key,card,deck}) {
//   AsyncStorage.getItem(STORAGE_KEY).then
//   return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
//     [deck.title] : {title : deck.title, cards: []}
//    // key : { title : entry, questions: [] }
    
//   })).then(
//     console.log(JSON.stringify(
//       card
//     ))
//   )

// }
//key === deck.title
export async function submitCard ({deck,card}) {

  
   let decks = await AsyncStorage.getItem(STORAGE_KEY)
//   let cDeck = decks)
   let res = (JSON.parse(decks))
  let cards = res[deck].cards
   //let deck = (deck)
  

  //console.log('cDeck',cDeck)
  console.log('res',JSON.parse(decks))
  console.log('deck',deck)
  console.log('card',card)
  console.log('cards',cards)

  AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
    [deck]:{cards:res[deck].cards.concat(card)}
  })).then(

   console.log('submitCard decks after',JSON.parse(decks))
 )
  

  //.then(res => console.log(res))

  // return AsyncStorage.getItem(STORAGE_KEY)
  // .then(decks => JSON.parse(decks))
  // .then(console.log('api decks before',decks))
  // .then(
  //   AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
  //     [deck]:{cards:decks[deck].questions.concat(card)}
  //   }))

  // ).then(
  //   console.log('updated decks,',decks)
  // )
}



// export const addCardToStorage = (key, value) =>
//   AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [key]: { questions: value } }));



// export function addDeckToStorage(newDeck) {
//   return function (dispatch) {
//     AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[newDeck.newDeck] : {title : newDeck.newDeck, questions: []}}))
//       .then(dispatch(addDeck(newDeck)))
//   }
// }



//export const getDecksFromAPI = () => AsyncStorage.getItem(STORAGE_KEY);
export const APIclearDecks = () => AsyncStorage.removeItem(STORAGE_KEY);

export function APIgetDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
  .then(res => JSON.parse(res))
}



