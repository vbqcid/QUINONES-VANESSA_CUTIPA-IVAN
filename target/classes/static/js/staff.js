async function fetchOdontologos() {
    const section = document.getElementById("odontologos-section");

    try {
        const response = await fetch('http://localhost:8080/odontologos/listar');
        if (response.ok) {
            const odontologos = await response.json();
            section.innerHTML = '';
            odontologos.forEach(odontologo => {
                const card = document.createElement("div");
                card.className = "tarjeta";

                const imageDiv = document.createElement("div");
                imageDiv.className = "imagen-odontologo";
                const img = document.createElement("img");
                img.src = "img/doctor.jpeg";
                img.alt = "Foto del odontólogo";
                imageDiv.appendChild(img);

                const infoDiv = document.createElement("div");
                infoDiv.className = "informacion-odontologo";
                const nameH2 = document.createElement("h2");
                nameH2.textContent = `ID: ${odontologo.id} - ${odontologo.nombre} ${odontologo.apellido}`;
                const matriculaP = document.createElement("p");
                matriculaP.innerHTML = `<strong>Número de Matrícula:</strong> ${odontologo.numeroMatricula}`;

                const buttonsDiv = document.createElement("div");
                buttonsDiv.className = "buttons-odontologo";

                const editButton = document.createElement("button");
                editButton.textContent = "Editar";
                editButton.className = "btn-editar";
                editButton.onclick = () => window.location.href = `editarOdontologo.html?id=${odontologo.id}`;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.className = "btn-eliminar";
                deleteButton.onclick = () => {
                    if (confirm("¿Está seguro de que desea eliminar este odontólogo?")) {
                        eliminarOdontologo(odontologo.id);
                    }
                };

                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(deleteButton);

                infoDiv.appendChild(nameH2);
                infoDiv.appendChild(matriculaP);
                infoDiv.appendChild(buttonsDiv);

                card.appendChild(imageDiv);
                card.appendChild(infoDiv);

                section.appendChild(card);
            });
        } else {
            section.innerHTML = '<p>Error al obtener la lista de odontólogos</p>';
        }
    } catch (error) {
        section.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function eliminarOdontologo(id) {
    try {
        const response = await fetch(`http://localhost:8080/odontologos/eliminar?id=${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Odontólogo eliminado correctamente");
            fetchOdontologos(); // Refresh the list
        } else {
            alert("Error al eliminar el odontólogo");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', fetchOdontologos);
