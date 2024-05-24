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
