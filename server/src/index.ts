import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8000 },()=>{
  console.log( `Server started at ws://localhost:8000`)
});

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {

  // ^ so on connection we will add the user to our class
  console.log("New Client Connected")
  ws.send('Welcome to the WebSocket server!');
    
  gameManager.adduser(ws);
  wss.on("disconnect", () => gameManager.removeuser(ws))

  wss.on("error", (error)=>{
    console.log("websocket error:", error)
  })

});