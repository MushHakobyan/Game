import React from "react";

function Menu(props) {
  const { score, record, restartGame } = props;

  return (
    <div className="menu">
      <p className="score">
        Score: {score} Record: {record}
      </p>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

export default Menu;
