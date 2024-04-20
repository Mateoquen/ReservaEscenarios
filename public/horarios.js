async function fetchAPI(url, method, data) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error.message}`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const editarButtons = document.querySelectorAll('.btn-editar');
    const eliminarButtons = document.querySelectorAll('.btn-eliminar'); 

    editarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idHorario= button.getAttribute('data-idHorario');
            editarHorario(idHorario);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idHorario = button.getAttribute('data-idHorario');
            eliminarHorario(idHorario);
        });
    });
});

async function createHorario() {
    try {
        const nombre = document.getElementById('nombre').value;
        const horaIncial = document.getElementById('horaIncial').value;
        const horaFinal = document.getElementById('horaFinal').value;
        const horario = {
            nombre,
            horaIncial,
            horaFinal
        };
    
        const result = await fetchAPI('/Horarios', 'POST', horario);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Horario:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Horario:', error.message);
    }
}

async function getHorario() {
    try {
        const result = await fetchAPI('/Horarios', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener los Horarios:', error.message);
    }
}

async function editarHorario(idHorario) {
    try {
        const nuevoHorario = prompt('Ingresa el nuevo Horario:');
        if (nuevoHorario === null) {
            console.log('La operación de edición fue cancelada.');
            return;
        }
        console.log(idHorario)
        const HorarioActualizado = {
            newhorario: nuevoHorario,
        };
        const result = await fetchAPI(`/Horarios/${idHorario}`, 'PUT', HorarioActualizado);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Horario:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Horario:', error.message);
    }
}

async function eliminarHorario(idHorario) { 
    try {
        const result = await fetchAPI(`/Horarios/${idHorario}`, 'DELETE');
        if (result.success) {
            console.log('Horario eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Horario:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Horario:', error.message);
    }
}