let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')


function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    const isChecked = todos[index].checked ? 'checked' : '';
    element.classList.add('todo');
    element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
              <div class="todo__comment" ondblclick="editTodo(${index})">${todos[index]}</div>
              <input type="checkbox" class="checkbox" id="checkbox" onclick="toggleCheckbox()">
              <button class="todo__delete" onclick="deleteTodo(${index})">
                <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
              </button>`;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}


/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }
  
  todos.push(data)
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function editTodo(index) {
    const todo = todos[index];
    const commentElement = todosContainer.children[index].querySelector('.todo__comment');
    
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = todo.comment;
    
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = 'Save';
    
    const cancelElement = document.createElement('button');
    cancelElement.innerHTML = 'Cancel';
    
    function saveTodo() {
      const newComment = inputElement.value.trim();
      if (newComment !== '') {
        todo.comment = newComment;
        commentElement.innerHTML = newComment;
        saveData();
      }
    };
    
    function cancelEdit() {
      commentElement.innerHTML = todo.comment;
    };
    
    buttonElement.onclick = saveTodo;
    cancelElement.onclick = cancelEdit;
    
    commentElement.innerHTML = '';
    commentElement.appendChild(inputElement);
    commentElement.appendChild(buttonElement);
    commentElement.appendChild(cancelElement);
    
    inputElement.focus();
    inputElement.setSelectionRange(0, inputElement.value.length);
  }

/* work with checkboxes */
function toggleCheckbox() {
    const checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
      todo.checked = false;
    } else {
      todo.checked = true;
    }
    saveData();
    rerender();
}

/* init */
(() => {
  loadData();
  rerender();
})();