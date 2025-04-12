// Variables globales
let historiaSeleccionada = "";
let historiaData = {};
let desafios = [];
let puntuacion = 0;

// Función para seleccionar historia
function selectStory(historia, elemento) {
    // Quitar clase 'selected' a todos los elementos
    document.querySelectorAll('.story-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Agregar clase 'selected' al elemento clickeado
    elemento.classList.add('selected');
    
    // Guardar la historia seleccionada
    historiaSeleccionada = historia;
    
    // Habilitar el botón de inicio
    document.getElementById('startBtn').disabled = false;
}

// Función para cargar la historia seleccionada
function cargarHistoriaSeleccionada() {
    if (!historiaSeleccionada) return;
    
    // Mostrar indicador de carga
    document.querySelector('.loading').style.display = 'block';
    
    // Simular carga de datos (sustituir por una carga real de datos si es necesario)
    setTimeout(() => {
        // Ocultar indicador de carga
        document.querySelector('.loading').style.display = 'none';
        
        // Cargar datos según la historia seleccionada
        cargarDatosHistoria(historiaSeleccionada);
        
        // Cambiar a la página de introducción
        cambiarPagina(0, 1);
    }, 1000);
}

// Función para cargar datos según la historia seleccionada
function cargarDatosHistoria(historia) {
    // Cargar datos según la historia seleccionada
    if (historia === "dinosaurios") {
        historiaData = getDinosauriosData();
    }
    // Datos para la historia del espacio
    else if (historia === "espacio") {
        historiaData = getEspacioData();
    }
    // Datos para la historia del océano
    else if (historia === "oceano") {
        historiaData = getOceanoData();
    }
    // Datos para la historia del TRex
    else if (historia === "trex") {
        historiaData = getTrexData();
    }

    // Actualizar el título principal
    document.getElementById('main-title').textContent = historiaData.titulo;
    
    // Cargar datos de introducción
    document.getElementById('intro-image').src = historiaData.intro.imagen;
    document.getElementById('intro-text1').textContent = historiaData.intro.texto1;
    document.getElementById('intro-text2').textContent = historiaData.intro.texto2;
    
    // Guardar desafíos
    desafios = historiaData.desafios;
    
    // Cargar desafíos
    cargarDesafio(2, 0); // Página 2, primer desafío
    cargarDesafio(3, 1); // Página 3, segundo desafío
    cargarDesafio(4, 2); // Página 4, tercer desafío
    cargarDesafio(5, 3); // Página 5, cuarto desafío
    
    // Cargar final
    document.getElementById('finale-image').src = historiaData.final.imagen;
    document.getElementById('finale-text1').textContent = historiaData.final.texto1;
    document.getElementById('finale-text2').textContent = historiaData.final.texto2;
    document.getElementById('finale-text3').textContent = historiaData.final.texto3;
}

// Script adicional para manejar el bloque de números compartido 

document.addEventListener('DOMContentLoaded', function() {
    // Estilo inicial para el bloque compartido de números
    const sharedNumberOptions = document.getElementById('shared-number-options');
    sharedNumberOptions.style.display = 'none';
    
    // Modificar el manejo de páginas para mostrar/ocultar el bloque de números
    const originalShowPage = window.showPage || function(pageNum) {
        // Ocultar todas las páginas
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Mostrar la página solicitada
        document.getElementById('page' + pageNum).classList.add('active');
        
        // Manejar el bloque de números compartido
        if (pageNum >= 2 && pageNum <= 5) {
            // Posicionar el bloque compartido en la página actual
            const currentPage = document.getElementById('page' + pageNum);
            const calculationElement = currentPage.querySelector('.calculation');
            
            if (calculationElement) {
                // Insertar después del cálculo y antes del feedback
                const feedbackElement = currentPage.querySelector('.feedback');
                if (feedbackElement) {
                    currentPage.insertBefore(sharedNumberOptions, feedbackElement);
                } else {
                    // Si no hay elemento feedback, insertar al final
                    currentPage.appendChild(sharedNumberOptions);
                }
            }
            
            // Actualizar IDs para la página actual
            updateNumberIds(pageNum);
            
            // Mostrar el bloque compartido
            sharedNumberOptions.style.display = 'flex';
        } else {
            // Ocultar el bloque compartido en otras páginas
            sharedNumberOptions.style.display = 'none';
        }
    };
    
    // Reemplazar la función original si existe, si no crear una nueva
    window.showPage = originalShowPage;
    
    // Reemplaza la función updateNumberIds en scripts.js
    function updateNumberIds(pageNum) {
        const numbers = sharedNumberOptions.querySelectorAll('.number-option');
        numbers.forEach(num => {
            // Obtener el valor del número (0-9)
            const value = num.getAttribute('data-value');
            
            // Actualizar el ID para la página actual sin cambiar el ID base
            num.id = `num${value}`;
            
            // Asegurarnos que el atributo draggable está establecido
            num.draggable = true;
            num.style.cursor = 'grab';
            num.style.opacity = '1';
        });
}
    
    // Actualizar la función de arrastrar para trabajar con el nuevo sistema
    const originalDrag = window.drag || function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };
    window.drag = originalDrag;
});


// Función para cargar desafío
function cargarDesafio(pagina, indiceDesafio) {
    const desafio = desafios[indiceDesafio];
    
    // Cargar imagen y textos
    document.getElementById(`challenge${indiceDesafio+1}-image`).src = desafio.imagen;
    document.getElementById(`story${pagina}`).textContent = desafio.texto;
    document.getElementById(`question${pagina}`).textContent = desafio.pregunta;
    
    // Cargar operación
    document.getElementById(`operador${pagina}`).textContent = desafio.operador;
    
    // Mostrar los números
    const num1 = desafio.num1.toString().padStart(2, '0');
    const num2 = desafio.num2.toString().padStart(2, '0');
    
    document.getElementById(`decenas1-reto${pagina}`).textContent = num1[0];
    document.getElementById(`unidades1-reto${pagina}`).textContent = num1[1];
    document.getElementById(`decenas2-reto${pagina}`).textContent = num2[0];
    document.getElementById(`unidades2-reto${pagina}`).textContent = num2[1];
    
    // Generar texto de ayuda personalizado según la operación actual
    actualizarTextoAyuda(indiceDesafio);
    
    // Ocultar feedbacks y ayudas
    document.getElementById(`feedback${pagina}`).textContent = '';
    document.getElementById(`feedback${pagina}`).className = 'feedback';
    document.getElementById(`help${pagina}`).style.display = 'none';
    
    // Limpiar las zonas de arrastre
    const dropZone1 = document.getElementById(`dropZone1-${pagina}`);
    const dropZone2 = document.getElementById(`dropZone2-${pagina}`);
    
    if (dropZone1.firstChild) dropZone1.removeChild(dropZone1.firstChild);
    if (dropZone2.firstChild) dropZone2.removeChild(dropZone2.firstChild);
    
    // Rehabilitar los elementos de arrastre
    rehabilitarArrastre(pagina);
}

// Nueva función para actualizar el texto de ayuda basado en la operación actual
function actualizarTextoAyuda(indiceDesafio) {
    const desafio = desafios[indiceDesafio];
    const num1 = desafio.num1;
    const num2 = desafio.num2;
    const operador = desafio.operador;
    
    let ayudaTexto = "";
    
    if (operador === "+") {
        ayudaTexto = `Para sumar ${num1} + ${num2}, junta ${num1} objetos con ${num2} objetos y cuenta cuántos tienes en total.`;
    } else if (operador === "-") {
        ayudaTexto = `Para restar ${num1} - ${num2}, comienza con ${num1} objetos y quita ${num2}. Cuenta cuántos quedan.`;
    } else if (operador === "×") {
        ayudaTexto = `Para multiplicar ${num1} × ${num2}, suma ${num1} un total de ${num2} veces, o ${num2} un total de ${num1} veces.`;
    } else if (operador === "÷") {
        ayudaTexto = `Para dividir ${num1} ÷ ${num2}, reparte ${num1} objetos en ${num2} grupos iguales. ¿Cuántos hay en cada grupo?`;
    }
    
    // Actualizar el texto de ayuda en el objeto de desafío
    desafios[indiceDesafio].ayuda = ayudaTexto;
}

// Modificación de la función para cambiar de página
function cambiarPagina(actual, siguiente) {
    document.getElementById(`page${actual}`).classList.remove('active');
    document.getElementById(`page${siguiente}`).classList.add('active');
    
    // Mostrar los números en páginas de desafíos (2-5)
    const sharedNumberOptions = document.getElementById('shared-number-options');
    if (siguiente >= 2 && siguiente <= 5) {
        sharedNumberOptions.style.display = 'flex';
    } else {
        sharedNumberOptions.style.display = 'none';
    }
    
    window.scrollTo(0, 0);
}

// Función para iniciar el juego
function iniciarJuego() {
    cambiarPagina(1, 2);
}

// Función para verificar la respuesta arrastrando
function checkDragAnswer(pagina) {
    const indiceDesafio = pagina - 2;
    const respuestaCorrecta = desafios[indiceDesafio].respuesta;
    
    const dropZone1 = document.getElementById(`dropZone1-${pagina}`);
    const dropZone2 = document.getElementById(`dropZone2-${pagina}`);
    
    // Verificar si las zonas de arrastre tienen elementos
    if (!dropZone1.firstChild || !dropZone2.firstChild) {
        document.getElementById(`feedback${pagina}`).textContent = "¡Por favor coloca los números en ambas casillas!";
        document.getElementById(`feedback${pagina}`).className = 'feedback negative';
        
        // Resaltar las zonas vacías
        if (!dropZone1.firstChild) dropZone1.classList.add('highlight-dropzone');
        if (!dropZone2.firstChild) dropZone2.classList.add('highlight-dropzone');
        
        // Quitar la clase después de un tiempo
        setTimeout(() => {
            dropZone1.classList.remove('highlight-dropzone');
            dropZone2.classList.remove('highlight-dropzone');
        }, 800);
        
        return;
    }
    
    // Obtener la respuesta del usuario - convertir explícitamente a números
    const valor1 = parseInt(dropZone1.firstChild.dataset.value || "0", 10);
    const valor2 = parseInt(dropZone2.firstChild.dataset.value || "0", 10);
    const respuestaUsuario = valor1 * 10 + valor2;
    
    // Verificar si la respuesta es correcta
    if (respuestaUsuario === respuestaCorrecta) {
        document.getElementById(`feedback${pagina}`).textContent = "¡Correcto! ¡Muy bien hecho!";
        document.getElementById(`feedback${pagina}`).className = 'feedback positive';
        puntuacion++;
        
        // Deshabilitar los elementos de arrastre
        deshabilitarArrastre(pagina);
        
        // Mostrar el botón para continuar
        setTimeout(() => {
            if (pagina < 5) {
                cambiarPagina(pagina, pagina + 1);
            } else {
                cambiarPagina(pagina, 6);
            }
        }, 1500);
    } else {
        document.getElementById(`feedback${pagina}`).textContent = "¡Ups! Esa no es la respuesta correcta. ¡Inténtalo de nuevo!";
        document.getElementById(`feedback${pagina}`).className = 'feedback negative';
    }
}

// Función para mostrar ayuda (versión mejorada para depuración)
function showHelp(pagina) {
    const indiceDesafio = pagina - 2;
    const ayudaElement = document.getElementById(`help${pagina}`);
    
    // Asegurar que el texto de ayuda esté actualizado
    actualizarTextoAyuda(indiceDesafio);
    
    ayudaElement.textContent = desafios[indiceDesafio].ayuda;
    ayudaElement.style.display = 'block';
}

// Función para deshabilitar el arrastre
function deshabilitarArrastre(pagina) {
    const options = document.querySelectorAll(`#page${pagina} .number-option`);
    options.forEach(option => {
        option.draggable = false;
        option.style.cursor = 'default';
        option.style.opacity = '0.6';
    });
}

// Función para rehabilitar el arrastre
function rehabilitarArrastre(pagina) {
    const options = document.querySelectorAll(`#page${pagina} .number-option`);
    options.forEach(option => {
        option.draggable = true;
        option.style.cursor = 'grab';
        option.style.opacity = '1';
    });
}

// Función para mostrar el resultado correcto
function showResult(pagina) {
    const indiceDesafio = pagina - 2;
    const respuestaCorrecta = desafios[indiceDesafio].respuesta.toString().padStart(2, '0');
    
    // Mostrar feedback con la respuesta correcta
    document.getElementById(`feedback${pagina}`).textContent = `La respuesta correcta es: ${respuestaCorrecta}`;
    document.getElementById(`feedback${pagina}`).className = 'feedback neutral';
    
    // Mostrar visualmente la respuesta correcta en las zonas de arrastre
    const dropZone1 = document.getElementById(`dropZone1-${pagina}`);
    const dropZone2 = document.getElementById(`dropZone2-${pagina}`);
    
    // Limpiar las zonas de arrastre
    if (dropZone1.firstChild) dropZone1.removeChild(dropZone1.firstChild);
    if (dropZone2.firstChild) dropZone2.removeChild(dropZone2.firstChild);
    
    // Crear elementos para mostrar los dígitos correctos
    const digit1 = respuestaCorrecta[0];
    const digit2 = respuestaCorrecta[1];
    
    // Clonar imágenes de números existentes para usarlas como respuesta
    const num1Elem = document.getElementById(`num${digit1}-${pagina}`).cloneNode(true);
    const num2Elem = document.getElementById(`num${digit2}-${pagina}`).cloneNode(true);
    
    // Configurar los elementos clonados
    num1Elem.id = `num${digit1}-${pagina}-result`;
    num2Elem.id = `num${digit2}-${pagina}-result`;
    num1Elem.style.width = '100%';
    num1Elem.style.height = '100%';
    num1Elem.draggable = false;
    num2Elem.style.width = '100%';
    num2Elem.style.height = '100%';
    num2Elem.draggable = false;
    
    // Añadir los elementos a las zonas de arrastre
    dropZone1.appendChild(num1Elem);
    dropZone2.appendChild(num2Elem);
    
    // Mostrar pistas sobre cómo se calculó el resultado
    document.getElementById(`help${pagina}`).textContent = getExplanation(pagina);
    document.getElementById(`help${pagina}`).style.display = 'block';
    
    // Deshabilitar elementos de arrastre
    deshabilitarArrastre(pagina);
}

// Función para obtener la explicación del cálculo
function getExplanation(pagina) {
    const indiceDesafio = pagina - 2;
    const desafio = desafios[indiceDesafio];
    let explicacion = "";
    
    // Preparar la explicación según el tipo de operación
    if (desafio.operador === "+") {
        explicacion = `${desafio.num1} + ${desafio.num2} = ${desafio.respuesta}`;
    } else if (desafio.operador === "-") {
        explicacion = `${desafio.num1} - ${desafio.num2} = ${desafio.respuesta}`;
    } else if (desafio.operador === "×") {
        explicacion = `${desafio.num1} × ${desafio.num2} = ${desafio.respuesta}`;
    } else if (desafio.operador === "÷") {
        explicacion = `${desafio.num1} ÷ ${desafio.num2} = ${desafio.respuesta}`;
    }
    
    return `Explicación: ${explicacion}`;
}

// Función para generar una nueva operación matemática (versión actualizada)
function newOperation(pagina) {
    const indiceDesafio = pagina - 2;
    const desafio = desafios[indiceDesafio];
    const operador = desafio.operador;
    
    // Generar nuevos números según el tipo de operación
    let nuevaOperacion;
    
    if (operador === "+") {
        nuevaOperacion = generarSumaSinAcarreo();
    } else if (operador === "-") {
        nuevaOperacion = generarRestaSinPrestamo();
    } else if (operador === "×") {
        // Mantener la lógica existente para multiplicación
        // O implementar una función similar para multiplicaciones simples
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * (Math.floor(99 / Math.max(1, num1))));
        let respuesta = num1 * num2;
        nuevaOperacion = {
            num1: num1,
            num2: num2,
            respuesta: respuesta,
            operador: "×"
        };
    } else if (operador === "÷") {
        // Mantener la lógica existente para división
        // O implementar una función similar para divisiones simples
        let respuesta = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10) + 1;
        let num1 = respuesta * num2;
        nuevaOperacion = {
            num1: num1,
            num2: num2,
            respuesta: respuesta,
            operador: "÷"
        };
    }
    
    // Actualizar el desafío con los nuevos números
    desafios[indiceDesafio].num1 = nuevaOperacion.num1;
    desafios[indiceDesafio].num2 = nuevaOperacion.num2;
    desafios[indiceDesafio].respuesta = nuevaOperacion.respuesta;
    
    // Actualizar el texto de ayuda
    actualizarTextoAyuda(indiceDesafio);
    
    // Recargar el desafío en la página
    cargarDesafio(pagina, indiceDesafio);
    
    // Mostrar mensaje de nueva operación
    document.getElementById(`feedback${pagina}`).textContent = "¡Nueva operación generada! Intenta resolverla.";
    document.getElementById(`feedback${pagina}`).className = 'feedback neutral';
    setTimeout(() => {
        document.getElementById(`feedback${pagina}`).textContent = '';
        document.getElementById(`feedback${pagina}`).className = 'feedback';
    }, 3000);
}

// Función para manejar el arrastre - permitir la zona de soltar
function allowDrop(ev) {
    ev.preventDefault();
}

// Función para manejar el arrastre - arrastrar
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("value", ev.target.dataset.value);
}

// Modificación de la función drop para manejar los IDs correctamente
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const value = ev.dataTransfer.getData("value");
    
    // Identificar la zona de destino correcta
    let dropTarget = ev.target;
    
    // Si el objetivo no es una zona de soltar directamente, buscar el padre
    if (!dropTarget.classList.contains('drop-zone')) {
        dropTarget = dropTarget.parentElement;
        if (!dropTarget || !dropTarget.classList.contains('drop-zone')) {
            return;
        }
    }
    
    // Limpiar cualquier contenido previo en la zona de soltar
    while (dropTarget.firstChild) {
        dropTarget.removeChild(dropTarget.firstChild);
    }
    
    // Crear una copia del elemento arrastrado
    const originalElement = document.getElementById(data);
    const newElement = originalElement.cloneNode(true);
    
    // Usar un ID único para el elemento copiado
    newElement.id = `${data}-dropped-${Date.now()}`;
    newElement.dataset.value = value;
    newElement.style.width = '100%';
    newElement.style.height = '100%';
    newElement.draggable = false;
    
    // Añadir el nuevo elemento a la zona de soltar
    dropTarget.appendChild(newElement);
}


// Función para volver al inicio
function volverAlInicio() {
    // Resetear variables
    historiaSeleccionada = "";
    puntuacion = 0;
    
    // Quitar selección de las tarjetas
    document.querySelectorAll('.story-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Deshabilitar botón de inicio
    document.getElementById('startBtn').disabled = true;
    
    // Volver a la página inicial
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page0').classList.add('active');
    
    window.scrollTo(0, 0);
}

// Código opcional para precargar imágenes (mejora el rendimiento)
function precargarImagenes() {
    const imagenes = [
        "./img/numeros/paisaje_dinosaurios.png",
        "./img/numeros/espacio.png",
        "./img/numeros/oceano.png",
        "./img/numeros/triceratops_intro.png",
        "./img/numeros/astronauta_intro.png",
        "./img/numeros/sirena_intro.png",
        "./img/numeros/final_tesoro.png",
        "./img/numeros/espacio_final.png",
        "./img/numeros/oceano_final.png",
        // Añadir imágenes de los números
        "./img/numeros/numero_cero.png",
        "./img/numeros/numero_uno.png",
        "./img/numeros/numero_dos.png",
        "./img/numeros/numero_tres.png",
        "./img/numeros/numero_cuatro.png",
        "./img/numeros/numero_cinco.png",
        "./img/numeros/numero_seis.png",
        "./img/numeros/numero_siete.png",
        "./img/numeros/numero_ocho.png",
        "./img/numeros/numero_nueve.png"
    ];
    
    // Precargar cada imagen
    imagenes.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Ejecutar la precarga de imágenes cuando se carga la página
window.addEventListener('load', precargarImagenes);

// Asegurarse de que el bloque de números esté visible cuando se carga un desafío
window.addEventListener('DOMContentLoaded', function() {
    // Solo mostrar los números en las páginas de desafíos
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        const pageId = currentPage.id;
        if (pageId.startsWith('page') && pageId !== 'page0' && pageId !== 'page1' && pageId !== 'page6') {
            document.getElementById('shared-number-options').style.display = 'flex';
        }
    }
});

// Código a añadir al final de scripts.js

// Variables para el manejo táctil
let selectedNumberElement = null;
let touchPreview = null;

// Función para añadir soporte táctil a los elementos arrastrables
function setupTouchEvents() {
    // Sólo configurar el soporte táctil si es un dispositivo táctil
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        console.log('Configurando soporte táctil para arrastrar y soltar');
        
        // Añadir eventos táctiles a los números
        document.querySelectorAll('.number-option').forEach(num => {
            num.addEventListener('touchstart', handleNumberTouchStart, { passive: false });
        });
        
        // Añadir eventos táctiles a las zonas de destino
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('touchstart', handleDropZoneTouchStart, { passive: false });
            zone.addEventListener('touchend', handleDropZoneTouchEnd, { passive: false });
        });
        
        // Manejar toques en otras áreas para cancelar la selección
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.number-option') && !e.target.closest('.drop-zone')) {
                clearTouchSelection();
            }
        }, { passive: true });
    }
}

// Manejar el inicio de toque en un número
function handleNumberTouchStart(e) {
    e.preventDefault(); // Prevenir el comportamiento de desplazamiento por defecto
    
    // Limpiar selección anterior
    clearTouchSelection();
    
    // Marcar este número como seleccionado
    selectedNumberElement = this;
    selectedNumberElement.classList.add('touch-selected');
    
    // Crear indicador visual de elemento seleccionado
    createTouchPreview(this);
    
    // Mostrar mensaje de instrucción
    showTouchInstructions("Número seleccionado. Toca una casilla para colocarlo.");
}

// Manejar el inicio de toque en una zona de destino
function handleDropZoneTouchStart(e) {
    e.preventDefault();
    
    // Si hay un número seleccionado, resaltar la zona
    if (selectedNumberElement) {
        this.classList.add('touch-highlight');
    }
}

// Manejar el fin de toque en una zona de destino
function handleDropZoneTouchEnd(e) {
    e.preventDefault();
    
    // Quitar resaltado
    this.classList.remove('touch-highlight');
    
    // Si hay un número seleccionado, colocarlo en esta zona
    if (selectedNumberElement) {
        // Limpiar contenido previo en la zona
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        
        // Crear copia del número seleccionado
        const clone = selectedNumberElement.cloneNode(true);
        clone.id = `${selectedNumberElement.id}-dropped-${Date.now()}`;
        clone.dataset.value = selectedNumberElement.dataset.value;
        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.classList.remove('touch-selected');
        clone.draggable = false;
        
        // Añadir el clon a la zona
        this.appendChild(clone);
        
        // Limpiar la selección
        clearTouchSelection();
    }
}

// Crear un indicador visual para el elemento seleccionado
function createTouchPreview(element) {
    // Crear un elemento flotante para mostrar el número seleccionado
    touchPreview = document.createElement('div');
    touchPreview.className = 'touch-preview';
    touchPreview.style.position = 'fixed';
    touchPreview.style.zIndex = '1000';
    touchPreview.style.bottom = '20px';
    touchPreview.style.left = '50%';
    touchPreview.style.transform = 'translateX(-50%)';
    touchPreview.style.padding = '10px';
    touchPreview.style.backgroundColor = 'rgba(255, 255, 0, 0.8)';
    touchPreview.style.border = '2px solid #333';
    touchPreview.style.borderRadius = '8px';
    touchPreview.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    
    // Añadir imagen del número
    const previewImg = document.createElement('img');
    previewImg.src = element.src;
    previewImg.style.width = '50px';
    previewImg.style.height = '50px';
    touchPreview.appendChild(previewImg);
    
    // Añadir al DOM
    document.body.appendChild(touchPreview);
}

// Mostrar instrucciones de toque
function showTouchInstructions(message) {
    // Buscar instrucciones existentes o crear nuevas
    let instructions = document.getElementById('touch-instructions');
    if (!instructions) {
        instructions = document.createElement('div');
        instructions.id = 'touch-instructions';
        instructions.style.position = 'fixed';
        instructions.style.top = '10px';
        instructions.style.left = '50%';
        instructions.style.transform = 'translateX(-50%)';
        instructions.style.padding = '8px 12px';
        instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        instructions.style.color = 'white';
        instructions.style.borderRadius = '4px';
        instructions.style.fontSize = '14px';
        instructions.style.zIndex = '1001';
        instructions.style.maxWidth = '80%';
        instructions.style.textAlign = 'center';
        document.body.appendChild(instructions);
    }
    
    // Actualizar mensaje
    instructions.textContent = message;
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        if (instructions.parentNode) {
            instructions.parentNode.removeChild(instructions);
        }
    }, 3000);
}

// Limpiar la selección actual
function clearTouchSelection() {
    // Quitar clase de selección
    if (selectedNumberElement) {
        selectedNumberElement.classList.remove('touch-selected');
        selectedNumberElement = null;
    }
    
    // Eliminar vista previa si existe
    if (touchPreview && touchPreview.parentNode) {
        touchPreview.parentNode.removeChild(touchPreview);
        touchPreview = null;
    }
    
    // Quitar cualquier resaltado de zonas
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('touch-highlight');
    });
}

// Añadir estilos para soporte táctil
function addTouchStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .touch-selected {
            box-shadow: 0 0 0 3px yellow, 0 0 10px 5px rgba(255,255,0,0.5);
            transform: scale(1.1);
            z-index: 10;
        }
        
        .touch-highlight {
            box-shadow: 0 0 0 3px #4CAF50, 0 0 10px 3px rgba(76,175,80,0.5);
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 3px #4CAF50, 0 0 10px 3px rgba(76,175,80,0.5); }
            50% { box-shadow: 0 0 0 5px #4CAF50, 0 0 15px 5px rgba(76,175,80,0.7); }
            100% { box-shadow: 0 0 0 3px #4CAF50, 0 0 10px 3px rgba(76,175,80,0.5); }
        }
        
        @media (max-width: 768px) {
            .number-options {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
            }
            
            .number-option {
                margin: 5px;
                max-width: 50px;
                max-height: 50px;
            }
            
            .drop-zone {
                min-height: 50px;
                min-width: 50px;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Ejecutar la configuración de eventos táctiles cuando se carga la página
window.addEventListener('DOMContentLoaded', function() {
    // Añadir estilos para soporte táctil
    addTouchStyles();
    
    // Configurar eventos táctiles
    setupTouchEvents();
});

// Asegurarse de configurar eventos táctiles después de cambiar de página
const originalCambiarPagina = cambiarPagina;
cambiarPagina = function(actual, siguiente) {
    originalCambiarPagina(actual, siguiente);
    
    // Reconfigurar eventos táctiles después de un breve retraso
    setTimeout(setupTouchEvents, 200);
};

// Mejoras a la adaptación móvil - asegurarse de que los números sean fáciles de tocar
function optimizarInterfazMovil() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    
    if (isMobile) {
        console.log('Optimizando para interfaz móvil');
        
        // Ajustar el tamaño de los elementos para una mejor experiencia táctil
        document.querySelectorAll('.number-option').forEach(num => {
            num.style.margin = '8px';
            num.style.minHeight = '45px';
            num.style.minWidth = '45px';
        });
        
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.style.minHeight = '50px';
            zone.style.minWidth = '50px';
        });
        
        // Añadir mensaje de instrucción al inicio
        setTimeout(() => {
            showTouchInstructions("Toca un número y luego toca una casilla para colocarlo");
        }, 1000);
    }
}

// Ejecutar optimización móvil al cargar la página
window.addEventListener('load', optimizarInterfazMovil);