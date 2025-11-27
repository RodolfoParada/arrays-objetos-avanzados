// Task 1: Métodos Funcionales Avanzados de Arrays (8 minutos)
// Los métodos funcionales permiten procesar arrays de manera declarativa y eficiente.

// Transformación Avanzada con map()
const usuarios = [
  { id: 1, nombre: 'Ana', edad: 25, activo: true },
  { id: 2, nombre: 'Carlos', edad: 30, activo: false },
  { id: 3, nombre: 'María', edad: 28, activo: true }
];

// Transformaciones básicas
const nombres = usuarios.map(usuario => usuario.nombre);
console.log(nombres); // ['Ana', 'Carlos', 'María']

// Transformaciones complejas
const usuariosFormateados = usuarios.map((usuario, index) => ({
  id: usuario.id,
  nombreCompleto: `${usuario.nombre} (ID: ${usuario.id})`,
  esActivo: usuario.activo ? '✅ Activo' : '❌ Inactivo',
  posicion: index + 1,
  categoria: usuario.edad < 30 ? 'Joven' : 'Adulto'
}));

// Transformación con index y array completo
const conPosicion = usuarios.map((usuario, index, array) => ({
  ...usuario,
  esPrimero: index === 0,
  esUltimo: index === array.length - 1,
  totalUsuarios: array.length
}));

// Filtrado y Búsqueda Avanzada

// filter con condiciones complejas
const usuariosActivosMayores25 = usuarios.filter(usuario =>
  usuario.activo && usuario.edad > 25
);

// filter con validación de datos
const usuariosValidos = usuarios.filter(usuario =>
  usuario.nombre &&
  typeof usuario.edad === 'number' &&
  usuario.edad > 0 &&
  usuario.edad < 120
);

// find con criterios específicos
const usuarioAdministrador = usuarios.find(usuario =>
  usuario.nombre.toLowerCase().includes('admin') ||
  usuario.id === 1
);

// some y every para validaciones
const hayUsuariosInactivos = usuarios.some(usuario => !usuario.activo);
const todosSonAdultos = usuarios.every(usuario => usuario.edad >= 18);
const algunNombreLargo = usuarios.some(usuario => usuario.nombre.length > 10);

// Reducción Avanzada con reduce()

// Suma básica
const sumaEdades = usuarios.reduce((total, usuario) => total + usuario.edad, 0);

// Estadísticas complejas
const estadisticas = usuarios.reduce((stats, usuario) => {
  stats.total++;
  stats.sumaEdades += usuario.edad;
  stats.activos += usuario.activo ? 1 : 0;

  if (usuario.edad < stats.edadMinima) stats.edadMinima = usuario.edad;
  if (usuario.edad > stats.edadMaxima) stats.edadMaxima = usuario.edad;

  return stats;
}, {
  total: 0,
  sumaEdades: 0,
  activos: 0,
  edadMinima: Infinity,
  edadMaxima: -Infinity
});

// Agrupación por categorías
const usuariosPorEstado = usuarios.reduce((grupos, usuario) => {
  const clave = usuario.activo ? 'activos' : 'inactivos';
  if (!grupos[clave]) grupos[clave] = [];
  grupos[clave].push(usuario);
  return grupos;
}, {});

// Transformación a objeto indexado
const usuariosPorId = usuarios.reduce((mapa, usuario) => {
  mapa[usuario.id] = usuario;
  return mapa;
}, {});

// Composición de operaciones
const resultadoCompuesto = usuarios
  .filter(u => u.activo)
  .map(u => ({ nombre: u.nombre, edad: u.edad }))
  .reduce((acumulador, u) => {
    acumulador.nombres.push(u.nombre);
    acumulador.edadPromedio =
      (acumulador.edadPromedio * (acumulador.nombres.length - 1) + u.edad) /
      acumulador.nombres.length;
    return acumulador;
  }, { nombres: [], edadPromedio: 0 });

// flatMap y Operaciones Anidadas


const pedidos = [
  { id: 1, productos: ['Laptop', 'Mouse'] },
  { id: 2, productos: ['Teclado'] },
  { id: 3, productos: ['Monitor', 'Cable USB', 'Webcam'] }
];

// flatMap para aplanar arrays anidados
const todosLosProductos = pedidos.flatMap(pedido => pedido.productos);
console.log(todosLosProductos);
// ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Cable USB', 'Webcam']

// flatMap con transformación
const productosConPedido = pedidos.flatMap(pedido =>
  pedido.productos.map(producto => ({
    producto,
    pedidoId: pedido.id
  }))
);

// Operaciones en arrays de arrays
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const sumaTotal = matriz.flat().reduce((suma, num) => suma + num, 0);
const maximosPorFila = matriz.map(fila =>
  fila.reduce((max, num) => num > max ? num : max, -Infinity)
);