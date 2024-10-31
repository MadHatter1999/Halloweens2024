const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to serve the sound file
app.get('/sound/jackolantern', (req, res) => {
    const soundPath = path.join(__dirname, 'sounds', 'ScaryLaugh.mp3');
    res.sendFile(soundPath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Spooky Sound Show running at http://localhost:${PORT}`);
});
