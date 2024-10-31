const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve static files from the "sounds" directory
app.use('/sounds', express.static(path.join(__dirname, 'sounds')));

// Route to serve the "ScaryLaugh" sound file
app.get('/sound/jackolantern', (req, res) => {
    const soundPath = path.join(__dirname, 'sounds', 'ScaryLaugh.mp3');
    res.sendFile(soundPath);
});

// Route to serve the "BackgroundEerieMusic" sound file
app.get('/sound/BackgroundEerieMusic.mp3', (req, res) => {
    const soundPath = path.join(__dirname, 'sounds', 'BackgroundEerieMusic.mp3');
    res.sendFile(soundPath);
});

// Socket.io for real-time interactions
io.on('connection', (socket) => {
    console.log('A visitor has connected!');
    
    // Example: Emit a spooky event to the client every 10 seconds
    setInterval(() => {
        socket.emit('spookyEvent', { type: 'random' });
    }, 10000);
});

// Start the server
server.listen(PORT, () => {
    console.log(`Spooky Sound Show running at http://localhost:${PORT}`);
});
