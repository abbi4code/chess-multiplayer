"use client"
import React from 'react'
import Image from 'next/image'
import { Color, PieceSymbol, Square } from 'chess.js';
import { useState } from 'react';

const Chessboard = ({board,socket}: {board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][], socket: WebSocket}) => {
    console.log("board:",board)
    const [from, setFrom] = useState<Square | null>(null)
    const [to, setTo] = useState<Square | null>(null)
        
  return (
    <div className='bg-white text-white'>
        {/* <Image alt='chessboard' src="chessboard.jpg" width={600} height={600}/> */}
        {board.map((row,i) => {
            return (
                <div key={i} className='flex'>
                    {row.map((square,j) => {
                        return (
                            <div onClick={() => {
                                if(!from){
                                    setFrom(square?.square ?? null)
                                }else{
                                    //! logic for valid moves
                                    //this both setfrom and setto will have the positions
                                    setTo(square?.square ?? null)
                                    socket.send(JSON.stringify({
                                        type: "move",
                                        payload: {
                                            from,
                                            to
                                        }
                                    }))
                                }
                            }} className={`w-12 h-12 ${(i+j)%2 == 0 ? 'bg-green-500' : 'bg-green-300'}`} key={j}>
                                {square ? square.type : ""}

                            </div>
                        )
                    })}


                </div>
            )
        })}


      
    </div>
  )
}

export default Chessboard
