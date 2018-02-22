import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { gray } from '../utils/colors'
import styled from 'styled-components/native'


const S_Card = styled.View`
margin:10px;
padding:10px;
background-color:pink;
color:white;
justify-content:center;
`
const CardItem_Title = styled.Text`
color:#fff;
font-size:20px;
font-weight:bold;
`

const CardItem_Content = styled.Text`
color:#fff;
font-size:14px;
font-weight:300;
`



export default function Card () {
  return (
    

          <S_Card>

              <CardItem_Title>
                Card Title
              </CardItem_Title>

              <CardItem_Content>
                Copy
              </CardItem_Content>
              

          </S_Card>
  
  )
}

