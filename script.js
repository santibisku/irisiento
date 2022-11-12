
let totalCarrito;
let contenedor = document.getElementById("misprods");
let botonFinalizar = document.getElementById("finalizar");
let botonVaciar = document.getElementById("vaciar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if (carrito.length != 0) {
    console.log("Recuperando carro")
    dibujarTabla();
}

const DateTime = luxon.DateTime;
//momento en que se ingresa a la web
const ahora = DateTime.now();
console.log(ahora.toString());
console.log(ahora.zoneName);
console.log(ahora.daysInMonth);
console.log(ahora.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS));
const masTarde = ahora.plus({ hours: 5, minutes: 15 });
console.log(masTarde.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS));

function dibujarTabla() {
    for (const producto of carrito) {
        document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;
    }
    totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: " + totalCarrito;
}

function renderizarProds() {
    for (const producto of productos) {
        contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
    }

    //EVENTOS
    productos.forEach(producto => {
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click", function () {
            agregarAlCarrito(producto);
        });
    })
}

renderizarProds();

function agregarAlCarrito(productoComprado) {
    carrito.push(productoComprado);
    console.table(carrito);
    
    Swal.fire({
        title: productoComprado.nombre,
        text: 'Agregado al carrito',
        imageUrl: productoComprado.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: productoComprado.nombre,
        showConfirmButton: false,
        timer: 1500
    })
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.id}</td>
            <td>${productoComprado.nombre}</td>
            <td>${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: " + totalCarrito;
    //storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonFinalizar.onclick = () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML = "";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: ";
    Toastify({
        text: "Pronto recibirá un mail de confirmacion",
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
}

botonVaciar.onclick = () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML = "";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: ";
    Toastify({
        text: "Carrito vaciado satisfactoriamente",
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
}
