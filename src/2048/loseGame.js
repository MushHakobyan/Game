import React from "react";

function LoseGame(props) {
  const { lose, restartGame } = props;

  return (
    <div className="loseGame">
      <p className="lose">{lose}</p>
      <div className="newGame" onClick={restartGame}>
        New Game
      </div>
    </div>
  );
}

export default LoseGame;
