// ============================================================
// PORTADA: Christopher Revelo — Configuración Global
// ============================================================

// Altura del header para offset en scroll suave
const ALTURA_HEADER = 80;

// Foco luminoso que sigue al ratón
const foco = document.getElementById('mouse-spotlight');
document.addEventListener('mousemove', (e) => {
    foco.style.left = e.clientX + 'px';
    foco.style.top = e.clientY + 'px';
});

// Contraer barra de navegación al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-premium');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// Datos completos de la sección Tecnologías (skills)
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
        { nombre: 'Firebase', icono: 'firebase', color: '#FFCA28' },
        { nombre: 'Supabase', icono: 'supabase', color: '#3ECF8E' }
    ],
    tools: [
        { nombre: 'Git', icono: 'git', color: '#F05032' },
        { nombre: 'GitHub', icono: 'github', color: '#ffffff' },
        { nombre: 'Docker', icono: 'docker', color: '#2496ED' },
        { nombre: 'Linux', icono: 'linux', color: '#FCC624' },
        { nombre: 'VS Code', icono: 'simple-icons:visualstudiocode', color: '#007ACC' },
        { nombre: 'Postman', icono: 'postman', color: '#FF6C37' },
        { nombre: 'DOMcloud', icono: 'https://domcloud.co/assets/icon.svg', color: '#5B6ABF' },
        { nombre: 'Figma', icono: 'figma', color: '#F24E1E' },
        { nombre: 'Netlify', icono: 'netlify', color: '#00C7B7' },
        { nombre: 'Vercel', icono: 'vercel', color: '#ffffff' },
        { nombre: 'Vite', icono: 'vite', color: '#646CFF' },
        { nombre: 'Excel', icono: 'simple-icons:microsoftexcel', color: '#217346' },
        { nombre: 'PowerPoint', icono: 'simple-icons:microsoftpowerpoint', color: '#B7472A' },
        { nombre: 'Word', icono: 'simple-icons:microsoftword', color: '#2B579A' },
        { nombre: 'Antigravity', icono: 'simple-icons:google', color: '#4285F4' },
        { nombre: 'Brevo SMTP', icono: 'brevo', color: '#0B996E' },
        { nombre: 'Kali Linux', icono: 'kalilinux', color: '#557C94' },
        { nombre: 'Wireshark', icono: 'wireshark', color: '#1679A7' },
        { nombre: 'Nmap', icono: 'fotos/sitelogo-nmap.svg', color: '#94B53C' },
        { nombre: 'VirtualBox', icono: 'virtualbox', color: '#183A61' },
        { nombre: 'VMware', icono: 'vmware', color: '#607078' },
        { nombre: 'Hydra', icono: 'fotos/hydra-logo.svg', color: '#D32F2F' },
        { nombre: 'Maltego', icono: 'fotos/Maltego-Logo-Horizontal-Black.svg', color: '#6C27A3' },
        { nombre: 'Seeker', icono: 'fotos/console-svgrepo-com.svg', color: '#E65100' }
    ]
};
