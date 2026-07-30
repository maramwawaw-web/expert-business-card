document.addEventListener("DOMContentLoaded", function () {
    // 1. Identificar elemento do menu mobile (se houver botão hamburguer)
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu, .mobile-bottom-nav");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    // 2. Destacar o link da página atual no Menu
    const pagePath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-item, .nav-link, .header-actions a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === pagePath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 3. Suporte a rolagem suave para âncoras na mesma página (#secao)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                    
                    // Fecha o menu mobile se estiver aberto
                    if (navMenu && navMenu.classList.contains("active")) {
                        navMenu.classList.remove("active");
                    }
                }
            }
        });
    });
});