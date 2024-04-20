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
            const idEscenario = button.getAttribute('data-idEscenario');
            editarEscenario(idEscenario);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idEscenario = button.getAttribute('data-idEscenario');
            eliminarEscenario(idEscenario);
        });
    });
});

async function createEscenario() {
    try {
        const nombre = document.getElementById('nombre').value;
        const idHorario = document.getElementById('idHorario').value;

        const escenario = {
            nombre,
            idHorario
        };
        const result = await fetchAPI('/Escenarios', 'POST', escenario);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Escenario:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Escenario:', error.message);
    }
}

async function getEscenario() {
    try {
        const result = await fetchAPI('/Escenarios', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener los Escenario:', error.message);
    }
}

async function editarEscenario(idEscenario) {
    try {
        const nuevoNombre = prompt('Ingresa el nuevo nombre del Escenario:');
        if (nuevoNombre === null) {
            console.log('La operación de edición fue cancelada.');
            return;
        }
        console.log(idEscenario)
        const EscenarioActualizado = {
            nombre: nuevoNombre,
        };
        const result = await fetchAPI(`/Escenarios/${idEscenario}`, 'PUT', EscenarioActualizado);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Escenario:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Escenario:', error.message);
    }
}

async function eliminarEscenario(idEscenario) { 
    try {
        const result = await fetchAPI(`/Escenarios/${idEscenario}`, 'DELETE');
        if (result.success) {
            console.log('Escenario eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Escenario:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Escenario:', error.message);
    }
}