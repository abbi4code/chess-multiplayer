import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Message";
import { Game } from "./Game";
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
        // ^ now each socket will push server will look for the msg to whether to start the game or not
        this.addHandler(socket);
    }
    removeuser(socket:WebSocket){
        this.users = this.users.filter((user) => user !== socket);
        // Todo: you can write a reconnection logic later on
    }

    private addHandler(socket: WebSocket){
        socket.on("message", (data)=> {
            const message = JSON.parse(data.toString());
            console.log("message", message);

            if(message.type === INIT_GAME){
                if(this.pendinguser){
                    const game = new Game(this.pendinguser,socket);
                    this.games.push(game);

                    this.pendinguser = null;
                }else{
                    this.pendinguser = socket
                }
                
            }

            if(message.type === MOVE){
                //adding move to arr first find the game to which this move belong to
                  
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket)
                
                // ! how to find out which socket move is being added
                if(game){
                    game.makemove(socket, message.payload.move)
                }
            }

        })
    }
}