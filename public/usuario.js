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



async function createUsuario() {
    try {
        const nombre = document.getElementById('nombre').value;
        const clave = document.getElementById('clave').value;
        const idRol = document.getElementById('idRol').value;
        const idApartamento = document.getElementById('idApartamento').value;

        const usuario = {
            nombre,
            clave,
            idRol,
            idApartamento
        };
        const result = await fetchAPI('/Usuario', 'POST', usuario);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Usuario:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Usuario:', error.message);
    }
}

async function getUsuarios() {
    try {
        const result = await fetchAPI('/Usuario', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener las Usuarios:', error.message);
    }
}

async function editarUsuario(idUsuario) {
    try {
        const nuevoNombre = document.getElementById(`nuevoNombre-${idUsuario}`).value;
        const nuevaClave = document.getElementById(`nuevaClave-${idUsuario}`).value;
        const idNuevoRol = document.getElementById(`idNuevoRol-${idUsuario}`).value;
        const idNuevoApartamento = document.getElementById(`idNuevoApartamento-${idUsuario}`).value;

        const UsuarioActualizada = {
            nombre: nuevoNombre,
            clave: nuevaClave,
            idRol: idNuevoRol,
            idApartamento: idNuevoApartamento
        };
        
        const result = await fetchAPI(`/Usuario/${idUsuario}`, 'PUT', UsuarioActualizada);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Usuario:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Usuario:', error.message);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const editarButtons = document.querySelectorAll('.btn-editar');
    const eliminarButtons = document.querySelectorAll('.btn-eliminar'); 

    editarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idUsuario = button.getAttribute('data-idUsuario');
            editarUsuario(idUsuario);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idUsuario = button.getAttribute('data-idUsuario');
            eliminarUsuario(idUsuario);
        });
    });
});
async function eliminarUsuario(idUsuario) { 
    try {
        const result = await fetchAPI(`/Usuario/${idUsuario}`, 'DELETE');
        if (result.success) {
            console.log('Usuario eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Usuario:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Usuario:', error.message);
    }
}