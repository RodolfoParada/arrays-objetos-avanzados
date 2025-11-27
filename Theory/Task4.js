// Task 4: Manipulación Compleja de Objetos (6 minutos)
// Técnicas avanzadas para trabajar con objetos anidados y complejos.

// Deep Cloning y Merging
const usuarioOriginal = {
  nombre: 'Ana',
  perfil: {
    edad: 25,
    intereses: ['JavaScript', 'React']
  },
  configuracion: {
    tema: 'claro',
    notificaciones: true
  }
};

// Deep clone con structuredClone (moderno)
const usuarioClonado = structuredClone(usuarioOriginal);

// O con JSON (pierde métodos y tipos especiales)
const usuarioClonadoJSON = JSON.parse(JSON.stringify(usuarioOriginal));

// Deep merge manual
function deepMerge(objeto1, objeto2) {
  const resultado = { ...objeto1 };

  for (const clave in objeto2) {
    if (objeto2[clave] && typeof objeto2[clave] === 'object' &&
        !Array.isArray(objeto2[clave])) {
      resultado[clave] = deepMerge(resultado[clave] || {}, objeto2[clave]);
    } else {
      resultado[clave] = objeto2[clave];
    }
  }

  return resultado;
}

const actualizacion = {
  perfil: {
    intereses: ['JavaScript', 'React', 'Node.js']
  },
  configuracion: {
    tema: 'oscuro'
  }
};

const usuarioActualizado = deepMerge(usuarioOriginal, actualizacion);

// Transformación de Objetos

// Convertir array a objeto
const productos = [
  { id: 1, nombre: 'Laptop', precio: 1000 },
  { id: 2, nombre: 'Mouse', precio: 50 }
];

const productosPorId = productos.reduce((mapa, producto) => {
  mapa[producto.id] = producto;
  return mapa;
}, {});

// Extraer valores anidados
const extraerValoresAnidados = (objeto, claves) =>
  claves.reduce((resultado, clave) => {
    const valor = clave.split('.').reduce((obj, k) => obj?.[k], objeto);
    return { ...resultado, [clave]: valor };
  }, {});

const datosExtraidos = extraerValoresAnidados(usuarioOriginal, [
  'nombre',
  'perfil.edad',
  'configuracion.tema'
]);

// Transformar estructura de objeto
const transformarEstructura = (usuario) => ({
  id: Math.random().toString(36).substr(2, 9),
  informacionPersonal: {
    nombre: usuario.nombre,
    edad: usuario.perfil?.edad
  },
  preferencias: {
    ...usuario.configuracion,
    intereses: usuario.perfil?.intereses || []
  },
  fechaRegistro: new Date().toISOString()
});