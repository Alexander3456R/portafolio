// ============================================================
// PORTADA: Christopher Revelo — Efectos Visuales
// ============================================================

// ============================================================
// PARTÍCULAS FLOTANTES DE FONDO
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
// EFECTO 3D TILT (Rotación controlada por mouse)
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
