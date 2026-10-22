const contenedor = document.getElementById("contenedor-productos");
const enPages = location.pathname.includes('/pages/');
const prefijo = enPages ? '../' : '';

fetch(prefijo + "productos.json") 
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }
        return respuesta.json();
    })
    .then(function (datos) {
        let productosFiltrados = datos.filter(function(producto) {
            if (enPages === false) {
                return producto.destacado === true;
            }
            else {
                return location.pathname.includes(producto.categoria);
            }
            return location.pathname.includes(producto.categoria);
        });

        productosFiltrados.forEach(function (producto) {
            
            const tarjeta = document.createElement("div");
            tarjeta.className = "card";

            tarjeta.innerHTML = `
                <div class="imagen-producto">
                    <img src="${prefijo}${producto.imagen}" alt="${producto.nombre}">
                </div>
                <p class="nombre-producto">${producto.nombre}</p>
                <p class="precio-producto">$${producto.precio}</p>
                <p class="descripcion-producto">${producto.descripcion ?? "Sin descripción"}</p>
                
                <div class="controles-cantidad">
                    <button class="btn-restar" data-id="${producto.id}">-</button>
                    <span id="cantidad-${producto.id}">0</span>
                    <button class="btn-sumar" data-id="${producto.id}">+</button>
                </div>
                <button class="btn-comprar">Comprar</button>
            `;
            contenedor.appendChild(tarjeta);
        });
    })
    .catch(function (error) {
        console.log("Error:", error);
        if(contenedor) contenedor.textContent = "No se pudieron cargar los productos.";
    });

document.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('btn-sumar')) {
        const idProducto = Number(e.target.getAttribute('data-id'));
        const spanCantidad = document.getElementById(`cantidad-${idProducto}`);
        
        let cantidadActual = Number(spanCantidad.textContent);
        spanCantidad.textContent = cantidadActual + 1;
    }

    if (e.target.classList.contains('btn-restar')) {
        const idProducto = Number(e.target.getAttribute('data-id'));
        const spanCantidad = document.getElementById(`cantidad-${idProducto}`);
        
        let cantidadActual = Number(spanCantidad.textContent);
        if (cantidadActual > 0) {
            spanCantidad.textContent = cantidadActual - 1;
        }
    }
});