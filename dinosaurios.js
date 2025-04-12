// Datos para la historia de dinosaurios
function getDinosauriosData() {
    // Generar operaciones aleatorias
    const operacion1 = generarSumaSinAcarreo();
    const operacion2 = generarRestaSinPrestamo();
    const operacion3 = generarSumaSinAcarreo();
    const operacion4 = generarRestaSinPrestamo();
    
    return {
        titulo: "Aventura de Trici el Triceratops",
        intro: {
            imagen: "./img/dinos/triceratops_arboles.png",
            texto1: "¡Hola! Soy Trici el Triceratops. He encontrado un mapa del tesoro en el Valle Jurásico.",
            texto2: "Para encontrar el tesoro, necesito resolver unos desafíos matemáticos. ¿Me ayudarías a resolverlos?"
        },
        desafios: [
            {
                imagen: "./img/dinos/triceratops_cueva.png",
                texto: "Trici ha llegado a una cueva con enigmas matemáticos en la entrada.",
                pregunta: "Para avanzar, necesita resolver esta suma:",
                operador: operacion1.operador,
                num1: operacion1.num1,
                num2: operacion1.num2,
                respuesta: operacion1.respuesta,
                ayuda: operacion1.ayuda
            },
            {
                imagen: "./img/dinos/triceratops_arbol.png",
                texto: "Trici ha cruzado un río y encuentra más acertijos matemáticos en un árbol.",
                pregunta: "¿Puedes ayudarle a resolver esta resta?",
                operador: operacion2.operador,
                num1: operacion2.num1,
                num2: operacion2.num2,
                respuesta: operacion2.respuesta,
                ayuda: operacion2.ayuda
            },
            {
                imagen: "./img/dinos/triceratops_montaña.png",
                texto: "Trici ha llegado a un claro donde hay una placa con números tallados.",
                pregunta: "¿Puedes resolver esta suma para continuar?",
                operador: operacion3.operador,
                num1: operacion3.num1,
                num2: operacion3.num2,
                respuesta: operacion3.respuesta,
                ayuda: operacion3.ayuda
            },
            {
                imagen: "./img/dinos/triceratops_rio.png",
                texto: "¡Ya casi llegamos al tesoro! Un último desafío nos espera.",
                pregunta: "Resuelve esta resta para desbloquear el cofre:",
                operador: operacion4.operador,
                num1: operacion4.num1,
                num2: operacion4.num2,
                respuesta: operacion4.respuesta,
                ayuda: operacion4.ayuda
            }
        ],
        final: {
            imagen: "./img/dinos/triceratops_tesoro.png",
            texto1: "¡Lo lograste! Gracias a tu ayuda con las matemáticas, Trici ha encontrado el tesoro.",
            texto2: "El cofre está lleno de brillantes gemas y conocimientos matemáticos.",
            texto3: "Trici está muy agradecido por tu ayuda en esta aventura."
        }
    };
}
