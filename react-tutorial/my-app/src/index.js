import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Squareは状態を持たない
function Square(props) {
  return (
    <button className="square" onClick={props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return(
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// このゲームのボードの状態等々すべてを保持する
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      // ここで履歴をもたせる
      history: [{
          squares: Array(9).fill(null),
      }],
      stepNumber: 0,
    };
  }

  handleClick(i) {
    let history = this.state.history;
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // stateに対して上書きする．
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        history: history.concat([{squares: squares}]),
    });
  };

  // statusメッセージを生成するメソッド
  createStatusMsg(winner, xIsNext) {
    if(winner) {
      return 'Winner is ' + winner;
    } else {
      return 'Next player is ' +(this.state.xIsNext ? 'X' : 'O');
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    let squares = this.state.squares
    let status = this.createStatusMsg(calculateWinner(squares), this.state.xIsNext)
    let history = this.state.history;
    let moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
        <button onClick={() => this.jumpTo(move)}>
          {desc}
        </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// 勝者の判定メソッド
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}