const links = [
    {label: 'Inicio', href: 'index.html'},
    {label: 'Mi Cuenta', href: 'pages/login.html'},
    {label: 'Amplificadores', href: 'pages/amplificadores.html'},
    {label: 'Bajos', href: 'pages/bajos.html'},
    {label: 'Baterias', href: 'pages/baterias.html'},
    {label: 'Guitarras', href: 'pages/guitarras.html'},
];

function renderNavbar() {
    const contenedor = document.getElementById('navbar');
    if (!contenedor) return;

    const enPages = location.pathname.includes('/pages/');

    const prefijo = enPages ? '../' : '';

    const linksHTML = links.map(link => {
        const hrefFinal = location.pathname.includes('index.html') || location.pathname.endsWith('/') ? link.href : (link.href === 'index.html' ? '../index.html' : link.href.replace('pages/', ''));
        return `<li>
                    <a href="${hrefFinal}">${link.label}</a>
                </li>`;
    }).join('');
    const sesionActiva = JSON.parse(sessionStorage.getItem("sesionActiva"));
    const inicial = sesionActiva?.nombre?.trim().charAt(0).toUpperCase();
    const indicadorUsuario = inicial
        ? `<span class="badge-usuario" title="Sesión iniciada: ${sesionActiva.nombre}">${inicial}</span>`
        : '';
    
    contenedor.innerHTML = `
        <nav class="nav" > 
            <ul>
                ${linksHTML}
            </ul>
            <div class="buscador-container">
                <input type="text" id="buscador" placeholder="Buscar producto..." maxlength="30">
                <button id="btn-lupa" class="btn-lupa"><i class="bi bi-search"></i></button>
                <ul id="lista-resultados" class="lista-resultados" style="display: none;"></ul>
            </div>
            ${indicadorUsuario}
            <div class="btn-cart">
                <a href="#" onclick="mostrarCarrito(event)"><i class="bi bi-cart"></i></a>
                <button class="btn-logout" id="btn-logout">Cerrar sesión</button>
            </div>
        </nav>`;
}
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    
    if (!document.getElementById('ventana-carrito')) {
        const carritoHTML = `
            <div id="ventana-carrito" class="ventana-carrito" style="display: none;">
                <button class="btn-cerrar" onclick="cerrarVentana()">X</button>
                <h2>Mi Carrito</h2>
                <div id="contenedor-carrito"></div>
            </div>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertAdjacentHTML('beforeend', carritoHTML);
        } else {
            document.body.insertAdjacentHTML('beforeend', carritoHTML);
        }
    }
});
function mostrarCarrito(event) {
    if (event) event.preventDefault();
    const ventana = document.getElementById('ventana-carrito');
    if (!ventana) return;
    
    if (ventana.style.display === 'flex') {
        ventana.style.display = 'none';
    } else {
        ventana.style.display = 'flex';
    }
}

function cerrarVentana() { 
    const ventana = document.getElementById('ventana-carrito');
    if (ventana) {
        ventana.style.display = 'none'; 
    }
}











