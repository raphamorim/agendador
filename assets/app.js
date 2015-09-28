
// Estúdio disponíveis
// Usar um modal e da show nele
// Função de login

var busyDates = [1, 3, 14, 24];
(function(){
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
                    data.innerHTML = '<h2>Indisponível</h2><p>Esta data não possui disponível!</p>'
                else 
                    data.innerHTML = '<h2>Data disponível</h2><p></p>';

                var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click", true, true, window,
                        0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !cb.dispatchEvent(evt);
            })
        }
    }
})();