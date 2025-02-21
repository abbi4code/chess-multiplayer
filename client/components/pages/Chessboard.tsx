"use client"
import React from 'react'
import Image from 'next/image'
import { Color, PieceSymbol, Square } from 'chess.js';

const Chessboard = ({board}: {board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];}) => {
        console.log("board:",board)
  return (
    <div className='bg-white text-white'>
        {/* <Image alt='chessboard' src="chessboard.jpg" width={600} height={600}/> */}
        {board.map((row,i) => {
            return (
                <div key={i} className='flex'>
                    {row.map((square,j) => {
                        return (
                            <div className={`w-12 h-12 ${(i+j)%2 == 0 ? 'bg-green-500' : 'bg-green-300'}`} key={j}>
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
