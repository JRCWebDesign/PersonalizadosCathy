# Personalizados Cathy

Sitio estático. Abrí index.html o serví esta carpeta con un servidor local.

## Editar el catálogo
data/productos.js contiene los diez artículos:
- nombre y descripcion: textos de la tarjeta.
- precio: número en pesos uruguayos (ej. 350); null para consultar.
- imagen: ruta desde index.html, por ejemplo "assets/productos/mousepad.webp".
- opciones: detalles que el cliente debe indicar.
- activo: true para publicar, false para ocultar.
- id: identificador único sin espacios.

Guardá y recargá la página. Para actualizar el sitio publicado, subí los cambios.

## Imágenes
assets/productos contiene diez imágenes ilustrativas con el logo de Cathy personalizados como estampa, generadas con imagegen y optimizadas en WebP. La botella conserva el modelo de tapa deportiva y el almohadón la tela clara sin ribete. Podés reemplazarlas por fotos reales conservando los nombres. Los prompts están en data/prompts-imagenes.md.

## Carrito
Mi pedido abre un panel lateral. El botón flotante muestra el total de unidades cuando hay productos. Se cierra con ×, Seguir eligiendo, Escape o un clic en el fondo en escritorio. Al abrirlo, el foco queda dentro del panel y el fondo no se desplaza.

El enlace abre WhatsApp con productos, cantidades y detalles. El cliente revisa y envía el mensaje. Los precios pendientes se confirman por WhatsApp. El teléfono está en index.html y js/script.js.
