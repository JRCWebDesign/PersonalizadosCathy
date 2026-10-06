// Catálogo: editá nombre, descripción, precio, imagen y opciones.
// precio: número en pesos uruguayos; null = consultar.
// activo: false oculta un producto. Cada id debe ser único.
// Las imágenes generadas son ilustrativas y pueden reemplazarse por fotos reales.
window.CATHY_PRODUCTOS = [
  { id: "taza-blanca", activo: true, nombre: "Taza blanca con diseño", descripcion: "Tu foto, frase o diseño en una taza blanca.", precio: 160, imagen: "assets/productos/taza-blanca.webp", opciones: "Foto, frase o diseño" },
  { id: "taza-color", activo: true, nombre: "Taza con asa e interior de color", descripcion: "Un toque de color para tu diseño personalizado.", precio: 200, imagen: "assets/productos/taza-color.webp", opciones: "Color del asa e interior; foto, frase o diseño" },
  { id: "remeras", activo: true, nombre: "Remera con logo adelante", descripcion: "Tu logo estampado en la parte delantera.", precio: 450, imagen: "assets/productos/remera.webp", opciones: "Talle, color de remera y logo" },
  { id: "ceramica", activo: true, nombre: "Cerámica con diseño", descripcion: "Una cerámica personalizada para guardar un recuerdo.", precio: 350, imagen: "assets/productos/ceramica.webp", opciones: "Diseño y medidas a coordinar" },
  { id: "mousepad", activo: true, nombre: "Mousepad personalizado", descripcion: "Tu diseño para acompañarte en el escritorio.", precio: 250, imagen: "assets/productos/mousepad.webp", opciones: "Foto, frase o diseño" },
  { id: "almohadon", activo: true, nombre: "Almohadón personalizado", descripcion: "Un recuerdo para tener cerquita.", precio: 350, imagen: "assets/productos/almohadon.webp", opciones: "Foto, nombre o diseño" },
  { id: "caramanola", activo: true, nombre: "Caramañola personalizada", descripcion: "Tu nombre o diseño para llevar a todos lados.", precio: 350, imagen: "assets/productos/caramanola.webp", opciones: "Nombre, color y diseño" },
  { id: "llavero", activo: true, nombre: "Llavero personalizado", descripcion: "Un detalle tuyo que va siempre con vos.", precio: 100, imagen: "assets/productos/llavero.webp", opciones: "Nombre, foto o logo" },
  { id: "bolsa", activo: true, nombre: "Bolsa de tela personalizada", descripcion: "Tu idea en una bolsa para todos los días.", precio: null, imagen: "assets/productos/bolsa.webp", opciones: "Frase, ilustración o logo" },
  { id: "rompecabezas", activo: true, nombre: "Rompecabezas personalizado", descripcion: "Tu foto favorita, pieza por pieza.", precio: 150, imagen: "assets/productos/rompecabezas.webp", opciones: "Foto o ilustración; tamaño a coordinar" }
];
