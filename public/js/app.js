console.log("loaded")

fetch('http://localhost:3010/weather?address=boston')
.then((response)=>{
    response.json()
    .then((data)=>{
        if(data.error)
        console.log(error)
        else
        console.log(data)
    })
})
.catch(error=>{
    console.log(error)
})