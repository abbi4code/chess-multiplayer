"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Message_1 = require("./Message");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendinguser = null;
        this.users = [];
    }
    adduser(socket) {
        this.users.push(socket);
        // ^ now each socket will push server will look for the msg to whether to start the game or not
        this.addHandler(socket);
    }
    removeuser(socket) {
        this.users = this.users.filter((user) => user !== socket);
        // Todo: you can write a reconnection logic later on
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            console.log("message", message);
            if (message.type === Message_1.INIT_GAME) {
                if (this.pendinguser) {
                    const game = new Game_1.Game(this.pendinguser, socket);
                    this.games.push(game);
                    this.pendinguser = null;
                }
                else {
                    this.pendinguser = socket;
                }
            }
            if (message.type === Message_1.MOVE) {
                //adding move to arr first find the game to which this move belong to
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                // ! how to find out which socket move is being added
                if (game) {
                    game.makemove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
