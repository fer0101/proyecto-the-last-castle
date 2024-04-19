var host = 'http://127.0.0.1:3000/api';
var path_img = 'http://127.0.0.1:3000/static/img';

// VALIDAR EXISTENCIA DEL USUARIO
let auth = {
    sw: false,
    user: null
}

let user = JSON.parse(localStorage.getItem('user'))
if (user) {
    auth.sw = true;
    auth.user = user;
} else {
    auth = {
        sw: false,
        user: null
    }
}