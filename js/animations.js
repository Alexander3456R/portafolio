// ============================================================
// PORTADA: Christopher Revelo — Animaciones de Entrada
// ============================================================

// ============================================================
// ANIMACIÓN DE BIENVENIDA (Overlay introductorio)
// ============================================================
const iniciarAnimacionBienvenida = (continuar) => {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) { continuar(); return; }

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
// ANIMACIÓN DE ENTRADA DEL HÉROE
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
// EFECTO MECANÓGRAFO (Typewriter)
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
// CONTADORES ANIMADOS (AnimeJS + IntersectionObserver)
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
// ENTRADA DE ESTADÍSTICAS (Animación escalonada)
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
// REVELACIÓN DE SERVICIOS (Animación escalonada)
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
// ENTRADA DE LA SECCIÓN DE CONTACTO
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
