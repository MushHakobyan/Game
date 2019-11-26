import React from "react";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      array: [[], [], [], []],
      record: 0,
      score: 0,
      lose: "Game Over",
      bool: true,
      winGame: false,
      loseGame: false
    };
    // this.restartGame = this.restartGame.bind(this);
    // this.continueGame = this.continueGame.bind(this);
    // this.slideTop = this.slideTop.bind(this);
    // this.slideBottom = this.slideBottom.bind(this);
    // this.slideLeft = this.slideLeft.bind(this);
    // this.slideRight = this.slideRight.bind(this);
  }

  copySquares() {
    const { squares, array } = this.state;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        array[i][j] = squares[i][j];
      }
    }
  }

  compareSquares() {
    const { squares, array } = this.state;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (array[i][j] !== squares[i][j]) {
          return true;
        }
      }
    }
  }

  rotateSquares() {
    const { squares } = this.state;
    let arr = [[], [], [], []];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        arr[j][i] = squares[i][j];
      }
      squares[i] = arr[i];
    }
  }

  reverseRow() {
    const { squares } = this.state;

    for (let i = 0; i < 4; i++) {
      squares[i].reverse();
    }
  }

  combainRow() {
    const { squares, record, bool } = this.state;
    let score = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        if (squares[i][j] === squares[i][j - 1] && squares[i][j] !== null) {
          squares[i][j] *= 2;
          squares[i][j - 1] = null;
          score = squares[i][j];
          this.setState({ score: this.state.score + score });
          if (squares[i][j] === 2048 && bool) {
            this.setState({ bool: false, winGame: true });
          }
          if (squares[i][j] === 65536) {
            this.setState({ lose: "Absolute Win", loseGame: true });
          }
        }
      }
    }

    if (this.state.score >= record) {
      this.setState({ record: this.state.score + score });
    }
  }

  slideRow() {
    const { squares } = this.state;
    let arr = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (squares[i][j] !== null) {
          arr.push(squares[i][j]);
        } else {
          arr.unshift(squares[i][j]);
        }
      }
      squares[i] = arr;
      arr = [];
    }
  }

  slideRight() {
    this.copySquares();
    this.slideRow();
    this.combainRow();
    this.slideRow();
    this.addNumber();
  }

  slideLeft() {
    this.copySquares();
    this.reverseRow();
    this.slideRow();
    this.combainRow();
    this.slideRow();
    this.reverseRow();
    this.addNumber();
  }

  slideTop() {
    this.copySquares();
    this.rotateSquares();
    this.reverseRow();
    this.slideRow();
    this.combainRow();
    this.slideRow();
    this.reverseRow();
    this.rotateSquares();
    if (this.compareSquares()) {
      this.addNumber();
    }
  }

  slideBottom() {
    this.copySquares();
    this.rotateSquares();
    this.slideRow();
    this.combainRow();
    this.slideRow();
    this.rotateSquares();
    this.addNumber();
  }

  addNumber() {
    const { squares } = this.state;
    let arr = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (squares[i][j] === null) {
          arr.push([i, j]);
        }
      }
    }

    if (arr.length !== 0 && this.compareSquares()) {
      let num = Math.floor(Math.random() * arr.length);
      let a = arr[num][0];
      let b = arr[num][1];
      let x = Math.random() < 0.8 ? 2 : 4;
      squares[a][b] = x;
      this.setState({ squares });
    } else {
      if (this.gameOver()) {
        this.setState({ loseGame: true });
      }
    }
  }

  gameOver() {
    const { squares } = this.state;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (j !== 3 && squares[i][j] === squares[i][j + 1]) {
          return false;
        }
        if (i !== 3 && squares[i][j] === squares[i + 1][j]) {
          return false;
        }
      }
    }
    return true;
  }

  restartGame() {
    const { squares } = this.state;

    for (let i = 0; i < 4; i++) {
      squares[i].fill(null);
    }

    this.setState({
      score: 0,
      winGame: false,
      bool: true,
      loseGame: false,
      lose: "Game Over"
    });
    this.addNumber();
    this.addNumber();
  }

  continueGame() {
    this.setState({ winGame: false });
  }

  componentDidMount() {
    this.addNumber();
    this.addNumber();
  }

  render() {
    const { squares, record, score, winGame, loseGame, lose } = this.state;

    return (
      <div className="game">
        {winGame && (
          <div className="winGame">
            <p className="win">You Win!</p>
            <div className="newGame" onClick={() => this.restartGame()}>
              New Game
            </div>
            <div className="continue" onClick={() => this.continueGame()}>
              Continue
            </div>
          </div>
        )}
        {loseGame && (
          <div className="loseGame">
            <p className="lose">{lose}</p>
            <div className="newGame" onClick={() => this.restartGame()}>
              New Game
            </div>
          </div>
        )}
        <div className="menu">
          <p className="score">
            Score: {score} Record: {record}
          </p>
          <button onClick={() => this.restartGame()}>Restart</button>
        </div>
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
        <div className="buttons">
          <button onClick={() => this.slideLeft()}>&larr;</button>
          <div className="button">
            <button onClick={() => this.slideTop()}>&uarr;</button>
            <button onClick={() => this.slideBottom()}>&darr;</button>
          </div>
          <button onClick={() => this.slideRight()}>&rarr;</button>
        </div>
      </div>
    );
  }
}

export default Game;
