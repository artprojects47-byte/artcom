/* ===================================
   ART TECHNOLOGIES UGANDA
   Main JavaScript File
   Version: 2.0
   =================================== */

// ===== FORM HANDLING =====
(function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      
      try {
        emailjs.init('CN5kEbS48kP12K9v0');
        
        const templateParams = {
          to_email: 'artwills01@gmail.com',
          from_name: document.getElementById('name').value,
          from_email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          service: document.getElementById('service').value,
          budget: document.getElementById('budget').value,
          message: document.getElementById('message').value,
          reply_to: document.getElementById('email').value
        };
        
        const response = await emailjs.send(
          'service_99h5mrm',
          'template_selltvm',
          templateParams
        );
        
        if (response.status === 200) {
          alert('✅ Message sent successfully! We\'ll contact you soon.');
          form.reset();
        }
      } catch(error) {
        alert('❌ Failed to send message. Please try again or contact us directly.');
        console.error('EmailJS error:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
})();

// ===== DARK MODE TOGGLE =====
(function() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  
  const html = document.documentElement;
  const savedMode = localStorage.getItem('darkMode');
  
  if (savedMode === 'enabled' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark-mode');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
})();

// ===== NAVBAR SCROLL EFFECT =====
(function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ===== SCROLL TO TOP BUTTON =====
(function() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== HOME SECTION ON REFRESH =====
(function() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  function goHome() {
    const home = document.getElementById('home');
    if (home) {
      if (location.hash !== '#home') {
        history.replaceState(null, '', '#home');
      }
      home.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }
  
  window.addEventListener('load', goHome);
  window.addEventListener('pageshow', goHome);
})();

// ===== HAMBURGER MENU =====
(function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
})();

// ===== PORTFOLIO FILTER =====
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
})();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
(function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });
})();

// ===== ACTIVE NAV LINK =====
(function() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
})();

// ===== INITIALIZE AOS =====
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
});
