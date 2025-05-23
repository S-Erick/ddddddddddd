import { saveTask, loadTask } from "./storage.js"
import { addTask } from "./task.js"
import { render } from "./render.js"
import { updateCounters } from "./counters.js"

const taskList = loadTask()
render(taskList)

document.body.addEventListener('click', (event) => {
    const $inputName = document.querySelector('input[type="text"]').value
    const target = event.target
    
    if($inputName !== ''){
        if(target.matches('#add-button')){
            console.log('siiiiiiiiii')
            addTask($inputName, taskList)
            updateCounters(taskList)
        }
    }
})

document.body.addEventListener('delete-task', (event) => {
    const id = event.detail.id
    const index = taskList.findIndex(task => task.id === id)
    taskList.splice(index, 1)
    saveTask(taskList)
    render(taskList)
    updateCounters(taskList)
})

document.body.addEventListener('toggle-completed', (event) => {
    const id = event.detail.id
    const completed = event.detail.completed
    const index = taskList.findIndex(task => task.id === id)
    if(index !== -1){
        taskList[index].completed = completed
        saveTask(taskList)
        const component = document.querySelector(`task-item[id="${id}"]`)
        if (component) {
            component.setAttribute('completed', completed)
            updateCounters(taskList)
        }
    }
})

document.querySelector('#filters').addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const filter = event.target.dataset.filter
        applyFilter(filter)
        activeButton(event.target)
    }
})

function activeButton (activeButtonElement){
    const buttons = document.querySelectorAll('#filters button')
    buttons.forEach(button => button.classList.remove('active'))
    activeButtonElement.classList.add('active')
}

function applyFilter(filter){
    let filteredTask = []

    if(filter === 'all'){
        filteredTask = taskList
    }else if (filter === 'completed'){
        filteredTask = taskList.filter(task => task.completed)
    }else if (filter === 'pending'){
        filteredTask = taskList.filter(task => !task.completed)
    }
    render(filteredTask)
}