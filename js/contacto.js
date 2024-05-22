function enviarCorreo() {
  var templateParams = {
    from_email: document.getElementById("email").value,
    asunto: document.getElementById("asunto").value,
    mensaje: document.getElementById("message").value,
  };

  emailjs.send("service_msh7g2p", "template_g4rlg01", templateParams).then(
    function (response) {
      console.log("Correo enviado con éxito", response);
      alert("Correo enviado con éxito");
    },
    function (error) {
      console.log("Error al enviar el correo", error);
      alert("Error al enviar el correo");
    }
  );
}
