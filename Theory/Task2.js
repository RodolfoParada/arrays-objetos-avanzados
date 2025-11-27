// Task 2: Destructuring Avanzado (8 minutos)
// Destructuring permite extraer valores de estructuras complejas de manera elegante.

// Destructuring de Arrays Avanzado


const coordenadas = [10, 20, 30, 40, 50];

// Extraer primeros elementos y resto
const [x, y, ...resto] = coordenadas;
console.log(x, y, resto); // 10, 20, [30, 40, 50]

// Saltar elementos
const [, segundo, , cuarto] = coordenadas;
console.log(segundo, cuarto); // 20, 40

// Valores por defecto
const [a = 0, b = 0, c = 0] = [1, 2];
console.log(a, b, c); // 1, 2, 0

// En funciones
function calcularArea([ancho = 1, alto = 1]) {
  return ancho * alto;
}

console.log(calcularArea([5, 10])); // 50
console.log(calcularArea([7])); // 7
console.log(calcularArea([])); // 1

// Destructuring de Objetos Avanzado

const usuario = {
  id: 1,
  nombre: 'Ana García',
  email: 'ana@example.com',
  perfil: {
    edad: 28,
    ciudad: 'Madrid',
    intereses: ['JavaScript', 'React', 'Node.js']
  },
  configuracion: {
    tema: 'oscuro',
    notificaciones: true,
    idioma: 'es'
  }
};

// Destructuring básico con alias
const { nombre: nombreCompleto, email: correo } = usuario;
console.log(nombreCompleto, correo);

// Destructuring anidado
const {
  perfil: {
    edad,
    ciudad,
    intereses: [primerInteres, ...otrosIntereses]
  },
  configuracion: {
    tema,
    notificaciones = false
  }
} = usuario;

console.log(edad, ciudad, primerInteres, otrosIntereses, tema);

// Valores por defecto
const { telefono = 'No especificado', activo = true } = usuario;

// Rest operator en objetos
const { id, nombre, ...restoUsuario } = usuario;
console.log(restoUsuario);
// { email, perfil, configuracion }

// Combinar con spread
const usuarioActualizado = {
  ...usuario,
  ultimoAcceso: new Date(),
  configuracion: {
    ...usuario.configuracion,
    ultimoCambio: new Date()
  }
};


// Destructuring en Parámetros de Función


// Destructuring en parámetros
function crearUsuario({
  nombre,
  email,
  edad = 18,
  perfil: { ciudad = 'Desconocida' } = {}
}) {
  return {
    nombre,
    email,
    edad,
    ciudad,
    fechaRegistro: new Date()
  };
}

const datosUsuario = {
  nombre: 'Carlos',
  email: 'carlos@example.com',
  perfil: { ciudad: 'Barcelona' }
};

console.log(crearUsuario(datosUsuario));
// { nombre: 'Carlos', email: 'carlos@example.com', edad: 18, ciudad: 'Barcelona', ... }

// Destructuring con arrays en parámetros
function procesarCoordenadas([x = 0, y = 0, z = 0, ...resto] = []) {
  return { x, y, z, extras: resto };
}

console.log(procesarCoordenadas([1, 2, 3, 4, 5]));
// { x: 1, y: 2, z: 3, extras: [4, 5] }


// Casos de Uso Prácticos

// Intercambio de valores
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1

// Procesamiento de APIs
async function obtenerUsuario(id) {
  const response = await fetch(`/api/usuarios/${id}`);
  const { data: { nombre, email, perfil: { rol } } } = await response.json();
  return { nombre, email, rol };
}

// Configuración con valores por defecto
function configurarApp(opciones = {}) {
  const {
    puerto = 3000,
    baseDatos = {
      host: 'localhost',
      puerto: 5432,
      nombre: 'miapp'
    },
    caracteristicas = {
      autenticacion: true,
      logging: false,
      cache: true
    }
  } = opciones;

  return { puerto, baseDatos, caracteristicas };
}