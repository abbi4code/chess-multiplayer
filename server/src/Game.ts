import { WebSocket} from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME} from "./Message";
export class Game{ 
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        //now if the game started emit out both the parties that game has started
        console.log("game reached to game object")
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }

        }))
        console.log("main place where game code should come ")
    }
    
    makemove(socket: WebSocket, move: {to: string, from: string}){
        //validation check
        //is it the users move
        //is the move valid
        // !counting history for finding out which turn is now
        if(this.board.history().length % 2 === 0 && socket !== this.player1){
            this.player2.send("Its white move chutiye")
            return
        }
        if(this.board.history().length % 2 === 1 && socket !== this.player2){
            this.player1.send("Its black move chutiye")
            return
        }
        
        //update the board
        //push the move
        // & this.board.history() will display all the possible history from the curr pos

        console.log("move check before adding move", this.board.history().length)

        try {
            this.board.move(move)
            
        } catch (error) {
            console.log(error)
            return
        }
        console.log("move check after adding move", this.board.history().length)
        


        //check if the game is over 
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return
        }

        //send the updated board to both players && telling the other side that move has been made
        
        if(this.board.history().length % 2 !==  0 ){
            // means if mvoes count is even then black already made the move
            this.player2.send(JSON.stringify({
                type: "move",
                payload: move
            }))
        }else {
            this.player1.send(JSON.stringify({
                type: "move",
                payload: move
            }))
        }

    }

}