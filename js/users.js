document.addEventListener("DOMContentLoaded", function () {
    const usuariosDiv = document.getElementById("usuarios");
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach(usuario => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `<p>${usuario.username} | ${usuario.email}</p>`;
        usuariosDiv.appendChild(userDiv);
    });
});