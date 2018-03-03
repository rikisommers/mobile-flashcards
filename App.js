import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Modal, } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo'

import { purple, white } from './utils/colors'

import { APIclearDecks } from './utils/api'
import AppStack from './components/AppStack'
import { setLocalNotification } from './utils/helpers'


function CardsStatusBar ({backgroundColor, ...props}) {
  return (

    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={purple} {...props} />
    </View>

  )
}







export default class App extends React.Component {

  state={
    active:false
  }
  
  componentDidMount(){
      //APIclearDecks()
      setLocalNotification()
  }
  onNavigationChange = (prevState, currentState) => {
    this.setState({
      keys: currentState.routes
    });
  }

  _getCurrentRouteName(navState) {

    if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index])
    } else {

        console.log("Current Route Name:", navState.routeName)
        
       	// can then save this to the state (I used redux)
        //store.dispatch(setCurrentRouteName(navState.routeName))
    }

}

  render() {
    return (
        <View style={{flex: 1}}>

          <CardsStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <AppStack
          onNavigationStateChange={(prevState, newState) => {
            this._getCurrentRouteName(newState)
          }}
          />
         
        </View>   

      )
  }
}


