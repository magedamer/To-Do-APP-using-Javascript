
let form      = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea  = document.getElementById("textarea");
let msg       = document.getElementById("msg");
let tasks     = document.getElementById("tasks");
let add       = document.getElementById("add");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
})
// validation of data
function formValidation()
{
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        // close the pop-up form after click add button
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
}
// collect of data
let data = [];

let acceptData = () => {

    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

localStorage.setItem("data", JSON.stringify(data));

console.log(data);
createTasks();
};

//create new tasks
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {

        return (tasks.innerHTML += `
        <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
        
                <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `);
    });

    resetForm();
};
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

// delete tasks

let deleteTask = (e) => {
    // delete the HTML element from the screen
    e.parentElement.parentElement.remove();
    //  remove the targetted Task from the data array
    data.splice(e.parentElement.parentElement.id, 1);
    // update the local storage with the new data
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

// edit tasks
let editTask = (e) => {
    // targetting the task that we selected to edit
    let selectedTask = e.parentElement.parentElement;
    // targetting the values [task, date, description] of the task that we selected to edit
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    // running the delete function to remove the selected data
    deleteTask(e);
};

/*
If you refresh the page, you'll note that all of your data is gone.
In order to solve that issue, we run a IIFE (Immediately invoked function expression)
to retrieve the data from local storage 👇
*/
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();