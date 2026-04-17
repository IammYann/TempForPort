// ==================== Smooth Scrolling for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Active Navigation Link Highlighting ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Contact Form Handling ====================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Message Sent! ✓';
    submitButton.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
    
    // Reset form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 3000);
    
    // Here you would typically send the email using a backend service
    console.log('Form submitted:', { name, email, message });
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill categories for animation
document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Navbar Background on Scroll ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Scroll to Top Button ====================
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopButton.addEventListener('mouseover', () => {
    scrollToTopButton.style.transform = 'scale(1.1)';
});

scrollToTopButton.addEventListener('mouseout', () => {
    scrollToTopButton.style.transform = 'scale(1)';
});

// ==================== Type Writer Effect for Hero Title ====================
function typeWriter(element, text, speed = 100) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typewriter effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 80);
    }
});

// ==================== Counter Animation ====================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Use intersection observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

animateCounters();

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or perform escape action
        console.log('Escape key pressed');
    }
});

// ==================== Performance: Lazy Loading Images ====================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

console.log('Portfolio website loaded successfully!');
