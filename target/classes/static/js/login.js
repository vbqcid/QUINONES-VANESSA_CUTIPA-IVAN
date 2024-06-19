function login() {
    var tipoDoc = document.getElementById("tipo-doc-reg").value;
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    // Validación básica en el frontend
    if (!tipoDoc || !usuario || !password) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // URL del endpoint de autenticación en tu backend (debes reemplazarla con la URL correcta)
    var url = 'http://tu-backend.com/api/login';

    // Datos del cuerpo de la solicitud (en este ejemplo, se usa JSON)
    var body = {
        tipoDocumento: tipoDoc,
        usuario: usuario,
        password: password
    };

    // Configuración de la solicitud fetch
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
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Aquí manejas la respuesta del backend
        console.log('Respuesta del backend:', data);

        // Ejemplo de manejo de la respuesta para redireccionar o mostrar mensajes
        if (data && data.token) {
            // Guardar el token en el almacenamiento local o de sesión (localStorage o sessionStorage)
            localStorage.setItem('token', data.token);

            // Redireccionar a otra página después del inicio de sesión exitoso
            window.location.href = 'dashboard.html'; // Cambia 'dashboard.html' por tu página de destino
        } else {
            alert('Credenciales incorrectas o usuario no encontrado.');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Inténtalo de nuevo más tarde.');
    });
}
