const lista = document.getElementById("lista");
const nav = document.getElementById("nav");
lista.addEventListener ('click',()=>{
  nav.classList.toggle("ver");

  })




const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const button = document.getElementById('boton');
    button.disabled = true;
    const data = new FormData(form);
    const apiKey = process.env.PUBLIC_API_KEY;
    const body = {
        "sender": {
            "name": "Consulta",
            "email": "lautym118@gmail.com"
        },
        "to": [
            {
                "email": "lautym118@gmail.com", 
                "name": "Lautaro"
            }
        ],
        "subject": "Solicitud para Proveedor o cv",
        "htmlContent": `
                        <h1>ALGUIEN SE CONTACTO CONTIGO</h1>
                        <p>nombre : ${data.get('nombre')}</p>
                        <p>nombre : ${data.get('apellido')}</p>
                        <p>email : ${data.get('correo')}</p>
                        <p>pregunta : ${data.get('pregunta')}</p>
        `
    }
    fetch("https://api.brevo.com/v3/smtp/email", {
        method: 'POST',
        headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            form.reset();

        })
        .finally(data=>{
            button.disabled = false;
        })
});

