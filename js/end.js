const jugarOtraVezBtn = document.getElementById('jugarOtraVez');
        const volverAlMenuBtn = document.getElementById('volverAlMenu');
        const irAlContactoBtn = document.getElementById('irAlContacto');

        function irAJuego() {
            setTimeout(function (){
                window.location.assign("game.html");
            }, 500)
        }

        function irAMenu() {
            setTimeout(function (){
                window.location.assign("menu.html");
            }, 500)
        }

        function irAContacto() {
            setTimeout(function (){
                window.location.assign("contacto.html");
            }, 500)
        }

        jugarOtraVezBtn.addEventListener('click', irAJuego);
        volverAlMenuBtn.addEventListener('click', irAMenu);
        irAlContactoBtn.addEventListener('click', irAContacto);