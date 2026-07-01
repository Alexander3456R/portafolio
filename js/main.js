// ============================================================
// PORTADA: Christopher Revelo — Inicialización General
// ============================================================

window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
    iniciarParticulas();
    iniciarScrollSuave();
    iniciarNavMovil();

    iniciarAnimacionBienvenida(() => {
        document.querySelector('.nav-premium').classList.add('visible');
        iniciarEntradaHeroe();
        iniciarMecanografo();
        iniciarContadores();
        iniciarEntradaEstadisticas();
        iniciarRevelacionProyectos();
        iniciarRevelacionServicios();
        iniciarEntradaContacto();
        iniciarNavegacionActiva();
        requestAnimationFrame(recalcularNavegacion);
        iniciarTabsPortafolio();
        iniciarLightbox();
        iniciarSkillsPremium();

        iniciarEfecto3D();

        document.querySelectorAll('.reveal-on-scroll:not(.animated)').forEach(el => {
            const observador = new IntersectionObserver((entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting && !entrada.target.classList.contains('animated')) {
                        entrada.target.classList.add('animated');
                        anime({
                            targets: entrada.target,
                            translateY: [30, 0],
                            opacity: [0, 1],
                            easing: 'spring(1, 80, 10, 0)'
                        });
                    }
                });
            }, { threshold: 0.1 });
            observador.observe(el);
        });
    });
});
