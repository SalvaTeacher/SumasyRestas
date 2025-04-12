// Funciones compartidas para generar operaciones matemáticas

// Función para generar una suma aleatoria de dos cifras sin acarreo
function generarSumaSinAcarreo() {
    let decenas1 = Math.floor(Math.random() * 9) + 1; // 1-9
    let decenas2 = Math.floor(Math.random() * (9 - decenas1 + 1)); // Asegura que la suma de decenas sea <= 9
    let unidades1 = Math.floor(Math.random() * 9); // 0-8
    let unidades2 = Math.floor(Math.random() * (9 - unidades1)); // Asegura que la suma de unidades sea <= 9
    
    let num1 = decenas1 * 10 + unidades1;
    let num2 = decenas2 * 10 + unidades2;
    let resultado = num1 + num2;
    
    return {
        num1: num1,
        num2: num2,
        respuesta: resultado,
        operador: "+",
        ayuda: `Para resolver esta suma, primero suma las unidades (${unidades1}+${unidades2}=${unidades1+unidades2}) y luego las decenas (${decenas1}+${decenas2}=${decenas1+decenas2}). El resultado es ${resultado}.`
    };
}

// Función para generar una resta aleatoria de dos cifras sin préstamo
function generarRestaSinPrestamo() {
    let decenas1 = Math.floor(Math.random() * 8) + 2; // 2-9
    let decenas2 = Math.floor(Math.random() * decenas1); // Asegura que decenas2 < decenas1
    let unidades1 = Math.floor(Math.random() * 9) + 1; // 1-9
    let unidades2 = Math.floor(Math.random() * unidades1); // Asegura que unidades2 < unidades1
    
    let num1 = decenas1 * 10 + unidades1;
    let num2 = decenas2 * 10 + unidades2;
    let resultado = num1 - num2;
    
    return {
        num1: num1,
        num2: num2,
        respuesta: resultado,
        operador: "-",
        ayuda: `Para resolver esta resta, primero resta las unidades (${unidades1}-${unidades2}=${unidades1-unidades2}) y luego las decenas (${decenas1}-${decenas2}=${decenas1-decenas2}). El resultado es ${resultado}.`
    };
}
