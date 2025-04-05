document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formulario');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const archivoInput = document.getElementById('archivo');
    const archivo = archivoInput.files[0];

    if (archivo) {
      const lector = new FileReader();

      lector.onload = function(evento) {
        const base64Imagen = evento.target.result.split(',')[1];

        // Llama a la herramienta MCP para identificar el vehículo
        llamarMcpTool(base64Imagen);
      };

      lector.readAsDataURL(archivo);
    } else {
      alert('Por favor, selecciona una imagen.');
    }
  });

async function llamarMcpTool(base64Imagen) {
    try {
      const response = await fetch('http://localhost:3000/api/identify_vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_base64: base64Imagen
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Marca y modelo del vehículo: ' + data.result);
      } else {
        alert('Error al llamar a la herramienta MCP: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al llamar a la herramienta MCP: ' + error.message);
    }
  }
});
