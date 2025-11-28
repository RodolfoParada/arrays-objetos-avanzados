// Base de datos de estudiantes
const estudiantes = [
  {
    id: 1,
    nombre: 'Ana García',
    edad: 22,
    carrera: 'Ingeniería Informática',
    calificaciones: [
      { asignatura: 'Matemáticas', nota: 8.5, creditos: 6 },
      { asignatura: 'Programación', nota: 9.0, creditos: 8 },
      { asignatura: 'Bases de Datos', nota: 7.5, creditos: 4 }
    ],
    activo: true
  },
  {
    id: 2,
    nombre: 'Carlos López',
    edad: 24,
    carrera: 'Ingeniería Informática',
    calificaciones: [
      { asignatura: 'Matemáticas', nota: 6.0, creditos: 6 },
      { asignatura: 'Programación', nota: 8.5, creditos: 8 },
      { asignatura: 'Redes', nota: 7.0, creditos: 5 }
    ],
    activo: true
  },
  {
    id: 3,
    nombre: 'María Rodríguez',
    edad: 21,
    carrera: 'Arquitectura',
    calificaciones: [
      { asignatura: 'Dibujo Técnico', nota: 9.5, creditos: 4 },
      { asignatura: 'Historia del Arte', nota: 8.0, creditos: 3 }
    ],
    activo: false
  }
];

// Sistema de análisis académico
const AnalizadorAcademico = {
  // Calcular promedio ponderado por estudiante
  calcularPromedioPonderado(estudiante) {
    const { calificaciones } = estudiante;
    const totalCreditos = calificaciones.reduce((sum, cal) => sum + cal.creditos, 0);
    const sumaPonderada = calificaciones.reduce((sum, cal) => sum + (cal.nota * cal.creditos), 0);

    return totalCreditos > 0 ? sumaPonderada / totalCreditos : 0;
  },

  // Obtener mejores estudiantes por carrera
  mejoresPorCarrera(estudiantes, limite = 3) {
    // Agrupar por carrera
    const porCarrera = estudiantes.reduce((grupos, estudiante) => {
      const carrera = estudiante.carrera;
      if (!grupos[carrera]) grupos[carrera] = [];
      grupos[carrera].push({
        ...estudiante,
        promedio: this.calcularPromedioPonderado(estudiante)
      });
      return grupos;
    }, {});

    // Ordenar y limitar por carrera
    const resultado = {};
    for (const [carrera, estudiantesCarrera] of Object.entries(porCarrera)) {
      resultado[carrera] = estudiantesCarrera
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, limite);
    }

    return resultado;
  },

  // Analizar rendimiento por asignatura
  analizarAsignaturas(estudiantes) {
    // Aplanar todas las calificaciones
    const todasCalificaciones = estudiantes.flatMap(estudiante =>
      estudiante.calificaciones.map(cal => ({
        asignatura: cal.asignatura,
        nota: cal.nota,
        estudiante: estudiante.nombre,
        carrera: estudiante.carrera
      }))
    );

    // Agrupar por asignatura
    const porAsignatura = todasCalificaciones.reduce((grupos, cal) => {
      const asignatura = cal.asignatura;
      if (!grupos[asignatura]) {
        grupos[asignatura] = [];
      }
      grupos[asignatura].push(cal);
      return grupos;
    }, {});

    // Calcular estadísticas por asignatura
    return Object.entries(porAsignatura).map(([asignatura, calificaciones]) => {
      const notas = calificaciones.map(c => c.nota);
      const promedio = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;

      return {
        asignatura,
        promedio: Math.round(promedio * 100) / 100,
        estudiantes: calificaciones.length,
        maxNota: Math.max(...notas),
        minNota: Math.min(...notas),
        carreras: [...new Set(calificaciones.map(c => c.carrera))]
      };
    });
  },

  // Generar reportes personalizados
  generarReporte(estudiante) {
    const promedio = this.calcularPromedioPonderado(estudiante);
    const { calificaciones } = estudiante;

    // Destructuring avanzado
    const {
      nombre,
      edad,
      carrera,
      activo,
      calificaciones: [
        primeraCalificacion,
        segundaCalificacion,
        ...restoCalificaciones
      ] = []
    } = estudiante;

    return {
      estudiante: { nombre, edad, carrera, activo },
      rendimiento: {
        promedio,
        totalAsignaturas: calificaciones.length,
        mejorNota: Math.max(...calificaciones.map(c => c.nota)),
        peorNota: Math.min(...calificaciones.map(c => c.nota)),
        asignaturasAprobadas: calificaciones.filter(c => c.nota >= 7).length
      },
      detalle: {
        primeraAsignatura: primeraCalificacion,
        segundaAsignatura: segundaCalificacion,
        otrasAsignaturas: restoCalificaciones.length
      }
    };
  }
};


// Ejercicio: Extiende el sistema académico creando funcionalidades como: 
// ok sistema de matrícula con validaciones, 
// pl cálculo de GPA universitario, 
// pk predicción de rendimiento usando algoritmos simples, 
// y generación de reportes PDF simulados. 
// Implementa operaciones inmutables para todas las transformaciones de datos.


// sistema de matrícula con validaciones,
function registrarMatricula(nombre, edad, carrera, pago){

// Validación de datos de entrada
    if (!nombre || nombre.trim() === '') {
        return {
            exito: false,
            mensaje: 'El nombre del estudiante es obligatorio.'
        };
    }

     if (!edad || edad.trim() === '') {
        return {
            exito: false,
            mensaje: 'La edad del estudiante es obligatorio.'
        };
    }
   

if (!carrera || carrera.trim() === '') {
        return {
            exito: false,
            mensaje: 'El curso es obligatorio.'
        };
    }

 // Asegura que el pago sea un número positivo
    if (typeof pago !== 'number' || pago <= 0) {
        return {
            exito: false,
            mensaje: 'El pago debe ser un número positivo.'
        };
    }   

// Creación del objeto de registro de matrícula
const nuevoRegistro = {
        idMatricula: Date.now(), // ID único basado en el timestamp
        nombreEstudiante: nombre.trim(),
        edadEstudiante: edad.trim(),
        cursoAsignado: carrera.trim(),
        montoPagado: pago,
        fechaRegistro: new Date().toISOString()
    };


// C. Almacenamiento del registro (simulación de una operación de BD)
    try {
        almacenarRegistro(nuevoRegistro);
        
        return {
            exito: true,
            mensaje: `Matrícula de ${nombre} registrada con ID: ${nuevoRegistro.idMatricula}`,
            registro: nuevoRegistro
        };
        
    } catch (error) {
        // Manejo de errores de almacenamiento simulado
        return {
            exito: false,
            mensaje: `Error al intentar almacenar el registro: ${error.message}`
        };
    }

  }
  
  
  function almacenarRegistro(registro) {
      // Simplemente agregamos el registro al array global
      estudiantes.push(registro);
      console.log(`[LOG] Nuevo registro añadido: ${registro.nombreEstudiante}`);
  }





// *********************************************

// cálculo de GPA universitario, 

function calcularPromedioPonderado(calificaciones) {
  let sumaPuntosPonderados = 0;
  let totalCreditos = 0;

  calificaciones.forEach(c => {
    // Puntos Ponderados = Nota x Créditos
    sumaPuntosPonderados += c.nota * c.creditos;
    totalCreditos += c.creditos;
  });

  if (totalCreditos === 0) {
    return 0.00;
  }

  // Promedio Ponderado = Suma Puntos Ponderados / Total Créditos
  const gpa = sumaPuntosPonderados / totalCreditos;
  return parseFloat(gpa.toFixed(2));
}


function obtenerGPAEstudiante(id) {
  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    return { error: `Estudiante con ID ${id} no encontrado.` };
  }

  const gpa = calcularPromedioPonderado(estudiante.calificaciones);
  return {
    nombre: estudiante.nombre,
    carrera: estudiante.carrera,
    gpa: gpa
  };
}



function filtrarEstudiantes(criterio, valor) {
  switch (criterio.toLowerCase()) {
    case 'activos':
      return estudiantes.filter(e => e.activo);

    case 'inactivos':
      return estudiantes.filter(e => !e.activo);

    case 'mayoresde23':
      return estudiantes.filter(e => e.edad > 23);

    case 'carrera':
      if (!valor) return [];
      return estudiantes.filter(e => e.carrera.toLowerCase() === valor.toLowerCase());

    default:
      return [];
  }
}


function encontrarMejorPromedioPorCarrera(carrera) {
  // 1. Filtrar estudiantes por la carrera y mapear con su GPA
  const estudiantesPorCarrera = estudiantes
    .filter(e => e.carrera.toLowerCase() === carrera.toLowerCase())
    .map(e => ({
      nombre: e.nombre,
      gpa: calcularPromedioPonderado(e.calificaciones)
    }));

  if (estudiantesPorCarrera.length === 0) {
    return { error: `No se encontraron estudiantes en la carrera "${carrera}".` };
  }

  // 2. Encontrar el mejor promedio usando reduce
  const mejorEstudiante = estudiantesPorCarrera.reduce((mejor, actual) => {
    return (actual.gpa > mejor.gpa) ? actual : mejor;
  }, estudiantesPorCarrera[0]);

  return {
    carrera: carrera,
    nombre: mejorEstudiante.nombre,
    gpa: mejorEstudiante.gpa
  };
}





// ****************************************
// prediccion
// Reutilizamos la función de promedio simple
function calcularPromedioSimple(calificaciones) {
    if (!calificaciones || calificaciones.length === 0) return 0.00;
    const sumaNotas = calificaciones.reduce((sum, c) => sum + c.nota, 0);
    const promedio = sumaNotas / calificaciones.length;
    return promedio; // Dejamos el valor sin redondear para mayor precisión en el cálculo
}

function calcularPromedioGeneralSimple() {
    let sumaTotalPromedios = 0;
    
    // Obtenemos el promedio simple de cada estudiante
    const promedios = estudiantes.map(e => calcularPromedioSimple(e.calificaciones));

    // Sumamos todos los promedios
    sumaTotalPromedios = promedios.reduce((sum, p) => sum + p, 0);

    // Calculamos el umbral (Promedio General)
    const umbral = sumaTotalPromedios / estudiantes.length;
    return parseFloat(umbral.toFixed(2));
}

const UMBRAL_PROMEDIO_GENERAL = calcularPromedioGeneralSimple(); 





// Demostración del sistema
console.log('🎓 SISTEMA DE ANÁLISIS ACADÉMICO\n');

// 1. Calcular promedios individuales
console.log('📊 PROMEDIOS INDIVIDUALES:');
const promedios = estudiantes.map(estudiante => ({
  nombre: estudiante.nombre,
  promedio: Math.round(AnalizadorAcademico.calcularPromedioPonderado(estudiante) * 100) / 100
}));

promedios.forEach(({ nombre, promedio }) => {
  console.log(`${nombre}: ${promedio}`);
});

// 2. Mejores estudiantes por carrera
console.log('\n🏆 MEJORES ESTUDIANTES POR CARRERA:');
const mejores = AnalizadorAcademico.mejoresPorCarrera(estudiantes, 2);

Object.entries(mejores).forEach(([carrera, estudiantesCarrera]) => {
  console.log(`\n${carrera}:`);
  estudiantesCarrera.forEach(({ nombre, promedio }, index) => {
    console.log(`  ${index + 1}. ${nombre} (${promedio})`);
  });
});

// 3. Análisis por asignaturas
console.log('\n📚 ANÁLISIS POR ASIGNATURAS:');
const analisisAsignaturas = AnalizadorAcademico.analizarAsignaturas(estudiantes);

analisisAsignaturas.forEach(asignatura => {
  console.log(`${asignatura.asignatura}:`);
  console.log(`  Promedio: ${asignatura.promedio}`);
  console.log(`  Estudiantes: ${asignatura.estudiantes}`);
  console.log(`  Rango: ${asignatura.minNota} - ${asignatura.maxNota}`);
  console.log(`  Carreras: ${asignatura.carreras.join(', ')}\n`);
});

// 4. Reporte detallado de un estudiante
console.log('📋 REPORTE DETALLADO:');
const reporte = AnalizadorAcademico.generarReporte(estudiantes[0]);
console.log(JSON.stringify(reporte, null, 2));

// 5. Operaciones funcionales avanzadas
console.log('\n🔧 OPERACIONES FUNCIONALES AVANZADAS:');

// Filtrar estudiantes activos con buen rendimiento
const estudiantesDestacados = estudiantes
  .filter(estudiante => estudiante.activo)
  .map(estudiante => ({
    ...estudiante,
    promedio: AnalizadorAcademico.calcularPromedioPonderado(estudiante)
  }))
  .filter(estudiante => estudiante.promedio >= 8.0)
  .sort((a, b) => b.promedio - a.promedio);

console.log('Estudiantes destacados (activos, promedio >= 8.0):');
estudiantesDestacados.forEach(({ nombre, promedio }) => {
  console.log(`- ${nombre}: ${promedio}`);
});

// Estadísticas generales
const estadisticasGenerales = estudiantes.reduce((stats, estudiante) => {
  stats.total++;
  stats.activos += estudiante.activo ? 1 : 0;
  stats.totalCalificaciones += estudiante.calificaciones.length;

  const promedio = AnalizadorAcademico.calcularPromedioPonderado(estudiante);
  stats.promedioGeneral = (stats.promedioGeneral * (stats.total - 1) + promedio) / stats.total;

  return stats;
}, {
  total: 0,
  activos: 0,
  totalCalificaciones: 0,
  promedioGeneral: 0
});

console.log('\n📈 ESTADÍSTICAS GENERALES:');
console.log(`Total estudiantes: ${estadisticasGenerales.total}`);
console.log(`Estudiantes activos: ${estadisticasGenerales.activos}`);
console.log(`Total calificaciones: ${estadisticasGenerales.totalCalificaciones}`);
console.log(`Promedio general: ${Math.round(estadisticasGenerales.promedioGeneral * 100) / 100}`);

console.log('\n✅ Sistema de análisis académico completado exitosamente!');


// *******************************************
console.log('--- Intentando Matricular Estudiante 1 (Éxito) ---');
const resultado1 = registrarMatricula('Sofía Herrera',"19", 'Teologia', 500);
console.log(resultado1);

console.log('\n--- Intentando Matricular Estudiante 2 (Fallo por Pago) ---');
const resultado2 = registrarMatricula('Carlos Soto', '24', 'Locución', 6000);
console.log(resultado2);

console.log('\n--- Base de Datos Actual ---');
console.log(estudiantes);


//**************************************
console.log('----------------------------------------------------');
console.log('🎯 RESULTADOS DEL CÁLCULO DE GPA');
console.log('----------------------------------------------------');

// 1. GPA de Ana García (ID: 1)
const gpaAna = obtenerGPAEstudiante(1);
console.log(`GPA de ${gpaAna.nombre}: ${gpaAna.gpa}`); // Resultado: 8.44

// 2. GPA de Carlos López (ID: 2)
const gpaCarlos = obtenerGPAEstudiante(2);
console.log(`GPA de ${gpaCarlos.nombre}: ${gpaCarlos.gpa}`); // Resultado: 7.37

console.log('\n----------------------------------------------------');
console.log('🔍 RESULTADOS DE FILTROS');
console.log('----------------------------------------------------');

// 3. Filtrar por estudiantes activos
const activos = filtrarEstudiantes('activos').map(e => e.nombre);
console.log(`Estudiantes Activos: ${activos.join(', ')}`); // Resultado: Ana García, Carlos López

// 4. Filtrar por carrera 'Arquitectura'
const arquitectura = filtrarEstudiantes('carrera', 'Arquitectura').map(e => e.nombre);
console.log(`Estudiantes de Arquitectura: ${arquitectura.join(', ')}`); // Resultado: María Rodríguez

console.log('\n----------------------------------------------------');
console.log('👑 MEJOR PROMEDIO POR CARRERA');
console.log('----------------------------------------------------');

// 5. Encontrar el mejor promedio en Ingeniería Informática
const mejorInformatica = encontrarMejorPromedioPorCarrera('Ingeniería Informática');
console.log(`Mejor promedio en ${mejorInformatica.carrera}: ${mejorInformatica.nombre} con GPA ${mejorInformatica.gpa}`);  


// *********************************************************