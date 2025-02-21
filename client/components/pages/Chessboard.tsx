"use client";
import React from "react";
import Image from "next/image";
import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const Chessboard = ({
  board,
  socket,
  chess,
  setBoard
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: any;
  setBoard: any
}) => {
  console.log("board:", board);
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  return (
    <div className="bg-white text-white">
      {/* <Image alt='chessboard' src="chessboard.jpg" width={600} height={600}/> */}
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const sqpos = (String.fromCharCode(97 + j) +
                "" +
                (8 - i)) as Square;
              console.log("sqpos", sqpos);
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(sqpos);
                    } else {
                      //! logic for valid moves
                      //this both setfrom and setto will have the positions
                      // setTo(square?.square ?? null)
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: {
                            move: {
                              from,
                              to: sqpos,
                            },
                          },
                        })
                      );
                    //   setFrom(square?.square ?? null);
                   //* kinda something off with this
                    setFrom(null)
                    chess.move({
                        from,
                        to: sqpos
                    })
                    setBoard(chess.board());
                    console.log({
                        from,
                        to:sqpos
                    })
                    }
                  }}
                  className={`w-12 h-12 ${
                    (i + j) % 2 == 0 ? "bg-green-500" : "bg-green-300"
                  }`}
                  key={j}
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Chessboard;
