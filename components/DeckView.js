import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import styled from 'styled-components/native'
 

const Button = styled.TouchableHighlight`
margin:10px;
padding:10px;
background-color:pink;
justify-content:center;
`
const Title = styled.Text`
font-size:20px;
font-weight:bold;
`


class DeckView extends Component {

    componentDidMount(){
        console.log('deck p',this.props)
        
    }
    
    static navigationOptions = () => {

        console.log('deck title',this.props)
        return {
         title: 'deck view'
          
        }
    }

    render() {
        const deck = this.props.navigation.state.params.deck
        const cards = this.props.navigation.state.params.deck.cards
        const navigation = this.props.navigation
        console.log('dv d',deck)
        return(
            <View>
                <Title>
                    Deck: {deck.title}
                </Title>
                <Title>
                    Cards: {deck.cards.length}
                </Title>
                <Button
                onPress={() => navigation.navigate("AddCardView",{deck: deck})}
                >
                <Title>Add card</Title>
                </Button>


                {deck.cards.length > 0 &&
                <Button
                onPress={() => navigation.navigate("QuizView",{deck: deck,cards:cards})}
                >
                <Title>Start Quiz</Title>
                </Button>
                }
            </View>
        )
    }
}



export default DeckView