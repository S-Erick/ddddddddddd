import { saveTask } from "./storage.js"

export function addTask(name, taskList){
    const taskId = crypto.randomUUID()
    taskList.push({name: name, id: taskId, completed: false})
    const lastTask = taskList[taskList.length - 1]
    saveTask(taskList)
    document.querySelector('input[type="text"]').value = ''
    
    const $taskContainer = document.querySelector('#task-container')
    const component = document.createElement('task-item')
    component.setAttribute('name', name)
    component.setAttribute('id', taskId)
    component.setAttribute('completed', lastTask.completed)
    component.style.opacity = '0'
    component.style.transform = 'scale(0.95)'
    requestAnimationFrame(() => {
        component.style.opacity = '1'
        component.style.transform = 'scale(1)'
    })
    $taskContainer.appendChild(component)
}

export class Task extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }
    
    connectedCallback(){

        const completed = this.getAttribute('completed') === 'true'
        this.shadowRoot.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span class="task-title">${this.getAttribute('name')}</span>
        <button class="delete-button">🗑</button>`

        const style = document.createElement('style')
        style.textContent = `
        :host{
           padding: .4rem .8rem;
           width: 100%;
           height: fit-content;
           display: grid;
           grid-template-columns: auto 1fr auto;
           grid-template-rows: 1fr;
           grid-template-areas:
           'chk title btn';
           justify-content: center;
           align-items: center;
           gap: var(--gap-2);
           border-bottom: var(--border);
           opacity: 1;
           transform: scale(1);
           transition: opacity .3s ease, transform .3s ease;
        } 
        .checkbox{
           appearance: none;
           width: 1.3rem;
           height: 1.3rem;
           border: var(--border);
           border-radius: var(--border-radius-3);
           cursor: pointer;
        }
        .checkbox:checked {
           background-color: var(--main-color);
           border: none;
        }
        .checkbox:checked::after {
           content: '✔';
           width: 100%;
           height: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           color: var(--color-2);
           font-size: var(--font-size);
         }
        .task-title{
           font-size: var(--font-size);
           color: var(--text-color);
           grid-area: title;
        }
        .delete-button{
           padding: 0 .3rem;
           font-size: 1.5rem;
           text-align: center;
           border: none;
           color: var(--text-color);
           background-color: var(--color-2);
           grid-area: btn;
        }`

        this.shadowRoot.querySelector('.checkbox').addEventListener('change', (e) => {
            this.dispatchEvent(new CustomEvent('toggle-completed', {
                detail: {id: this.getAttribute('id'), completed: e.target.checked},
                bubbles: true
            }))
        })

        this.shadowRoot.querySelector('.delete-button').addEventListener('click', () => {
            this.style.opacity = '0'
            this.style.transform = 'scale(0.95)'
            this.addEventListener('transitionend', () => {
                this.dispatchEvent(new CustomEvent('delete-task', {
                    detail: {id: this.getAttribute('id') },
                    bubbles: true
                }))
                this.remove()
            }, {once: true})
        })
        this.shadowRoot.append(style)
    }
}
customElements.define('task-item', Task)