document.addEventListener("DOMContentLoaded", function() {
    async function fetchPacientes() {
        try {
            const response = await fetch("http://localhost:8080/pacientes/listar");
            if (response.ok) {
                const pacientes = await response.json();
                const pacienteSelect = document.getElementById("paciente");
                pacientes.forEach(paciente => {
                    const option = document.createElement("option");
                    option.value = paciente.id;  // Store the ID of the paciente
                    option.text = `ID: ${paciente.id} (${paciente.nombre} ${paciente.apellido})`;
                    pacienteSelect.appendChild(option);
                });
            } else {
                console.error("Error fetching pacientes");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function fetchOdontologos() {
        try {
            const response = await fetch("http://localhost:8080/odontologos/listar");
            if (response.ok) {
                const odontologos = await response.json();
                const odontologoSelect = document.getElementById("odontologo");
                odontologos.forEach(odontologo => {
                    const option = document.createElement("option");
                    option.value = odontologo.id;  // Store the ID of the odontologo
                    option.text = `ID: ${odontologo.id} (${odontologo.nombre} ${odontologo.apellido}) (Matrícula: ${odontologo.numeroMatricula})`;
                    odontologoSelect.appendChild(option);
                });
            } else {
                console.error("Error fetching odontologos");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function registerTurno(event) {
        event.preventDefault();

        const pacienteId = document.getElementById("paciente").value;
        const odontologoId = document.getElementById("odontologo").value;
        let fechaHora = document.getElementById("fecha-hora").value;

        // Replace 'T' with a space to match the expected format
        fechaHora = fechaHora.replace('T', ' ');

        const turno = {
            fechaHora: fechaHora,
            idPaciente: pacienteId,
            idOdontologo: odontologoId
        };

        try {
            const response = await fetch("http://localhost:8080/turnos/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(turno)
            });

            if (response.ok) {
                alert("TURNO REGISTRADO CON ÉXITO!");
                window.location.href = 'turno.html';
            } else {
                alert("ERROR AL REGISTRAR EL TURNO.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("ERROR AL REGISTRAR EL TURNO.");
        }
    }

    fetchPacientes();
    fetchOdontologos();

    document.getElementById("turno-form").addEventListener("submit", registerTurno);
});
