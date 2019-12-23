import React from 'react';

const GameOver = ({ restartGame, minutes, seconds, bestSec, bestMin}) => (
  <div className="justify-center">
    <h1>You Win!</h1>
      <h2>Time: {minutes}:{seconds}</h2>
      <h2>Best Time: {bestMin}:{bestSec}</h2>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;