import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import {DataWrapper} from './DataLayer'

function Index() {

  const music = new Audio("./sound.mp3");
  music.play();
  music.loop = true;
  music.playbackRate = 1;
  

  

  //const token = initialState.token
  //console.log(initialState)

  
    return (
      <DataWrapper initialState={initialState} reducer={reducer}>
        <div className="index">
          <App />
        </div>
      </DataWrapper>
    );
  
}

ReactDOM.render(<Index />, document.getElementById("root"));
