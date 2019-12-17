// Node.js WebSocket server script
const http = require('http');
const express = require('express');
const { Server } = require('ws');
//const WebSocketServer = require('websocket').server;
const path = require('path');
const app = express();
var fs = require('fs');
const PORT = process.env.PORT || 9898;
const INDEX ='index.html';
//const server = http.createServer();
//server.listen(PORT);
var alarma;
//Implementamos la pagina web
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
  
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
   ws.on('message', function(message) {
	   
	    alarma=message;
	   
   });
  ws.on('close', () => console.log('Client disconnected'));
});


setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(alarma);
  });
}, 1000);



//const wsServer = new WebSocketServer({
 //   httpServer: server
//});
//wsServer.on('request', function(request) {
 //   const connection = request.accept(null, request.origin);
  //  connection.on('message', function(message) {
//      console.log('Received Message:', message.utf8Data);
//      connection.sendUTF('LED:A');
//    });
//    connection.on('close', function(reasonCode, description) {
 //       console.log('Client has disconnected.');
 //   });
//});