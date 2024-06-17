// Credenciales predefinidas para pacientes y odontólogos
function toggleFields() {
    var tipoDoc = document.getElementById("tipo-doc-reg").value;
    var passwordLabel = document.getElementById("label-password");

    if (tipoDoc === "Odontologo") {
        passwordLabel.textContent = "Contraseña (Número de Matrícula):";
    } else {
        passwordLabel.textContent = "Contraseña (DNI):";
    }
}

document.getElementById("login-button").addEventListener("click", function(event) {
    event.preventDefault();

    var tipoPersona = document.getElementById("tipo-doc-reg").value;
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    let usuarios = tipoPersona === "Paciente" ? pacientes : odontologos;

    // Buscar el usuario por ID y validar la contraseña
    let usuarioEncontrado = usuarios.find(user => user.id === usuario && user.password === password);

    if (usuarioEncontrado) {
        // Inicio de sesión exitoso
        if (tipoPersona === "Paciente") {
            alert("Inicio de sesión exitoso como Paciente.");
            window.location.href = "pacienteLogueado.html";
        } else if (tipoPersona === "Odontologo") {
            alert("Inicio de sesión exitoso como Odontólogo.");
            window.location.href = "odontologoLogueado.html";
        }
    } else {
        // Credenciales incorrectas
        alert("Credenciales incorrectas. Por favor, inténtalo nuevamente.");
    }
});
