class Task {
    constructor(id, taskText, isCompleted) { // Встановлюємо дефолтне значення для creationDate
        this.id = id;
        this.taskText = taskText;
        this.isCompleted = isCompleted;
        this.creationDate = new Date();
    }

    render() {
        const container = document.querySelector(".toDoListDiv");
        const element = document.createElement("div");
        element.classList.add("taskElement" + this.id);
        element.innerHTML = `
            <div class="taskText${this.id}">${this.taskText}</div>
            <div class="creationDate${this.id}">Created: ${this.creationDate.toLocaleString()}</div> <!-- Використовуємо toLocaleString() для форматування дати -->
            <div class="taskHandle">
                <button class="deleteTaskButton${this.id}">Delete Task</button>
                <button class="completeButton${this.id}">${this.isCompleted ? 'Completed' : 'Complete Task'}</button>
            </div>
        `;
        container.appendChild(element);
        Task.addToTaskArray(this);

        const deleteButton = element.querySelector(`.deleteTaskButton${this.id}`);
        deleteButton.addEventListener('click', () => {
            deleteTask(this.id);
        });

        const completeButton = element.querySelector(`.completeButton${this.id}`);
        completeButton.addEventListener('click', () => {
            this.toggleCompletion();
            completeTask(this.id);
        });

        const taskTextElement = element.querySelector(`.taskText${this.id}`);
        taskTextElement.addEventListener('click', () => {
            taskTextElement_Click(this.id, `taskText${this.id}`);
        });
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
        const completeButton = document.querySelector(`.completeButton${this.id}`);
        completeButton.textContent = this.isCompleted ? 'Completed' : 'Complete Task';
    }

    static addToTaskArray(task) {
        if (!Task.taskArray) {
            Task.taskArray = [];
        }
        Task.taskArray.push(task);
    }

    static sortTasksByTaskText() {
        Task.taskArray.sort(compareTaskText);
    }

    static removeTasksFromPage() {
        const container = document.querySelector(".toDoListDiv");
        container.innerHTML = ""; // Clearing the container
    }

    static renderSortedTasks() {
        Task.sortTasksByTaskText();
        Task.taskArray.forEach(task => {
            const existingTaskElement = document.querySelector(`.taskElement${task.id}`);
            if (existingTaskElement) {
                existingTaskElement.remove(); // Видаляємо елемент, якщо він вже існує
            }
            task.render(); // Заново рендеримо відсортовані елементи
            completeTask(task.id);
        });
    }

    static renderTasks() {
        this.removeTasksFromPage();
        Task.taskArray.forEach(task => {
            task.render();
            completeTask(task.id);
        });
    }
}

// MAIN
let taskMainId = 0;
let elementClassName = "none";
let editMode = "none";
let elementToEditId = 0;

let savedTaskArray;
loadContentFromLocaleStorage();

document.querySelector('.createTaskButton').addEventListener('click', () => {
    taskMainId++;

    let newTaskText;
    let inputElement = document.querySelector('.newTaskField');
    newTaskText = inputElement.value.trim();
    inputElement.value = "";

    if (newTaskText === ""){
        inputElement.style.borderColor = "red";
        return;
    }

    const task = new Task(taskMainId, newTaskText,false);
    task.render();

    saveContentToLocalStorage();
});

function deleteTask(elementId) {
    const taskIndex = Task.taskArray.findIndex(product => product.id === elementId);
    if (taskIndex !== -1) {
        // Видаляємо продукт з DOM
        const taskElement = document.querySelector(`.taskElement${elementId}`);
        if (taskElement) {
            taskElement.remove();
        } else {
            console.log(`Product with ID ${elementId} not found in DOM.`);
        }
        // Видаляємо продукт з масиву
        Task.taskArray.splice(taskIndex, 1);
        console.log(`Product with ID ${elementId} has been deleted.`);
    } else {
        console.log(`Product with ID ${elementId} not found in productArray.`);
    }

    console.log(elementId);
}

document.querySelector('.popupSaveChangesButton').addEventListener('click', () => {
    // UPDATE DOM
    let editValue;
    let elementToUpdate = document.querySelector(`.${elementClassName}`);
    let inputElement = document.querySelector('.popupInputField');
    editValue = inputElement.value;
    elementToUpdate.innerText = editValue;
    hidePopup();

    // UPDATE ARRAY
    let foundTaskIndex = Task.taskArray.findIndex(product => product.id === elementToEditId);

    if (foundTaskIndex !== -1) {
        if (editMode === "taskText") {
            Task.taskArray[foundTaskIndex].taskText = editValue;
        } else {
            console.log(`Product with ID ${elementToEditId} not found in the product array.`);
        }
    }
});

function completeTask(taskId) {
    const task = Task.taskArray.find(task => task.id === taskId); // Знаходимо екземпляр Task по його id
    if (task) {
        const taskElement = document.querySelector(`.taskElement${taskId}`);
        const completeTaskButton = document.querySelector(`.completeButton${taskId}`);
        const deleteTaskButton = document.querySelector(`.deleteTaskButton${taskId}`);
        if (task.isCompleted) {
            taskElement.style.borderColor = "slateGrey";
            taskElement.style.backgroundColor = "";
            completeTaskButton.style.backgroundColor = "slateGrey";
            deleteTaskButton.style.backgroundColor = "slateGrey";
            taskElement.style.color = "slateGrey";
        } else {
            taskElement.style.borderColor = "dodgerblue";
            taskElement.style.backgroundColor = "";
            completeTaskButton.style.backgroundColor = "#3498db";
            deleteTaskButton.style.backgroundColor = "#3498db";
            taskElement.style.color = "black";
        }
    } else {
        console.log(`Task with ID ${taskId} not found.`);
    }

    saveContentToLocalStorage();
}


function showPopup(){
    let popup = document.querySelector(".popup");
    popup.style.opacity = "1";
    popup.style.visibility = "visible";
}

function hidePopup(){
    let popup = document.querySelector(".popup");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
}

document.querySelector('.newTaskField').addEventListener('click', function(event) {
    let inputElement = document.querySelector('.newTaskField');
    inputElement.style.borderColor = "#ccc";
});

function taskTextElement_Click(elementId, newElementClassName){
    elementToEditId = elementId;
    editMode = "taskText";
    elementClassName = newElementClassName;
    showPopup();
}

document.querySelector('.popupClose').addEventListener('click', () => {
    hidePopup();
});

function loadContentFromLocaleStorage() {
    savedTaskArray = JSON.parse(localStorage.getItem('taskArray'));

    if (savedTaskArray) {
        Task.taskArray = savedTaskArray.map(taskData => {
            return new Task(taskData.id, taskData.taskText, taskData.isCompleted);
        });
        Task.renderTasks();
        taskMainId = Task.taskArray[Task.taskArray.length - 1].id;
    } else {
        Task.taskArray = [];
        Task.renderTasks();
    }

    console.log(savedTaskArray);
}

function saveContentToLocalStorage() {
    const existingTasks = JSON.parse(localStorage.getItem('taskArray')) || [];
    const taskIds = existingTasks.map(task => task.id);

    Task.taskArray.forEach(newTask => {
        const index = taskIds.indexOf(newTask.id);
        if (index !== -1) {
            // Update existing task
            existingTasks[index] = newTask;
        } else {
            // Add new task
            existingTasks.push(newTask);
        }
    });

    localStorage.setItem('taskArray', JSON.stringify(existingTasks));
}

function compareTaskText(task1, task2) {
    const text1 = task1.taskText.toLowerCase();
    const text2 = task2.taskText.toLowerCase();

    if (text1 < text2) {
        return -1;
    }
    if (text1 > text2) {
        return 1;
    }
    return 0;
}

document.querySelector('.deleteAllTasksButton').addEventListener('click', () => {
    localStorage.removeItem('taskArray');
    loadContentFromLocaleStorage();
    alert("All tasks deleted");
});

document.querySelector('.sortTasksButton').addEventListener('click', () => {
    Task.renderSortedTasks();
});