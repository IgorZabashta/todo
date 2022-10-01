const form= document.querySelector('#form');
const taskInput =document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');

const emptyList= document.querySelector('#emptyList');

let tasks=[];

if(localStorage.getItem('tasks')){
    tasks= JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTasks(task));
}

checkEmptyList();

form.addEventListener('submit', addTask);

function addTask(event){
    event.preventDefault();

    const textValue= taskInput.value;

const newTask={
    id:Date.now(),
    text: textValue,
    done: false
};
tasks.push(newTask);

renderTasks(newTask);

tasksList.value="";
taskInput.focus();

checkEmptyList();

saveToLocalStorage();
// if(emptyList.children.length>1){
//     emptyList.classList.add('none');
// }
}

tasksList.addEventListener('click',deletTask);

function deletTask(event){
    if (event.target.dataset.action !== 'delete') return;

const parenNode= event.target.closest('.list-group-item');

const id= Number(parenNode.id);

const index= tasks.findIndex((task) => task.id === id);

tasks.splice(index,1); 
parenNode.remove();

checkEmptyList();

saveToLocalStorage();
// if(tasksList.children.length === 1){
//         emptyList.classList.remove('none');
// }
    
}
tasksList.addEventListener('click', doneTask);

function doneTask(event){

    if (event.target.dataset.action === "done"){
        const parentNode= event.target.closest('.list-group-item');

      const taskTitle= parentNode.querySelector('.task-title');

        const id= Number(parentNode.id);

      const task= tasks.find(function(task){
            if(task.id === id){
                return true
            }
        })

        task.done=!task.done;

      taskTitle.classList.toggle('task-title--done');
    }

    saveToLocalStorage();
}

function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListHTML= `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;

    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML)
    }
    if(tasks.length > 0){

        const emptyListEl=document.querySelector('#emptyList');

        emptyListEl ? emptyListEl.remove() : null;
    }
    
}
function saveToLocalStorage(){
 localStorage.setItem('tasks', JSON.stringify(tasks))   
}

function renderTasks(task){
    const cssClass= task.done ? 'task-title task-title--done' : 'task-title';

const taskHTML=`<li id= " ${task.id}" class="list-group-item d-flex 
justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>`

tasksList.insertAdjacentHTML('beforeend',taskHTML);
}