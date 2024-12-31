import { WebSocket } from "ws";
import { INIT_MSG, MOVE } from "./Message";
import { Game } from "./Game";
// interface Game{
//     player1: WebSocket,
//     player2: WebSocket,
//     moves: String[],
// }

export class GameManager{
    private games: Game[];
    private users: WebSocket[];
    private pendinguser: WebSocket |  null;


    constructor(){
        this.games = [];
        this.pendinguser = null;
        this.users = []
    }

    adduser(socket:WebSocket) {
        this.users.push(socket);
    }
    removeuser(socket:WebSocket){
        this.users = this.users.filter((user) => user !== socket);
        // Todo: you can write a reconnection logic later on
    }

    private addHandler(socket: WebSocket){
        socket.on("message", (data)=> {
            const message = JSON.parse(data.toString());
            console.log("message", message);

            if(message.type === INIT_MSG){
                if(this.pendinguser){
                    // so when two people get in the queue start the game
                    const game = new Game(socket, this.pendinguser)
                    //we will push this to our global game
                    this.games.push(game);

                    this.pendinguser = null;
                }else {
                    this.pendinguser = socket
                }
            }
            if(message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    
                }

            }

        })
    }
}