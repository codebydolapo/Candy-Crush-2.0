import React from "react";
import "./CSS/app.css";
import Game from "./Game";
import Login from "./Login";
//import { DataBucket } from "./DataLayer";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  //const [{ token }] = DataBucket();
  

  return (
    <Router>
      <div className="app-main">
        <Routes>
          <Route path = '/game' element = {<Game />}/>
          <Route path = '/' element = {<Login />}/>
        </Routes>
      </div>
    </Router>

    // <div className = 'app-main'>
    //   <Login />
    // </div>
  );
}

export default App;
