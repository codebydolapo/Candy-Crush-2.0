import React from 'react'
import Scoreboard from "./Scoreboard";
import Gameboard from "./Gameboard";

function Game(){
    return (
      <div className="game-main">
        <Gameboard />
        <Scoreboard />
      </div>
    );
}

export default Game