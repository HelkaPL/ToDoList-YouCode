{
    // Array below include sample tasks
    let tasks = [
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
    let hideDoneTasks = false; // in default show all tasks
   
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    }

    const removeTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render()
    }

    const toggleTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];
        render()
    }

    const markAllTaskAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render()
    };
    
    const toggleShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render()
    }

    const onFormSubmit = () => {
        const newTaskContent = taskContent.value.trim()
        if (newTaskContent === '') {
            return
        }
        addNewTask(newTaskContent)
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll('.js-removeTask')
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleTaskButtons = document.querySelectorAll('.js-toggleTask')
        toggleTaskButtons.forEach((toggleTaskButton, index) => {
            toggleTaskButton.addEventListener("click", () => {
                toggleTask(index);
            })
        })
    }

    const renderExternals = (tasks) => {
        let externalString = '';
        if(tasks.length > 0) {
            externalString += `    
        <button class="externals__button js-hideDoneTask">${hideDoneTasks ? 'Pokaż' : 'Ukryj'} zakończone</button>
        <button class="js-markAllDone externals__button${tasks.every(({ done }) => done) ? '--disabled " disabled' : ' "'}>Ukończ wszystkie</button>
        `;
        }
        document.querySelector(".js-externals").innerHTML = externalString
    }

    const bindExternals = () => {
        const markAllDoneButton = document.querySelector('.js-markAllDone')
        if(markAllDoneButton)
        markAllDoneButton.addEventListener("click", markAllTaskAsDone)
        
        const toggleHideDoneTask = document.querySelector('.js-hideDoneTask')
        if(toggleHideDoneTask)
        toggleHideDoneTask.addEventListener("click", toggleShowDoneTasks)
    }

    const render = () => {
        let htmlString = ''

        for (const task of tasks) {
            htmlString += `
        <li class="taskList
            ${task.done ? ' taskList--done' : ''}
            ${task.done && hideDoneTasks ? ' taskList--hidden' : ''}
            "
        >
        <input
          type="button" 
          class="taskList__button taskList__button--add js-toggleTask"
          value="&#10004;"
        >
        <span class="taskList__taskText">${task.content}</span>
        <input
          type="button"
          class="taskList__button taskList__button--remove js-removeTask"
          value="&#128465;"
        >
        </li>
        `
        }
        document.querySelector('.js-tasks').innerHTML = htmlString
        bindEvents();
        renderExternals();
        bindExternals();
    }

    const init = () => {
        render();
        const form = document.querySelector('.js-form')
        form.addEventListener('submit', e => {
            e.preventDefault();
            onFormSubmit();
            taskContent.value = '';
            taskContent.focus();
        });
    }

    init()
}