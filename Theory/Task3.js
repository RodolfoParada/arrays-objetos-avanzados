// Task 3: Inmutabilidad y Functional Programming (8 minutos)
// La inmutabilidad previene efectos secundarios y facilita el debugging y testing.

// Principios de Inmutabilidad

// ❌ Mutación directa (problemática)
const usuario = { nombre: 'Ana', edad: 25 };
usuario.edad = 26; // Modifica el objeto original

// ✅ Inmutabilidad con spread
const usuarioActualizado = { ...usuario, edad: 26 };

// ❌ Mutación de arrays
const lista = [1, 2, 3];
lista.push(4); // Modifica el array original

// ✅ Inmutabilidad con spread
const listaExtendida = [...lista, 4];

// Métodos inmutables de arrays
const original = [1, 2, 3, 4, 5];

// Agregar elementos
const conNuevo = [...original, 6];

// Remover elementos
const sinPrimero = original.slice(1);
const sinElemento = original.filter(x => x !== 3);

// Modificar elementos
const duplicados = original.map(x => x * 2);

// Ordenar sin mutar
const ordenado = [...original].sort((a, b) => b - a);

// Funciones Puras

// ❌ Función impura (depende de estado externo)
let contadorGlobal = 0;
function incrementarImpuro() {
  contadorGlobal++;
  return contadorGlobal;
}

// ✅ Función pura (sin efectos secundarios)
function incrementarPuro(contador) {
  return contador + 1;
}

// ❌ Función impura (modifica argumento)
function agregarItemImpuro(array, item) {
  array.push(item);
  return array;
}

// ✅ Función pura
function agregarItemPuro(array, item) {
  return [...array, item];
}
// Composición de Funciones

// Funciones utilitarias puras
const duplicar = x => x * 2;
const esPar = x => x % 2 === 0;
const sumar = (a, b) => a + b;

// Composición manual
const duplicarPares = array => array
  .filter(esPar)
  .map(duplicar);

// Función de composición genérica
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// Composición funcional
const procesarNumeros = compose(
  array => array.reduce(sumar, 0), // Suma total
  array => array.map(duplicar),                        // Duplica cada número
  array => array.filter(esPar)     // Filtra pares
);

console.log(procesarNumeros([1, 2, 3, 4, 5])); // 2 + 4 = 6, luego 12, luego 24

// Pipeline operator (propuesto para JS)
const pipeline = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const resultado = pipeline(
  [1, 2, 3, 4, 5],
  array => array.filter(esPar),
  array => array.map(duplicar),
  array => array.reduce(sumar, 0)
);

// Currying y Funciones de Orden Superior
// Currying: convertir función multi-argumento en una secuencia de funciones
const multiplicar = a => b => a * b;
const duplicarCurrierd = multiplicar(2);
const triplicar = multiplicar(3);

console.log(duplicarCurrierd(5)); // 10
console.log(triplicar(5)); // 15

// Función de orden superior que crea validadores
const crearValidador = (fn, mensajeError) => valor =>
  fn(valor) ? { valido: true, valor } : { valido: false, error: mensajeError };

const esNumeroPositivo = valor => typeof valor === 'number' && valor > 0;
const esStringNoVacio = valor => typeof valor === 'string' && valor.trim().length > 0;

const validarEdad = crearValidador(esNumeroPositivo, 'La edad debe ser un número positivo');
const validarNombre = crearValidador(esStringNoVacio, 'El nombre no puede estar vacío');

console.log(validarEdad(25)); // { valido: true, valor: 25 }
console.log(validarEdad(-5)); // { valido: false, error: 'La edad debe ser...' }