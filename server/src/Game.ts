import { WebSocket} from "ws";
export class Game{ 
    public player1: WebSocket;
    public player2: WebSocket;
    private moves: string[];
    private board: string;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = "";
        this.startTime = new Date();
        this.moves = []
    }
    
    makemove(socket: WebSocket, move: string){
        //validation check
        //is it the users move
        //is the move valid
        
        //update the board
        //push the move

        //check if the game is over 

        //send the updated board to both players
    }

}