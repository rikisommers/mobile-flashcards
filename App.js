import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Modal, } from 'react-native';
import { Constants } from 'expo'

import { purple, white } from './utils/colors'

import { APIclearDecks } from './utils/api'
import AppStack from './components/AppStack'



function CardsStatusBar ({backgroundColor, ...props}) {
  return (

    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={purple} {...props} />
    </View>

  )
}







export default class App extends React.Component {
  componentDidMount(){
 //   APIclearDecks()
  }

  render() {
    return (
        <View style={{flex: 1}}>

          <CardsStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <AppStack/>
         
        </View>   

      )
  }
}


