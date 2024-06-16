async function fetchTurnos() {
    const section = document.getElementById("turnos-section");

    try {
        const response = await fetch('http://localhost:8080/turnos/listar');
        if (response.ok) {
            const turnos = await response.json();
            section.innerHTML = '';
            for (const turno of turnos) {
                console.log(`Turno data: ${JSON.stringify(turno)}`);
                const paciente = await fetchPaciente(turno.pacienteSalidaDto.id); // Use pacienteSalidaDto.id
                console.log(`Fetched paciente: ${JSON.stringify(paciente)}`);
                const odontologo = await fetchOdontologo(turno.odontologoSalidaDto.id); // Use odontologoSalidaDto.id
                console.log(`Fetched odontologo: ${JSON.stringify(odontologo)}`);

                const card = document.createElement("div");
                card.className = "tarjeta";

                const imageDiv = document.createElement("div");
                imageDiv.className = "imagen-turno";
                const img = document.createElement("img");
                img.src = "img/calendario.png";
                img.alt = "Calendario del turno";
                imageDiv.appendChild(img);

                const infoDiv = document.createElement("div");
                infoDiv.className = "informacion-turno";
                const turnoIdP = document.createElement("p");
                turnoIdP.innerHTML = `<strong>ID Turno:</strong> ${turno.id}`;
                const odontologoP = document.createElement("p");
                odontologoP.innerHTML = `<strong>Odontólogo:</strong> ${odontologo.nombre} ${odontologo.apellido}`;
                const pacienteP = document.createElement("p");
                pacienteP.innerHTML = `<strong>Paciente:</strong> ${paciente.nombre} ${paciente.apellido}`;

                let fechaHora = turno.fechaHora.replace('T', ' ');
                const fechaHoraP = document.createElement("p");
                fechaHoraP.innerHTML = `<strong>Fecha y Hora:</strong> ${turno.fechaHora}`;

                const buttonsDiv = document.createElement("div");
                buttonsDiv.className = "buttons-turno";

                const editButton = document.createElement("button");
                editButton.textContent = "Editar";
                editButton.className = "btn-editar";
                editButton.onclick = () => window.location.href = `editarTurno.html?id=${turno.id}`;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.className = "btn-eliminar";
                deleteButton.onclick = () => {
                    if (confirm("¿Está seguro de que desea eliminar este turno?")) {
                        eliminarTurno(turno.id);
                    }
                };

                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(deleteButton);

                infoDiv.appendChild(turnoIdP);
                infoDiv.appendChild(odontologoP);
                infoDiv.appendChild(pacienteP);
                infoDiv.appendChild(fechaHoraP);
                infoDiv.appendChild(buttonsDiv);

                card.appendChild(imageDiv);
                card.appendChild(infoDiv);

                section.appendChild(card);
            }
        } else {
            section.innerHTML = '<p>Error al obtener la lista de turnos</p>';
        }
    } catch (error) {
        section.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function fetchPaciente(id) {
    console.log(`Fetching paciente with id: ${id}`);
    const response = await fetch(`http://localhost:8080/pacientes/${id}`);
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error fetching paciente with id: ${id}`);
        return null;
    }
}

async function fetchOdontologo(id) {
    console.log(`Fetching odontologo with id: ${id}`);
    const response = await fetch(`http://localhost:8080/odontologos/${id}`);
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error fetching odontologo with id: ${id}`);
        return null;
    }
}

async function eliminarTurno(id) {
    try {
        const response = await fetch(`http://localhost:8080/turnos/eliminar?id=${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Turno eliminado correctamente');
            fetchTurnos();
        } else {
            alert('Error al eliminar el turno');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', fetchTurnos);

