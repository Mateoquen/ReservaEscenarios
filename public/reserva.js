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



async function createReserva() {
    try {
        const nombre = document.getElementById('nombre').value;
        const clave = document.getElementById('clave').value;
        const idRol = document.getElementById('idRol').value;
        const idApartamento = document.getElementById('idApartamento').value;

        const reserva = {
            nombre,
            clave,
            idRol,
            idApartamento
        };
        const result = await fetchAPI('/Reserva', 'POST', reserva);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Reserva:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Reserva:', error.message);
    }
}

async function getReservas() {
    try {
        const result = await fetchAPI('/Reserva', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener las Reservas:', error.message);
    }
}

async function editarReserva(idReserva) {
    try {
        const nuevoNombre = document.getElementById(`nuevoNombre-${idReserva}`).value;
        const nuevaClave = document.getElementById(`nuevaClave-${idReserva}`).value;
        const idNuevoRol = document.getElementById(`idNuevoRol-${idReserva}`).value;
        const idNuevoApartamento = document.getElementById(`idNuevoApartamento-${idReserva}`).value;

        const ReservaActualizada = {
            nombre: nuevoNombre,
            clave: nuevaClave,
            idRol: idNuevoRol,
            idApartamento: idNuevoApartamento
        };
        
        const result = await fetchAPI(`/Reserva/${idReserva}`, 'PUT', ReservaActualizada);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Reserva:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Reserva:', error.message);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const editarButtons = document.querySelectorAll('.btn-editar');
    const eliminarButtons = document.querySelectorAll('.btn-eliminar'); 

    editarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idReserva = button.getAttribute('data-idReserva');
            editarReserva(idReserva);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idReserva = button.getAttribute('data-idReserva');
            eliminarReserva(idReserva);
        });
    });
});
async function eliminarReserva(idReserva) { 
    try {
        const result = await fetchAPI(`/Reserva/${idReserva}`, 'DELETE');
        if (result.success) {
            console.log('Reserva eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Reserva:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Reserva:', error.message);
    }
}