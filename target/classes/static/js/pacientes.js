async function fetchPacientes() {
    const section = document.getElementById("pacientes-section");

    try {
        const response = await fetch('http://localhost:8080/pacientes/listar');
        if (response.ok) {
            const pacientes = await response.json();
            section.innerHTML = '';
            pacientes.forEach(paciente => {
                const card = document.createElement("div");
                card.className = "tarjeta";

                const imageDiv = document.createElement("div");
                imageDiv.className = "imagen-paciente";
                const img = document.createElement("img");
                img.src = "img/Paciente.webp";
                img.alt = "Foto del paciente";
                imageDiv.appendChild(img);

                const infoDiv = document.createElement("div");
                infoDiv.className = "informacion-paciente";
                const nameH2 = document.createElement("h2");
                nameH2.textContent = `${paciente.nombre} ${paciente.apellido}`;
                const idP = document.createElement("p");
                idP.innerHTML = `<strong>ID:</strong> ${paciente.id}`;
                const dniP = document.createElement("p");
                dniP.innerHTML = `<strong>DNI:</strong> ${paciente.dni}`;

                const buttonsDiv = document.createElement("div");
                buttonsDiv.className = "buttons-paciente";

                const editButton = document.createElement("button");
                editButton.textContent = "Editar";
                editButton.className = "btn-editar";
                editButton.onclick = () => window.location.href = `editarPaciente.html?id=${paciente.id}`;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.className = "btn-eliminar";
                deleteButton.onclick = () => {
                    if (confirm("¿Está seguro de que desea eliminar este paciente?")) {
                        eliminarPaciente(paciente.id);
                    }
                };

                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(deleteButton);

                infoDiv.appendChild(nameH2);
                infoDiv.appendChild(idP);
                infoDiv.appendChild(dniP);
                infoDiv.appendChild(buttonsDiv);

                card.appendChild(imageDiv);
                card.appendChild(infoDiv);

                section.appendChild(card);
            });
        } else {
            section.innerHTML = '<p>Error al obtener la lista de pacientes</p>';
        }
    } catch (error) {
        section.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function eliminarPaciente(id) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/eliminar?id=${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Paciente eliminado correctamente');
            fetchPacientes();
        } else {
            alert('Error al eliminar el paciente');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', fetchPacientes);

