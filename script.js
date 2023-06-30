
document.addEventListener("DOMContentLoaded", function() {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const notification = document.getElementById("notification");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = tasks
      .map((task, index) => `
        <div class="task">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      `)
      .join("");
      if (tasks.length > 0) {
        taskList.classList.add("has-tasks");
        tasksHeading.style.display = "block";
      } else {
        taskList.classList.remove("has-tasks");
        tasksHeading.style.display = "none";
      }
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
  }

  function hideNotification() {
    notification.style.display = "none";
  }

  taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    tasks.push({ title, description });
    saveTasksToLocalStorage();
    renderTasks();

    // Clear the form fields
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    showNotification("Task added successfully!");

    // Hide the notification after 3 seconds
    setTimeout(hideNotification, 3000);
  });

  taskList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    }
  });

  // Initial rendering of tasks on page load
  renderTasks();
});
