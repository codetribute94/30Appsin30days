const todo = {
    todoInput: document.getElementById("todo-input"),
    addButton: document.getElementById("add-todo-btn"),
    todoList: document.getElementById("todo-list"),

    buildTodo: function () {
        const todoValue = document.createTextNode(this.todoInput.value);
        const todoTrash = document.createElement('i');
        const todoListItem = document.createElement('li');
        const todoCheckbox = document.createElement('input');
        const todoButton = document.createElement('button');

        todoListItem.setAttribute('class', 'todo-item');
        todoCheckbox.setAttribute('type', 'checkbox');
        todoTrash.setAttribute('class', 'fas fa-trash');

        todoButton.appendChild(todoTrash);
        todoListItem.appendChild(todoCheckbox);
        todoListItem.appendChild(todoValue);
        todoListItem.appendChild(todoButton);
        this.todoList.appendChild(todoListItem);
    },

    addTodo: function () {
        const todoValue = this.todoInput.value;
        if (todoValue === '') {
            return 'Please enter a todo.'
        } else {
            this.buildTodo();
            this.todoInput.value = " ";
        }
    },

    enterKey: document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            todo.addTodo();

        }
    }),
};

todo.addButton.addEventListener('click', () => {
    todo.addTodo();
});






