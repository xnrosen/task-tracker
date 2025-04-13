const express = require('express');
const cors = require('cors');
const path = require('path'); // Required to correctly resolve paths

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '../client')));

let tasks = []; // Temporary storage

// API routes
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== Number(req.params.id));
    res.sendStatus(204);
});

// Handle requests for the root (serve index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
