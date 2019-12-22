import React from 'react';
import ReactCardFlip from "react-card-flip";

const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
  <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <div className="card">
    <input type="image" src="/card-image/card-back.png" id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="front" style={{borderRadius: "11px"}} alt={"front"}/>
    </div>

    <div className="card">
    <input type="image" src={`/card-image/${cardNumber}.jpg`} id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="back" style={{borderRadius: "11px"}} alt={"back"}/>
    </div>
  </ReactCardFlip>
);

export default Card;