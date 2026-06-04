const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const assigneeInput = document.getElementById('assignee-input');
const filterInput = document.getElementById('filter-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  const filterValue = filterInput.value.trim().toLowerCase();
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    if (filterValue && (!todo.assignee || !todo.assignee.toLowerCase().includes(filterValue))) {
      return;
    }

    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    li.appendChild(textSpan);

    if (todo.assignee) {
      const assigneeSpan = document.createElement('span');
      assigneeSpan.className = 'todo-assignee';
      assigneeSpan.textContent = '👤 ' + todo.assignee;
      li.appendChild(assigneeSpan);
    }

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
  const newTodo = {
    text: input.value,
    done: false,
    assignee: assigneeInput.value.trim() || null
  };
  todos.push(newTodo);
  input.value = '';
  assigneeInput.value = '';
  saveTodos();
  renderTodos();
});

filterInput.addEventListener('input', renderTodos);

renderTodos();
