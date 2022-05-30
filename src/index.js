import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import {DataWrapper} from './DataLayer'

function Index() {
  

  

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
