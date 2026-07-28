// Experiência Nível Aplicativo
document.addEventListener('DOMContentLoaded', () => {
    console.log('EBC App Framework Inicializado');

    // Registrar e marcar aba ativa no mobile nav
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});