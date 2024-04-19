
let existe_user = JSON.parse(localStorage.getItem('user'))
let salir = $("#salir");
if (existe_user && existe_user.tipo == 'Administrador') {
    salir.click(function (e) {
        e.preventDefault();
        localStorage.removeItem('user')
        window.location = "/";
    });
    $(".nom_user").text(existe_user.nombre);
} else {
    window.location = "/login/loginvista.html";
}

