const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // Temporary storage

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

app.listen(3000, () => console.log('Server running on port 3000'));
