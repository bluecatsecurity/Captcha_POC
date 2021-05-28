document.getElementById('loginButton').addEventListener('click', (event) => {
    event.preventDefault();
    var name = document.querySelector('#name').value;
    var password = document.querySelector('#password').value;
    var recaptcha = document.querySelector('#g-recaptcha-response').value;
    fetchLogin(name,password,recaptcha);
});

fetchLogin = (name,password,recaptcha) => {
    console.log(`Recibí name: ${name} password:${password}`);
    fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name: name, password: password, recaptcha:recaptcha})
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        if(data.success) return location.reload();
    });
}