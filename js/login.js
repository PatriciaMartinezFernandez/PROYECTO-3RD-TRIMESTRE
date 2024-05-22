document.addEventListener("DOMContentLoaded", function () {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioNoExiste = "El usuario no existe.";
  const pwdIncorrecta = "Contraseña incorrecta.";
  const accesoCorrecto = "Bienvenido!";

  function validarUsuario(username, pwd) {
      const usuario = usuarios.find(
          (usuario) => usuario.username === username
      );
      if (!usuario) {
          return { existe: false };
      }
      return { existe: true, esValido: usuario.pwd === pwd };
  }

  function mostrarNotificacion(mensaje, claseMensaje) {
      const notificaciones = document.getElementById("notificaciones");
      notificaciones.textContent = mensaje;
      notificaciones.classList.remove("invalido", "valido");
      notificaciones.classList.add(claseMensaje, "show");
  }

  function iniciarSesion(username, pwd) {
      if (username === "admin" && pwd === "admin") {
          window.location.href = "users.html";
      } else {
          const validacion = validarUsuario(username, pwd);
          if (!validacion.existe) {
              mostrarNotificacion(usuarioNoExiste, "invalido");
          } else if (!validacion.esValido) {
              mostrarNotificacion(pwdIncorrecta, "invalido");
          } else {
              mostrarNotificacion(accesoCorrecto, "valido");
              setTimeout(function () {
                  window.location.assign("menu.html");
              }, 800);
          }
      }
  }

  const formulario = document.querySelector("form");
  formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("usuario").value;
      const pwd = document.getElementById("password").value;

      iniciarSesion(username, pwd);
  });
});
