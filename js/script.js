// Array below include sample tasks
const tasks = [
	{
		content: 'Pierwsze zadanie, wciaz niewykonane',
		done: false,
	},
	{
		content: 'Drugie zadanie, już wykonane',
		done: true,
	},
]
// End of sample tasks array
const taskContent = document.querySelector('.taskForm__taskContent')

const addNewTask = newTaskContent => {
	tasks.push({
		content: newTaskContent,
	})
	renderTasksList()
}

const onFormSubmit = () => {
    const newTaskContent = taskContent.value.trim()
        if (newTaskContent === '') {
            return
        }
        addNewTask(newTaskContent)
    }

const renderTasksList = () => {
	let htmlString = ''
	for (const task of tasks) {
		htmlString += `

        <li class="taskList${task.done ? ' taskList--done' : ''}">
        <input type="button" class="taskList__button taskList__button--add js-addTask" value="&#10004;">
        <span class="taskList__taskText">${task.content}</span>
        <input type="button" class="taskList__button taskList__button--remove js-removeTask" value="&#128465;">
        </li>
        `
	}
	document.querySelector('.js-tasks').innerHTML = htmlString
}

const init = () => {
    renderTasksList()

    const form = document.querySelector('.js-form')
	form.addEventListener('submit', e => {
		e.preventDefault()
		onFormSubmit()
		taskContent.value = ''
		taskContent.focus()
	})
}

init()