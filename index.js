const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const addButton = document.querySelector("#addButton");

const todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos)
function todosInit(){
    todoList.innerHTML = "";
    if(todos.length === 0) {
        todoList.innerHTML = `
        <div class="empty-state">
        <i class="fas fa-check-circle"></i>
        <p>No tasks found. Add your first task!</p>
    </div>`;
    return;
    }
    todos.forEach((todo, index) => {
        const li = createTodoElement(todo, index);
        todoList.appendChild(li);
    });
}

function addToDo() {
    const text = todoInput.value.trim();
    if (text === "") return;

    const timestamp = new Date().toLocaleString(); // Get the current date and time
    const todoItem = { text, timestamp }; // Create an object for the to-do item

    todos.push(todoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";

    if (todoList.querySelector(".empty-state")) {
        todoList.innerHTML = "";
    }

    const li = createTodoElement(todoItem, todos.length - 1);
    todoList.appendChild(li);
}

function createTodoElement(todo, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
        <span>${todo.text}</span>
        <span class="timestamp">${todo.timestamp}</span>
        <button class="delete-button" onclick="deleteTodo(${index})">
            <i style="color: red" class="fas fa-trash red"></i>
        </button>
    `;

    return li;
}   

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    todosInit();
}

addButton.addEventListener("click", addToDo);
todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addToDo();
    }
});
todosInit();