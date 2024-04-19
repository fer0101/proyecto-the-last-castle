const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });


}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        //aqui se coloca el user id generado en el emailJS
        (function () {
            emailjs.init("user_CEozz2F39lJJOLF5mJiDA");
        })();

        var myform = $("form#procesar-pago");
        myform.submit((event) => {
            event.preventDefault();
            // Change to your service ID, or keep using the default service
            var service_id = "default_service";
            var template_id = "template_3SA9LsqQ";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            /* REGISTRO */
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);

            // registrar venta
            let formdata = new FormData();
            formdata.append("cliente_id", user.id);
            const c = new Carrito();
            let productos = c.obtenerProductosLocalStorage();
            for (let i = 0; i < productos.length; i++) {
                formdata.append("productos[]", productos[i].id);
                formdata.append("precios[]", productos[i].precio);
                formdata.append("cantidades[]", productos[i].cantidad);
                let subtotal = parseFloat(productos[i].precio) * parseFloat(productos[i].cantidad);
                formdata.append("subtotales[]", subtotal);
            }
            $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                cache: false,
                url: host + '/registrar_compra',
                data: formdata,
                dataType: "json",
                success: function (response) {
                    Swal.fire({
                        type: 'success',
                        title: 'Correcto',
                        text: 'Compra procesada correctamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();

                        // emailjs.sendForm(service_id, template_id, myform[0])
                        //     .then(() => {
                        //         cargandoGif.style.display = 'none';
                        //         document.querySelector('#loaders').appendChild(enviado);
                        //         setTimeout(() => {
                        //             compra.vaciarLocalStorage();
                        //             enviado.remove();
                        //             window.location = "index.html";
                        //         }, 2000);
                        //     }, (err) => {
                        //         alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                        //         // myform.find("button").text("Send");
                        //     });

                        window.location = "index.html";
                    }, 2000);
                }
            });

            /* FIN REGISTRO */

            return false;

        });
        myform.submit();
    }
}

