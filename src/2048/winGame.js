import React from "react";

function WinGame(props) {
  const { restartGame, continueGame } = props;

  return (
    <div className="winGame">
      <p className="win">You Win!</p>
      <div className="newGame" onClick={restartGame}>
        New Game
      </div>
      <div className="continue" onClick={continueGame}>
        Continue
      </div>
    </div>
  );
}

export default WinGame;
