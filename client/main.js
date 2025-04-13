document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch tasks from the server and display them
    const loadTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks');
            const tasks = await response.json();

            // Clear the task list
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.name;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    // Add a new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const taskName = taskInput.value;
        if (!taskName) return;

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: taskName }),
            });
            const newTask = await response.json();

            // Clear input field
            taskInput.value = '';

            // Reload tasks after adding
            loadTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Load tasks when page is ready
    loadTasks();
});
