import React, { Component } from 'react'
import { View, StyleSheet, Text,TouchableOpacity, FlatList,Dimensions,Animated,Easing } from 'react-native'
import { gray } from '../utils/colors'
import styled from 'styled-components/native'
//import CardStack, { Card } from 'react-native-card-stack-swiper'


// TODO : move all styles to styles.js import per comp
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

const Conf = styled.View`
display:flex;
align-self:center;
width: 200;
height: 200;
background-color:#fff
color:#000;
`
//var {height, width} = Dimensions.get('window');
//let ScreenHeight = Dimensions.get("window").height;
// const QuizCard = styled.Card`
// width:100%;
// height:100%;
// bbackground-color:red;
// `

// const QuizCard_Title = styled.Text`
// font-size:14px;
// font-weight:300;
// color:#fff;
// `
class MyButton extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.label}</Text>
      </View>
    )
  }
}


class QuizView extends Component {



  constructor(props) {
    super(props)
    const cards  = this.props.navigation.state.params.cards
    this.rotY = new Animated.Value(0)
    this.state = {
      cards:cards,
      totalCards: cards.length,
      cCard: 0,
      totalCorrect: 0,
      quizCompleted:false,
      status:false,
      answer:false,
    }
    this.checkResult = this.checkResult.bind(this)
  }

  componentDidMount(){
    console.log('deck',this.props)
  }

  toggleStatus(){
    this.setState({status:!this.state.status})
  }

  showCorrect(){
    this.setState({answer:true})
  }
    
  showIncorrect(){
    this.setState({answer:false})
  }

  reset(){
    this.setState({
      totalCorrect: 0,
      cCard:0,
      quizCompleted:false,
      status:false,
      answer:false,
    })
  }

  fin(){
    this.setState({
      quizCompleted:true,
//currentCard : 0
    })
  }
  
  checkResult(val) {

    const cards = this.state.cards
    const cCard = this.state.cCard
    const totalCards = this.state.totalCards
    const totalCorrect = this.state.totalCorrect

    console.log('TF',JSON.parse(cards[cCard].TF))
    console.log('Val',val)


    if(cCard + 1 === cards.length){


      if(val === JSON.parse(cards[cCard].TF)){
        this.showCorrect()
      }else{
        this.showIncorrect()
      }
      this.fin()
      // this.setState({
      //   quizCompleted:true,
      //  // currentCard : 0
      // })

    }else{

      if(val === JSON.parse(cards[cCard].TF)){
        this.showCorrect()

        this.setState({
          totalCorrect: totalCorrect + 1,
          cCard : cCard + 1
        })
      
      }else{
        this.showIncorrect()
        
        this.setState({
          cCard : cCard + 1
        })
        
      }
    }
    console.log(this.state)
  }

  render() {
    const { totalCards, currentCard, status, quizCompleted, totalCorrect } = this.state
    const cards = this.props.navigation.state.params.cards
    const cCard = this.state.cCard
    const res = ((totalCorrect + 1) * 100) / totalCards;
    const st = this.state
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation)
    return(
        <View style={{flex:1}}>

              <DeckItem>
                  <DeckItem_Title>
                  <Text>Card {this.state.cCard + 1 } of {this.state.totalCards}</Text>
                  </DeckItem_Title>
              </DeckItem>


              <View style={styles.content}>

                {quizCompleted 
                ?

                
                <View>
                  { ( totalCorrect + 1 ) === totalCards 
                  ?
                  <View>
                    <DeckItem>
                      <DeckItem_Title><Text>Quiz Complete</Text></DeckItem_Title>
                      <DeckItem_Title><Text>You scored {res} %</Text></DeckItem_Title>
                      <DeckItem_Title><Text>You merked this one.</Text></DeckItem_Title>
                      <TouchableOpacity 
                      onPress={() =>
                        navigate('DeckListView')
                      }
                      >
                      <Text>Try another quiz</Text>
                      </TouchableOpacity>
                    </DeckItem>
                  </View>
                  :
                  <View>
                    <DeckItem_Title><Text>Quiz Complete</Text></DeckItem_Title>
                    <DeckItem_Title><Text>You scored {res} %</Text></DeckItem_Title>
                    <DeckItem_Title><Text>You flunked dog. </Text></DeckItem_Title>
                    <TouchableOpacity onPress={() => this.reset()}>
                      <Text>Try again</Text>
                    </TouchableOpacity>
                  </View>

                  }

                </View>
                :
                <View style={[styles.card]} key={cards[cCard]} >
                        
                        {status
                        ?
                        <View>
                          <Title>{cards[cCard].answer}</Title>
                          <Text >{cards[cCard].TF}</Text>
                          <TouchableOpacity style={[styles.button]} onPress={() =>this.toggleStatus()}><Text>Show Question</Text></TouchableOpacity> 
                          </View>
                        :
                        <View>
                          <Title>{cards[cCard].question}</Title>
                          <Text >{cards[cCard].TF}</Text>
                          <TouchableOpacity style={[styles.button]} onPress={() => this.toggleStatus()}><Text>Show Answer</Text></TouchableOpacity> 
                          </View>
                        }
                      
                </View>
                }
              </View>


              <View>
                <Text>{this.state.totalCorrect} - {this.state.totalCards}</Text>
              </View>
              
              
              <View>
                      {this.state.answer === false
                      ?
                      <Text>You foolish fool that answer is wrong. Try again next time</Text>
                      :
                      <Text>You are truly a genius, that is indeed correct!</Text>
                      }                
              </View>

              <View style={styles.footer}>
                  <View style={styles.buttonContainer}>
                      {
                        // https://facebook.github.io/react-native/docs/direct-manipulation.html
                      }
                      <Button value={true} onPress={() => this.checkResult(true)}><Text>TRUE</Text></Button>
                      <Button value={false} onPress={() => this.checkResult(false)}><Text>FALSE</Text></Button>

                  </View>
              </View>

        </View>
          
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    transform: [{ rotateY: JSON.stringify(this.rotY)+ 'deg'}]
   // transform:rotateY(JSON.stringify(this.rotY)+ 'deg')
  },

  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 50,
      padding:20,
      borderRadius:10,
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  
});

export default QuizView