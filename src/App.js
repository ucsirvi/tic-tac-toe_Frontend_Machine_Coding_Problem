import { useState } from "react";
import "./styles.css";

export default function App() {
  const initialBoard = () => Array(9).fill(null);

  const [board, setBoard] = useState(initialBoard());
  const [isXturn, setIsXTurn] = useState(true);

  const handleOnClick = (index) => {
    const winner = calculateWinner(board);

    if (winner) return;

    const newboard = [...board];
    newboard[index] = isXturn ? "X" : "O";
    setBoard(newboard);
    setIsXTurn(!isXturn);
  };

  const getPlayerTurnMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null)) return `Match draws`;
    return `Player ${isXturn ? "X" : "O"} turn!`;
  };

  const reset = () => {
    setBoard(initialBoard());
    setIsXTurn(true);
  };

  const WinnigPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentboard) => {
    for (let i = 0; i < WinnigPattern.length; i++) {
      const [a, b, c] = WinnigPattern[i];
      if (
        currentboard[a] &&
        currentboard[a] === currentboard[b] &&
        currentboard[a] === currentboard[c]
      ) {
        return currentboard[a];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>

      <div className="game">
        <div className="status">
          {/* Player X turns */}
          {getPlayerTurnMessage()}
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="game-board">
          {board.map((val, index) => {
            return (
              <button
                className="cell"
                key={index}
                onClick={() => handleOnClick(index)}
                disabled={val != null}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
