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

async function getAuth() {
  try {
      const result = await fetchAPI('/auth', 'GET');
  } catch (error) {
      console.error('Error al Autorizarse:', error.message);
  }
}
