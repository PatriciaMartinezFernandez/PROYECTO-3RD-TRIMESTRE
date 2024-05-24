document.addEventListener('DOMContentLoaded', function () {
  const currentBalanceElement = document.getElementById('current-balance');
  let currentBalance = parseInt(localStorage.getItem('currentBalance')) || 0;

  function updateBalanceDisplay() {
      currentBalanceElement.innerHTML = `${currentBalance}<img src="../Moneda.png" alt="Moneda" class="coin-icon">`;
  }

  function handleFormSubmit(event) {
      event.preventDefault();
      const coinsInput = document.getElementById('coins');
      const coinsValue = parseInt(coinsInput.value);

      if (isNaN(coinsValue)) {
          alert('Por favor, introduce una cantidad válida de monedas.');
          return;
      }

      if (coinsValue < 1) {
          alert('La cantidad de monedas debe ser al menos 1.');
          return;
      }

      if (event.submitter.id === 'add-coins') {
          currentBalance += coinsValue;
      } else if (event.submitter.id === 'remove-coins') {
          if (coinsValue > currentBalance) {
              alert('No tienes suficientes monedas para retirar esa cantidad.');
              return;
          }
          currentBalance -= coinsValue;
      }

      localStorage.setItem('currentBalance', currentBalance);
      updateBalanceDisplay();
  }

  const form = document.querySelector('.coins-form form');
  form.addEventListener('submit', handleFormSubmit);

  updateBalanceDisplay();
});
