// Datos para la historia del océano
function getOceanoData() {
    // Generar operaciones aleatorias
    const operacion1 = generarSumaSinAcarreo();
    const operacion2 = generarRestaSinPrestamo();
    const operacion3 = generarSumaSinAcarreo();
    const operacion4 = generarRestaSinPrestamo();
    
    return {
        titulo: "Tesoro Submarino con Marina",
        intro: {
            imagen: "./img/oceano/sirena_intro.png",
            texto1: "¡Hola amigo! Soy Marina la sirena. He encontrado un mapa que indica la ubicación de un antiguo tesoro submarino.",
            texto2: "Para encontrarlo, necesito resolver acertijos matemáticos. ¿Me ayudas a descifrar los códigos numéricos?"
        },
        desafios: [
            {
                imagen: "./img/oceano/oceano_desafio1.png",
                texto: "Marina ha encontrado una cueva submarina con símbolos numéricos tallados en coral.",
                pregunta: "Resuelve esta suma para abrir la entrada de la cueva:",
                operador: operacion1.operador,
                num1: operacion1.num1,
                num2: operacion1.num2,
                respuesta: operacion1.respuesta,
                ayuda: operacion1.ayuda
            },
            {
                imagen: "./img/oceano/oceano_desafio2.png",
                texto: "Marina ha nadado más profundo y encuentra un pasadizo bloqueado por un código numérico.",
                pregunta: "¿Puedes resolver esta resta para continuar?",
                operador: operacion2.operador,
                num1: operacion2.num1,
                num2: operacion2.num2,
                respuesta: operacion2.respuesta,
                ayuda: operacion2.ayuda
            },
            {
                imagen: "./img/oceano/oceano_desafio3.png",
                texto: "Marina ha llegado a un jardín de coral con más acertijos matemáticos.",
                pregunta: "Resuelve esta suma para descifrar el siguiente paso:",
                operador: operacion3.operador,
                num1: operacion3.num1,
                num2: operacion3.num2,
                respuesta: operacion3.respuesta,
                ayuda: operacion3.ayuda
            },
            {
                imagen: "./img/oceano/oceano_desafio4.png",
                texto: "¡El cofre del tesoro está a la vista! Un último código numérico protege el cofre.",
                pregunta: "Resuelve esta resta para desbloquear el tesoro:",
                operador: operacion4.operador,
                num1: operacion4.num1,
                num2: operacion4.num2,
                respuesta: operacion4.respuesta,
                ayuda: operacion4.ayuda
            }
        ],
        final: {
            imagen: "./img/oceano/oceano_final.png",
            texto1: "¡Lo has conseguido! Gracias a tu ayuda, Marina ha encontrado el legendario tesoro submarino.",
            texto2: "El cofre contiene perlas resplandecientes y artefactos antiguos de gran valor.",
            texto3: "Marina compartirá el tesoro con todos los habitantes del océano. ¡Gracias por ayudarla en esta gran aventura matemática!"
        }
    };
}
