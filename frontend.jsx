import React, { useState, useEffect } from "react";
import { Client } from "nakama-js";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const client = new Client("defaultkey", "http://localhost:7350");

  useEffect(() => {
    // Connect to Nakama server
    const socket = client.socket();
    socket.connect().then(() => {
      console.log("Connected to Nakama server");
    });

    return () => socket.close();
  }, []);

  const handleClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const renderSquare = (index) => (
    <button onClick={() => handleClick(index)}>{board[index]}</button>
  );

  return (
    <div>
      <div>Next player: {currentPlayer}</div>
      <div>{[0, 3, 6].map((row) => (
        <div key={row}>
          {[0, 1, 2].map((col) => renderSquare(row + col))}
        </div>
      ))}</div>
    </div>
  );
};

export default TicTacToe;
