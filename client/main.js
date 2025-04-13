const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

async function loadTasks() {
    const res = await fetch('http://localhost:3000/tasks');
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.name;
        li.onclick = () => deleteTask(t.id);
        taskList.appendChild(li);
    });
}

form.onsubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value })
    });
    input.value = '';
    loadTasks();
};

async function deleteTask(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();
