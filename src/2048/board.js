import React from "react";

function Board(props) {
  const { squares } = props;

  return (
    <div className="board">
      <div className="div">
        {squares[0].map((item, i) => {
          return (
            <div key={i} className="square">
              {item}
            </div>
          );
        })}
      </div>
      <div className="div">
        {squares[1].map((item, i) => {
          return (
            <div key={i} className="square">
              {item}
            </div>
          );
        })}
      </div>
      <div className="div">
        {squares[2].map((item, i) => {
          return (
            <div key={i} className="square">
              {item}
            </div>
          );
        })}
      </div>
      <div className="div">
        {squares[3].map((item, i) => {
          return (
            <div key={i} className="square">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
