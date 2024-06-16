document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    if (pacienteId) {
        fetchPaciente(pacienteId);
    }

    document.getElementById('form-editar-paciente').addEventListener('submit', async function (e) {
        e.preventDefault();
        await actualizarPaciente(pacienteId);
    });
});

async function fetchPaciente(id) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/${id}`);
        if (response.ok) {
            const paciente = await response.json();
            console.log(paciente); // Añade esta línea para verificar el JSON en la consola

            document.getElementById('id').value = paciente.id;
            document.getElementById('nombre').value = paciente.nombre;
            document.getElementById('apellido').value = paciente.apellido;
            document.getElementById('dni').value = paciente.dni;
            document.getElementById('fechaIngreso').value = paciente.fechaIngreso;

            // Verifica si el objeto domicilioEntradaDto existe
            if (paciente.domicilioSalidaDto) {
                document.getElementById('calle').value = paciente.domicilioSalidaDto.calle || '';
                document.getElementById('numero').value = paciente.domicilioSalidaDto.numero || '';
                document.getElementById('localidad').value = paciente.domicilioSalidaDto.localidad || '';
                document.getElementById('provincia').value = paciente.domicilioSalidaDto.provincia || '';
            } else {
                console.warn('Domicilio no encontrado en la respuesta del servidor');
            }
        } else {
            alert('Error al obtener los detalles del paciente');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function actualizarPaciente(id) {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const localidad = document.getElementById('localidad').value;
    const provincia = document.getElementById('provincia').value;

    const data = {
        nombre,
        apellido,
        dni,
        fechaIngreso,
        domicilioEntradaDto: {
            calle,
            numero,
            localidad,
            provincia
        }
    };

    try {
        const response = await fetch(`http://localhost:8080/pacientes/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Paciente actualizado correctamente');
            window.location.href = 'pacientes.html';
        } else {
            alert('Error al actualizar el paciente');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
