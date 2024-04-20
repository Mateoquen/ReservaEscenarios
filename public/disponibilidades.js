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
            const errorText = await response.text();
            throw new Error(`Error en la solicitud: ${response.statusText} - ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            const htmlData = await response.text();
            document.getElementById('views').innerHTML = htmlData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const pageLinks = document.querySelectorAll('.page-link');

    pageLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = link.getAttribute('href').split('=')[1];
            console.log('Página cambiada:', page);
            getDisponibilidades(page);
        });
    });
});

async function getDisponibilidades(page) {
    try {
        await fetchAPI(`/Disponibilidades?page=${page}`, 'GET');
    } catch (error) {
        console.error('Error al obtener las Disponibilidades:', error.message);
    }
}
