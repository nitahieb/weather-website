
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const imgOne = document.querySelector("#img-1")


weatherForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = "Fetching content"
    messageTwo.textContent = ""
    imgOne.style.display = "none"

    fetch('/weather?address='+location).then((response)=> {
    response.json().then((data)=> {
        if (data.error) {
            messageOne.textContent = data.error
        } else{
            imgOne.style.display = "inline"
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            imgOne.src = data.imageURL
            
        }
        
    })
})

})

