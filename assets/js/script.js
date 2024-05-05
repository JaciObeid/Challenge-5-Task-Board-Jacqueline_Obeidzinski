const taskName = $("#taskTitle");
const taskDate = $("#taskDue");
const taskDesc = $("#taskDesc");
const taskButton = $(".create-task");

// Retrieves tasks and nextId from localStorage. If the taskList is empty it will be equal to an empty array
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskList)
let nextId = localStorage.getItem("nextId");

// Todo: create a function to generate a unique task id. Randomly generates a 4 diget string with letters and numbers. 
function generateTaskId() {
    let randomId =  Math.random().toString(16).slice(2,6);
    localStorage.setItem("nextId", randomId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const dueDate = dayjs(task.dueDate);
  // Calculates the difference in days between today and the task date
  const daysDifference = dueDate.diff(dayjs(), "day");

  // Changes the background color for the task cards
  let bgColor = "";
    if (daysDifference < 0) {
      bgColor = "bg-danger";
    } else if (daysDifference <= 2) {
      bgColor = "bg-warning";
    } else {
      bgColor = "bg-success";
   }
  // If task status id done it will no longer have colored background 
    if (task.status === "done") {
      bgColor += " bg-white";
    }

  // creates the task card using html making sure all the classes are correct
    const taskCard = `
      <div class="draggable task-card card mb-3 ${bgColor}" data-task-id="${task.id}">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <p class="card-text">Due Date: ${task.dueDate}</p>
          <button type="button" class="btn btn-danger delete-task">Delete</button>
        </div>
      </div>
    `;
return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
//Before the cards are rendered make sure that all the columns are empty.
  $("#todo-cards, #in-progress-cards, #done-cards").empty();
  // Puts all the task cards in the correct column 
  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    if (task.status === "todo") {
      $("#todo-cards").append(taskCard);
    } else if (task.status === "in-progress") {
      $("#in-progress-cards").append(taskCard);
    } else if (task.status === "done") {
      $("#done-cards").append(taskCard);
    }
  });

  // If the delete button on a task is clicked, deltes that task
  $(".delete-task").on("click", handleDeleteTask);

  // Allows all the cards with the draggable class to be draggable. 
  $(".draggable").draggable({
    revert: "invalid",
    stack: ".draggable",
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  // Creates a task with given info from the form modal, sets the status as todo as defalt and gets the id from local storage
  const task = {
    title: taskName.val(),
    dueDate: taskDate.val(),
    description: taskDesc.val(),
    status: "todo",
    id: localStorage.getItem("nextId"),
  };

  // Adds the new task to the list and saves the new array to storage
  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  //generates a new randomId in case other task is made right after this one
  generateTaskId();
  // clears out the modal and hides it again so it is not perminetly on the screen 
  $("#formModal").modal("hide");
  taskName.val("");
  taskDesc.val("");
  taskDate.val("");
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  event.stopPropagation();
  // Gets a the id of selected task and filters through the tasks by saying keep all task ids that are not the selected task
  const taskId = $(this).closest(".task-card").data("task-id");
    //console.log(taskId);
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.stopPropagation();
  event.preventDefault();
  // finds the column the task is in and the id of the task
  const laneId = $(this).attr("id");
  //console.log("LaneId is" + laneId);
  const cardId = ui.draggable.data("task-id");
  //console.log("CarId is" + cardId);

  //   sets the status for whiched column it was dropped in
  let newStatus = "";
  if (laneId === "todo") {
    newStatus = "todo";
  } else if (laneId === "in-progress") {
    newStatus = "in-progress";
  } else if (laneId === "done") {
    newStatus = "done";
  } else {
    newStatus = "todo";
  }
console.log(newStatus);
  // Filters thorugh the tasks list the deleting function but only changes the status of selected card
  const taskIndex = taskList.findIndex((task) => task.id === cardId);
 // console.log(taskIndex);
  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  // Makes the card change columns form the one that it was in to the one it was dropped to
  ui.draggable.detach().appendTo($(this));

  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  generateTaskId();
  renderTaskList();
 //when the add task button on the modal is clicked the inputs are made into the new task cards using the handleAddTask function
  taskButton.on("click", handleAddTask);

  

  $(".droppable").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});