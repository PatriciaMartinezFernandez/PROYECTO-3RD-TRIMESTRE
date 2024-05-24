document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const numJugadores = document.getElementById('numJugadores').value;
        if (numJugadores <= 0 || isNaN(numJugadores)) {
            alert('Por favor, ingresa un número válido de jugadores.');
            return;
        }

        const numBolas = document.getElementById('numBolas').value;
        if (numBolas <= 0 || isNaN(numBolas)) {
            alert('Por favor, ingresa un número válido de bolas.');
            return;
        }

        const intervalo = document.getElementById('intervalo').value;
        if (intervalo < 5 || intervalo > 15 || isNaN(intervalo)) {
            alert('El intervalo de llamada debe estar entre 5 y 15 segundos.');
            return;
        }

        const historial = document.getElementById('historial').value;
        if (historial < 1 || historial > 10 || isNaN(historial)) {
            alert('El historial de juego debe ser un número entre 1 y 10.');
            return;
        }

        form.submit();
    });
});

function irAJuego() {
    alert('El juego se encuentra en desarrollo.');
}
function irAMenu() {
    window.location.assign("menu.html");
}
