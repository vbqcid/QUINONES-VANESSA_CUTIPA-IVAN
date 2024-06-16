document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const turnoId = urlParams.get('id');

    if (turnoId) {
        fetchOdontologos().then(() => {
            fetchTurno(turnoId);
        });
    } else {
        console.error('No se proporcionó un ID de turno.');
    }

    document.getElementById('form-editar-turno').addEventListener('submit', async function (e) {
        e.preventDefault();
        await actualizarTurno(turnoId);
    });

    document.getElementById('odontologoSelect').addEventListener('change', async function (e) {
        await fetchOdontologoDetails(e.target.value);
        // Actualizar el valor de odontologoId
        odontologoId = e.target.value;
    });
});

async function fetchTurno(id) {
    try {
        const response = await fetch(`http://localhost:8080/turnos/${id}`);
        if (response.ok) {
            const turno = await response.json();
            const paciente = await fetchPaciente(turno.pacienteSalidaDto.id);

            document.getElementById('id').value = turno.id;
            document.getElementById('paciente').value = `${paciente.nombre} ${paciente.apellido}`;
            document.getElementById('fechaHora').value = turno.fechaHora.replace(' ', 'T');
            document.getElementById('pacienteId').value = paciente.id;
            document.getElementById('pacienteNombre').value = paciente.nombre;
            document.getElementById('pacienteApellido').value = paciente.apellido;
            document.getElementById('pacienteDni').value = paciente.dni;
            document.getElementById('pacienteFechaIngreso').value = paciente.fechaIngreso;
            document.getElementById('pacienteDomicilio').value = JSON.stringify(paciente.domicilioSalidaDto);

            document.getElementById('odontologoSelect').value = turno.odontologoSalidaDto.id;
            await fetchOdontologoDetails(turno.odontologoSalidaDto.id);
        } else {
            alert('Error al obtener los detalles del turno');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function fetchPaciente(id) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            alert('Error al obtener los detalles del paciente');
            return {};
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        return {};
    }
}

async function fetchOdontologos() {
    try {
        const response = await fetch(`http://localhost:8080/odontologos/listar`);
        if (response.ok) {
            const odontologos = await response.json();
            const odontologoSelect = document.getElementById('odontologoSelect');

            odontologos.forEach(odontologo => {
                const option = document.createElement('option');
                option.value = odontologo.id;
                option.text = `${odontologo.nombre} ${odontologo.apellido}`;
                odontologoSelect.appendChild(option);
            });
        } else {
            alert('Error al obtener la lista de odontólogos');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function fetchOdontologoDetails(id) {
    try {
        const response = await fetch(`http://localhost:8080/odontologos/${id}`);
        if (response.ok) {
            const odontologo = await response.json();
            document.getElementById('odontologoNombre').value = odontologo.nombre;
            document.getElementById('odontologoApellido').value = odontologo.apellido;
            document.getElementById('odontologoNumeroMatricula').value = odontologo.numeroMatricula;
        } else {
            alert('Error al obtener los detalles del odontólogo');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function actualizarTurno(id) {
    const fechaHora = document.getElementById('fechaHora').value.replace('T', ' ');
    const pacienteId = document.getElementById('pacienteId').value;
    const odontologoId = document.getElementById('odontologoSelect').value;

    const data = {
        id: id,
        fechaHora: fechaHora,
        pacienteEntradaDto: {
            id: pacienteId,
            nombre: document.getElementById('pacienteNombre').value,
            apellido: document.getElementById('pacienteApellido').value,
            dni: document.getElementById('pacienteDni').value,
            fechaIngreso: document.getElementById('pacienteFechaIngreso').value,
            domicilioEntradaDto: JSON.parse(document.getElementById('pacienteDomicilio').value)
        },
        odontologoEntradaDto: {
            id: odontologoId,
            nombre: document.getElementById('odontologoNombre').value,
            apellido: document.getElementById('odontologoApellido').value,
            numeroMatricula: document.getElementById('odontologoNumeroMatricula').value
        }
    };

    try {
        const response = await fetch(`http://localhost:8080/turnos/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Turno actualizado correctamente');
            window.location.href = 'turno.html';
        } else {
            alert('Error al actualizar el turno');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
