
import React from 'react'
import { StackNavigator } from 'react-navigation'
import HomeTabs from './HomeTabs'
import DeckView from './DeckView'
import AddCardView from './AddCardView'
import QuizView from './QuizView'
import { purple, white } from '../utils/colors' 

const AppStack = StackNavigator({
    Home: {
        screen: HomeTabs,
        navigationOptions: {
          //header: null
        }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: 'DeckView',
        tintColor: '#fefefe'
      }
    },
    AddCardView: {
      screen: AddCardView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: 'AddCardView',
        tintColor: '#fefefe'
      }
    },
    QuizView: {
      screen: QuizView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: 'QuizView',
        tintColor: '#fefefe'
      }
    }
})

export default AppStack