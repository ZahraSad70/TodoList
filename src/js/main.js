
//let todos = [];
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const addBtnTodo = document.querySelector(".add-todo");
const todoList = document.querySelector(".todolist");
const todoFrom = document.querySelector(".todo-form");

const editInput = document.querySelector(".edit-input");
const saveEdit = document.querySelector(".btn-edit");
//const selectOption = document.querySelector(".select");
const filterTodo = document.querySelectorAll(".filter-todo span");
const filterItem = document.querySelectorAll(".filter-item");
document.addEventListener("DOMContentLoaded", (e) => {
    const todos = getAllTodos();
    CreatedTodo(todos);
})

filterTodo.forEach((filter) => filter.addEventListener("click", (e) => {
    filterValue = e.target.dataset.filter;
    FilterTodos(filterValue);
}));
todoFrom.addEventListener("submit", AddNewTodod);
//selectOption.addEventListener("change", FilterTodos);

function AddNewTodod(e) {
    const todos = getAllTodos();
    e.preventDefault();
    if (!todoInput.value) return null;
    const newTodo = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        title: todoInput.value,
        isCompleted: false,
    }

    //todos.push(newTodo);
    saveTodo(newTodo);
    //console.log(filterTodo);
    //console.log(filterItem);
    FilterTodos(filterValue);
}

function CreatedTodo(todos) {
    console.log(todos)
    let result = "";
    if (todos.length == 0) {
        result +=
            `
        <ul class="todolist">
                <div class="empty">
                    <img src="/src/img/empty-clipboard.png" alt="">
                    <div class="empty-text">
                        <p>No task yet!</p>
                        <span>Add a new task to get started.</span>
                    </div>
                </div>
            </ul>
        `;
    } else {
        todos.forEach((item) => {
            result +=
                `<li class="todo-item">
            <div class="todo-item-desc">
                <div class="todo-text">
                    <p class="todo-title">
                    ${item.title}
                    </p>
                    <span class="todo-createdAt">
                        <i class="fa fa-calendar"></i>
                        ${new Date(item.createdAt).toLocaleDateString("EN")}
                    </span>
                </div>
                <div class="todo-item-action">
                    <button data-todo-id=${item.id} class="icon todo-Edit"><i class="fa fa-pencil"></i></button>
                    <button data-todo-id=${item.id} class="icon todo-check">
                    ${item.isCompleted ? ' <i class="fa fa-check-circle"></i>' : ' <i class="fa fa-square-o"></i>'}
                    </button>
                    <button data-todo-id=${item.id} class="icon todo-remove"><i class="fa fa-trash-o"></i></button>
                </div>
            </div>

        </li>`
        });
    }

    todoList.innerHTML = result;
    todoInput.value = "";

    const todoRemoveBtn = [...document.querySelectorAll(".todo-remove")];
    todoRemoveBtn.forEach((btn) => btn.addEventListener("click", RemoveTodo));

    const todoCheckBtn = [...document.querySelectorAll(".todo-check")];
    todoCheckBtn.forEach((btn) => btn.addEventListener("click", CheckTodo));

    const todoEditBtn = [...document.querySelectorAll(".todo-Edit")];
    todoEditBtn.forEach((btn) => btn.addEventListener("click", EditTodo));
}
let editId;
function EditTodo(e) {
    openModal(e);
    editId = Number(e.target.dataset.todoId);
    const todoId = Number(e.target.dataset.todoId);
    const todos = getAllTodos();
    const todo = todos.find((item) => item.id === todoId);
    //console.log(todo);
    editInput.value = todo.title;

}
saveEdit.addEventListener("click", UpdateTodo);



function FilterTodos(filter) {
    console.log(filter);
    const todos = getAllTodos();
    switch (filter) {
        case "all":
            ActiveFilter(filter);
            CreatedTodo(todos);
            break;
        case "completed":
            ActiveFilter(filter);
            CreatedTodo(todos.filter(todo => todo.isCompleted));
            break;
        case "uncompleted":
            ActiveFilter(filter);
            CreatedTodo(todos.filter(todo => !todo.isCompleted));
            break;
    }
}
function ActiveFilter(filteractive) {
    filterItem.forEach((item) => {
        item.classList.remove("active-all", "active-completed", "active-uncompleted")
    });
    console.log(filterItem[0])
    switch (filteractive) {
        case "all":
            filterItem[0].classList.add("active-all");
            break;
        case "completed":
            filterItem[1].classList.add("active-completed");
            break;
        case "uncompleted":
            filterItem[2].classList.add("active-uncompleted");
            break;

    }


}
function RemoveTodo(e) {
    let todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    todos = todos.filter((item) => item.id != todoId);
    saveAllTodos(todos);
    FilterTodos(filterValue);
}

function CheckTodo(e) {
    let todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    const todo = todos.find((t) => t.id === todoId);
    todo.isCompleted = !todo.isCompleted;
    saveAllTodos(todos);
    FilterTodos(filterValue);
}

function UpdateTodo(e) {
    const todos = getAllTodos();
    const todo = todos.find((item) => item.id === editId);
    todo.title = editInput.value;
    saveAllTodos(todos);
    FilterTodos(filterValue);
    backDrop.classList.add("hidden");
}

function getAllTodos() {
    const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return saveTodos;
}

function saveTodo(todo) {
    const localTodos = getAllTodos("todos");
    localTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(localTodos));
    return localTodos;
}

function saveAllTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}



