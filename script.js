const headerInput = document.querySelector('.header-input');
const todoControl = document.querySelector('.todo-control');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const toDoData = JSON.parse(localStorage.getItem('toDoItems')) || [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(item => {
        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.innerHTML = `
            <span class="text-todo">${item.text}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', () => {
            const indexItem = toDoData.findIndex(li => li === item);
            toDoData.splice(indexItem, 1);
            render();
        });
    });
    localStorage['toDoItems'] = JSON.stringify(toDoData);
};

todoControl.addEventListener('submit', event => {
    event.preventDefault();

    if (headerInput.value.length > 0) {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        };

        toDoData.push(newToDo);
        headerInput.value = '';

        render();
    }
});

render();
