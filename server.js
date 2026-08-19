const WebSocket = require('ws');
const readline = require('readline');

const wss = new WebSocket.Server({ port: 8080 });
console.log("Server listening on port 8080...");

wss.on('connection', (ws) => {
  console.log("Client connected. Sending WELCOME...");
  ws.send(JSON.stringify({ event: "WELCOME" }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.event === "ACK") {
      console.log("ESP32 Acknowledged! You can now send commands (e.g., 'left', 'right'):");
      startCli(ws);
    }
  });
});

function startCli(ws) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.on('line', (line) => {
    const cmd = line.trim().toLowerCase();
    if (cmd === 'left' || cmd === 'right') {
      ws.send(JSON.stringify({ command: cmd }));
    } else {
      console.log("Unknown command. Type 'left' or 'right'.");
    }
  });
}