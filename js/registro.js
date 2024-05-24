document.addEventListener("DOMContentLoaded", function () {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioExiste = "Ese usuario ya existe.";
  const correoExiste = "Ese correo ya está en uso.";
  const correoInvalido = "Formato de correo inválido.";
  const pwdInvalida = "Contraseña inválida.";
  const comprabacionIncorrecta = "Las contraseñas no coinciden.";
  const usuarioValido = "Usuario creado.";

  function creaUsuario(nombreCompleto, username, email, pwd) {
    let usuario = {
      nombreCompleto: nombreCompleto,
      username: username,
      email: email,
      pwd: pwd,
    };

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  function validarUsername(username) {
    return usuarios.some((usuario) => usuario.username === username);
  }

  function validarEmail(email) {
    return usuarios.some((usuario) => usuario.email === email);
  }

  function validarFormatoEmail(email) {
    const resultado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return resultado.test(email);
  }

  function validarPassword(pwd) {
    const resultado = /^[A-Za-z\d@$!%?&]{8,}$/;
    return resultado.test(pwd);
  }

  function comprobarContrasenias(pwd, pwd2) {
    return pwd === pwd2;
  }

  function mostrarNotificacion(mensaje, claseMensaje) {
    const notificaciones = document.getElementById("notificaciones");
    notificaciones.textContent = mensaje;
    notificaciones.classList.remove("invalido", "valido");
    notificaciones.classList.add(claseMensaje, "show");
  }

  function validacion() {
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;
    const pwd2 = document.getElementById("pwd2").value;

    let mensaje = "";
    let claseMensaje = "invalido";

    if (validarUsername(username)) {
      mensaje = usuarioExiste;
    } else if (validarEmail(email)) {
      mensaje = correoExiste;
    } else if (!validarFormatoEmail(email)) {
      mensaje = correoInvalido;
    } else if (!validarPassword(pwd)) {
      mensaje = pwdInvalida;
    } else if (!comprobarContrasenias(pwd, pwd2)) {
      mensaje = comprabacionIncorrecta;
    } else {
      mensaje = usuarioValido;
      claseMensaje = "valido";
      creaUsuario(nombreCompleto, username, email, pwd);
    }

    mostrarNotificacion(mensaje, claseMensaje);

    if (claseMensaje === "valido") {
      setTimeout(function () {
        window.location.assign("login.html");
      }, 800);
    }
  }

  window.validacion = validacion;
});
