
/* ====================================
   VARIABLES ET SÉLECTEURS
   ==================================== */

// Sélection des éléments du DOM
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Variables pour les animations
let isScrolling = false;

/* ====================================
   NAVIGATION ET MENU MOBILE
   ==================================== */

// Toggle du menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Fermer le menu mobile si on clique en dehors
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

/* ====================================
   EFFETS DE SCROLL
   ==================================== */

// Navbar au scroll (effet glassmorphism)
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Effet navbar au scroll
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Mise à jour de la barre de progression de lecture
            updateReadingProgress();
            
            // Navigation active en fonction de la section
            updateActiveNavigation();
            
            // Animation des éléments au scroll
            animateOnScroll();
            
            isScrolling = false;
        });
    }
    isScrolling = true;
});

// Création de la barre de progression de lecture
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.prepend(progressBar);
    return progressBar;
}

// Mise à jour de la barre de progression
function updateReadingProgress() {
    const progressBar = document.querySelector('.reading-progress') || createReadingProgress();
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

// Navigation active selon la section visible
function updateActiveNavigation() {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Mise à jour des liens actifs
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ====================================
   ANIMATIONS AU SCROLL
   ==================================== */

// Observer pour les animations d'apparition
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animation spéciale pour les barres de compétences
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animation des cartes avec délai
            if (entry.target.classList.contains('project-card') || 
                entry.target.classList.contains('info-card')) {
                const delay = Math.random() * 300;
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, delay);
            }
        }
    });
}, observerOptions);

// Initialisation des éléments à observer
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .info-card, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Animation des barres de compétences
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200); // Délai progressif
    });
}

// Animation globale au scroll
function animateOnScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .profile-photo');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

/* ====================================
   EFFETS VISUELS AVANCÉS
   ==================================== */

// Création de particules flottantes
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);
    
    // Créer 20 particules
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Position aléatoire
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
    
    container.appendChild(particle);
    
    // Supprimer et recréer la particule après l'animation
    particle.addEventListener('animationend', () => {
        particle.remove();
        setTimeout(() => createParticle(container), Math.random() * 3000);
    });
}

// Effet de curseur personnalisé avec trail
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    // Créer les éléments du trail
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.backgroundColor = '#f59e0b';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.opacity = (i / trailLength).toString();
        dot.style.transform = 'scale(' + (i / trailLength) + ')';
        dot.style.transition = 'all 0.1s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    // Suivre le mouvement de la souris
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation du trail
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            // Calculer la position suivante avec un léger retard
            if (index < trail.length - 1) {
                x += (mouseX - x) * 0.1;
                y += (mouseY - y) * 0.1;
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

/* ====================================
   FORMULAIRE DE CONTACT
   ==================================== */

// Gestion du formulaire de contact
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Animation des labels flottants
    inputs.forEach(input => {
        // Effet focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Validation en temps réel
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validation complète
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

// Validation d'un champ
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let message = '';
    
    // Supprimer les messages d'erreur existants
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation selon le type
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Veuillez entrer une adresse email valide';
        }
    } else if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Ce champ est requis';
    } else if (input.name === 'message' && value.length < 10) {
        isValid = false;
        message = 'Le message doit contenir au moins 10 caractères';
    }
    
    // Affichage de l'erreur
    if (!isValid) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        input.parentElement.appendChild(errorElement);
        
        input.style.borderColor = '#ef4444';
    } else {
        input.style.borderColor = '#10b981';
    }
    
    return isValid;
}

// Soumission du formulaire (simulation)
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Animation de chargement
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulation d'envoi (2 secondes)
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        submitButton.style.background = '#10b981';
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Restaurer le bouton après 3 secondes
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
        
        // Notification de succès
        showNotification('Message envoyé avec succès !', 'success');
    }, 2000);
}

/* ====================================
   SYSTÈME DE NOTIFICATIONS
   ==================================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles de la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Fermeture automatique
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
}

/* ====================================
   EFFETS SONORES (OPTIONNEL)
   ==================================== */

// Sons d'interaction (désactivé par défaut)
function initializeSoundEffects() {
    const sounds = {
        click: () => playTone(800, 100),
        hover: () => playTone(600, 50),
        success: () => playTone([800, 1000, 1200], 200)
    };
    
    // Ajouter des sons aux boutons (optionnel)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', sounds.click);
        btn.addEventListener('mouseenter', sounds.hover);
    });
}

function playTone(frequency, duration) {
    if (typeof window.AudioContext === 'undefined') return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (Array.isArray(frequency)) {
        // Accord
        frequency.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + duration / 1000);
        });
    } else {
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
}

/* ====================================
   EASTER EGGS ET INTERACTIONS FUN
   ==================================== */

// Konami Code (↑↑↓↓←→←→BA)
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                   'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                   'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.code);
    konamiSequence = konamiSequence.slice(-konamiCode.length);
    
    if (konamiSequence.join('') === konamiCode.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Effet de confettis
    createConfetti();
    showNotification('🎉 Easter Egg activé ! Mode développeur débloqué !', 'success');
    
    // Activer des effets spéciaux
    document.body.classList.add('easter-egg-mode');
    
    // Ajouter des styles spéciaux
    const style = document.createElement('style');
    style.textContent = `
        .easter-egg-mode .profile-photo {
            animation: rainbow 2s linear infinite;
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .easter-egg-mode .skill-progress {
            background: linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff00, #00ff88, #00ffff, #0088ff, #0000ff, #8800ff, #ff00ff, #ff0088);
            background-size: 200% 100%;
            animation: rainbow-flow 3s linear infinite;
        }
        
        @keyframes rainbow-flow {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Effet confettis
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

/* ====================================
   PERFORMANCE ET OPTIMISATION
   ==================================== */

// Lazy loading des images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle pour les événements fréquents
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ====================================
   INITIALISATION GÉNÉRALE
   ==================================== */

// Fonction d'initialisation principale
function initializePortfolio() {
    // Animations CSS dynamiques
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes confetti-fall {
            from {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialiser tous les modules
    initializeAnimations();
    initializeContactForm();
    initializeLazyLoading();
    createParticles();
    createCursorTrail();
    
    // Optimiser les événements de scroll
    window.addEventListener('scroll', throttle(updateReadingProgress, 16));
    
    // Message de bienvenue dans la console
    console.log(`
    🚀 Portfolio de Sylla Youssouf
    ═══════════════════════════════
    Développé avec ❤️ et JavaScript
    
    Fonctionnalités incluses:
    ✅ Animations fluides
    ✅ Responsive design
    ✅ Effets visuels avancés
    ✅ Performance optimisée
    ✅ Easter eggs cachés
    
    Essayez le Konami Code: ↑↑↓↓←→←→BA
    `);
    
    // Notification de chargement terminé
    setTimeout(() => {
        showNotification('Portfolio chargé avec succès ! 🎉', 'success');
    }, 1000);
}

// Démarrer quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
});

// Support pour les anciens navigateurs
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}