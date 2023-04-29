function TimeTravel({onPlay, calculateWinner, history, tempRedo}){
    function checkWinner(){
        if (calculateWinner()){
            return (<div className="title">
            <h3>The Winner is : </h3>
    
            <strong style={{color: 'red'}}>{calculateWinner()}</strong >
    
            </div>)
        } else{
            if (history.length === 10 && tempRedo === null){
                return <em>Game Over, No winner!</em>
            } else{
                return
            }
        }
    }
    return (
        <div className="row">
        {checkWinner()}
        <div>{onPlay()}</div>
      </div>
    )
}

export default TimeTravel