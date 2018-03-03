import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Ionicons, FontAwesome,Entypo } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import DeckListView from './DeckListView'
import AddDeckView from './AddDeckView'



const HomeTabs = TabNavigator({

  
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Deck List',
        tabBarIcon: ({ tintColor }) => <Entypo name='documents' size={30} color={tintColor} />
      },

    },
    AddDeckView: {
      screen: AddDeckView,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
      },
    },
  }, {
    navigationOptions: {
      header: null
    }
  })
  
  console.log('tabs props',this.props)

  export default HomeTabs