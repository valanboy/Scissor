const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e)=>{
    let messages = []

    if(username.value.length >= 15){
        messages.push('username must not be longer than 15 characters')
    }
    if(username.value.length <= 5){
        messages.push('username must be longer than 5 characters')
    }

    if(password.value.length <= 5){
        messages.push('password must be longer than 5 characters')
    }

    if(password.value.length >= 30){
        messages.push('password must not be longer than 30 characters')
    }

     if(messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
     }
})