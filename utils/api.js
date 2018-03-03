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


export async function submitCard ({deck,card}) {


  let decks = await AsyncStorage.getItem(STORAGE_KEY)
  let res = (JSON.parse(decks))
  let cards = res[deck].cards
  console.log('res',JSON.parse(decks))
  console.log('deck',deck)
  console.log('card',card)
  console.log('cards',cards)

  AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
    [deck]:{cards:res[deck].cards.concat(card)}
  })).then(

   console.log('submitCard decks after',JSON.parse(decks))
 )
  
}


export const APIclearDecks = () => AsyncStorage.removeItem(STORAGE_KEY);

export function APIgetDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
  .then(res => JSON.parse(res))
}



