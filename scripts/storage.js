export function saveTask(taskList){
    localStorage.setItem('tasks', JSON.stringify(taskList))
}

export function loadTask(){
    return JSON.parse(localStorage.getItem('tasks')) || []
}