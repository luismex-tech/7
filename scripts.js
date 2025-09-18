// =================================================================
// SCRIPT CON LÍNEAS DE DIAGNÓSTICO
// Reemplaza todo tu script.js con este código para la prueba.
// =================================================================

console.log("PRUEBA 1: script.js cargado correctamente."); // <-- PRUEBA 1

document.addEventListener('DOMContentLoaded', function () {

  console.log("PRUEBA 2: El DOM está listo."); // <-- PRUEBA 2

  /* ---------- CONFIG: Número de WhatsApp ---------- */
  const BUSINESS_WA = '5214776772422';

  /* ---------- Variables DOM para el Menú ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  console.log("PRUEBA 3:", { // <-- PRUEBA 3
    botonHamburguesa: hamburger,
    menuNavegacion: navLinks
  });

  /* ---------- Mobile menu toggle ---------- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      console.log("PRUEBA 4: ¡CLIC DETECTADO EN EL BOTÓN!"); // <-- PRUEBA 4

      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      navLinks.classList.toggle('active');
    });

    // close menu when clicking a link (mobile)
    const links = navLinks.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scroll for internal anchors ---------- */
  // ... (El resto del código sigue igual)
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Contact form validation & WhatsApp send ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const inputNombre = document.getElementById('nombre');
    const inputTelefono = document.getElementById('telefono');
    const inputComentarios = document.getElementById('comentarios');
    const errNombre = document.getElementById('error-nombre');
    const errTelefono = document.getElementById('error-telefono');
    const errComentarios = document.getElementById('error-comentarios');

    function validarNombre() {
      const v = inputNombre.value.trim();
      const re = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
      if (!v) { if (errNombre) errNombre.textContent = 'Por favor ingresa tu nombre.'; return false; }
      if (!re.test(v)) { if (errNombre) errNombre.textContent = 'Solo letras y espacios.'; return false; }
      if (errNombre) errNombre.textContent = ''; return true;
    }
    function validarTelefono() {
      const v = inputTelefono.value.replace(/\D/g, '');
      inputTelefono.value = v;
      const re = /^\d{10}$/;
      if (!v) { if (errTelefono) errTelefono.textContent = 'Por favor ingresa tu teléfono.'; return false; }
      if (!re.test(v)) { if (errTelefono) errTelefono.textContent = 'El teléfono debe tener exactamente 10 dígitos.'; return false; }
      if (errTelefono) errTelefono.textContent = ''; return true;
    }
    function validarComentarios() {
      const v = inputComentarios.value.trim();
      if (!v) { if (errComentarios) errComentarios.textContent = 'Por favor describe tu proyecto.'; return false; }
      if (errComentarios) errComentarios.textContent = ''; return true;
    }

    if (inputNombre) inputNombre.addEventListener('input', validarNombre);
    if (inputTelefono) inputTelefono.addEventListener('input', validarTelefono);
    if (inputComentarios) inputComentarios.addEventListener('input', validarComentarios);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const isNombreValid = validarNombre();
      const isTelefonoValid = validarTelefono();
      const isComentariosValid = validarComentarios();
      if (!isNombreValid || !isTelefonoValid || !isComentariosValid) {
        return;
      }
      const nombre = inputNombre.value.trim();
      const telefonoCliente = inputTelefono.value.trim();
      const comentarios = inputComentarios.value.trim();
      const lines = [
        '📣 *¡Hola!* Quisiera más información sobre sus servicios.',
        `*Nombre:* ${nombre}`,
        `*Teléfono:* ${telefonoCliente}`,
        `*Consulta:* ${comentarios}`
      ];
      const text = encodeURIComponent(lines.join('\n'));
      const waUrl = `https://wa.me/${BUSINESS_WA}?text=${text}`;
      const w = window.open(waUrl, '_blank');
      if (!w) window.location.href = waUrl;
    });

    form.addEventListener('reset', function () {
      if (errNombre) errNombre.textContent = '';
      if (errTelefono) errTelefono.textContent = '';
      if (errComentarios) errComentarios.textContent = '';
    });
  }

  /* ---------- Floating WhatsApp button ---------- */
  const waFloat = document.getElementById('whatsapp-float');
  if (waFloat) {
    waFloat.addEventListener('click', function (e) {
      e.preventDefault();
      const txt = encodeURIComponent('📣 ¡Hola! Quisiera información sobre sus servicios.');
      const waUrl = 'https://wa.me/' + BUSINESS_WA + '?text=' + txt;
      const openWin = window.open(waUrl, '_blank');
      if (!openWin) window.location.href = waUrl;
    });
  }

  /* Close mobile menu on resize to desktop */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860 && navLinks) {
      navLinks.classList.remove('active');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });

}); // DOMContentLoaded
