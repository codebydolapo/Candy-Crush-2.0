import React from 'react';
import { DataBucket } from "./DataLayer";
import avatar from "./images/avatar.webp";



function Scoreboard() {

    const [{username, score}, ] = DataBucket();

    return (
      <div className="scoreboard-main">
        <img src={avatar} alt="" className="score-avatar" />
        <div className="name-score">
          <h1>{username}</h1>
          <h1>{score}</h1>
        </div>
      </div>
    );

}

export default Scoreboard;