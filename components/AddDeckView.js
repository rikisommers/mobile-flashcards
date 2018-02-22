import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet ,Platform,TextInput, KeyboardAvoidingView } from 'react-native'
import {timeToString} from '../utils/helpers'
import { purple, white } from '../utils/colors'
import styled from 'styled-components/native'
import {addDeck} from "../actions/index"
import { submitDeck } from '../utils/api'

// test PLatform & styled components
// move/import all styles from styles.js
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


class AddDeckView extends Component {
    


    constructor(props) {
        super(props)

        this.state = {
            title:'',
            cards:[]
        }
    
        this.onChange = this.onChange.bind(this)
    }


    onChange(text) {
        this.setState({title:text})
    }

    submit = () => {
      let key = this.state.title
      let deck = this.state
      console.log('on submit',key,deck)
  
        if(key){
        submitDeck({ key,deck })
        this.setState({ key: 'enter deck title' })
        this.props.navigation.navigate('DeckView', {deck: this.state })
        }else{
        alert('enter a title fool')
        }

    }

    componentDidMount(){
      console.log('add new p',this.props)
    }

    render() {


        return(
            <KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <Title>Add new Deck</Title>
           
                <Field style={styles.inputText}
                    placeholder="Type title here!"
                    onChangeText={this.onChange}     
                />
                <Button title="Create Deck" onPress={this.submit}  >
                    <Title>Create Deck</Title>
                </Button> 

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
  



  export default AddDeckView