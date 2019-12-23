import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';

import './styles/main.css';

class App extends PureComponent {

  state = { 
    isFlipped: Array(36).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1,
    secondsElapsed: 0,
    seconds: 0,
    minutes: 0,
    bestMin: Number.MAX_VALUE,
    bestSec: Number.MAX_VALUE,
    isRunning: false
  };

  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };

  startIt = () => {
    if(this.state.isRunning) {
      
    } else {
      this.setState({
        isRunning: true
      })
      this.handleStart();
    }
  }

  handleStart = () => {
    var _this = this;
    this.incrementor = setInterval(function() {
      _this.setState({
        secondsElapsed: (_this.state.secondsElapsed + 1),
        seconds: ('0' + _this.state.secondsElapsed % 60).slice(-2),
        minutes: Math.floor(_this.state.secondsElapsed / 60)
      });
    }, 1000)
  }

  handleStop = () => {
    this.setState({
      isRunning: false,
      secondsElapsed: 0,
    })
    clearInterval(this.incrementor)
  }

  handleClick = event => {
    event.preventDefault();
    this.startIt();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 750);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(36).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      isRunning: false,
      secondsElapsed: 0,
      seconds: 0,
      minutes: 0
    });
    clearInterval(this.incrementor)
  };

  isGameOver = () => {
    if(this.state.isFlipped.every((element, index, array) => element !== false)){
      this.setState({
        bestMin: Math.min(this.state.minutes, this.state.bestMin),
        bestSec: Math.min(this.state.seconds, this.state.bestSec)
      })
      this.handleStop();
    }
    return this.state.isFlipped.every((element, index, array) => element !== false);
  };

  componentWillUnmount(){
    clearInterval(this.incrementor)
  }

  render() {
    const {minutes, seconds, bestSec, bestMin} = this.state
    return (
     <div>
       <Header restartGame={this.restartGame} minutes={minutes} seconds={seconds} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} minutes={minutes} seconds={seconds} bestSec={bestSec} bestMin={bestMin}/> :
       <div className="card-container">
          <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
          </div>
          </div>
       }
     </div>
    );
  }
}

export default App;
