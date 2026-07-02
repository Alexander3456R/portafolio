// ============================================================
// PORTADA: Christopher Revelo — Efectos Visuales
// ============================================================

// ============================================================
// RED DE NODOS (Fondo animado con canvas)
// ============================================================
const iniciarRedNodos = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'network-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let animacionActiva = true;
    let ultimoFrame = 0;
    let nodos = [];
    const COL_NODOS = ['#adc6ff', '#4cd7f6', '#d0bcff'];
    const NUM_NODOS = 10;

    const redimensionar = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const crearNodos = () => {
        nodos = [];
        for (let i = 0; i < NUM_NODOS; i++) {
            nodos.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radio: 2 + Math.random() * 2,
                color: COL_NODOS[Math.floor(Math.random() * COL_NODOS.length)]
            });
        }
    };

    const dibujar = (ahora) => {
        if (!animacionActiva) return;
        const dt = Math.min((ahora - ultimoFrame) / 16.67, 3);
        ultimoFrame = ahora;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const ancho = canvas.width;
        const alto = canvas.height;

        for (const n of nodos) {
            n.x += n.vx * dt;
            n.y += n.vy * dt;
            if (n.x < 0 || n.x > ancho) n.vx *= -1;
            if (n.y < 0 || n.y > alto) n.vy *= -1;
            n.x = Math.max(0, Math.min(ancho, n.x));
            n.y = Math.max(0, Math.min(alto, n.y));
        }

        const distMax = Math.min(ancho, alto) * 0.25;
        for (let i = 0; i < nodos.length; i++) {
            for (let j = i + 1; j < nodos.length; j++) {
                const dx = nodos[i].x - nodos[j].x;
                const dy = nodos[i].y - nodos[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < distMax) {
                    ctx.beginPath();
                    ctx.moveTo(nodos[i].x, nodos[i].y);
                    ctx.lineTo(nodos[j].x, nodos[j].y);
                    ctx.strokeStyle = `rgba(173, 198, 255, ${(1 - dist / distMax) * 0.2})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        for (const n of nodos) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radio, 0, Math.PI * 2);
            ctx.fillStyle = n.color;
            ctx.globalAlpha = 0.5;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(dibujar);
    };

    redimensionar();
    crearNodos();

    let idResize;
    window.addEventListener('resize', () => {
        clearTimeout(idResize);
        idResize = setTimeout(() => {
            redimensionar();
            crearNodos();
        }, 150);
    });

    document.addEventListener('visibilitychange', () => {
        animacionActiva = !document.hidden;
        if (animacionActiva) {
            ultimoFrame = performance.now();
            requestAnimationFrame(dibujar);
        }
    });

    requestAnimationFrame(dibujar);
};

// ============================================================
// EFECTO 3D TILT (Rotación controlada por mouse)
// ============================================================
const iniciarEfecto3D = (selector = '.card-3d') => {
    document.querySelectorAll(selector).forEach(tarjeta => {
        if (tarjeta.dataset.tiltActivo) return;
        tarjeta.dataset.tiltActivo = 'true';

        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.willChange = 'transform';
        });

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
            tarjeta.style.willChange = 'auto';
        });
    });
};
