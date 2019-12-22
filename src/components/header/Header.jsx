import React from 'react';

const Header = ({ restartGame, minutes, seconds }) => (
  <div className="grid-header-container">
    <div className="justify-left timer">
      <h1>{minutes}:{seconds}</h1>
    </div>
    <div className="justify-center game-status-text"></div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
    </div>
  </div>
);

export default Header;