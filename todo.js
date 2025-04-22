// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskList = document.getElementById('task-list');
  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = '';
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.onclick = (e) => {
    e.stopPropagation(); // Prevents toggling complete
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('task-list');
  savedTasks.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}
