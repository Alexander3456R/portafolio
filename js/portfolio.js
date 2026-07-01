// ============================================================
// PORTADA: Christopher Revelo — Portafolio y Habilidades
// ============================================================

// ============================================================
// TABS DE PORTAFOLIO (Proyectos / Certs / Skills)
// ============================================================
const iniciarTabsPortafolio = () => {
    const tabs = document.querySelectorAll('.portafolio-tab');
    const paneles = document.querySelectorAll('.portafolio-panel');
    const indicador = document.querySelector('.portafolio-indicador');
    if (!tabs.length) return;

    const moverIndicador = (tab) => {
        if (!indicador) return;
        const contenedor = tab.parentElement;
        const indices = [...tabs];
        const index = indices.indexOf(tab);
        let ancho = 0;
        for (let i = 0; i < index; i++) {
            ancho += indices[i].offsetWidth + 4;
        }
        indicador.style.setProperty('--ancho', tab.offsetWidth);
        indicador.style.transform = `translateX(${ancho}px)`;
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('activo'));
            tab.classList.add('activo');
            moverIndicador(tab);

            const panelId = 'panel-' + tab.dataset.panel;
            paneles.forEach(p => {
                p.classList.remove('activo');
                if (p.id === panelId) p.classList.add('activo');
            });
        });
    });

    const activo = document.querySelector('.portafolio-tab.activo');
    if (activo) moverIndicador(activo);

    let idTiempoResize;
    window.addEventListener('resize', () => {
        clearTimeout(idTiempoResize);
        idTiempoResize = setTimeout(() => {
            const activoAhora = document.querySelector('.portafolio-tab.activo');
            if (activoAhora) moverIndicador(activoAhora);
        }, 150);
    });
};

// ============================================================
// LIGHTBOX PARA CERTIFICACIONES
// ============================================================
const iniciarLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cerrar = document.getElementById('lightbox-cerrar');
    if (!lightbox) return;

    document.querySelectorAll('.cert-img-wrap').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const src = wrap.querySelector('img').src;
            img.src = src;
            lightbox.classList.add('visible');
            document.body.style.overflow = 'hidden';
        });
    });

    const ocultar = () => {
        lightbox.classList.remove('visible');
        document.body.style.overflow = '';
    };

    cerrar.addEventListener('click', ocultar);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) ocultar();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') ocultar();
    });
};

// ============================================================
// REVELACIÓN DE PROYECTOS (Animación escalonada)
// ============================================================
const iniciarRevelacionProyectos = () => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const contenedor = entrada.target;
            if (contenedor.dataset.animado) return;
            contenedor.dataset.animado = 'true';

            const tarjetas = contenedor.querySelectorAll('.project-card');
            anime({
                targets: tarjetas,
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(150),
                duration: 800,
                easing: 'spring(1, 80, 12, 0)'
            });
        });
    }, { threshold: 0.05 });

    const grilla = document.getElementById('projects-grid');
    if (grilla) observador.observe(grilla);
};

// ============================================================
// SKILLS PREMIUM — Tabs, Grid y Tarjetas
// ============================================================
const iniciarSkillsPremium = () => {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    let categoriaActual = 'frontend';

    const renderizar = (categoria) => {
        const items = datosSkills[categoria] || [];
        grid.innerHTML = '';
        categoriaActual = categoria;

        items.forEach((skill, i) => {
            const card = document.createElement('div');
            card.className = 'skill-card-premium card-3d';
            card.style.borderColor = skill.color + '20';
            card.style.setProperty('--card-color', skill.color);
            const urlIcono = skill.icono.startsWith('http')
                ? skill.icono
                : skill.icono.includes('/')
                    ? skill.icono
                    : skill.icono.includes(':')
                        ? `https://api.iconify.design/${skill.icono}.svg?color=${encodeURIComponent(skill.color)}`
                        : `https://cdn.simpleicons.org/${skill.icono}/${skill.color.replace('#', '')}`;
            card.innerHTML = `
                <div class="card-glow"></div>
                <div class="card-shine"></div>
                <img class="skill-icono" src="${urlIcono}" alt="${skill.nombre}" loading="lazy">
                <span class="skill-nombre">${skill.nombre}</span>
            `;
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = skill.color + '50';
                card.style.boxShadow = `0 8px 30px ${skill.color}20`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = skill.color + '20';
                card.style.boxShadow = '';
            });
            grid.appendChild(card);

            anime({
                targets: card,
                translateY: [20, 0],
                opacity: [0, 1],
                delay: i * 60,
                duration: 500,
                easing: 'spring(1, 80, 12, 0)'
            });
        });

        if (grid.children.length > 0) iniciarEfecto3D('.skill-card-premium.card-3d');
    };

    document.querySelectorAll('.skills-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('activo'));
            tab.classList.add('activo');
            renderizar(tab.dataset.categoria);
        });
    });

    renderizar('frontend');
};
