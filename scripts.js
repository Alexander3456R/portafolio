// ============================================================
// PORTADA: Christopher Revelo — Scripts Principales
// ============================================================
// Cada sección está encapsulada en su propia función
// para facilitar el mantenimiento y la escalabilidad.
// ============================================================

// ============================================================
// SECCIÓN 1: FOCO LUMINOSO (Sigue al ratón)
// ============================================================
const foco = document.getElementById('mouse-spotlight');
document.addEventListener('mousemove', (e) => {
    foco.style.left = e.clientX + 'px';
    foco.style.top = e.clientY + 'px';
});

// ============================================================
// SECCIÓN 2: BARRA DE NAVEGACIÓN PREMIUM (Scroll shrink)
// ============================================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-premium');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// ============================================================
// SECCIÓN 3: ANIMACIÓN DE BIENVENIDA (Overlay introductorio)
// ============================================================
const iniciarAnimacionBienvenida = (continuar) => {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) { continuar(); return; }

    // Generar letras animadas individualmente desde JS
    const contenedorTexto = document.getElementById('intro-texto');
    const texto = 'Bienvenido a mi portafolio';
    if (contenedorTexto) {
        [...texto].forEach((caracter) => {
            const span = document.createElement('span');
            span.className = 'intro-letra' + (caracter === ' ' ? ' intro-espacio' : '');
            span.textContent = caracter === ' ' ? '\u00A0' : caracter;
            contenedorTexto.appendChild(span);
        });
    }

    const lineaTiempo = anime.timeline({
        easing: 'easeOutExpo',
        complete: () => {
            overlay.style.display = 'none';
            continuar();
        }
    });

    lineaTiempo.add({
        targets: '.intro-icono',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600
    }).add({
        targets: '.intro-letra',
        opacity: [0, 1],
        delay: anime.stagger(60),
        duration: 1
    }, '-=200').add({
        targets: '.intro-bar',
        width: ['0', '120px'],
        duration: 800,
        easing: 'easeInOutQuad'
    }, '-=400').add({
        targets: '.intro-tagline',
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600
    }, '-=400').add({
        targets: '#intro-overlay',
        translateY: ['0%', '-100%'],
        duration: 800,
        easing: 'easeInOutCubic'
    }, '+=1000');
};

// ============================================================
// SECCIÓN 4: ANIMACIÓN DE ENTRADA DEL HÉROE (AnimeJS)
// ============================================================
const iniciarEntradaHeroe = () => {
    const lineaTiempo = anime.timeline({ easing: 'easeOutExpo' });
    lineaTiempo.add({
        targets: '.hero-badge',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
    }).add({
        targets: '.hero-title',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000
    }, '-=600').add({
        targets: '.hero-role',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=700').add({
        targets: '.hero-desc',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=600').add({
        targets: '.hero-buttons',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=500').add({
        targets: '.hero-image-wrap',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'spring(1, 80, 12, 0)'
    }, '-=1000').add({
        targets: '.floating-badge',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 600,
        easing: 'spring(1, 60, 10, 0)'
    }, '-=800');
};

// ============================================================
// SECCIÓN 5: EFECTO MECANÓGRAFO (Typewriter)
// ============================================================
const iniciarMecanografo = () => {
    const elemento = document.querySelector('.typewriter-text');
    if (!elemento) return;

    const palabras = [
        'Ingeniero de Software',
        'Ciberseguridad',
        'Desarrollador Full Stack',
        'IoT',
        'Arquitecto Cloud',
        'DevOps',
        'Full Stack Engineer',
        'Pentesting',
        'Arquitecto de Software',
        'Innovación'
    ];

    let indicePalabra = 0;
    let indiceCaracter = 0;
    let estaBorrando = false;
    let idTiempo = null;

    const tic = () => {
        const actual = palabras[indicePalabra];
        if (estaBorrando) {
            elemento.textContent = actual.substring(0, indiceCaracter);
            indiceCaracter--;
            if (indiceCaracter < 0) {
                estaBorrando = false;
                indicePalabra = (indicePalabra + 1) % palabras.length;
                indiceCaracter = 0;
                idTiempo = setTimeout(tic, 500);
                return;
            }
            idTiempo = setTimeout(tic, 25 + Math.random() * 15);
        } else {
            elemento.textContent = actual.substring(0, indiceCaracter + 1);
            indiceCaracter++;
            if (indiceCaracter >= actual.length) {
                estaBorrando = true;
                idTiempo = setTimeout(tic, 2200 + Math.random() * 800);
                return;
            }
            idTiempo = setTimeout(tic, 55 + Math.random() * 35);
        }
    };

    idTiempo = setTimeout(tic, 1000);
};

// ============================================================
// SECCIÓN 6: CONTADORES ANIMADOS (AnimeJS + IntersectionObserver)
// ============================================================
const iniciarContadores = () => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const elemento = entrada.target;
            if (elemento.dataset.contado) return;
            elemento.dataset.contado = 'true';

            const objetivo = parseInt(elemento.dataset.objetivo);
            const sufijo = elemento.dataset.sufijo || '';

            anime({
                targets: elemento,
                innerHTML: [0, objetivo],
                duration: 2000,
                delay: parseInt(elemento.dataset.retraso) || 0,
                easing: 'easeOutExpo',
                round: 1,
                update: (anim) => {
                    elemento.innerHTML = Math.round(anim.animations[0].currentValue) + sufijo;
                }
            });
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => observador.observe(el));
};

// ============================================================
// SECCIÓN 7: ENTRADA DE ESTADÍSTICAS (Animación escalonada)
// ============================================================
const iniciarEntradaEstadisticas = () => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const contenedor = entrada.target;
            if (contenedor.dataset.animado) return;
            contenedor.dataset.animado = 'true';

            const tarjetas = contenedor.querySelectorAll('.glass-card');
            anime({
                targets: tarjetas,
                translateY: [40, 0],
                opacity: [0, 1],
                delay: anime.stagger(150),
                duration: 700,
                easing: 'spring(1, 80, 12, 0)'
            });
        });
    }, { threshold: 0.2 });

    const seccion = document.querySelector('#about .grid');
    if (seccion) observador.observe(seccion);
};

// ============================================================
// SECCIÓN 8: TABS DE PORTAFOLIO (Proyectos / Certs / Skills)
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
// SECCIÓN 9: LIGHTBOX PARA CERTIFICACIONES
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
// SECCIÓN 10: REVELACIÓN DE PROYECTOS (Animación escalonada)
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
// SECCIÓN 11: SKILLS PREMIUM — Datos, tarjetas y tabs
// ============================================================
const datosSkills = {
    frontend: [
        { nombre: 'HTML5', icono: 'html5', color: '#E34F26' },
        { nombre: 'CSS3', icono: 'css', color: '#1572B6' },
        { nombre: 'SCSS', icono: 'sass', color: '#CC6699' },
        { nombre: 'TailwindCSS', icono: 'tailwindcss', color: '#06B6D4' },
        { nombre: 'Bootstrap', icono: 'bootstrap', color: '#7952B3' },
        { nombre: 'React', icono: 'react', color: '#61DAFB' },
        { nombre: 'TypeScript', icono: 'typescript', color: '#3178C6' },
        { nombre: 'JavaScript', icono: 'javascript', color: '#F7DF1E' },
        { nombre: 'Alpine.js', icono: 'alpinedotjs', color: '#8BC0D0' }
    ],
    backend: [
        { nombre: 'Node.js', icono: 'nodedotjs', color: '#339933' },
        { nombre: 'Express', icono: 'express', color: '#ffffff' },
        { nombre: 'PHP', icono: 'php', color: '#777BB4' },
        { nombre: 'Python', icono: 'python', color: '#3776AB' },
        { nombre: 'Laravel', icono: 'laravel', color: '#FF2D20' }
    ],
    database: [
        { nombre: 'MySQL', icono: 'mysql', color: '#4479A1' },
        { nombre: 'PostgreSQL', icono: 'postgresql', color: '#4169E1' },
        { nombre: 'MongoDB', icono: 'mongodb', color: '#47A248' },
        { nombre: 'SQLite', icono: 'sqlite', color: '#003B57' },
        { nombre: 'Firebase', icono: 'firebase', color: '#FFCA28' }
    ],
    tools: [
        { nombre: 'Git', icono: 'git', color: '#F05032' },
        { nombre: 'GitHub', icono: 'github', color: '#ffffff' },
        { nombre: 'Docker', icono: 'docker', color: '#2496ED' },
        { nombre: 'Linux', icono: 'linux', color: '#FCC624' },
        { nombre: 'VS Code', icono: 'simple-icons:visualstudiocode', color: '#007ACC' },
        { nombre: 'Postman', icono: 'postman', color: '#FF6C37' },
        { nombre: 'Figma', icono: 'figma', color: '#F24E1E' },
        { nombre: 'Netlify', icono: 'netlify', color: '#00C7B7' },
        { nombre: 'Vercel', icono: 'vercel', color: '#ffffff' }
    ]
};

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
            const urlIcono = skill.icono.includes(':')
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

// ============================================================
// SECCIÓN 12: REVELACIÓN DE SERVICIOS (Animación escalonada)
// ============================================================
const iniciarRevelacionServicios = () => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const contenedor = entrada.target;
            if (contenedor.dataset.animado) return;
            contenedor.dataset.animado = 'true';

            const tarjetas = contenedor.querySelectorAll('.service-card');
            anime({
                targets: tarjetas,
                translateY: [40, 0],
                opacity: [0, 1],
                delay: anime.stagger(120),
                duration: 700,
                easing: 'spring(1, 80, 12, 0)'
            });
        });
    }, { threshold: 0.1 });

    const grilla = document.getElementById('services-grid');
    if (grilla) observador.observe(grilla);
};

// ============================================================
// SECCIÓN 13: PARTÍCULAS FLOTANTES DE FONDO
// ============================================================
const iniciarParticulas = () => {
    const contenedor = document.createElement('div');
    contenedor.className = 'particle-container';
    document.body.prepend(contenedor);

    const colores = ['#adc6ff', '#4cd7f6', '#d0bcff', '#a078ff'];
    const particulas = [];

    for (let i = 0; i < 35; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const tamano = 2 + Math.random() * 4;
        p.style.width = tamano + 'px';
        p.style.height = tamano + 'px';
        p.style.background = colores[Math.floor(Math.random() * colores.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.opacity = 0.15 + Math.random() * 0.25;
        p.style.boxShadow = '0 0 6px ' + p.style.background;
        contenedor.appendChild(p);
        particulas.push(p);
    }

    particulas.forEach((p, i) => {
        const derivaX = (Math.random() - 0.5) * 200;
        const derivaY = (Math.random() - 0.5) * 200;
        const duracion = 8000 + Math.random() * 12000;
        anime({
            targets: p,
            translateX: [0, derivaX],
            translateY: [0, derivaY],
            opacity: [
                { value: 0.1 + Math.random() * 0.3, duration: 0 },
                { value: 0.3 + Math.random() * 0.4, duration: duracion / 2 },
                { value: 0.1 + Math.random() * 0.3, duration: duracion / 2 }
            ],
            duration: duracion,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            delay: Math.random() * 5000
        });
    });
};

// ============================================================
// SECCIÓN 14: CARGA DE PROYECTOS DESDE GITHUB (API + respaldo)
// ============================================================
const iniciarProyectosGithub = async () => {
    const contenedor = document.getElementById('projects-grid');
    if (!contenedor) return;

    const repositorios = [
        'Alexander3456R/olimpo_gym',
        'Alexander3456R/techverse-mvc',
        'Alexander3456R/appsalon_mvc',
        'Alexander3456R/uptask_mvc',
        'Alexander3456R/bienesraices'
    ];

    const datosRespaldo = {
        'Alexander3456R/olimpo_gym': {
            description: 'Sistema de gestión integral para gimnasios con control de membresías, rutinas y pagos.',
            language: 'PHP',
            topics: ['laravel', 'gym-management', 'saas'],
            html_url: 'https://github.com/Alexander3456R/olimpo_gym'
        },
        'Alexander3456R/techverse-mvc': {
            description: 'Plataforma tecnológica construida con arquitectura MVC para gestión de contenido y usuarios.',
            language: 'PHP',
            topics: ['mvc', 'php', 'web'],
            html_url: 'https://github.com/Alexander3456R/techverse-mvc'
        },
        'Alexander3456R/appsalon_mvc': {
            description: 'Aplicación web para salones de belleza con sistema de citas, catálogo de servicios y administración.',
            language: 'PHP',
            topics: ['mvc', 'appointments', 'laravel'],
            html_url: 'https://github.com/Alexander3456R/appsalon_mvc'
        },
        'Alexander3456R/uptask_mvc': {
            description: 'Gestor de proyectos y tareas con autenticación, roles y panel administrable.',
            language: 'PHP',
            topics: ['task-manager', 'mvc', 'php'],
            html_url: 'https://github.com/Alexander3456R/uptask_mvc'
        },
        'Alexander3456R/bienesraices': {
            description: 'Plataforma de anuncios inmobiliarios con CRUD completo, filtros y galería de propiedades.',
            language: 'PHP',
            topics: ['real-estate', 'php', 'mvc'],
            html_url: 'https://github.com/Alexander3456R/bienesraices'
        }
    };

    const gradientesLenguaje = {
        'PHP': ['#777BB4', '#4F5B93'],
        'JavaScript': ['#F7DF1E', '#D4B812'],
        'TypeScript': ['#3178C6', '#235A97'],
        'Python': ['#3572A5', '#264D73'],
        'HTML': ['#E34F26', '#C03A1A'],
        'CSS': ['#563D7C', '#3D2A5A'],
        'Shell': ['#89E051', '#6BB83A'],
        'Go': ['#00ADD8', '#008BB0']
    };

    const resultados = await Promise.allSettled(
        repositorios.map(nombre =>
            fetch(`https://api.github.com/repos/${nombre}`)
                .then(r => r.ok ? r.json() : Promise.reject())
                .catch(() => null)
        )
    );

    resultados.forEach((resultado, i) => {
        const nombreRepo = repositorios[i];
        let datos;

        if (resultado.status === 'fulfilled' && resultado.value) {
            datos = resultado.value;
        } else {
            datos = datosRespaldo[nombreRepo] || {};
            datos.name = nombreRepo.split('/')[1];
            datos.stargazers_count = 0;
            datos.forks_count = 0;
        }

        const nombreCorto = nombreRepo.split('/')[1];
        const nombreMostrar = nombreCorto
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        const lenguaje = datos.language || 'PHP';
        const colores = gradientesLenguaje[lenguaje] || ['#8b5cf6', '#6d28d9'];
        const temas = datos.topics || [];
        const descripcion = datos.description || 'Proyecto de desarrollo web full stack.';
        const estrellas = datos.stargazers_count ?? 0;

        const tarjeta = document.createElement('a');
        tarjeta.href = datos.html_url || `https://github.com/${nombreRepo}`;
        tarjeta.target = '_blank';
        tarjeta.rel = 'noopener noreferrer';
        tarjeta.className = 'project-card card-3d reveal-on-scroll electric-border glass-card rounded-3xl overflow-hidden relative';
        tarjeta.style.textDecoration = 'none';
        tarjeta.style.opacity = '0';
        tarjeta.style.display = 'block';

        const etiquetasTemas = temas.slice(0, 3).map(t =>
            `<span class="bg-black/60 backdrop-blur-md px-sm py-xs rounded-lg text-label-mono text-on-surface border border-white/10">${t}</span>`
        ).join('');

        tarjeta.innerHTML = `
            <canvas class="shader-bg" data-shader="electric"></canvas>
            <div class="card-glow"></div>
            <div class="card-shine"></div>
            <div class="card-content p-0">
                <div class="h-48 bg-gradient-to-br relative overflow-hidden" style="background:linear-gradient(135deg, ${colores[0]} 0%, ${colores[1]} 100%)">
                    <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="material-symbols-outlined text-white/15" style="font-size:80px">folder_open</span>
                    </div>
                    <div class="absolute bottom-md left-md z-20 flex gap-sm">
                        <span class="bg-black/60 backdrop-blur-md px-sm py-xs rounded-lg text-label-mono border border-white/10" style="color:${colores[0]}">${lenguaje}</span>
                        ${etiquetasTemas}
                    </div>
                </div>
                <div class="p-lg space-y-sm">
                    <div class="flex items-center justify-between">
                        <h3 class="font-headline-md text-headline-md">${nombreMostrar}</h3>
                        <div class="flex items-center gap-xs text-on-surface-variant">
                            <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 1">star</span>
                            <span class="font-label-mono text-sm">${estrellas}</span>
                        </div>
                    </div>
                    <p class="text-on-surface-variant font-body-md line-clamp-2">${descripcion}</p>
                    <div class="flex gap-md pt-sm">
                        ${temas.slice(0, 3).map(t =>
            `<span class="font-label-mono text-[12px] text-outline uppercase tracking-widest">${t}</span>`
        ).join('') || `<span class="font-label-mono text-[12px] text-outline uppercase tracking-widest">${lenguaje}</span>`}
                    </div>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);

        anime({
            targets: tarjeta,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 400 + i * 120,
            duration: 700,
            easing: 'spring(1, 80, 12, 0)'
        });
    });

    iniciarEfecto3D('.project-card.card-3d');
};

// ============================================================
// SECCIÓN 15: ENTRADA DE LA SECCIÓN DE CONTACTO
// ============================================================
const iniciarEntradaContacto = () => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const elemento = entrada.target;
            if (elemento.dataset.animado) return;
            elemento.dataset.animado = 'true';

            anime({
                targets: elemento,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'spring(1, 80, 12, 0)'
            });
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-reveal').forEach(el => observador.observe(el));
};

// ============================================================
// SECCIÓN 16: INDICADOR DESLIZANTE (top/left dinámicos)
// ============================================================
const moverIndicador = (enlace) => {
    const indicador = document.getElementById('nav-indicator');
    const contenedor = document.getElementById('nav-links');
    if (!enlace || !indicador || !contenedor) return;

    // Cubrir el <li> padre (no solo el <a>)
    const item = enlace.parentElement;
    if (!item) return;

    // Usar offsetLeft/offsetTop relativos a .nav-links (position: relative)
    const t = Math.round(item.offsetTop);
    const l = Math.round(item.offsetLeft);
    const w = Math.round(item.offsetWidth);
    const h = Math.round(item.offsetHeight);

    const tS = String(t);
    const lS = String(l);
    const wS = String(w);
    const hS = String(h);

    if (indicador.dataset.t !== tS || indicador.dataset.l !== lS ||
        indicador.dataset.w !== wS || indicador.dataset.h !== hS) {
        indicador.style.top  = t + 'px';
        indicador.style.left = l + 'px';
        indicador.style.width  = w + 'px';
        indicador.style.height = h + 'px';
        indicador.dataset.t = tS;
        indicador.dataset.l = lS;
        indicador.dataset.w = wS;
        indicador.dataset.h = hS;
    }
};

const recalcularNavegacion = () => {
    const activo = document.querySelector('.nav-link.activo');
    if (activo) moverIndicador(activo);
};

// ============================================================
// SECCIÓN 17: ENLACE ACTIVO + SCROLL SPY
// ============================================================
const iniciarNavegacionActiva = () => {
    const secciones = document.querySelectorAll('section[id]');
    const enlaces = document.querySelectorAll('.nav-link');
    const indicador = document.getElementById('nav-indicator');
    const contenedor = document.getElementById('nav-links');
    if (!enlaces.length || !indicador || !contenedor) return;

    const actualizar = () => {
        const alturaVentana = window.innerHeight;
        const margen = Math.min(alturaVentana * 0.3, 200);
        const scrollY = window.scrollY + margen;

        let activo = null;
        secciones.forEach(s => {
            if (scrollY >= s.offsetTop) activo = s.id;
        });

        enlaces.forEach(e => {
            e.classList.remove('activo');
            e.removeAttribute('aria-current');
        });

        let enlaceActivo = null;
        const primeraSec = secciones[0];
        const umbralInicio = primeraSec ? primeraSec.offsetTop - alturaVentana * 0.4 : 0;

        if (!activo || window.scrollY < umbralInicio) {
            enlaceActivo = [...enlaces].find(e => e.dataset.seccion === 'inicio');
        } else {
            enlaceActivo = [...enlaces].find(e => e.getAttribute('href') === '#' + activo);
        }

        if (enlaceActivo) {
            enlaceActivo.classList.add('activo');
            enlaceActivo.setAttribute('aria-current', 'page');
            moverIndicador(enlaceActivo);
        }
    };

    actualizar();

    // Scroll spy + recalcular indicador
    window.addEventListener('scroll', actualizar, { passive: true });

    // Recalcular en resize (debounced)
    let idResize;
    window.addEventListener('resize', () => {
        clearTimeout(idResize);
        idResize = setTimeout(recalcularNavegacion, 80);
    });

    // Recalcular cuando carguen las fuentes (cambia el ancho de los textos)
    if (document.fonts) {
        document.fonts.ready.then(recalcularNavegacion);
    }

    // Recalcular cuando termine de cargar la página
    window.addEventListener('load', recalcularNavegacion);
};

// (spotlight eliminado por solicitud del usuario)

// ============================================================
// SECCIÓN 18: DESPLAZAMIENTO SUAVE (Smooth Scroll con offset)
// ============================================================
const ALTURA_HEADER = 80;

function animarScroll(objetivoY, duracion = 600) {
    const inicioY = window.scrollY;
    const diferencia = objetivoY - inicioY;
    const tiempoInicio = performance.now();
    function paso(ahora) {
        const transcurrido = ahora - tiempoInicio;
        const progreso = Math.min(transcurrido / duracion, 1);
        const suavizado = 1 - Math.pow(1 - progreso, 3);
        window.scrollTo(0, inicioY + diferencia * suavizado);
        if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
}

function scrollSuaveA(idSeccion) {
    const el = document.getElementById(idSeccion);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - ALTURA_HEADER;
    animarScroll(top);
}

const iniciarScrollSuave = () => {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const href = enlace.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                animarScroll(0);
                return;
            }
            const idSeccion = href.replace('#', '');
            if (document.getElementById(idSeccion)) {
                e.preventDefault();
                scrollSuaveA(idSeccion);
            }
        });
    });
};

// ============================================================
// SECCIÓN 18: MENÚ MÓVIL FULLSCREEN
// ============================================================
const iniciarNavMovil = () => {
    const btn = document.getElementById('menu-btn');
    const overlay = document.getElementById('nav-mobile-overlay');
    const cerrar = document.getElementById('nav-mobile-cerrar');
    if (!btn || !overlay) return;

    const abrir = () => {
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };
    const cerrarOverlay = () => {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    btn.addEventListener('click', abrir);
    if (cerrar) cerrar.addEventListener('click', cerrarOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) cerrarOverlay();
    });
    overlay.querySelectorAll('.nav-mobile-link').forEach(l => {
        l.addEventListener('click', cerrarOverlay);
    });
};

// ============================================================
// SECCIÓN 19: EFECTO 3D TILT (Rotación controlada por mouse)
// ============================================================
const iniciarEfecto3D = (selector = '.card-3d') => {
    document.querySelectorAll(selector).forEach(tarjeta => {
        if (tarjeta.dataset.tiltActivo) return;
        tarjeta.dataset.tiltActivo = 'true';

        tarjeta.addEventListener('mousemove', (e) => {
            const rect = tarjeta.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centroX = rect.width / 2;
            const centroY = rect.height / 2;
            const rotarX = ((y - centroY) / centroY) * -10;
            const rotarY = ((x - centroX) / centroX) * 10;
            tarjeta.style.transform = `rotateX(${rotarX}deg) rotateY(${rotarY}deg)`;
            tarjeta.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
            tarjeta.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        });

        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
};

// ============================================================
// INICIALIZACIÓN GENERAL
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
        iniciarProyectosGithub();
        iniciarRevelacionServicios();
        iniciarEntradaContacto();
        iniciarNavegacionActiva();
        requestAnimationFrame(recalcularNavegacion);
        iniciarTabsPortafolio();
        iniciarLightbox();
        iniciarSkillsPremium();

        iniciarEfecto3D();

        // Respaldo genérico: anima cualquier elemento .reveal-on-scroll
        // que no haya sido capturado por los observadores específicos
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
