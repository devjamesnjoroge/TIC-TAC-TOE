import {  useState } from "react"
import Board from "./Board"
import TimeTravel from "./TimeTravel"

function Game(){
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXisNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [tempRedo, setTempRedo] = useState(null)

  function onSquareClick(i){
    const cloneSquares = squares.slice()

    if (squares[i] || calculateWinner(squares)){
      return
    }

    switch (xIsNext){
      case true:
        cloneSquares[i] = 'X'
        setXisNext(false)
        break
      default:
        cloneSquares[i] = 'O'
        setXisNext(true)
    }

    setSquares(cloneSquares)

    if (tempRedo){

      const i = history.indexOf(tempRedo)
      const newHist = history.slice(0,i+1)
      newHist.push(cloneSquares)
      setHistory(newHist)
      setTempRedo(null)

    } else{

      const cloneHistory = history.slice()
      cloneHistory.push(cloneSquares)
  
      setHistory(cloneHistory)
      
    }

  }

  function calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function onPlay(){
    const histClone = history.slice(history)
    const onRedo = histClone.map((hist)=><li key={hist} className="pills" onClick={()=>{handleTimeTravel(hist)}}>Move {history.indexOf(hist)}</li>)
    return <ul>{onRedo}</ul>
  }

  function handleTimeTravel(hist){
    setTempRedo(hist)
    const newSquares = hist
    setSquares(newSquares)
  }

  return(
    <div className="container">
      <TimeTravel onPlay={onPlay} calculateWinner={calculateWinner} history={history} tempRedo={tempRedo}/>
      <div className="row">
      <h4 style={{textDecoration: 'underline'}}>The Tic-Tac-Toe Game</h4>
      <Board squares={squares} onSquareClick={onSquareClick} />
      <span>Code by <a style={{textDecoration: 'none', color: 'goldenrod'}} href="http://github.com/devjamesnjoroge/" target="_blank" rel="noopener noreferrer">James Ng'ang'a</a></span>
      </div>
    </div>
  )
}

export default Game