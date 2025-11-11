// DOM Elements
const signupForm = document.getElementById('signupForm');
const submitBtn = document.getElementById('signupSubmitBtn');
const nameInput = document.getElementById('signupName');
const emailInput = document.getElementById('signupEmail');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const btnSuccess = submitBtn.querySelector('.btn-success');

// Form validation patterns
const namePattern = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

// Input validation functions
function validateName(name) {
    return namePattern.test(name.trim());
}

function validateEmail(email) {
    return emailPattern.test(email.trim());
}

// Real-time validation
nameInput.addEventListener('input', function() {
    const isValid = validateName(this.value);
    toggleInputValidation(this, isValid);
});

emailInput.addEventListener('input', function() {
    const isValid = validateEmail(this.value);
    toggleInputValidation(this, isValid);
});

function toggleInputValidation(input, isValid) {
    if (isValid) {
        input.style.borderColor = '#4CAF50';
        input.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
    } else if (input.value.length > 0) {
        input.style.borderColor = '#f44336';
        input.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
    } else {
        input.style.borderColor = 'rgba(220, 20, 60, 0.3)';
        input.style.boxShadow = 'none';
    }
}

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    // Validate inputs
    if (!validateName(name)) {
        showError('Please enter a valid name (letters and spaces only, 2-50 characters)');
        nameInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Create form data
    const formData = new FormData(signupForm);
    
    // Submit to AWeber
    fetch(signupForm.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // AWeber doesn't support CORS, so we use no-cors mode
    })
    .then(() => {
        // Since we're using no-cors, we can't read the response
        // So we assume success after a reasonable delay
        setTimeout(() => {
            showSuccess();
            
            // Reset form after success
            setTimeout(() => {
                resetForm();
            }, 3000);
        }, 1500);
    })
    .catch((error) => {
        console.error('Error:', error);
        showError('Something went wrong. Please try again.');
        resetButton();
    });
});

function showLoading() {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    btnSuccess.style.display = 'none';
    submitBtn.style.cursor = 'not-allowed';
}

function showSuccess() {
    btnLoading.style.display = 'none';
    btnSuccess.style.display = 'inline-flex';
    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    submitBtn.style.borderColor = '#4CAF50';
    
    // Add success animation
    submitBtn.style.transform = 'scale(1.05)';
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
    }, 200);
}

function showError(message) {
    alert(message); // Simple alert for now - you could create a custom modal
    resetButton();
}

function resetButton() {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    btnSuccess.style.display = 'none';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.background = 'linear-gradient(135deg, #dc143c 0%, #b71c1c 100%)';
    submitBtn.style.borderColor = '#dc143c';
}

function resetForm() {
    signupForm.reset();
    nameInput.style.borderColor = 'rgba(220, 20, 60, 0.3)';
    emailInput.style.borderColor = 'rgba(220, 20, 60, 0.3)';
    nameInput.style.boxShadow = 'none';
    emailInput.style.boxShadow = 'none';
    resetButton();
}

// Smooth scroll for any internal links
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

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Add hover effects to form inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});

// Add loading animation to the logo
function addLogoAnimation() {
    const heroLogo = document.querySelector('.hero-main-logo');
    if (heroLogo) {
        heroLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        heroLogo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Initialize animations
addLogoAnimation();

// Particles effect (optional - uncomment if you want floating particles)
function createFloatingParticles() {
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(220, 20, 60, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;
            
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Uncomment the line below to enable particles
    // animateParticles();
}

// Initialize particles (currently disabled)
// createFloatingParticles();
