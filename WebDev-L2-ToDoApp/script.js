// =====================================
// SELECT HTML ELEMENTS
// =====================================

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");


// =====================================
// LOAD TASKS FROM LOCAL STORAGE
// =====================================

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];


// =====================================
// SAVE TASKS
// =====================================

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


// =====================================
// FORMAT DATE AND TIME
// =====================================

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleString();
}


// =====================================
// ADD NEW TASK
// =====================================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: getCurrentTime()

    };


    tasks.push(newTask);


    saveTasks();


    taskInput.value = "";


    renderTasks();


    taskInput.focus();
}


// =====================================
// RENDER ALL TASKS
// =====================================

function renderTasks() {

    pendingTasks.innerHTML = "";

    completedTasks.innerHTML = "";


    const pending = tasks.filter(
        task => !task.completed
    );


    const completed = tasks.filter(
        task => task.completed
    );


    // -------------------------------
    // PENDING EMPTY MESSAGE
    // -------------------------------

    if (pending.length === 0) {

        pendingTasks.innerHTML = `
            <p class="empty-message">
                🎉 No pending tasks. You're all caught up!
            </p>
        `;
    }


    // -------------------------------
    // COMPLETED EMPTY MESSAGE
    // -------------------------------

    if (completed.length === 0) {

        completedTasks.innerHTML = `
            <p class="empty-message">
                Completed tasks will appear here.
            </p>
        `;
    }


    // -------------------------------
    // DISPLAY PENDING TASKS
    // -------------------------------

    pending.forEach(task => {

        pendingTasks.appendChild(
            createTaskElement(task)
        );

    });


    // -------------------------------
    // DISPLAY COMPLETED TASKS
    // -------------------------------

    completed.forEach(task => {

        completedTasks.appendChild(
            createTaskElement(task)
        );

    });


    // -------------------------------
    // UPDATE COUNTS
    // -------------------------------

    pendingCount.textContent =
        `${pending.length} pending`;


    completedCount.textContent =
        `${completed.length} completed`;
}


// =====================================
// CREATE TASK ELEMENT
// =====================================

function createTaskElement(task) {

    const taskDiv = document.createElement("div");

    taskDiv.className = "task";


    if (task.completed) {

        taskDiv.classList.add("completed");

    }


    // -------------------------------
    // COMPLETE BUTTON
    // -------------------------------

    const completeButton =
        document.createElement("button");

    completeButton.className = "complete-btn";

    completeButton.title = "Mark Complete";


    completeButton.addEventListener(
        "click",
        function () {

            toggleComplete(task.id);

        }
    );


    // -------------------------------
    // TASK CONTENT
    // -------------------------------

    const content =
        document.createElement("div");

    content.className = "task-content";


    const taskText =
        document.createElement("div");

    taskText.className = "task-text";

    taskText.textContent = task.text;


    const timestamp =
        document.createElement("span");

    timestamp.className = "timestamp";

    timestamp.textContent =
        `Added: ${task.createdAt}`;


    content.appendChild(taskText);

    content.appendChild(timestamp);


    // -------------------------------
    // ACTION BUTTONS
    // -------------------------------

    const actions =
        document.createElement("div");

    actions.className = "task-actions";


    // EDIT BUTTON

    const editButton =
        document.createElement("button");

    editButton.className = "edit-btn";

    editButton.textContent = "Edit";


    editButton.addEventListener(
        "click",
        function () {

            editTask(task.id);

        }
    );


    // DELETE BUTTON

    const deleteButton =
        document.createElement("button");

    deleteButton.className = "delete-btn";

    deleteButton.textContent = "Delete";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(task.id);

        }
    );


    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    // -------------------------------
    // BUILD TASK
    // -------------------------------

    taskDiv.appendChild(completeButton);

    taskDiv.appendChild(content);

    taskDiv.appendChild(actions);


    return taskDiv;
}


// =====================================
// MARK COMPLETE / UNCOMPLETE
// =====================================

function toggleComplete(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    renderTasks();
}


// =====================================
// EDIT TASK
// =====================================

function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );


    if (!task) {

        return;

    }


    const newText =
        prompt("Edit your task:", task.text);


    if (newText === null) {

        return;

    }


    const updatedText =
        newText.trim();


    if (updatedText === "") {

        alert("Task cannot be empty.");

        return;

    }


    task.text = updatedText;


    saveTasks();

    renderTasks();
}


// =====================================
// DELETE TASK
// =====================================

function deleteTask(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");


    if (!confirmDelete) {

        return;

    }


    tasks = tasks.filter(
        task => task.id !== id
    );


    saveTasks();

    renderTasks();
}


// =====================================
// ADD BUTTON EVENT
// =====================================

addTaskBtn.addEventListener(
    "click",
    addTask
);


// =====================================
// ENTER KEY EVENT
// =====================================

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// =====================================
// INITIAL DISPLAY
// =====================================

renderTasks();