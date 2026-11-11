
/* =====================================================
   PATRICK PRADA - PORTAFOLIO
   JavaScript principal
===================================================== */


/* ================= MENÚ MÓVIL ================= */

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {

    navToggle.addEventListener('click', () => {

        const isOpen = navMenu.classList.toggle('show-menu');

        navToggle.setAttribute('aria-expanded', isOpen);

        navToggle.innerHTML = isOpen
            ? "<i class='bx bx-x'></i>"
            : "<i class='bx bx-menu'></i>";

    });

}


/* ================= NAVEGACIÓN ================= */

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        navLinks.forEach(item => {
            item.classList.remove('active');
        });

        link.classList.add('active');

        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }

        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = "<i class='bx bx-menu'></i>";
        }

    });

});


/* ================= HEADER AL HACER SCROLL ================= */

const header = document.getElementById('header');

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

}

window.addEventListener('scroll', updateHeader);

updateHeader();


/* ================= AÑO AUTOMÁTICO ================= */

const currentYear = document.getElementById('current-year');

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ================= ANIMACIONES SCROLL REVEAL ================= */

if (typeof ScrollReveal !== 'undefined') {

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '35px',
        duration: 900,
        delay: 100,
        interval: 100,
        opacity: 0,
        scale: 0.98,
        reset: false
    });

    // Inicio
    sr.reveal('.home__badge', { origin: 'left' });
    sr.reveal('.home__title', { delay: 150, origin: 'left' });
    sr.reveal('.home__subtitle', { delay: 250, origin: 'left' });
    sr.reveal('.home__description', { delay: 350, origin: 'left' });
    sr.reveal('.home__buttons', { delay: 450, origin: 'left' });
    sr.reveal('.home__social', { delay: 550, origin: 'left' });
    sr.reveal('.home__image', { origin: 'right', delay: 200 });

    // Sobre mí
    sr.reveal('.about__image', { origin: 'left' });
    sr.reveal('.about__content', { origin: 'right', delay: 150 });

    // Tecnologías
    sr.reveal('.skill__card', { interval: 100 });

    // Proyectos
    sr.reveal('.project__card', { interval: 150 });

    // Contacto
    sr.reveal('.contact__info', { origin: 'left' });
    sr.reveal('.contact__form', { origin: 'right', delay: 150 });

}


/* ================= CERRAR MENÚ AL CAMBIAR TAMAÑO ================= */

window.addEventListener('resize', () => {

    if (window.innerWidth > 768 && navMenu) {

        navMenu.classList.remove('show-menu');

        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = "<i class='bx bx-menu'></i>";
        }

    }

});




// ==========================================
// FORMULARIO DE CONTACTO - FORMSUBMIT AJAX
// ==========================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {

    contactForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';

        formMessage.textContent = '';

        try {

            const response = await fetch(
                'https://formsubmit.co/ajax/5ff5857648a7cb14aff66d95df18f79e',
                {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            const result = await response.json();

            if (!response.ok || result.success !== 'true') {
                throw new Error('No se pudo enviar el mensaje.');
            }

            formMessage.textContent =
                '¡Mensaje enviado correctamente! Gracias por contactarme.';

            formMessage.style.color = '#a78bfa';

            contactForm.reset();

        } catch (error) {

            console.error('Error al enviar el formulario:', error);

            formMessage.textContent =
                'No se pudo enviar el mensaje. Inténtalo nuevamente.';

            formMessage.style.color = '#ff6b6b';

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

        }

    });

}
