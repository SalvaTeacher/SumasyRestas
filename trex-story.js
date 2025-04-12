// Datos para la historia de dinosaurios con T-Rex
function getTrexData() {
    // Generar operaciones aleatorias
    const operacion1 = generarSumaSinAcarreo();
    const operacion2 = generarRestaSinPrestamo();
    const operacion3 = generarSumaSinAcarreo();
    const operacion4 = generarRestaSinPrestamo();
    
    return {
        titulo: "Aventura de Rex y Mini-Rex",
        intro: {
            imagen: "./img/trex/trex_bosque.png",
            texto1: "¡Hola! Soy Rex el Tiranosaurio y este es mi hijo, Mini-Rex. Hemos descubierto un mapa que lleva a un valle secreto.",
            texto2: "Para llegar al valle secreto, necesitamos resolver unos retos matemáticos en el camino. ¿Nos ayudarías a resolverlos?"
        },
        desafios: [
            {
                imagen: "./img/trex/trex_pradera.png",
                texto: "Rex y Mini-Rex han llegado a una gran pradera con rocas talladas con símbolos misteriosos.",
                pregunta: "Para seguir adelante, necesitan resolver esta suma:",
                operador: operacion1.operador,
                num1: operacion1.num1,
                num2: operacion1.num2,
                respuesta: operacion1.respuesta,
                ayuda: operacion1.ayuda
            },
            {
                imagen: "./img/trex/trex_cascada.png",
                texto: "¡Han llegado a una cascada! Mini-Rex encontró más símbolos matemáticos en unas piedras brillantes.",
                pregunta: "¿Puedes ayudarles a resolver esta resta?",
                operador: operacion2.operador,
                num1: operacion2.num1,
                num2: operacion2.num2,
                respuesta: operacion2.respuesta,
                ayuda: operacion2.ayuda
            },
            {
                imagen: "./img/trex/trex_cueva.png",
                texto: "Rex y Mini-Rex entran en una cueva con pinturas rupestres que muestran números antiguos.",
                pregunta: "¿Puedes resolver esta suma para que puedan avanzar?",
                operador: operacion3.operador,
                num1: operacion3.num1,
                num2: operacion3.num2,
                respuesta: operacion3.respuesta,
                ayuda: operacion3.ayuda
            },
            {
                imagen: "./img/trex/trex_montaña.png",
                texto: "¡Ya pueden ver el valle secreto desde lo alto de la montaña! Solo queda un desafío.",
                pregunta: "Resuelve esta resta para que puedan entrar al valle:",
                operador: operacion4.operador,
                num1: operacion4.num1,
                num2: operacion4.num2,
                respuesta: operacion4.respuesta,
                ayuda: operacion4.ayuda
            }
        ],
        final: {
            imagen: "./img/trex/trex_valle.png",
            texto1: "¡Lo lograron! Gracias a tu ayuda con las matemáticas, Rex y Mini-Rex han llegado al valle secreto.",
            texto2: "El valle está lleno de árboles frutales, agua fresca y muchos amigos dinosaurios para jugar.",
            texto3: "Rex y Mini-Rex están muy agradecidos por tu ayuda en esta increíble aventura matemática."
        }
    };
}
