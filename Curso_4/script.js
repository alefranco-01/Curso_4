let peticion = new XMLHttpRequest();
peticion.open("GET", "http://127.0.0.1:5500/Curso_4//productos.json", true);

peticion.addEventListener("readystatechange", function () {

    if (this.readyState == 4 && this.status == 200) {

        let productos = JSON.parse(this.responseText);

        let total = 0;
        let contador = 0;

        productos.forEach(p => {

            let div = document.querySelector('.productos');
            let elementos = document.createElement('div');
            div.appendChild(elementos);

            let link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerText = p.nombre;

            let imagen = document.createElement('img');
            imagen.setAttribute('alt', "Imagen del Producto");
            imagen.setAttribute('src', p.url_foto);

            let descripcion = document.createElement('p');
            descripcion.innerText = p.descripcion;

            let precio = document.createElement('p');
            precio.innerText = p.precio;

            elementos.appendChild(link);
            elementos.appendChild(imagen);
            elementos.appendChild(descripcion);
            elementos.appendChild(precio);

            link.addEventListener('click', function (event) {
                event.preventDefault();
                total = total + p.precio;

                let preciofinal = document.querySelector("#total");
                preciofinal.innerText = total;
                contador = contador + 1;

                let contadorProductos = document.querySelector("#cantproductos");
                contadorProductos.innerText = contador;

                let fila = document.createElement('tr');
                let tdProducto = document.createElement('td');
                tdProducto.innerText = p.nombre;
                let tdPrecio = document.createElement('td');
                tdPrecio.innerText = p.precio;
                fila.appendChild(tdProducto);
                fila.appendChild(tdPrecio);

                let tdBorrar = document.createElement('td');
                let Borrar = document.createElement('a');
                Borrar.setAttribute('href', '#');
                Borrar.innerText = 'X';
                tdBorrar.appendChild(Borrar);
                fila.appendChild(tdBorrar);

                Borrar.addEventListener('click', function (event) {

                    event.preventDefault();
                    console.log(event.target.parentElement.parentElement.remove());
                    total = total - p.precio;
                    preciofinal.innerText = total;
                    contador = contador - 1;
                    contadorProductos.innerText = contador;
                    

                });

                document.querySelector('tbody').appendChild(fila);

            })


        });


    }
});

peticion.send();

let mayorprecio = -999;

let botonCaro = document.querySelector("#boton");

botonCaro.addEventListener("click", function () {

    let listaProductos = document.querySelector('.carrito tbody').children;

    for (let index = 0; index < listaProductos.length; index++) {
        const productoRow = listaProductos[index];

        let productoNombre = productoRow.children[0].innerText;

        let productoPrecio = Number(productoRow.children[1].innerText);

        if (productoPrecio > mayorprecio) {
            mayorprecio = productoPrecio
        }

        let lugar = document.querySelector("#preciocaro")

        lugar.innerText = productoPrecio

        let lug = document.querySelector('#nombrecaro')
        lug.innerText = productoNombre
    }
});

