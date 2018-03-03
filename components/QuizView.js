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


const CardCard = styled.View`
background-color: '#FE474C',
border-radius: 5,
width: 100%;
transform-style: preserve-3d;
transform-origin:center;

`

const CardContentWrap = styled.View`
margin: 0;
display: block;
position:relative;
perspective: 800px;
width: 100%;
height:200;
`
const CardQuestion = styled.View`
width: 100%;
height:200;
backgroundColor: red;
position:absolute;
top:0;
backface-visibility: hidden;
`


const CardAnswer = styled.View`
width: 100%;
height:200;
position:absolute;
top:0;
left:0;
right:0;
background: blue;
color:#fff;
z-index:99;
transform:rotateY(180deg);
`


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
    this.state = {
      cards:cards,
      totalCards: cards.length,
      cCard: 0,
      totalCorrect: 0,
      quizCompleted:false,
      status:false,
      answer:false,
      animCard: new Animated.Value(0),
    }
    this.checkResult = this.checkResult.bind(this)
  }

  _currentCard = 0;

  componentDidMount(){
    console.log('deck',this.props)
  }

  toggleStatus(){
      this._currentCard = this._currentCard ? 0 : 3;

      Animated.timing(this.state.animCard, {
      duration: 600, 
      toValue: this._currentCard,
      useNativeDriver: true,
      }).start();

      setTimeout(() =>{
        this.setState({status:!this.state.status})
      }, 300)

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

        this.setState({
          totalCorrect: totalCorrect + 1,
        })

      }else{
        this.showIncorrect()
      }

      setTimeout(() =>{
        this.fin()
      }, 1000)


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
    if(this.state.status != false){
      this.toggleStatus()
    }


    console.log(this.state)
  }

  render() {
    const { totalCards, currentCard, status, quizCompleted, totalCorrect } = this.state
    const cards = this.props.navigation.state.params.cards
    const cCard = this.state.cCard
    //const res = ((totalCorrect ) * 100) / totalCards;

    var outOf = totalCards
    var value = totalCorrect
    var result = (value * 100) / outOf;

    let { animCard } = this.state.animCard;
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation)

    let response = null
    if(this.state.cCard > 0 && this.state.quizCompleted === false){

      if(this.state.answer === false){
        response = <Text>You fool that answer is wrong. Try again next time</Text>
      }else{
        response = <Text>You are truly a genius, that is indeed correct!</Text>
      }

     

    }

    return(
        <View style={{flex:1}}>

              <DeckItem>
                  <DeckItem_Title>
                  <Text>Card {this.state.cCard + 1 } of {this.state.totalCards}</Text>
                  </DeckItem_Title>
              </DeckItem>

              <View
                style={{  
                  position:'relative',
                  perspective: 1000
                }}
              >
             {/* // <View style={styles.content}> */}

                {quizCompleted 
                ?

                
                <View>
                  { ( totalCorrect ) === totalCards 
                  ?
                  <View>
                    <DeckItem>
                      <DeckItem_Title><Text>Quiz Complete</Text></DeckItem_Title>
                      <DeckItem_Title><Text>You scored {result} %</Text></DeckItem_Title>
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
                    <DeckItem_Title><Text>You scored {result} %</Text></DeckItem_Title>
                    <DeckItem_Title><Text>You flunked dog. </Text></DeckItem_Title>
                    <TouchableOpacity onPress={() => this.reset()}>
                      <Text>Try again</Text>
                    </TouchableOpacity>
                  </View>

                  }

                </View>
                :
                <Animated.View
                  style={{    
  
                    transform: [
                      {rotateY: this.state.animCard}
                    ],
                    perspective: 1000
                  }}
                >
                <CardCard>
                        <CardContentWrap>
                        {this.state.status  ?
              
                          <CardAnswer>
                            <Title>{cards[cCard].answer}</Title>
                            <Text >{cards[cCard].TF}</Text>
                            <TouchableOpacity style={[styles.button]} onPress={() =>this.toggleStatus()}><Text>Show Question</Text></TouchableOpacity> 
                          </CardAnswer>
                  :
                        <CardQuestion>
                          <Title>{cards[cCard].question}</Title>
                          <Text >{cards[cCard].TF}</Text>
                          <TouchableOpacity style={[styles.button]} onPress={() => this.toggleStatus()}><Text>Show Answer</Text></TouchableOpacity> 
                        </CardQuestion>
                        }
                      </CardContentWrap>
                  </CardCard>
                </Animated.View>
                }
              </View>


              {/* <View>
                <Text>
                 {'total cards' + totalCards + '|' + 'total coreect' + totalCorrect + '|' + 'curr' + cCard }  
                 </Text>          
              </View> */}
              <View>
                 {response}            
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
    transformOrigin:0,
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