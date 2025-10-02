const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');

    li.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = { text: input.value, done: false };
  todos.push(newTodo);
  input.value = '';
  saveTodos();
  renderTodos();
});

renderTodos();
