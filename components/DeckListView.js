import React, { Component } from 'react'
import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    Platform, 
    ScrollView,
    FlatList
} from 'react-native'
import Deck from './Deck'
import Card from './Card'
import DeckView from './DeckView'
import { AsyncStorage } from 'react-native'
import { APIgetDecks } from '../utils/api'
import { STORAGE_KEY} from '../utils/decks'
import { StackNavigator } from 'react-navigation'

class DeckListView extends Component {
 
    state = {
        active: false,
        decks:{}
    } 
    
    componentDidMount(){
       

        APIgetDecks().then((res) => {
            res === null ?
            this.setState({decks:{}})
            :
            this.setState({decks:res})
        })

        

    }


    render() {
        const { navigate } = this.props.navigation;
        const decks = this.state.decks
        let decksArr = Object.keys(decks).map((key) => decks[key])

        return(
            
            <FlatList
            data={decksArr}
            keyExtractor={(item, index) => index}
            //renderItem={this.listItem}
            renderItem={({ item }) => (
                <Deck item = {item}
                  nav={this.props.navigation}
                  title={`${item.title}`}
                  cards={`${item.cards.length}`}
                />
            )}
            />

        )
    }
}





export default DeckListView