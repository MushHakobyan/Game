import React from "react";

function Buttons(props) {
  const { slideBottom, slideLeft, slideRight, slideTop } = props;

  return (
    <div className="buttons">
      <button onClick={slideLeft}>&larr;</button>
      <div className="button">
        <button onClick={slideTop}>&uarr;</button>
        <button onClick={slideBottom}>&darr;</button>
      </div>
      <button onClick={slideRight}>&rarr;</button>
    </div>
  );
}

export default Buttons;
