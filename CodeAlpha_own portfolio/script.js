/* =====================================================
   AMBUJ SHARMA — PORTFOLIO JAVASCRIPT
   Sections:
   1. Theme Toggle (Dark / Light)
   2. Navbar Scroll Effect
   3. Smooth Navigation
   4. Mobile Menu Toggle
   5. Footer Year
   6. Typing Animation
   7. Scroll Reveal
   8. Skill Bar Animation
   9. Counter Animation
   10. Project Filter
   11. Contact Form
===================================================== */


/* ─────────────────────────────────────────────────
   1. THEME TOGGLE
───────────────────────────────────────────────── */
var isDark = true;

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  document.getElementById('themeBtn').innerHTML = isDark ? '&#9790; Light' : '&#9728; Dark';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme on page load
(function () {
  if (localStorage.getItem('theme') === 'light') {
    isDark = false;
    document.body.classList.add('light');
    document.getElementById('themeBtn').innerHTML = '&#9728; Dark';
  }
})();


/* ─────────────────────────────────────────────────
   2. NAVBAR SCROLL EFFECT
───────────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  // Add 'scrolled' class for navbar background blur
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show / hide the back-to-top button
  var btt = document.getElementById('btt');
  if (window.scrollY > 400) {
    btt.classList.add('show');
  } else {
    btt.classList.remove('show');
  }
});


/* ─────────────────────────────────────────────────
   3. SMOOTH NAVIGATION
───────────────────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goTo(selector) {
  var el = document.querySelector(selector);
  if (el) {
    var offsetTop = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
  // Close mobile menu after clicking a link
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').innerHTML = '&#9776;';
}


/* ─────────────────────────────────────────────────
   4. MOBILE MENU TOGGLE
───────────────────────────────────────────────── */
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  var isOpen = menu.classList.contains('open');
  document.getElementById('hamburger').innerHTML = isOpen ? '&#10005;' : '&#9776;';
}


/* ─────────────────────────────────────────────────
   5. FOOTER YEAR (auto-updates)
───────────────────────────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();


/* ─────────────────────────────────────────────────
   6. TYPING ANIMATION
   Loops through 'roles' array, types each word,
   pauses, then deletes it before typing the next.
───────────────────────────────────────────────── */
var roles = ['IT Student', 'Web Developer', 'Problem Solver', 'Creative Coder'];
var roleIndex = 0;
var charIndex = 0;
var isDeleting = false;

function type() {
  var el = document.getElementById('typedText');
  var currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Type next character
    charIndex++;
    el.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      // Finished typing — pause before deleting
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    // Delete one character
    charIndex--;
    el.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type(); // Start the typing animation


/* ─────────────────────────────────────────────────
   7. SCROLL REVEAL
   Elements with class "reveal" animate into view
   when they enter the viewport.
───────────────────────────────────────────────── */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});


/* ─────────────────────────────────────────────────
   8. SKILL BAR ANIMATION
   Fills skill bars when they scroll into view.
   Width is read from the element's data-w attribute.
───────────────────────────────────────────────── */
var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.w + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(function (el) {
  skillObserver.observe(el);
});


/* ─────────────────────────────────────────────────
   9. COUNTER ANIMATION
   Counts up from 0 to data-target value when
   the stat card scrolls into view.
───────────────────────────────────────────────── */
var counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var target = parseInt(entry.target.dataset.target);
      var count = 0;
      var step = target / 60;

      var timer = setInterval(function () {
        count += step;
        if (count >= target) {
          entry.target.textContent = target;
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(count);
        }
      }, 25);

      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(function (el) {
  counterObserver.observe(el);
});


/* ─────────────────────────────────────────────────
   10. PROJECT FILTER
   Shows / hides project cards based on category.
   Category is stored in data-cat attribute on cards.
───────────────────────────────────────────────── */
function filterProj(cat, btn) {
  // Update active button
  document.querySelectorAll('.fbtn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Show / hide cards
  document.querySelectorAll('.proj-card').forEach(function (card) {
    var match = (cat === 'all') || (card.dataset.cat === cat);
    card.classList.toggle('hidden', !match);
  });
}


/* ─────────────────────────────────────────────────
   11. CONTACT FORM
   Shows a success message and resets the form.
   Replace this with a real backend call when ready.
───────────────────────────────────────────────── */
function sendForm(e) {
  e.preventDefault();
  var ok = document.getElementById('formOk');
  ok.classList.add('show');
  e.target.reset();
  setTimeout(function () {
    ok.classList.remove('show');
  }, 4000);
}
