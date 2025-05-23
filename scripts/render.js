export function render(taskList){
    const $taskContainer = document.querySelector('#task-container')
    $taskContainer.innerHTML = ''
    taskList.forEach(task => {
        const component = document.createElement('task-item')
        component.setAttribute('name', task.name)
        component.setAttribute('id', task.id)
        component.setAttribute('completed', task.completed)
        $taskContainer.appendChild(component)
    })
}
