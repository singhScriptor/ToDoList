document.addEventListener('DOMContentLoaded', loadDataTodo);

async function handleSubmit(e) {
    e.preventDefault();
    try {
        let details = {
            work: document.getElementById('title').value,
            description: document.getElementById('description').value,
            completed: false,
            userId: new Date().toISOString() // Use timestamp as unique userId
        };
        if (details) {
            // Save to localStorage with userId as key
            localStorage.setItem(details.userId, JSON.stringify(details));

            await displayDetails(details, details.userId);
        } else {
            console.log('Fill the input field first');
        }
    } catch (err) {
        console.error('Error!', err.message);
    }
}

async function displayDetails(details, userId) {
    try {
        let list = document.createElement('li');
        list.style.backgroundColor = 'grey';
        list.style.border = 'none';
        list.style.borderRadius = '5px';
        list.style.padding = '10px';
        list.style.margin = '5px';
        list.innerHTML = `WorkTitle: ${details.work}<br> Description: ${details.description}<br>
            <button type='button' class='done' style='background-color:green; border:none; border-radius:5px'>✔</button>
            <button type='button' class='delete' style='background-color:pink; border:none; border-radius:5px'>✘</button>`;

        const doneBtn = list.querySelector('.done');
        doneBtn.addEventListener('click', function () {
            completedFuncton(userId, list);
        });

        const deleteBtn = list.querySelector('.delete');
        deleteBtn.addEventListener('click', function () {
            deleteTodo(userId, list);
        });

        const pendingList = document.getElementById('pendingList');
        pendingList.appendChild(list);

        // Save the task in localStorage
        localStorage.setItem(userId, JSON.stringify(details));
    } catch (err) {
        console.error('Error in displayDetails', err.message);
    }
}

async function completedFuncton(userId, list) {
    try {
        let doneDetails = JSON.parse(localStorage.getItem(userId));
        doneDetails.completed = true;

        if (doneDetails) {
            // Change button appearance and update list
            list.innerHTML = `WorkTitle: ${doneDetails.work}<br> Description: ${doneDetails.description}<br>
                <button type='button' class='done' style='background-color:pink; border:none; border-radius:5px'>✘</button>`;

            const doneList = document.getElementById('doneList');
            doneList.appendChild(list);

            // Update the task in localStorage
            localStorage.setItem(userId, JSON.stringify(doneDetails));
        } else {
            console.log('still you have to complete todo');
        }
    } catch (err) {
        console.error('Error in completedFunction', err);
    }
}

async function deleteTodo(userId, list) {
    try {
        // Remove the task from localStorage
        localStorage.removeItem(userId);

        // Remove from DOM
        list.remove();
    } catch (err) {
        console.error('Error in delete!', err.message);
    }
}

async function loadDataTodo() {
    try {
        // Load from localStorage first
        for (let i = 0; i < localStorage.length; i++) {
            let userId = localStorage.key(i);
            let task = JSON.parse(localStorage.getItem(userId));

            if (task) {
                if (task.completed) {
                    // Task is completed, display in the done list
                    let list = document.createElement('li');
                    list.innerHTML = `WorkTitle: ${task.work} <br> Description:${task.description}
                    <button type='button' class='delete' style='background-color:pink; border:none; border-radius:5px'>✘</button>`;

                    const doneList = document.getElementById('doneList');
                    doneList.appendChild(list);

                    const deleteBtn = list.querySelector('.delete');
                    deleteBtn.addEventListener('click', function () {
                        deleteTodo(userId, list);
                    });
                } else {
                    // Task is pending, display in the pending list
                    const list = document.createElement('li');
                    list.innerHTML = `WorkTitle: ${task.work}<br> Description: ${task.description}<br>
                    <button type='button' class='done' style='background-color:green; border:none; border-radius:5px'>✔</button>
                    <button type='button' class='delete' style='background-color:pink; border:none; border-radius:5px'>✘</button>`;

                    const pendingList = document.getElementById('pendingList');
                    pendingList.appendChild(list);

                    const doneBtn = list.querySelector('.done');
                    doneBtn.addEventListener('click', function () {
                        completedFuncton(userId, list);
                    });

                    const deleteBtn = list.querySelector('.delete');
                    deleteBtn.addEventListener('click', function () {
                        deleteTodo(userId, list);
                    });
                }
            }
        }
    } catch (err) {
        console.error('Problem in Reload', err.message);
    }
}
