document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input")
  const addTaskButton = document.getElementById("add-task-btn")
  const taskList = document.getElementById("task-list")
  const filterAllButton = document.getElementById("filter-all")
  const filterActiveButton = document.getElementById("filter-active")
  const filterCompletedButton = document.getElementById("filter-completed")
  const clearCompletedButton = document.getElementById("clear-completed")

  let tasks = []

  // Load tasks from localStorage
  const savedTasks = localStorage.getItem("tasks")
  if (savedTasks) {
    tasks = JSON.parse(savedTasks)
    renderTasks()
  }

  // Add new task
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim()
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false })
      renderTasks()
      saveTasks()
      taskInput.value = ""
    }
  })

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li")
      taskItem.textContent = task.text
      taskItem.classList.add("task-item")
      if (task.completed) {
        taskItem.classList.add("completed")
      }
      taskItem.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed
        renderTasks()
        saveTasks()
      })
      taskList.appendChild(taskItem)
    })
  }

  // Filter tasks
  filterAllButton.addEventListener("click", () => {
    renderTasks()
  })

  filterActiveButton.addEventListener("click", () => {
    const activeTasks = tasks.filter((task) => !task.completed)
    displayFilteredTasks(activeTasks)
  })

  filterCompletedButton.addEventListener("click", () => {
    const completedTasks = tasks.filter((task) => task.completed)
    displayFilteredTasks(completedTasks)
  })

  function displayFilteredTasks(filteredTasks) {
    taskList.innerHTML = ""
    filteredTasks.forEach((task) => {
      const taskItem = document.createElement("li")
      taskItem.textContent = task.text
      taskItem.classList.add("task-item")
      if (task.completed) {
        taskItem.classList.add("completed")
      }
      taskItem.addEventListener("click", () => {
        tasks[tasks.indexOf(task)].completed = !task.completed
        renderTasks()
        saveTasks()
      })
      taskList.appendChild(taskItem)
    })
  }

  function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
  }

  // Clear completed tasks
  clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed)
    renderTasks()
    saveTasks()
  })

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
})
