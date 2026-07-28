// Comando que busca a classe .logo e insere o SVG automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const logoContainers = document.querySelectorAll('.logo');
    
    logoContainers.forEach(container => {
        container.innerHTML = `
            <a href="index.html" style="display: flex; align-items: center; text-decoration: none;">
                <img src="img/logo.svg" alt="EBC Logo" style="height: 42px; vertical-align: middle;">
            </a>
        `;
    });
});