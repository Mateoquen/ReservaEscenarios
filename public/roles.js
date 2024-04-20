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



async function createRol() {
    try {
        const nombre = document.getElementById('nombre').value;
        const administrador = document.getElementById('administrador').value;

        const roles = {
            nombre,
            administrador
        };
        const result = await fetchAPI('/Roles', 'POST', roles);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Rol:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Rol:', error.message);
    }
}

async function getRol() {
    try {
        const result = await fetchAPI('/Roles', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener los Roles:', error.message);
    }
}

async function editarRol(idRol) {
    try {
        const nuevoRol = document.getElementById(`nuevoRol-${idRol}`).value;
        const nuevoAdmon = document.getElementById(`nuevoAdmon-${idRol}`).value;

        const RolActualizado = {
            nombre: nuevoRol,
            admon: nuevoAdmon,
        };
        const result = await fetchAPI(`/Roles/${idRol}`, 'PUT', RolActualizado);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Rol:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Rol:', error.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const editarButtons = document.querySelectorAll('.btn-editar');
    const eliminarButtons = document.querySelectorAll('.btn-eliminar'); 

    editarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idRol= button.getAttribute('data-idRol');
            editarRol(idRol);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idRol = button.getAttribute('data-idRol');
            eliminarRol(idRol);
        });
    });
});

async function eliminarRol(idRol) { 
    try {
        const result = await fetchAPI(`/Roles/${idRol}`, 'DELETE');
        if (result.success) {
            console.log('Rol eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Rol:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Rol:', error.message);
    }
}