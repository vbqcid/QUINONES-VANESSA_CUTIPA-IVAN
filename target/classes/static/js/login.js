function toggleFields() {
        var tipoDoc = document.getElementById("tipo-doc-reg").value;
        var passwordLabel = document.getElementById("label-password");

        if (tipoDoc === "Odontologo") {
            passwordLabel.textContent = "Contraseña (Número de Matrícula):";
        } else {
            passwordLabel.textContent = "Contraseña (DNI):";
        }
    }
