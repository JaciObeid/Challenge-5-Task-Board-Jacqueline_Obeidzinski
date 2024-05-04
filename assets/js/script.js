// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let addTasks = document.getElementById("addTask")

//let currentDate=dayjs();
   // let taskDate=dayjs(task.date);

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let newId = "id=" + Math.random().toString(16).slice(2,6);
    return newId
    console.log(newId)

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const cardStart =document.getElementById("todo-cards")
    

    let yellowCard=taskDate.isAfter(currentDate.add(3,`day`));
        this.className
    let redCard=taskDate.isAfter(currentDate);


    let newCard = document.createElement("div");
    newDiv.className
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    function dragStart(){
        console.log("start"
        )
    }
    function dragEnd(){
        console.log("end")
    }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
$(this).parent('div').remove();

const taskID = $(this).attr('id');
taskList = taskList.filter(parseInt())
    localStorage.setItem('tasks', JJSON.stringify(tasklist));
renderTaskList()
}

//cardBody.on("click", ".delete-item-btn", handleDeleteTask);
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
function saveCard(){
    let taskCard = {
        "title":document.getElementById("taskTitle").value,
        "dueDate":document.getElementById("taskDue").value,
        "description":document.getElementById("taskDesc").value,
    };
    const arrayCards=JSON.parse(localStorage.getItem("arrayCards"))
    if(arrayCards !==null){
        arrayCards.push(taskCard);
        localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
    }
    else {let array =[]
        array.push(taskCard);
        localStorage.setItem("arrayCards",JSON.stringify(array));
    }
    console.log(taskCard);
};
addTasks.addEventListener("click", function(){
    saveCard();
});
//localStorage.setItem();