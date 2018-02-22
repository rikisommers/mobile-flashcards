import React, { Component } from 'react'
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'
import styled from 'styled-components/native'


const DeckItem = styled.View`
margin:10px;
padding:10px;
background-color:pink;

justify-content:center;
`
const DeckItem_Title = styled.Text`

font-size:20px;
font-weight:bold;
`

const DeckItem_Content = styled.Text`
font-size:14px;
font-weight:300;
`




class Deck extends Component {

  componentDidMount(){

    //const {title, questions} = this.props;
    //console.log('deck',this.props)
    
  }

  
  render() {

    const {item,title,cards } =  this.props
   // console.log('item f deck',this.props)
    console.log('dv',this.props)
    return(
      <TouchableOpacity 
      // pass item , avalable from nav params
      onPress={() => this.props.nav.navigate('DeckView', {deck: item })}
        >
          <DeckItem>

              <DeckItem_Title>
                
               {title}
              </DeckItem_Title>
              <DeckItem_Content>
               {cards}
              </DeckItem_Content>

          </DeckItem>
        </TouchableOpacity>
    )
  }
}

export default Deck