document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-logout') {
        const enPages = window.location.pathname.includes('/pages');
        if(enPages){
        window.location.href="registro.html";
        }
        else {
        window.location.href="pages/registro.html";
        }
    }
})
