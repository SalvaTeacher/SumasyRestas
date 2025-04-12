// Datos para la historia del espacio
function getEspacioData() {
    // Generar operaciones aleatorias
    const operacion1 = generarSumaSinAcarreo();
    const operacion2 = generarRestaSinPrestamo();
    const operacion3 = generarSumaSinAcarreo();
    const operacion4 = generarRestaSinPrestamo();
    
    return {
        titulo: "Aventura Espacial con Astro",
        intro: {
            imagen: "./img/espacio/astronauta_intro.png",
            texto1: "¡Hola! Soy Astro, y estoy en una misión espacial muy importante.",
            texto2: "Necesito resolver problemas matemáticos para navegar entre planetas. ¿Me ayudas en mi viaje espacial?"
        },
        desafios: [
            {
                imagen: "./img/espacio/espacio_desafio1.png",
                texto: "Astro necesita calcular la distancia para llegar al primer planeta.",
                pregunta: "¿Puedes resolver esta suma para ajustar los motores?",
                operador: operacion1.operador,
                num1: operacion1.num1,
                num2: operacion1.num2,
                respuesta: operacion1.respuesta,
                ayuda: operacion1.ayuda
            },
            {
                imagen: "./img/espacio/espacio_desafio2.png",
                texto: "Astro ha aterrizado en el primer planeta y debe calcular el combustible restante.",
                pregunta: "¿Cuánto combustible queda después de este cálculo?",
                operador: operacion2.operador,
                num1: operacion2.num1,
                num2: operacion2.num2,
                respuesta: operacion2.respuesta,
                ayuda: operacion2.ayuda
            },
            {
                imagen: "./img/espacio/espacio_desafio3.png",
                texto: "Para viajar al siguiente planeta, Astro necesita calcular la velocidad correcta.",
                pregunta: "Resuelve esta operación para calcular la velocidad:",
                operador: operacion3.operador,
                num1: operacion3.num1,
                num2: operacion3.num2,
                respuesta: operacion3.respuesta,
                ayuda: operacion3.ayuda
            },
            {
                imagen: "./img/espacio/espacio_desafio4.png",
                texto: "Astro está cerca de completar su misión. Un último cálculo lo ayudará a volver a casa.",
                pregunta: "Resuelve esta operación para activar los propulsores de regreso:",
                operador: operacion4.operador,
                num1: operacion4.num1,
                num2: operacion4.num2,
                respuesta: operacion4.respuesta,
                ayuda: operacion4.ayuda
            }
        ],
        final: {
            imagen: "./img/espacio/espacio_final.png",
            texto1: "¡Misión cumplida! Gracias a tus habilidades matemáticas, Astro ha completado con éxito su exploración espacial.",
            texto2: "Ha descubierto nuevos planetas y ha recolectado valiosos datos científicos para la Tierra.",
            texto3: "¡Eres un excelente compañero de misión espacial!"
        }
    };
}
