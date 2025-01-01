const WebSocket = require('ws');
const db = require('./db');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
});

setInterval(() => {
  db.query('SELECT speed FROM speed_data ORDER BY timestamp DESC LIMIT 1', (err, results) => {
    if (err) throw err;
    if (results[0]) {
      const latestSpeed = results[0].speed;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ speed: latestSpeed }));
        }
      });
    }
  });
}, 1000);

// Function to simulate data insertion

setInterval(() => {
  const randomSpeed = Math.floor(Math.random() * 100); // Generate random speed
  db.query('INSERT INTO speed_data (speed) VALUES (?)', [randomSpeed], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log('Inserted speed:', randomSpeed);
    }
  });
}, 2000);

module.exports = wss;