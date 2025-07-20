const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progress");
const completedTasksSpan = document.getElementById("completedTasks"); // Updated ID
const totalTasksSpan = document.getElementById("totalTasks");     // Updated ID
const emptyState = document.getElementById("emptyState");

let tasks = [];

// --- Load tasks from Local Storage on page load ---
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
});

// --- Save tasks to Local Storage ---
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Add Task Functionality ---
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        // Provide more explicit feedback than just an alert
        taskInput.classList.add('error');
        taskInput.placeholder = "Task cannot be empty!";
        setTimeout(() => {
            taskInput.classList.remove('error');
            taskInput.placeholder = "Add a new task...";
        }, 1500); // Remove error state after 1.5 seconds
        return;
    }

    const task = {
        id: Date.now(), // Unique ID for each task (helpful for later updates)
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = ""; // Clear input
    renderTasks();
    saveTasks(); // Save after adding
});

// --- Enter key shortcut ---
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// --- Render Tasks to UI ---
function renderTasks() {
    taskList.innerHTML = ""; // Clear current list

    if (tasks.length === 0) {
        emptyState.style.display = 'block'; // Show empty state if no tasks
    } else {
        emptyState.style.display = 'none'; // Hide empty state
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id; // Store ID on the list item

        // Apply 'completed' class if task is completed
        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks(); // Re-render to update UI (line-through, color)
            saveTasks(); // Save after status change
        });

        // Task Text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // Button Group
        const btnGroup = document.createElement("div");
        btnGroup.className = "buttons";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.disabled = task.completed; // Disable edit if completed

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Edit functionality
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                renderTasks();
                saveTasks(); // Save after editing
            }
        });

        // Delete functionality
        deleteBtn.addEventListener("click", () => {
            // Find the index by ID to avoid issues if tasks array reorders
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                renderTasks();
                saveTasks(); // Save after deleting
            }
        });

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnGroup);
        taskList.appendChild(li);
    });

    updateProgress();
}

// --- Update Progress Bar ---
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    progressBar.style.width = percent + "%";
    completedTasksSpan.textContent = completed;
    totalTasksSpan.textContent = total;
}