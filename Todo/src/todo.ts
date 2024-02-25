interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

class TodoList {
  private todos: Todo[] = [];

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      text,
      isDone: false,
    };
    this.todos.push(newTodo);
    this.renderTodos();
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.renderTodos();
  }

  toggleTodoStatus(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    this.renderTodos();
  }

  clearAllTodos(): void {
    this.todos = [];
    this.renderTodos();
  }

  renderTodos(): void {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;

    todoList.innerHTML = '';

    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.innerHTML = `
        
        <button onclick="toggleTodoStatus(${todo.id})"><i class="fa-solid fa-eye-slash"></i></button>
        <span>${todo.text}</span>
        <button class="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="removeTodo(${todo.id})"><i class="fa-solid fa-circle-xmark"></i></button>
      `;
      
      if (todo.isDone) {
        li.classList.add('done');
      }
      todoList.appendChild(li);
    });
  }
  
}

const todoList = new TodoList();

function addTodo() {
  const todoInput = document.getElementById('todoInput') as HTMLInputElement;
  const text = todoInput.value.trim();
  if (text !== '') {
    todoList.addTodo(text);
    todoInput.value = '';
  }
}

function removeTodo(id: number) {
  todoList.removeTodo(id);
}

function toggleTodoStatus(id: number) {
  todoList.toggleTodoStatus(id);
}

function clearAllTodos() {
  todoList.clearAllTodos();
}


  
document.getElementById("addTodoBtn")?.addEventListener('click',addTodo)
document.getElementById("clearAllTodos")?.addEventListener('click',clearAllTodos)
