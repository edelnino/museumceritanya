document.addEventListener('DOMContentLoaded', () => {
    // === Carousel Logic ===
    const slider = document.getElementById('image-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (slider && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Calculate item width including gap
        const getSlideWidth = () => {
            const slide = slider.querySelector('.slide');
            const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
            return slide.offsetWidth + gap;
        };

        const updateSlider = () => {
            const width = getSlideWidth();
            slider.style.transform = `translateX(-${currentIndex * width}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const slidesCount = slider.querySelectorAll('.slide').length;
            const maxIndex = window.innerWidth <= 768 ? slidesCount - 1 : slidesCount - 3;
            
            if (currentIndex < Math.max(0, maxIndex)) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }

    // === Login Form Validation ===
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        const showError = (input, errorEl, message) => {
            input.classList.add('error');
            errorEl.textContent = message;
            
            // Add shake animation
            input.style.animation = 'shake 0.4s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 400);
        };

        const clearError = (input, errorEl) => {
            input.classList.remove('error');
            errorEl.textContent = '';
        };

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // Password validation
            if (!passwordInput.value) {
                showError(passwordInput, passwordError, 'Password is required');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                showError(passwordInput, passwordError, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(passwordInput, passwordError);
            }

            if (isValid) {
                // Simulate successful login
                const btn = loginForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Logging in...';
                btn.style.opacity = '0.7';
                btn.disabled = true;

                setTimeout(() => {
                    alert('Login successful! Redirecting...');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });

        // Clear errors on input
        emailInput.addEventListener('input', () => clearError(emailInput, emailError));
        passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));
    }

    // === Language Dropdown Logic ===
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');
    
    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!langMenu.contains(e.target) && e.target !== langBtn) {
                langMenu.classList.remove('show');
            }
        });

        // Language selection
        const langOptions = langMenu.querySelectorAll('a');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedText = e.target.textContent;
                // Just update UI text, no real translation
                langBtn.innerHTML = selectedText + ' ▾';
                langMenu.classList.remove('show');
            });
        });
    }

    // === Booking Price Logic ===
    const ticketSelect = document.getElementById('ticket-type');
    const quantityInput = document.getElementById('ticket-quantity');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');

    if (ticketSelect && quantityInput && subtotalEl && totalEl) {
        const updatePrice = () => {
            const priceMap = {
                'general': 25,
                'student': 15,
                'vip': 50
            };
            const type = ticketSelect.value;
            const qty = parseInt(quantityInput.value) || 1;
            const price = priceMap[type] || 25;
            
            const subtotal = price * qty;
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + tax;

            subtotalEl.textContent = '$' + subtotal.toFixed(2);
            totalEl.textContent = '$' + total.toFixed(2);
        };

        ticketSelect.addEventListener('change', updatePrice);
        quantityInput.addEventListener('input', updatePrice);
    }
});

// Add shake keyframes to document
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }
`;
document.head.appendChild(style);
