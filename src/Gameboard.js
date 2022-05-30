import React, { useEffect, useState } from "react";
import yellow from './icons/YellowcandyHTML5.png'
import green from './icons/GreencandyHTML5.png'
import blue from './icons/BluecandyHTML5.png'
import red from './icons/RedcandyHTML5.png'
import purple from './icons/PurplecandyHTML5.png'
import orange from './icons/OrangecandyHTML5.png'
import { DataBucket } from "./DataLayer";


function Gameboard() {
  const [, dispatch] = DataBucket();
  const [candyArray, setCandyArray] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [score, setScore] = useState(0);

  //const candy = ["red", "yellow", "purple", "green", "blue", "orange"];
  const candy = [red, yellow, purple, green, blue, orange];

  function columnOfFourCheck() {
    for (let i = 0; i <= 39; i++) {
      let columnOfFour = [i, i + 8, i + 16, i + 24];
      let currentColor = candyArray[i];
      if (columnOfFour.every((square) => currentColor === candyArray[square])) {
        columnOfFour.forEach((square) => {
          candyArray[square] = "";
          // setScore((score)=>{
          //   return score + 4
          // })
          setScore(score + 4)
          dispatch({
            type: 'SCORE',
            score:  score
          })
        return true;
        });
      }
    }
  }

  function columnOfThreeCheck() {
    for (let i = 0; i <= 47; i++) {
      let columnOfThree = [i, i + 8, i + 16];
      let currentColor = candyArray[i];
      if (
        columnOfThree.every((square) => currentColor === candyArray[square])
      ) {
        columnOfThree.forEach((square) => {
          candyArray[square] = "";
          // setScore((score) => {
          //   score + 3;
          // });
          setScore(score + 3);
          dispatch({
            type: "SCORE",
            score: score
          });
        return true;
        });
      }
    }
  }

  
  function rowOfFourCheck() {
    for (let i = 0; i < 64; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let currentColor = candyArray[i];
      const invalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (invalid.includes(i)) continue 

      if (
        rowOfFour.every((square) => currentColor === candyArray[square])
      ) {
        rowOfFour.forEach((square) => {
          candyArray[square] = "";
          // setScore((score) => {
          //   score + 4;
          // });
          setScore(score + 4);
          dispatch({
            type: "SCORE",
            score: score,
          });
        return true;

        });
      }
    }
  }
  

  function rowOfThreeCheck() {
    for (let i = 0; i < 64; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let currentColor = candyArray[i];
      const invalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (invalid.includes(i)) continue 

      if (
        rowOfThree.every((square) => currentColor === candyArray[square])
      ) {
        rowOfThree.forEach((square) => {
          candyArray[square] = "";
        });
        // setScore((score) => {
        //   score + 1;
        // });
        setScore(score + 3)
        dispatch({
          type: "SCORE",
          score: score,
        });
        return true;
      }
    }
  }

  function refillBlocks(){
      for(let i = 0; i < 56; i++){
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]


        if(firstRow.includes(i) && candyArray[i] === ''){
            let randomNumber = Math.floor(Math.random() * 6)
            candyArray[i] = candy[randomNumber]
        }

        if (candyArray[i + 8] === ''){
            candyArray[i + 8] = candyArray[i]
            candyArray[i] = ''
        }
      }
  }

  function dragStart(e){
    setSquareBeingDragged(e.target)
  }
  function dragDrop(e){
    setSquareBeingReplaced(e.target)
  }
  function dragEnd(){
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    candyArray[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor;
    candyArray[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor;
    

    const validMoves = [
        squareBeingDraggedId + 1,
        squareBeingDraggedId - 1,
        squareBeingDraggedId + 8,
        squareBeingDraggedId - 8
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = columnOfFourCheck()
    const isARowOfFour = rowOfFourCheck()
    const isAColumnOfThree = columnOfThreeCheck()
    const isARowOfThree = rowOfThreeCheck()

    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)){
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
    }
    else{
        candyArray[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor;
        candyArray[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor;
        setCandyArray([...candyArray])
    }

  }

  const candyShuffle = () => {
    const emptyArr = [];
    for (let i = 0; i < 64; i++) {
      emptyArr.push(candy[Math.floor(Math.random() * candy.length)]);
    }
    setCandyArray(emptyArr);
  };

  useEffect(() => {
    candyShuffle();
  }, []);

  //console.log(candyArray);

  useEffect(() => {
    const timer = setInterval(() => {
        refillBlocks();
      columnOfFourCheck();
      columnOfThreeCheck();
      rowOfFourCheck();
      rowOfThreeCheck();
      //moveBelow()
      setCandyArray([...candyArray]);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [columnOfFourCheck, columnOfThreeCheck, rowOfFourCheck, rowOfThreeCheck, candyArray]);
  

  return (
    <div className="gameboard-main">
      {candyArray.map((color, index) => {
        return <img 
        src={color}
        alt = ''
        key={index} 
        // style={{ backgroundColor: color }}
        data-id = {index} 
        draggable = {true}
        onDragStart = {dragStart}
        onDragOver = {(e)=>{
            e.preventDefault()
        }}
        onDragEnter = {(e)=>{
            e.preventDefault()
        }}
        onDragLeave = {(e)=>{
            e.preventDefault()
        }}
        onDrop = {dragDrop}
        onDragEnd = {dragEnd}
        score = {score}
        />;
      })}
    </div>
  );
}

export default Gameboard;
