document.addEventListener('click', (e) => {
    const btnComprar = e.target.closest('.btn-comprar');
    if (!btnComprar) return;

    const card = btnComprar.closest('.card');
    const id = btnComprar.dataset.id;
    const nombre = card.querySelector('.nombre-producto').textContent;
    const precioTexto = card.querySelector('.precio-producto').textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));
    const imagen = card.querySelector('.imagen-producto img').src;
    const cantidadSpan = card.querySelector(`span[id^="cantidad-"]`);
    const cantidad = cantidadSpan ? parseInt(cantidadSpan.textContent) : 0;

    if (cantidad <= 0) {
        Toastify({
            text: "Seleccioná al menos una unidad del producto.",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { background: "#000000", color: "#ffffff" }
        }).showToast();
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === id);

    if (index > -1) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    Toastify({
        text: "¡Producto agregado a tu carrito!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#000000", color: "#ffffff" }
    }).showToast();
});

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    if (contenedorCarrito) {
        renderizarCarrito();
    }
});

function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }
    
    contenedor.innerHTML = carrito.map(producto => `
        <div class="carrito-item" data-id="${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-carrito">
            <h4 class="nombre-carrito">${producto.nombre}</h4>
            <p class="cantidad-carrito">Cantidad: ${producto.cantidad}</p>
            <p class="precio-carrito">Precio: $${producto.precio}</p>
            <button class="btn-eliminar"><i class="bi bi-trash3"></i></button>
        </div>
    `).join("");
}

const ventanaCarrito = document.getElementById('ventana-carrito');

document.addEventListener('click', (e) => {
    const btnEliminar = e.target.closest('.btn-eliminar');
    if (!btnEliminar) return;

    const card = btnEliminar.closest('.carrito-item');
    if (!card) return;

    const id = card.dataset.id;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => String(item.id) !== String(id));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
});