function login() {
    var tipoDoc = document.getElementById("tipo-doc-reg").value;
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    
    if (!tipoDoc || !usuario || !password) {
        alert("Por favor completa todos los campos.");
        return;
    }

    

    
    var body = {
        tipoDocumento: tipoDoc,
        usuario: usuario,
        password: password
    };


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud.');
        }
        return response.json();
    })
    .then(data => {
       
        console.log('Respuesta del backend:', data);

        
        if (data && data.token) {
            
            localStorage.setItem('token', data.token);

            
            window.location.href = 'index.html'; 
        } else {
            alert('Credenciales incorrectas o usuario no encontrado.');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Inténtalo de nuevo más tarde.');
    });
}
