document.addEventListener('DOMContentLoaded', function () {
    const walletCoinsElement = document.getElementById('wallet-coins');
    let currentBalance = parseInt(localStorage.getItem('currentBalance')) || 0; 
  
    walletCoinsElement.textContent = currentBalance; 
  
    const playButton = document.querySelector('.button-container a[href="game.html"]');
  
    playButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (currentBalance >= 10) { 
            currentBalance -= 10;
            localStorage.setItem('currentBalance', currentBalance);
            walletCoinsElement.textContent = currentBalance;
            window.location.href = event.currentTarget.href;
        } else {
            alert('No tienes suficientes monedas para jugar.');
        }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
      const partidasDiv = document.getElementById("listasPartidas");
      const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
  
      partidas.forEach((partida, index) => {
        const partidaDiv = document.createElement('div');
        partidaDiv.className = 'partida';
        partidaDiv.innerHTML = `<p>${index + 1}# | Ganador: ${partida.ganador} | Hora: ${partida.hora}</p>`;
        
        // Agregar clase dependiendo del ganador
        if (partida.ganador === "Usuario") {
          partidaDiv.classList.add("ganador-usuario");
        } else if (partida.ganador === "Máquina") {
          partidaDiv.classList.add("ganador-maquina");
        } else {
          partidaDiv.classList.add("empate");
        }
  
        partidasDiv.appendChild(partidaDiv);
      });
    });
  