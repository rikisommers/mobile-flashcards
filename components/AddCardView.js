import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet ,Platform,TextInput, KeyboardAvoidingView ,Picker} from 'react-native'


import {timeToString} from '../utils/helpers'

import { purple, white } from '../utils/colors'
import styled from 'styled-components/native'

import {addDeck} from "../actions/index"
import { submitCard,APIclearDecks } from '../utils/api'

const Button = styled.TouchableHighlight`
margin:10px;
padding:10px;
background-color:pink;
justify-content:center;
`
const Title = styled.Text`
font-size:20px;
font-weight:bold;
margin:10px;
`

const Field = styled.TextInput`
margin:10px;
padding:10px;
border:1px solid #000;
border-radius:5px;
justify-content:center;
font-size:20px;
`





function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
}


class AddCardView extends Component {
    


    constructor(props) {
        super(props)

        this.state = {
            question:'',
            answer:'',
            TF:false
        }
    
        this.onQuestionChange = this.onQuestionChange.bind(this)
        this.onAnswerChange = this.onAnswerChange.bind(this)
        this.onTFChange = this.onTFChange.bind(this)
   
    }


    onQuestionChange(text) {
        this.setState({question:text})
        console.log(this.state)
    }
    onAnswerChange(text) {
        this.setState({answer:text})
        console.log(this.state)
    }

    // on change picker
    onTFChange(value) {

        if (value !== 0) {
            this.setState({TF:value});
          }

    }
    //onValueChange={(itemValue, itemIndex) => this.setState({answer: itemValue})}



    submit = () => {

      let deck = this.props.navigation.state.params.deck.title
      let card = this.state
    let theDeck = this.props.navigation.state.params.deck
      console.log('on submit deck',deck)  
      console.log('on submit deck',card)  
      
      submitCard({ deck,card })
      this.setState({question:'',answer:0})
      this.props.navigation.navigate('DeckView',{ theDeck })
   
    }

    componentDidMount(){
//APIclearDecks()
      console.log('add new p',this.props)
   
    }

    render() {

        const { deck } =  this.props.navigation.state.params

        return(
            <KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <Title>Add card to {deck.title} </Title>
                <Title>Question</Title>
                <Field style={styles.inputText}
                 
                    placeholder="Type question here!"
                    onChangeText={this.onQuestionChange}     
                />
                <Title>Answer</Title>
                <Field style={styles.inputText}
                    placeholder="Type answer here!"
                    onChangeText={this.onAnswerChange}     
                />

                <Title>True or False?</Title>
                <Picker
                selectedValue={this.state.TF}
                onValueChange={this.onTFChange}
            >
                <Picker.Item label='Please select an option...' value='0' />
                <Picker.Item label="true" value="true" />
                <Picker.Item label="false" value="false" />
                </Picker>

                <Button title="Create Deck" onPress={this.submit} >
                <Title>Add Card</Title>
                </Button>  
                <Text>{JSON.stringify(this.state)}</Text>
            </KeyboardAvoidingView>
        )


    }
}


const styles = StyleSheet.create({

    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
    },
   
  })
  



  export default AddCardView