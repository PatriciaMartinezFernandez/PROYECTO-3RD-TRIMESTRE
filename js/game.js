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
    { min: 80, max: 90 }
  ];

  for (let i = 0; i < rangosColumnas.length; i++) {
    cartonBingo.push(generarColumna(rangosColumnas[i].min, rangosColumnas[i].max));
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

// Generar el cartón de bingo
let cartonBingoUsuario = generarCartonBingo();
let cartonBingoMaquina = generarCartonBingo();

// Imprimir el cartón en la tabla HTML
imprimirCartonBingoUsuario(cartonBingoUsuario);
imprimirCartonBingoMaquina(cartonBingoMaquina);


let bolasCantadas = [];

function generarBola() {
  let num = parseInt(obtenerNumeroAleatorio(1, 90));
  let nuevaBolaCantada = false;

  while (!nuevaBolaCantada) {
    if (bolasCantadas.includes(num)) {
      num = parseInt(obtenerNumeroAleatorio(1, 90))
    } else {
      bolasCantadas.push(num);
      nuevaBolaCantada = true;
    }
  }

  let bolaCantada = document.getElementById("bolaGenerada");
  bolaCantada.innerHTML = num;

  let tabla = document.getElementById("tablaBolas");
  let filas = tabla.getElementsByTagName("tr");

  for (let i =0;i < filas.length; i++) {
    let celdas = filas[i].getElementsByTagName("td");

    for (let j = 0; j < celdas.length; j++) {
      if (parseInt(celdas[j].textContent) == num) {
        celdas[j].classList.add("bolaCantada");
        console.log(celdas[j]);
      }
    }
  }

  return num;
}

function generarTablonBolas() {
  let tabla = document.getElementById("tablaBolas");

  for (let i = 0; i < 9; i++) {
    let fila = tabla.insertRow();
    for (let j = 1; j <= 10; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<p>${(i*9)+j+i}</p>`;
      celda.classList.add("celdaBolas");
    }
  }
}



generarTablonBolas();