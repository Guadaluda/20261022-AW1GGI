function ejecutarBusqueda() {
    const input = document.getElementById('buscador');
    const listaResultados = document.getElementById('lista-resultados');
    
    if (!input || !listaResultados) return;

    const texto = input.value.toLowerCase();

    if (texto.length === 0) {
        listaResultados.style.display = 'none';
        return;
    }

    if (!window.productosGlobales || window.productosGlobales.length === 0) {
        return;
    }

    const coincidencias = window.productosGlobales.filter(prod => 
        prod.nombre.toLowerCase().includes(texto)
    );

    if (coincidencias.length > 0) {
        listaResultados.style.display = 'block';
        const enPages = location.pathname.includes('/pages/');
        const rutaBase = enPages ? '' : 'pages/';
        
        const resultadosMostrados = coincidencias.slice(0, 3);

        listaResultados.innerHTML = resultadosMostrados.map(prod => `
                <li class="item-resultado">
                    <a href="${rutaBase}${prod.categoria}.html" class="enlace-resultado" onclick="sessionStorage.setItem('productoResaltado', '${prod.id}'); document.getElementById('lista-resultados').style.display = 'none';">${prod.nombre}</a>
                </li>
            `).join('');
    } else {
        listaResultados.style.display = 'block';
        listaResultados.innerHTML = '<div class="mensaje-vacio">No se encontraron productos.</div>';
    }
}

document.addEventListener('input', (e) => {
    if (e.target.id === 'buscador') {
        ejecutarBusqueda();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-lupa')) {
        ejecutarBusqueda();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.target.id === 'buscador' && e.key === 'Enter') {
        ejecutarBusqueda();
    }
});

document.addEventListener('click', (e) => {
    const inputBuscador = document.getElementById('buscador');
    const listaResultados = document.getElementById('lista-resultados');
    
    if (inputBuscador && listaResultados) {
        if (!inputBuscador.contains(e.target) && !listaResultados.contains(e.target) && !e.target.closest('#btn-lupa')) {
            listaResultados.style.display = 'none';
        }
    }
});