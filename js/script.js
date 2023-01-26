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

const renderTasksList = () => {
	let htmlString = ''
	for (const task of tasks) {
		htmlString += `

        <li>
        <input type="button" value="&#10004;">
        <span class="task__text">${task.content}</span>
        <input type="button" value="&#128465;">
        </li>
        `
	}
	document.querySelector('.js-tasks').innerHTML = htmlString
}

const init = () => {
    renderTasksList()
}

init()