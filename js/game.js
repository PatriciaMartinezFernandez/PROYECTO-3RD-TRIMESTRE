let lineaCantada = false; // Variable para verificar si ya se ha cantado una línea
let bingoCantado = false; // Variable para verificar si ya se ha cantado bingo

// Función para generar un número aleatorio dentro de un rango específico
function obtenerNumeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

// Función para generar una columna del cartón
function generarColumna(minimo, maximo) {
  let columna = [];
  for (let i = 0; i < 3; i++) {
    let numeroAleatorio = obtenerNumeroAleatorio(minimo, maximo);
    // Comprobar si el número ya existe en la columna
    while (columna.includes(numeroAleatorio)) {
      numeroAleatorio = obtenerNumeroAleatorio(minimo, maximo);
    }
    columna.push(numeroAleatorio);
  }
  // Ordenar la columna de forma ascendente
  columna.sort(function (a, b) {
    return a - b;
  });
  return columna;
}

// Función para generar el cartón completo
function generarCartonBingo() {
  let cartonBingo = [];
  let rangosColumnas = [
    { min: 1, max: 9 },
    { min: 10, max: 19 },
    { min: 20, max: 29 },
    { min: 30, max: 39 },
    { min: 40, max: 49 },
    { min: 50, max: 59 },
    { min: 60, max: 69 },
    { min: 70, max: 79 },
    { min: 80, max: 90 },
  ];

  // Generar columnas para cada rango y añadirlas al cartón
  for (let i = 0; i < rangosColumnas.length; i++) {
    cartonBingo.push(
      generarColumna(rangosColumnas[i].min, rangosColumnas[i].max)
    );
  }

  return cartonBingo;
}

// Función para imprimir el cartón en la tabla HTML
function imprimirCartonBingoUsuario(carton) {
  let tabla = document.getElementById("cartonUsuario");
  for (let i = 0; i < 3; i++) {
    let fila = tabla.insertRow();
    for (let j = 0; j < 9; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<p>${carton[j][i]}</p>`;
      celda.classList.add("celda");
    }
  }
}

// Función para imprimir el cartón en la tabla HTML
function imprimirCartonBingoMaquina(carton) {
  let tabla = document.getElementById("cartonMaquina");
  for (let i = 0; i < 3; i++) {
    let fila = tabla.insertRow();
    for (let j = 0; j < 9; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<p>${carton[j][i]}</p>`;
      celda.classList.add("celda");
    }
  }
}

// Generar el cartón de bingo para el usuario y la máquina
let cartonBingoUsuario = generarCartonBingo();
let cartonBingoMaquina = generarCartonBingo();

// Imprimir el cartón en la tabla HTML
imprimirCartonBingoUsuario(cartonBingoUsuario);
imprimirCartonBingoMaquina(cartonBingoMaquina);

let bolasCantadas = []; // Array para almacenar las bolas que ya han sido cantadas

// Función para generar una nueva bola de bingo
function generarBola() {
  let num = parseInt(obtenerNumeroAleatorio(1, 90));
  let nuevaBolaCantada = false;

  // Asegurar que la bola generada no ha sido cantada previamente
  while (!nuevaBolaCantada) {
    if (bolasCantadas.includes(num)) {
      num = parseInt(obtenerNumeroAleatorio(1, 90));
    } else {
      bolasCantadas.push(num);
      nuevaBolaCantada = true;
    }
  }

  let bolaCantada = document.getElementById("bolaGenerada");
  bolaCantada.innerHTML = num;

  let tabla = document.getElementById("tablaBolas");
  let filas = tabla.getElementsByTagName("tr");

  // Marcar la bola en la tabla de bolas cantadas
  for (let i = 0; i < filas.length; i++) {
    let celdas = filas[i].getElementsByTagName("td");

    for (let j = 0; j < celdas.length; j++) {
      if (parseInt(celdas[j].textContent) == num) {
        celdas[j].classList.add("bolaCantada");
      }
    }
  }

  // Marcar el número en los cartones del usuario y la máquina
  marcarNumeroCarton("cartonUsuario", num);
  marcarNumeroCarton("cartonMaquina", num);

  return num;
}

// Función para marcar el número en el cartón
function marcarNumeroCarton(idCarton, num) {
  let tabla = document.getElementById(idCarton);
  let filas = tabla.getElementsByTagName("tr");

  for (let i = 0; i < filas.length; i++) {
    let celdas = filas[i].getElementsByTagName("td");

    for (let j = 0; j < celdas.length; j++) {
      if (parseInt(celdas[j].textContent) == num) {
        celdas[j].classList.add("tachado");
      }
    }
  }

  comprobarLinea(idCarton);
}

// Función para comprobar si se ha completado una línea o bingo
function comprobarLinea(idCarton) {
  if (!lineaCantada || !bingoCantado) {
    let tabla = document.getElementById(idCarton);
    let filas = tabla.getElementsByTagName("tr");
    let totalCeldasTachadas = 0;
    let celdasTachadasEnLinea5 = 0;

    for (let i = 0; i < filas.length; i++) {
      let celdas = filas[i].getElementsByTagName("td");
      let lineaCompleta = true;

      for (let j = 0; j < celdas.length; j++) {
        if (!celdas[j].classList.contains("tachado")) {
          lineaCompleta = false;
        } else {
          totalCeldasTachadas++;
        }

        // Verificar si se ha tachado una celda de la línea 5
        if (i === 4 && celdas[j].classList.contains("tachado")) {
          celdasTachadasEnLinea5++;
        }
      }

      if (lineaCompleta && !lineaCantada) {
        lineaCantada = true;
        mostrarAnimacionLinea();

        // Verificar si se ha completado la línea 5 y sumar 5 coins
        if (celdasTachadasEnLinea5 === 9) {
          sumarCoins(5);
        }
      }
    }

    if (totalCeldasTachadas === 27 && !bingoCantado) { // Un cartón completo tiene 27 números
      bingoCantado = true;
      if (idCarton === "cartonUsuario") {
        mostrarAnimacionBingo("Usuario");

      } else {
        mostrarAnimacionBingo("Máquina");
      }
    }

    // Chequear si es empate
    if (lineaCantada && bingoCantado) {
      if (idCarton === "cartonUsuario" && !bingoCantado) {
        alert("Empate: Tanto tú como la máquina ganaron simultáneamente. Se te devuelven tus 10 coins.");
        devolverCoins(10);
      }
    }
  }
}

// Función para mostrar la animación de "LÍNEA"
function mostrarAnimacionLinea() {
  let animacionLinea = document.createElement("div");
  animacionLinea.id = "animacionLinea";
  animacionLinea.innerHTML = "¡LINEA!";
  document.body.appendChild(animacionLinea);

  setTimeout(() => {
    animacionLinea.classList.add("mostrar");
    setTimeout(() => {
      animacionLinea.classList.remove("mostrar");
      setTimeout(() => {
        animacionLinea.remove();
      }, 500);
    }, 1000);
  }, 50);
}

// Función para mostrar la animación de "BINGO"
function mostrarAnimacionBingo(ganador) {
  let animacionBingo = document.createElement("div");
  animacionBingo.id = "animacionBingo";
  animacionBingo.innerHTML = `¡BINGO!`;
  
  // Asignar clase CSS según el ganador
  if (ganador === "Usuario") {
    animacionBingo.classList.add("ganador-usuario");
  } else if (ganador === "Máquina") {
    animacionBingo.classList.add("ganador-maquina");
  } else {
    animacionBingo.classList.add("empate");
  }
  
  document.body.appendChild(animacionBingo);

  setTimeout(() => {
    animacionBingo.classList.add("mostrar");
    setTimeout(() => {
      animacionBingo.classList.remove("mostrar");
      setTimeout(() => {
        animacionBingo.remove();
        // Guardar información de la partida
        let hora = new Date().toLocaleTimeString();
        guardarPartida(ganador, hora);
        // Sumar 20 monedas al monedero del jugador al ganar
        let currentBalance = parseInt(localStorage.getItem('currentBalance')) || 0;
        currentBalance += 20;
        localStorage.setItem('currentBalance', currentBalance);
        // Redireccionar a la página de fin de juego
        window.location.assign("end.html");
      }, 500);
    }, 1000);
  }, 50);
}



// Función para generar el tablero de bolas
function generarTablonBolas() {
  let tabla = document.getElementById("tablaBolas");

  for (let i = 0; i < 9; i++) {
    let fila = tabla.insertRow();
    for (let j = 1; j <= 10; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<p>${i * 9 + j + i}</p>`;
      celda.classList.add("celdaBolas");
    }
  }
}

// Generar el tablero de bolas
generarTablonBolas();

// Actualizar el monedero en el menú principal
updateBalanceDisplay();

// Función para guardar información de la partida
function guardarPartida(ganador, hora) {
  let partidas = JSON.parse(localStorage.getItem('partidas')) || [];
  partidas.push({ ganador: ganador, hora: hora });
  localStorage.setItem('partidas', JSON.stringify(partidas));
}

// Función para devolver monedas
function devolverCoins(amount) {
  let currentBalance = parseInt(localStorage.getItem('currentBalance')) || 0;
  currentBalance += amount;
  localStorage.setItem('currentBalance', currentBalance);
  const walletCoinsElement = document.getElementById('wallet-coins');
  walletCoinsElement.textContent = currentBalance;
}

// Función para sumar coins al monedero
function sumarCoins(amount) {
  let currentBalance = parseInt(localStorage.getItem('currentBalance')) || 0;
  currentBalance += amount;
  localStorage.setItem('currentBalance', currentBalance);
  const walletCoinsElement = document.getElementById('wallet-coins');
  walletCoinsElement.textContent = currentBalance;
}

