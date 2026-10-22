const links = [
    {label: 'Inicio', href: 'index.html'},
    {label: 'Mi Cuenta', href: 'pages/registro.html'},
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

    contenedor.innerHTML = `
        <nav class="nav" > 
            <ul>
                ${linksHTML}
            </ul>
            <div class "cartbutton">
                <a href="#"> <i class="bi bi-cart"></i></a>
                <button class="btn-logout" id="btn-logout">Cerrar sesión</button>
            </div>
        </nav>`;
}
document.addEventListener('DOMContentLoaded', renderNavbar);