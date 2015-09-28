
// Estúdio disponíveis
// Função de login

var busyDates = [1, 3, 14, 24],
    session = false,
    theDay = false;

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function getSession() {
    if (getCookie('email'))
        session = true;
    else 
        session = false;
}

(function(){
    getSession();

    var today = document.querySelector('.current-day'),
        // today = new Date(),
        calendar = document.querySelectorAll('.calendar tbody tr td');

    today = parseInt((today.innerText || today.textContent), 10);
    for (var i = 0; i < calendar.length; i++) {
        if (calendar[i].classList.contains('prev-month')) {
            // DO NOTHING
        } else if (calendar[i].classList.contains('next-month')) {
            // DO NOTHING
        } else {
            calendar[i].addEventListener('click', function(e) {
                var date = (e.target.innerText || e.target.textContent);
                date = parseInt(date, 10);
                var cb = document.querySelector(".button"),
                    data = document.querySelector(".modal__content-data");

                if (date <= today)
                    data.innerHTML = '<h2>Inválido</h2><p>Por favor coloque um data válida!</p>';
                else if (busyDates.indexOf(date) > -1)
                    data.innerHTML = '<h2>Indisponível</h2><p>Esta data não possui estúdio disponível!</p>'
                else  {
                    theDay = date;
                    if (!session) {
                        data.innerHTML = '<h2>Data disponível</h2><p><a href="#" class="signup">Cadastre-se!</a></p><p><a href="#" class="signin">Login</a></p>';
                        document.querySelector('.signup').addEventListener('click', function() {
                            var c = document.querySelector('.container');
                            c.innerHTML = '<h1>Cadastre-se!</h1><h4>Para se cadastrar é fácil e rápido!</h4>' + 
                            '<p><input type="text" class="nome" required placeholder="Nome"/></p>' + 
                            '<p><input type="email" class="email" required placeholder="Email"/></p>' +
                            '<p><input type="password" class="senha" required placeholder="Senha"/></p>' +
                            '<p><a href="#" class="signup-btn">Cadastre-se</a></p>';
                            document.querySelector('.signup-btn').addEventListener('click', function() {
                                var cookie = "email=" + document.querySelector('.email').value + 
                                    "; senha=" + document.querySelector('.senha').value +
                                    "; nome=" + document.querySelector('.nome').value;
                                document.cookie = cookie;
                                location.reload();
                            });
                        });
                        document.querySelector('.signin').addEventListener('click', function() {
                            var c = document.querySelector('.container');
                            c.innerHTML = '<h1>Login</h1><h4>Entre no Studion</h4>';                            
                        });
                    } else {
                        data.innerHTML = '<h2>Escolher estúdio</h2>' + 
                          '<p><a href="#" class="studio-option">AudioRebel</a></p>' +
                          '<p><a href="#" class="studio-option">Hanoi</a></p>';
                        var estudios = document.querySelectorAll('.studio-option');
                        for (var i = 0; i < estudios.length; i++) {
                            var estudio = (estudios[i].innerText || estudios[i].textContent);
                            estudios[i].addEventListener('click', function() {
                                var c = document.querySelector('.container');
                                c.innerHTML = '<h1>Parabéns!</h1><h4>Você agendou com ' + estudio + '. Aguarde para ter mais informações!</h4>';                            
                            });
                        }
                    }
                }

                var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click", true, true, window,
                        0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !cb.dispatchEvent(evt);
            })
        }
    }
})();