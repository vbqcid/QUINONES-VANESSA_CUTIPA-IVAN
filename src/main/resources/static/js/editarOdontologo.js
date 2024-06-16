document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const odontologoId = urlParams.get('id');

    if (odontologoId) {
        fetchOdontologo(odontologoId);
    }

    document.getElementById('form-editar-odontologo').addEventListener('submit', async function (e) {
        e.preventDefault();
        await actualizarOdontologo(odontologoId);
    });
});

async function fetchOdontologo(id) {
    try {
        const response = await fetch(`http://localhost:8080/odontologos/${id}`);
        if (response.ok) {
            const odontologo = await response.json();
            document.getElementById('id').value = odontologo.id;
            document.getElementById('nombre').value = odontologo.nombre;
            document.getElementById('apellido').value = odontologo.apellido;
            document.getElementById('numeroMatricula').value = odontologo.numeroMatricula;
        } else {
            alert('Error al obtener los detalles del odontólogo');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function actualizarOdontologo(id) {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const numeroMatricula = document.getElementById('numeroMatricula').value;

    const data = {
        nombre,
        apellido,
        numeroMatricula
    };

    try {
        const response = await fetch(`http://localhost:8080/odontologos/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Odontólogo actualizado correctamente');
            window.location.href = 'staff.html';
        } else {
            alert('Error al actualizar el odontólogo');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
