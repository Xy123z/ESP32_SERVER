const WebSocket = require('ws');
const readline = require('readline');
const wss = new WebSocket.Server({ port: 8080 });
console.log("Server listening on port 8080...");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
wss.on('connection', (ws) => {
  console.log("Client connected. Sending WELCOME...");
  ws.send(JSON.stringify({ event: "WELCOME" }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.event === "ACK") {
      console.log("ESP32 Acknowledged! Tell me howmany steps should I walk?):");
      startCli(ws);
    }
  });
});
function tokenizer(input){
const [action="",direction="",angle="0"] = input.split(/\s+\); 
return {
  action,
  direction,
  angle: Number(angle) || 0
};                                                              
}
function startCli(ws) {
  rl.on('line', (line) => {
    const cmd = line.trim().toLowerCase();
    JSON.stringify(tokenizer(com));
  });
}
