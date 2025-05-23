export function updateCounters(taskList) {
    const total = taskList.length
    const completed = taskList.filter(task => task.completed).length
    const pending = total - completed

    document.getElementById('total-count').textContent = `Total: ${total}`
    document.getElementById('completed-count').textContent = `Completadas: ${completed}`
    document.getElementById('pending-count').textContent = `Pendientes: ${pending}`
}
