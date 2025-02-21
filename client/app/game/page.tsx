"use client"
import Chessboard from '@/components/pages/Chessboard'
import { Button } from '@/components/ui/button'
import { useSocket } from '@/hooks/useSocket';
import React, { useEffect , useState} from 'react'
import {Chess} from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER="game_over";


const Page = () => {
    const socket = useSocket();

    const [chess,setChess] = useState(new Chess());
    // console.log("chess",chess)
    const [board, setBoard] = useState(chess.board());
    // console.log("board.board", chess.board());

    useEffect(() => {
        if(!socket){
            console.log("no connection to websockets")
            return;
        }
        socket.onmessage = (event) => {
            // this will convert json into object
            const msg = JSON.parse(event.data)
            console.log("msg",msg);

            switch (msg.type){
                case INIT_GAME:
                    setChess(new Chess())
                    console.log("game initialize");
                    break;
                case MOVE: 
                //so this will contain both from and to right
                    const move = msg.payload;
                    // ^ ig here we are setting the move then updating the board
                    chess.move(move);
                    setBoard(chess.board())
                    console.log("move played",move)
                    break;
                case GAME_OVER:
                    console.log("game over")
                    break;
            }

        }

    },[socket,board,chess])
    if(!socket) return <div>connecting...</div>
  return (
    <div className='bg-slate-900 flex h-screen w-full'>
        <div className='flex-[2] flex justify-center items-center'>
        <Chessboard board={board} socket={socket}/>
        </div>
       <div className='flex-[1] flex justify-start items-center w-full '>
       <Button className='rounded-lg px-5 py-10 font-bold font-serif text-black text-5xl bg-green-800' onClick={() => {
        socket.send(JSON.stringify({type: INIT_GAME}))
       }}>Play</Button>
       </div>
      
    </div>
  )
}

export default Page
