document.addEventListener('DOMContentLoaded',loaded)

async function loaded() {
    try {
        for(let i=0;i<localStorage.length;i++){
            let key=localStorage.key(i);
            let details=JSON.parse(localStorage.getItem(key));
            await displayDetails(details)
        }
    }
    catch(error) {
        console.log("Error !",error)
    }
}

async function handleSubmit(e) {
    e.preventDefault()
    try {
        let details={
            title : document.getElementById('title').value ,
            description : document.getElementById("description").value ,
            completed : false
        }

        if(details) {
            let result = await axios.post('https://crudcrud.com/api/bb8dd17d8da54659b0b19f2df88877c7/details',details)
            console.log("Data Posted",result.data)
            let userId = result.data._id

            details.userId = userId

            //posting data in localStorage
            localStorage.setItem(userId,JSON.stringify(details))

            //displaying Data
            await  displayDetails(details)

        }
        document.getElementById("title").value = ""
        document.getElementById('description').value = ""
    }
    catch (error) {
        console.log('Error in posting !', error)
    }
}

async function  displayDetails(details) {
    try{
        let list= document.createElement('li')
        list.innerHTML=` Work-Title : ${details.title} <br> Description : ${details.description} 
        ${details.completed  ? '' :'<button type="button" id="done" class="done btn btn-warning p-3px">Done</button>'} 
        <button type="button" id="delete" class="btn btn-danger p-3px delete">Delete</button>`

        //add data in pending list
        let userList=document.getElementById(details.completed ? "doneList" : "pendingList")
        userList.appendChild(list)

        if(!details.completed) {
            let done = list.querySelector('.done')
            done.addEventListener("click",async()=>{
                await doneData(details.userId,list)
            })

        }
        let deleTe = list.querySelector(".delete")
        deleTe.addEventListener("click",async()=>{
            await deleTeData(details.userId,list)
        })


    }
    catch(err) {
        console.log('Error in displaying Data !',err)
    }
}

async function doneData(userId,list) {
    try{
        let details=JSON.parse(localStorage.getItem(userId))
        details.completed = true
        localStorage.setItem(userId,JSON.stringify(details))

        //update data on axios
        await axios.put(`https://crudcrud.com/api/bb8dd17d8da54659b0b19f2df88877c7/details/${userId}`,details)
        console.log('data updated on api')

        //update on UI
        list.remove()
        await displayDetails(details)

    }
    catch(err) {
        console.log('Error while updating data ',err)
    }
}

async function deleTeData(userId,list) {
    try {
        axios.delete(`https://crudcrud.com/api/bb8dd17d8da54659b0b19f2df88877c7/details/${userId}`)
        localStorage.removeItem(userId)
        list.remove()
    }
    catch (err) {
        console.log('Error while deleting',err)
    }
}
