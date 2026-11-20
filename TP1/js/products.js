const contenedor = document.getElementById("contenedor-productos");
const enPages = location.pathname.includes('/pages/');
const prefijo = enPages ? '../' : '';
const indContenedor = document.getElementById("ind-carousel");

fetch(prefijo + "productos.json") 
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }
        return respuesta.json();
    })
    .then(function (datos) {
        window.productosGlobales = datos;

        let productosFiltrados = datos.filter(function(producto) {
            if (enPages === false) {
                return producto.destacado === true;
            } else {
                return location.pathname.includes(producto.categoria);
            }
        });
        productosFiltrados.forEach(function (producto) {
            const tarjeta = document.createElement("div");
            tarjeta.className = "card";
            tarjeta.id = "producto-" + producto.id;

            tarjeta.innerHTML = `
                <div class="imagen-producto">
                    <img src="${prefijo}${producto.imagen}" alt="${producto.nombre}">
                </div>
                <p class="nombre-producto">${producto.nombre}</p>
                <p class="precio-producto">$${producto.precio}</p>
                <p class="descripcion-producto">${producto.descripcion ?? "Sin descripción"}</p>
                
                <div class="controles-cantidad">
                    <button class="btn-restar" data-id="${producto.id}"><i class="bi bi-dash-lg"></i></button>
                    <span id="cantidad-${producto.id}">0</span>
                    <button class="btn-sumar" data-id="${producto.id}"><i class="bi bi-plus-lg"></i></button>
                </div>
                <button class="btn-comprar" data-id="${producto.id}">Comprar</button>
            `;
            contenedor.appendChild(tarjeta);
        });

        if (!enPages) {
            const btnNext = document.getElementById("btn-next");
            const btnPrev = document.getElementById("btn-prev");

            if (btnNext && btnPrev && contenedor) {
                btnNext.addEventListener("click", () => {
                    contenedor.scrollBy({
                        left: contenedor.clientWidth,
                        behavior: 'smooth'
                    });
                });
                btnPrev.addEventListener("click", () => {
                    contenedor.scrollBy({
                        left: -contenedor.clientWidth,
                        behavior: 'smooth'
                    });
                });
            }
        }
        if (indContenedor && productosFiltrados.length > 0) {
                indContenedor.innerHTML = "";
                const itemsPorPagina = 4;
                const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

                for (let i = 0; i < totalPaginas; i++) {
                    const dot = document.createElement("button");
                    dot.classList.add("ind-dot");
                    if (i === 0) dot.classList.add("active");

                    dot.addEventListener("click", () => {
                        contenedor.scrollTo({
                            left: i * contenedor.clientWidth,
                            behavior: 'smooth'
                        });
                    });
                    indContenedor.appendChild(dot);
                }
                contenedor.addEventListener("scroll", () => {
                    const indiceActivo = Math.round(contenedor.scrollLeft / contenedor.clientWidth);
                    const dots = indContenedor.querySelectorAll(".ind-dot");
                    
                    dots.forEach((dot, idx) => {
                        dot.classList.toggle("active", idx === indiceActivo);
                    });
                });
        }
        const idResaltado = sessionStorage.getItem('productoResaltado');
        if (idResaltado) {
            const tarjeta = document.getElementById("producto-" + idResaltado);
            if (tarjeta) {
                tarjeta.classList.add("tarjeta-destacada");
                tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    tarjeta.classList.remove("tarjeta-destacada");
                }, 3000);
            }
            sessionStorage.removeItem('productoResaltado'); 
        }
    })
    .catch(function (error) {
        console.log("Error:", error);
        if(contenedor) contenedor.textContent = "No se pudieron cargar los productos.";
    });

document.addEventListener('click', (e) => {
    const boton = e.target.closest("button");
    if (!boton) return;
    const idProducto = Number(boton.dataset.id);

    if (boton.classList.contains("btn-sumar")) {
        const spanCantidad = document.getElementById(`cantidad-${idProducto}`);
        let cantidadActual = Number(spanCantidad.textContent);
        spanCantidad.textContent = cantidadActual + 1;
    }
    if (boton.classList.contains("btn-restar")) {
        const spanCantidad = document.getElementById(`cantidad-${idProducto}`);
        let cantidadActual = Number(spanCantidad.textContent);
        if (cantidadActual > 0) {
            spanCantidad.textContent = cantidadActual - 1;
        }
    }
});