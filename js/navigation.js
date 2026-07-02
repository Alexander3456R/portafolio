// ============================================================
// PORTADA: Christopher Revelo — Navegación
// ============================================================

// ============================================================
// INDICADOR DESLIZANTE (top/left dinámicos)
// ============================================================
const moverIndicador = (enlace) => {
    const indicador = document.getElementById('nav-indicator');
    const contenedor = document.getElementById('nav-links');
    if (!enlace || !indicador || !contenedor) return;

    const item = enlace.parentElement;
    if (!item) return;

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
// ENLACE ACTIVO + SCROLL SPY
// ============================================================
const iniciarNavegacionActiva = () => {
    const secciones = document.querySelectorAll('section[id]');
    const enlaces = document.querySelectorAll('.nav-link');
    const indicador = document.getElementById('nav-indicator');
    const contenedor = document.getElementById('nav-links');
    if (!enlaces.length || !indicador || !contenedor) return;

    let cacheSecciones = [];
    let umbralInicio = 0;

    const actualizarCache = () => {
        cacheSecciones = [...secciones].map(s => ({
            id: s.id,
            offsetTop: s.offsetTop
        }));
        const primeraSec = secciones[0];
        umbralInicio = primeraSec ? primeraSec.offsetTop - window.innerHeight * 0.4 : 0;
    };

    const actualizar = () => {
        const alturaVentana = window.innerHeight;
        const margen = Math.min(alturaVentana * 0.3, 200);
        const scrollY = window.scrollY + margen;

        let activo = null;
        for (const s of cacheSecciones) {
            if (scrollY >= s.offsetTop) activo = s.id;
        }

        enlaces.forEach(e => {
            e.classList.remove('activo');
            e.removeAttribute('aria-current');
        });

        let enlaceActivo = null;

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

    actualizarCache();
    actualizar();

    window.addEventListener('scroll', actualizar, { passive: true });

    let idResize;
    window.addEventListener('resize', () => {
        clearTimeout(idResize);
        idResize = setTimeout(() => {
            actualizarCache();
            recalcularNavegacion();
        }, 80);
    });

    if (document.fonts) {
        document.fonts.ready.then(() => {
            actualizarCache();
            recalcularNavegacion();
        });
    }

    window.addEventListener('load', () => {
        actualizarCache();
        recalcularNavegacion();
    });
};

// ============================================================
// DESPLAZAMIENTO SUAVE (Smooth Scroll con offset)
// ============================================================
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
// MENÚ MÓVIL FULLSCREEN
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
