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
            const idApartamento= button.getAttribute('data-idApartamento');
            editarApto(idApartamento);
        });
    });

    eliminarButtons.forEach(button => { 
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const idApartamento = button.getAttribute('data-idApartamento');
            eliminarApto(idApartamento);
        });
    });
});

async function createApto() {
    try {
        const numeroApto = document.getElementById('numeroApto').value;
        const numeroTorre = document.getElementById('numeroTorre').value;
        const estado = document.getElementById('estado').value;
        const apto = {
            numeroApto,
            numeroTorre,
            estado
        };
    
        const result = await fetchAPI('/Apartamentos', 'POST', apto);

        if (result.success) {
            location.reload()
        } else {
            console.error('Error al crear el Apartamento:', result.error);
        }
    } catch (error) {
        console.error('Error al crear el Apartamentol:', error.message);
    }
}

async function getApto() {
    try {
        const result = await fetchAPI('/Apartamentos', 'GET');
        console.log(result);
    } catch (error) {
        console.error('Error al obtener los Apartamentos:', error.message);
    }
}

async function editarApto(idApartamento) {
    try {
        const nuevoApto = prompt('Ingresa el nuevo Apartamento:');
        if (nuevoApto === null) {
            console.log('La operación de edición fue cancelada.');
            return;
        }
        console.log(idApartamento)
        const AptoActualizado = {
            numeroApto: nuevoApto,
        };
        const result = await fetchAPI(`/Apartamentos/${idApartamento}`, 'PUT', AptoActualizado);
        if (result.success) {
            location.reload();
        } else {
            console.error('Error al actualizar el Apartamento:', result.error);
        }
    } catch (error) {
        console.error('Error al editar el Apartamento:', error.message);
    }
}

async function eliminarApto(idApartamento) { 
    try {
        const result = await fetchAPI(`/Apartamentos/${idApartamento}`, 'DELETE');
        if (result.success) {
            console.log('Apartamento eliminado exitosamente:', result.data);
            location.reload();
        } else {
            console.error('Error al eliminar el Apartamento:', result.error);
        }
    } catch (error) {
        console.error('Error al eliminar el Apartamento:', error.message);
    }
}