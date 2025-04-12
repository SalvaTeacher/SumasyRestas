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

// Nuevo enfoque para dispositivos móviles - reemplaza completamente el sistema de arrastrar y soltar
// Añade esto al final de tu archivo scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("Dispositivo móvil detectado - Aplicando modo táctil");
        enableMobileTouchMode();
    }
});

function enableMobileTouchMode() {
    // Añadir clase al body para estilos específicos
    document.body.classList.add('mobile-device');
    
    // Remover todos los eventos de arrastrar y soltar existentes
    removeExistingDragEvents();
    
    // Añadir la interfaz de selección numérica para móviles
    setupMobileNumberSelection();
    
    // Observar cambios en el DOM para actualizar los controladores en páginas nuevas
    setupMutationObserver();
}

function removeExistingDragEvents() {
    // Eliminar atributos de arrastrar y eventos relacionados
    document.querySelectorAll('.number-option').forEach(num => {
        num.removeAttribute('draggable');
        num.removeAttribute('ondragstart');
    });
    
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.removeAttribute('ondrop');
        zone.removeAttribute('ondragover');
    });
}

function setupMobileNumberSelection() {
    // Para cada página con desafíos (2-5)
    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        setupPageForMobile(pageNum);
    }
}

function setupPageForMobile(pageNum) {
    const page = document.getElementById(`page${pageNum}`);
    if (!page) return;
    
    // Obtener las zonas de colocación
    const dropZone1 = page.querySelector(`#dropZone1-${pageNum}`);
    const dropZone2 = page.querySelector(`#dropZone2-${pageNum}`);
    
    if (!dropZone1 || !dropZone2) return;
    
    // Convertir zonas de colocación en botones seleccionables
    convertDropZoneToSelectable(dropZone1, pageNum, 1);
    convertDropZoneToSelectable(dropZone2, pageNum, 2);
    
    // Crear y añadir el selector de números
    createMobileNumberSelector(page, pageNum);
}

function convertDropZoneToSelectable(dropZone, pageNum, position) {
    // Limpiar cualquier contenido y eventos existentes
    dropZone.innerHTML = '';
    
    // Añadir indicador visual
    const placeholder = document.createElement('div');
    placeholder.className = 'mobile-placeholder';
    placeholder.textContent = '?';
    dropZone.appendChild(placeholder);
    
    // Añadir atributos de datos
    dropZone.dataset.pageNum = pageNum;
    dropZone.dataset.position = position;
    dropZone.classList.add('mobile-drop-zone');
    
    // Añadir evento de clic
    dropZone.addEventListener('click', function() {
        activateNumberSelector(dropZone);
    });
}

function createMobileNumberSelector(page, pageNum) {
    // Crear contenedor del selector de números
    const selector = document.createElement('div');
    selector.id = `mobile-number-selector-${pageNum}`;
    selector.className = 'mobile-number-selector';
    selector.style.display = 'none';
    
    // Añadir título
    const title = document.createElement('div');
    title.className = 'mobile-selector-title';
    title.textContent = 'Selecciona un número:';
    selector.appendChild(title);
    
    // Añadir botones de números
    const numberGrid = document.createElement('div');
    numberGrid.className = 'mobile-number-grid';
    
    for (let i = 0; i <= 9; i++) {
        const numButton = document.createElement('div');
        numButton.className = 'mobile-number-button';
        numButton.textContent = i;
        numButton.dataset.value = i;
        
        // Añadir evento de clic al botón
        numButton.addEventListener('click', function() {
            selectNumber(parseInt(this.dataset.value), pageNum);
        });
        
        numberGrid.appendChild(numButton);
    }
    selector.appendChild(numberGrid);
    
    // Añadir botón de cancelar
    const cancelButton = document.createElement('button');
    cancelButton.className = 'mobile-cancel-button';
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', function() {
        hideNumberSelector(pageNum);
    });
    selector.appendChild(cancelButton);
    
    // Añadir al DOM después del área de cálculo
    const calculationArea = page.querySelector('.calculation');
    if (calculationArea) {
        calculationArea.after(selector);
    } else {
        page.appendChild(selector);
    }
}

// Variable global para la zona actualmente seleccionada
let activeDropZone = null;

function activateNumberSelector(dropZone) {
    const pageNum = dropZone.dataset.pageNum;
    
    // Guardar referencia a la zona activa
    activeDropZone = dropZone;
    
    // Resaltar la zona seleccionada
    document.querySelectorAll('.mobile-drop-zone').forEach(zone => {
        zone.classList.remove('active');
    });
    dropZone.classList.add('active');
    
    // Mostrar el selector de números
    const selector = document.getElementById(`mobile-number-selector-${pageNum}`);
    if (selector) {
        // Ocultar todos los selectores primero
        document.querySelectorAll('.mobile-number-selector').forEach(sel => {
            sel.style.display = 'none';
        });
        
        // Mostrar el selector para esta página
        selector.style.display = 'block';
        
        // Scroll al selector
        selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function selectNumber(value, pageNum) {
    if (!activeDropZone) return;
    
    // Limpiar la zona de colocación
    activeDropZone.innerHTML = '';
    
    // Crear imagen del número
    const numImg = new Image();
    numImg.src = `./img/numeros/numero_${getNumberName(value)}.png`;
    numImg.alt = `numero_${value}`;
    numImg.className = 'mobile-selected-number';
    numImg.dataset.value = value;
    
    // Añadir la imagen a la zona
    activeDropZone.appendChild(numImg);
    
    // Ocultar el selector de números
    hideNumberSelector(pageNum);
    
    // Limpiar la zona activa
    activeDropZone.classList.remove('active');
    activeDropZone = null;
    
    // Verificar si ambas zonas tienen números y habilitar el botón comprobar
    checkIfBothZonesFilled(pageNum);
}

function getNumberName(value) {
    const numberNames = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    return numberNames[value] || 'cero';
}

function hideNumberSelector(pageNum) {
    const selector = document.getElementById(`mobile-number-selector-${pageNum}`);
    if (selector) {
        selector.style.display = 'none';
    }
    
    // Desactivar zona seleccionada
    if (activeDropZone) {
        activeDropZone.classList.remove('active');
        activeDropZone = null;
    }
}

function checkIfBothZonesFilled(pageNum) {
    const zone1 = document.querySelector(`#dropZone1-${pageNum}`);
    const zone2 = document.querySelector(`#dropZone2-${pageNum}`);
    
    const hasNumber1 = zone1 && zone1.querySelector('.mobile-selected-number');
    const hasNumber2 = zone2 && zone2.querySelector('.mobile-selected-number');
    
    if (hasNumber1 && hasNumber2) {
        // Opcional: resaltar el botón comprobar
        const checkButton = document.querySelector(`#page${pageNum} button`);
        if (checkButton) {
            checkButton.classList.add('ready');
            
            // Mostrar animación para indicar que está listo
            checkButton.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], {
                duration: 500,
                iterations: 2
            });
        }
    }
}

// Modificar la función de verificación para que funcione con el nuevo sistema
const originalCheckDragAnswer = window.checkDragAnswer;

window.checkDragAnswer = function(pagina) {
    const isMobile = document.body.classList.contains('mobile-device');
    
    if (isMobile) {
        // Versión móvil de la función
        const indiceDesafio = pagina - 2;
        const respuestaCorrecta = desafios[indiceDesafio].respuesta;
        
        const dropZone1 = document.getElementById(`dropZone1-${pagina}`);
        const dropZone2 = document.getElementById(`dropZone2-${pagina}`);
        
        const num1Element = dropZone1.querySelector('.mobile-selected-number');
        const num2Element = dropZone2.querySelector('.mobile-selected-number');
        
        // Verificar si las zonas tienen números
        if (!num1Element || !num2Element) {
            document.getElementById(`feedback${pagina}`).textContent = "¡Por favor coloca los números en ambas casillas!";
            document.getElementById(`feedback${pagina}`).className = 'feedback negative';
            
            // Resaltar las zonas vacías
            if (!num1Element) dropZone1.classList.add('highlight-dropzone');
            if (!num2Element) dropZone2.classList.add('highlight-dropzone');
            
            // Quitar la clase después de un tiempo
            setTimeout(() => {
                dropZone1.classList.remove('highlight-dropzone');
                dropZone2.classList.remove('highlight-dropzone');
            }, 800);
            
            return;
        }
        
        // Obtener valores
        const valor1 = parseInt(num1Element.dataset.value || "0", 10);
        const valor2 = parseInt(num2Element.dataset.value || "0", 10);
        const respuestaUsuario = valor1 * 10 + valor2;
        
        // Verificar si la respuesta es correcta
        if (respuestaUsuario === respuestaCorrecta) {
            document.getElementById(`feedback${pagina}`).textContent = "¡Correcto! ¡Muy bien hecho!";
            document.getElementById(`feedback${pagina}`).className = 'feedback positive';
            puntuacion++;
            
            // Desactivar interfaz
            dropZone1.style.pointerEvents = 'none';
            dropZone2.style.pointerEvents = 'none';
            
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
    } else {
        // Usar la función original para escritorio
        originalCheckDragAnswer(pagina);
    }
};

// Observar cambios en el DOM para configurar nuevas páginas
function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active') && target.id && target.id.startsWith('page')) {
                    const pageNum = parseInt(target.id.replace('page', ''));
                    if (pageNum >= 2 && pageNum <= 5) {
                        console.log(`Página ${pageNum} activada - configurando para móvil`);
                        setTimeout(() => setupPageForMobile(pageNum), 100);
                    }
                }
            }
        });
    });
    
    // Observar cambios en las clases de todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        observer.observe(page, { attributes: true });
    });
}

// Añadir estilos CSS para la versión móvil
function injectMobileStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Estilos para el modo móvil */
        body.mobile-device .number-options {
            display: none !important;
        }
        
        .mobile-drop-zone {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
        }
        
        .mobile-drop-zone.active {
            box-shadow: 0 0 0 3px #ff9800, 0 0 10px rgba(255, 152, 0, 0.5);
            transform: scale(1.05);
        }
        
        .mobile-placeholder {
            font-size: 24px;
            color: #999;
            font-weight: bold;
        }
        
        .mobile-number-selector {
            background-color: white;
            border: 2px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            margin: 15px 0;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 100;
        }
        
        .mobile-selector-title {
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .mobile-number-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .mobile-number-button {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px 0;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .mobile-number-button:hover, .mobile-number-button:active {
            background-color: #e0e0e0;
        }
        
        .mobile-selected-number {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .mobile-cancel-button {
            display: block;
            width: 100%;
            padding: 8px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .highlight-dropzone {
            animation: pulse-mobile 0.8s;
        }
        
        @keyframes pulse-mobile {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
        
        button.ready {
            background-color: #4CAF50;
            box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }
        
        /* Mejoras para la interfaz móvil */
        @media (max-width: 768px) {
            .calculation {
                margin: 20px auto;
            }
            
            .calculation-cell, .drop-zone {
                width: 50px;
                height: 50px;
                font-size: 1.8rem;
            }
            
            button {
                padding: 12px 20px;
                font-size: 16px;
                margin: 10px 0;
            }
            
            .mobile-number-button {
                padding: 15px 0;
                font-size: 24px;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Inyectar estilos CSS para móviles
injectMobileStyles();