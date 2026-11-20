document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-logout') {
        sessionStorage.removeItem("sesionActiva");
        const enPages = window.location.pathname.includes('/pages');
        if(enPages){
        window.location.href="login.html";
        }
        else {
        window.location.href="pages/login.html";
        }
    }
})