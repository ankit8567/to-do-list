const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Show current date
const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });


// Add Task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task container
    const li = document.createElement("li");
    li.className = "task";

    // Create check button
    const checkButton = document.createElement("button");
    checkButton.className = "check-btn";
    checkButton.textContent = "✓";

    checkButton.onclick = function () {
        completeTask(checkButton);
    };

    // Create task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "🗑";

    deleteButton.onclick = function () {
        deleteTask(deleteButton);
    };

    // Add elements to task
    li.appendChild(checkButton);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Add task to list
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    updateStats();
}


// Complete Task
function completeTask(button) {

    const task = button.parentElement;

    task.classList.toggle("completed");

    updateStats();
}


// Delete Task
function deleteTask(button) {

    const task = button.parentElement;

    task.remove();

    updateStats();
}


// Clear Completed Tasks
function clearCompleted() {

    const completedTasks =
        document.querySelectorAll(".task.completed");

    completedTasks.forEach(function (task) {
        task.remove();
    });

    updateStats();
}


// Update Statistics
function updateStats() {

    const tasks =
        document.querySelectorAll(".task");

    const completedTasks =
        document.querySelectorAll(".task.completed");

    const total = tasks.length;
    const completed = completedTasks.length;
    const remaining = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("remainingTasks").textContent =
        remaining;


    // Calculate progress
    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "%";


    // Show/hide empty message
    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// Add task using Enter key
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Run when page loads
updateStats();