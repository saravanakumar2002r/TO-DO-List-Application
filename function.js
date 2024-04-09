  document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const filterAll = document.getElementById("filter-all");
    const filterCompleted = document.getElementById("filter-completed");
    const filterPending = document.getElementById("filter-pending");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
          tasks[index].completed = this.checked;
          saveTasks();
        });
        const label = document.createElement("label");
        label.textContent = task.name;
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
          const newName = prompt("Enter new task name:", task.name);
          if (newName !== null) {
            tasks[index].name = newName.trim();
            saveTasks();
            renderTasks();  
          }
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
          if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
          }
        });
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    }
    
    function addTask(name) {
      tasks.push({ name: name, completed: false });
      saveTasks();
      renderTasks();
    }
    
    taskForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const taskName = taskInput.value.trim();
      if (taskName !== "") {
        addTask(taskName);
        taskInput.value = "";
      } else {
        alert("Please enter a task name.");
      }
    });
    
    filterAll.addEventListener("click", function() {
      renderTasks();
    });
    
    filterCompleted.addEventListener("click", function() {
      const completedTasks = tasks.filter(task => task.completed);
      taskList.innerHTML = "";
      completedTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.name;
        taskList.appendChild(taskItem);
      });
    });
    
    filterPending.addEventListener("click", function() {
      const pendingTasks = tasks.filter(task => !task.completed);
      taskList.innerHTML = "";
      pendingTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.name;
        taskList.appendChild(taskItem);
      });
    });
    
    renderTasks();
  });