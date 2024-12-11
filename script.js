document.addEventListener('DOMContentLoaded',loaded)

async function  handleSubmit(e) {
    e.preventDefault()
    try {
        let details={
            title:document.getElementById("title").value,
            description:document.getElementById("description").value,
            completed:false,
            userId:new Date().toISOString()
        }
        if(details){
            localStorage.setItem(details.userId,JSON.stringify(details))
            await displayDetails(details)
        }

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

    



    }
    catch (err) {
        console.log('Error',err)
    }
}

async function displayDetails(details) {
    try {
        let list = document.createElement('li');
        list.innerHTML = `Work: ${details.title}<br>Description: ${details.description}
                          ${details.completed ? '' : '<button type="button" id="edit" class="btn btn-warning p-3px edit">Done</button>'}
                          <button type="button" id='delete' class="btn btn-danger delete m-2 p-3px">Delete</button>`;
        let userList = document.getElementById(details.completed ? 'doneList' : 'pendingList');
        userList.appendChild(list);

        if (!details.completed) {
            // Attach done event listener for pending tasks
            let done = list.querySelector('.edit');
            done.addEventListener('click', async () => {
                await doneDetails(details, list);
            });
        }

        // Attach delete event listener for both pending and done tasks
        let deleTe = list.querySelector('.delete');
        deleTe.addEventListener('click', async () => {
            await deleteDetails(details, list);
        });

    } catch (err) {
        console.log('Error in Display!', err);
    }
}


async function doneDetails(details,list) {
    try {
        list.remove()
        details.completed=true
        localStorage.setItem(details.userId,JSON.stringify(details))
        
        list.innerHTML=` work :${details.title}<br>Description : ${details.description} <button type="button" id='delete' class="btn btn-danger delete m-2 p-3px">Delete</button>`
        const doneList=document.getElementById("doneList")
        doneList.appendChild(list)

        let deleTe=list.querySelector(".delete")
        deleTe.addEventListener('click',async()=>{
            await deleteDetails(details,list)
        })
    }
    catch (err) {
        console.log('Error!',err)
    }
    
}

async function deleteDetails(details,list) {
    try{
        if(details){
            localStorage.removeItem(details.userId)
            list.remove()
        }

    }
    catch(err) {
        console.log('Error !',err)
    }
    
}



async function loaded() {
    try{
        for(let i=0;i<localStorage.length;i++){
            let key=localStorage.key(i)
            let details=JSON.parse(localStorage.getItem(key))
            await displayDetails(details)

        }
    }
    catch(err) {
        console.log('error!',err)
    }
    
}