// Cyberpunk Navbar Functionality
class CyberpunkNavbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.getElementById('navLinks');
        this.hamburger = document.getElementById('hamburger');
        this.searchIcon = document.getElementById('searchIcon');
        this.searchContainer = document.getElementById('searchContainer');
        this.closeSearch = document.getElementById('closeSearch');
        
        this.init();
    }
    
    init() {
        // Scroll Effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile Menu
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Search Functionality
        this.searchIcon.addEventListener('click', () => this.openSearch());
        this.closeSearch.addEventListener('click', () => this.closeSearchBar());
        
        // Cyberpunk Effects
        this.addCyberpunkEffects();
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2a 100%)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = this.hamburger.querySelectorAll('.line');
        if (this.navLinks.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    }
    
    openSearch() {
        this.searchContainer.style.display = 'block';
        setTimeout(() => {
            this.searchContainer.querySelector('.cyber-search').focus();
        }, 100);
    }
    
    closeSearchBar() {
        this.searchContainer.style.display = 'none';
    }
    
    addCyberpunkEffects() {
        // Add glitch effect randomly to logo
        setInterval(() => {
            const glitchText = document.querySelector('.glitch-text');
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'glitch-anim 0.3s ease';
            }, 10);
        }, 5000);
        
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.cyber-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkNavbar();
});

// Add some random cyberpunk terminal messages
const terminalMessages = [
    "SYSTEM ONLINE",
    "NEURAL LINK ESTABLISHED", 
    "ACCESSING MAINFRAME",
    "WELCOME TO THE MATRIX",
    "CYBERPUNK MODE ACTIVATED"
];

function showRandomMessage() {
    const message = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
    console.log(`%c${message}`, 'color: #00ffff; font-size: 16px; font-weight: bold;');
}

showRandomMessage();


// Add this to your existing script.js
class CyberpunkHero {
    constructor() {
        this.hero = document.getElementById('hero');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        this.animateStats();
        this.addScrollEffects();
        this.addHoverEffects();
    }
    
    animateStats() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCounting();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(this.hero);
    }
    
    startCounting() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target + (target === 94 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (target === 94 ? '%' : '+');
                }
            }, 16);
        });
    }
    
    addScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            this.hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    addHoverEffects() {
        const buttons = document.querySelectorAll('.cyber-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function(e) {
                const x = e.pageX - this.offsetLeft;
                const y = e.pageY - this.offsetTop;
                
                this.style.setProperty('--x', x + 'px');
                this.style.setProperty('--y', y + 'px');
            });
        });
    }
}

// Initialize hero when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkHero();
});

// GAMES DATA - Using EXACT images from your first website
const gamesData = {
    trending: [
        { id: 1, name: "God of War", image: "god.jpg", rating: "★★★★★", price: "$50.99", category: "action" },
        { id: 2, name: "Spider Man", image: "spider (1).jpg", rating: "★★★★★", price: "$10.99", category: "action" },
        { id: 3, name: "The Last of Us", image: "last.jpg", rating: "★★★★★", price: "$10.99", category: "adventure" },
        { id: 4, name: "Ghost", image: "téléchargement.jpg", rating: "★★★★★", price: "$6.99", category: "action" },
        { id: 5, name: "Call of Duty", image: "Call Of Duty_ WWII (2017).jpg", rating: "★★★★★", price: "$59.99", category: "fps" },
        { id: 6, name: "Farcry", image: "b.jpg", rating: "★★★★★", price: "$49.99", category: "fps" },
        { id: 7, name: "Assassins Creed", image: "a.jpg", rating: "★★★★★", price: "$39.99", category: "action" },
        { id: 8, name: "Black Myth", image: "Black Myth_ Wukong.jpg", rating: "★★★★★", price: "$69.99", category: "rpg" }
    ],
    
    featured: [
        { id: 1, name: "God of War", image: "god.jpg", rating: "★★★★★", price: "$50.99", badge: "EXCLUSIVE", category: "action" },
        { id: 2, name: "Spider Man", image: "spider (1).jpg", rating: "★★★★★", price: "$10.99", badge: "BESTSELLER", category: "action" },
        { id: 3, name: "The Last of Us", image: "last.jpg", rating: "★★★★★", price: "$10.99", badge: "CLASSIC", category: "adventure" }
    ],
    
    offers: [
        { id: 4, name: "Ghost", image: "téléchargement.jpg", rating: "★★★★★", price: "$4.99", originalPrice: "$6.99", discount: "30%", category: "action" },
        { id: 5, name: "Call of Duty", image: "Call Of Duty_ WWII (2017).jpg", rating: "★★★★★", price: "$39.99", originalPrice: "$59.99", discount: "33%", category: "fps" },
        { id: 6, name: "Farcry", image: "b.jpg", rating: "★★★★★", price: "$29.99", originalPrice: "$49.99", discount: "40%", category: "fps" }
    ]
};

// CYBERPUNK SECTIONS MANAGER
class CyberpunkSections {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadTrendingGames();
        this.loadFeaturedGames();
        this.loadSpecialOffers();
        this.initCarousel();
        this.initCountdown();
        this.initNewsletter();
        this.initCategoryEffects();
        this.addScrollAnimations();
    }
    
    // TRENDING GAMES CAROUSEL
    loadTrendingGames() {
        const carouselTrack = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        
        // Clear existing content
        carouselTrack.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        gamesData.trending.forEach((game, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${game.image}" alt="${game.name}" class="game-image" onerror="this.src='img/placeholder.jpg'">
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <div class="game-rating">${game.rating}</div>
                    <div class="game-price">${game.price}</div>
                    <button class="cyber-btn add-to-cart" data-game="${game.name}" data-price="${game.price}">
                        ADD TO CART
                    </button>
                </div>
            `;
            carouselTrack.appendChild(slide);
            
            // Create dots
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Reinitialize carousel after loading
        setTimeout(() => {
            this.initCarousel();
        }, 100);
    }
    
    initCarousel() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.track = document.getElementById('carouselTrack');
        
        // Remove existing event listeners
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.replaceWith(prevBtn.cloneNode(true));
        nextBtn.replaceWith(nextBtn.cloneNode(true));
        
        // Add new event listeners
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.target.getAttribute('data-game');
                const price = e.target.getAttribute('data-price');
                this.addToCart(game, price);
            });
        });
        
        // Auto slide every 5 seconds
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    nextSlide() {
        if (this.slides.length === 0) return;
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.slides.length === 0) return;
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        if (this.slides.length === 0) return;
        const slideWidth = this.slides[0].offsetWidth + 32;
        this.track.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    // FEATURED GAMES
    loadFeaturedGames() {
        const featuredGrid = document.getElementById('featuredGrid');
        featuredGrid.innerHTML = '';
        
        gamesData.featured.forEach(game => {
            const card = document.createElement('div');
            card.className = 'featured-card';
            card.innerHTML = `
                <div class="featured-badge">${game.badge}</div>
                <img src="${game.image}" alt="${game.name}" class="featured-image" onerror="this.src='img/placeholder.jpg'">
                <div class="featured-content">
                    <h3>${game.name}</h3>
                    <div class="game-rating">${game.rating}</div>
                    <div class="game-price">${game.price}</div>
                    <button class="cyber-btn add-to-cart" data-game="${game.name}" data-price="${game.price}">
                        ADD TO CART
                    </button>
                </div>
            `;
            featuredGrid.appendChild(card);
        });
        
        // Add cart functionality
        document.querySelectorAll('.featured-card .add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.target.getAttribute('data-game');
                const price = e.target.getAttribute('data-price');
                this.addToCart(game, price);
            });
        });
    }
    
    // SPECIAL OFFERS
    loadSpecialOffers() {
        const offersGrid = document.getElementById('offersGrid');
        offersGrid.innerHTML = '';
        
        gamesData.offers.forEach(game => {
            const card = document.createElement('div');
            card.className = 'offer-card';
            card.innerHTML = `
                <div class="discount-badge">-${game.discount}</div>
                <img src="${game.image}" alt="${game.name}" class="featured-image" onerror="this.src='img/placeholder.jpg'">
                <div class="featured-content">
                    <h3>${game.name}</h3>
                    <div class="game-rating">${game.rating}</div>
                    <div class="game-price">
                        <span style="text-decoration: line-through; opacity: 0.7; margin-right: 10px;">${game.originalPrice}</span>
                        ${game.price}
                    </div>
                    <button class="cyber-btn add-to-cart" data-game="${game.name}" data-price="${game.price}">
                        GET OFFER
                    </button>
                </div>
            `;
            offersGrid.appendChild(card);
        });
        
        // Add cart functionality
        document.querySelectorAll('.offer-card .add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.target.getAttribute('data-game');
                const price = e.target.getAttribute('data-price');
                this.addToCart(game, price);
            });
        });
    }
    
    // ADD TO CART FUNCTIONALITY
    addToCart(gameName, price) {
        this.showCyberNotification(`⚡ ${gameName} ADDED TO NEURAL CART! - ${price}`, 'success');
        
        // Add cart animation
        const cart = document.querySelector('.search-icon');
        if (cart) {
            cart.style.animation = 'cartBounce 0.5s ease';
            setTimeout(() => {
                cart.style.animation = '';
            }, 500);
        }
    }
    
    // COUNTDOWN TIMER
    initCountdown() {
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3); // 3 days from now
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = this.padZero(days);
            document.getElementById('hours').textContent = this.padZero(hours);
            document.getElementById('minutes').textContent = this.padZero(minutes);
            document.getElementById('seconds').textContent = this.padZero(seconds);
            
            // Flash effect when under 1 minute
            if (distance < 60000) {
                document.querySelector('.timer-display').style.animation = 'pulse 1s infinite';
            }
            
            if (distance < 0) {
                clearInterval(timer);
                document.querySelector('.countdown-timer').innerHTML = 
                    '<div class="timer-label" style="color: var(--neon-pink);">OFFER EXPIRED!</div>';
            }
        }, 1000);
    }
    
    padZero(num) {
        return num < 10 ? '0' + num : num;
    }
    
    // NEWSLETTER
    initNewsletter() {
        const form = document.getElementById('newsletterForm');
        const terminal = document.getElementById('terminalContent');
        let subCount = 12580;
        
        // Clear terminal
        terminal.innerHTML = '';
        
        // Animate subscriber count
        this.animateValue('subCount', 0, subCount, 2000);
        
        // Add terminal messages
        const messages = [
            "> INITIALIZING NEWSLETTER PROTOCOL...",
            "> CONNECTING TO CYBER NETWORK...",
            "> SCANNING FOR NEW SUBSCRIBERS...",
            "> SYSTEM READY FOR INPUT...",
            "> AWAITING EMAIL TRANSMISSION..."
        ];
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                this.addTerminalMessage(terminal, message);
            }, index * 800);
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            
            if (this.validateEmail(email)) {
                this.addTerminalMessage(terminal, `> NEW SUBSCRIBER DETECTED: ${email}`);
                this.addTerminalMessage(terminal, "> WELCOME TO THE CYBERVERSE, SOLDIER!");
                this.addTerminalMessage(terminal, "> TRANSMITTING EXCLUSIVE CONTENT...");
                
                // Animate count increase
                subCount++;
                this.animateValue('subCount', subCount - 1, subCount, 500);
                
                // Show success notification
                this.showCyberNotification('NEURAL LINK ESTABLISHED! Welcome to GameZone.', 'success');
                
                form.reset();
            } else {
                this.addTerminalMessage(terminal, "> ERROR: INVALID EMAIL FORMAT DETECTED");
                this.addTerminalMessage(terminal, "> PLEASE RETRY TRANSMISSION...");
                this.showCyberNotification('INVALID TRANSMISSION FORMAT! Please check your email.', 'error');
            }
        });
    }
    
    addTerminalMessage(terminal, message) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = message;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    animateValue(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // CATEGORY EFFECTS
    initCategoryEffects() {
        const categories = document.querySelectorAll('.category-card');
        
        categories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.borderColor = 'var(--neon-cyan)';
                this.style.boxShadow = 'var(--glow-cyan)';
            });
            
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px) scale(1)';
                this.style.borderColor = 'var(--neon-purple)';
                this.style.boxShadow = 'var(--glow-purple)';
            });
            
            category.addEventListener('click', function() {
                const categoryType = this.getAttribute('data-category');
                this.showCategoryGames(categoryType);
            });
        });
    }
    
    showCategoryGames(category) {
        const filteredGames = gamesData.trending.filter(game => 
            game.category.toLowerCase() === category.toLowerCase()
        );
        
        this.showCyberNotification(
            `ACCESSING ${category.toUpperCase()} DATABASE... ${filteredGames.length} GAMES FOUND`, 
            'info'
        );
    }
    
    // SCROLL ANIMATIONS
    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.cyberpunk-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease';
            observer.observe(section);
        });
    }
    
    // UTILITIES
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showCyberNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cyber-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '⚡' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add additional CSS for new effects
const additionalStyles = `
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .cyber-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 10, 10, 0.95);
        border: 2px solid var(--neon-cyan);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--neon-cyan);
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .cyber-notification.show {
        transform: translateX(0);
    }
    
    .cyber-notification.success {
        border-color: var(--neon-cyan);
        color: var(--neon-cyan);
    }
    
    .cyber-notification.error {
        border-color: var(--neon-pink);
        color: var(--neon-pink);
    }
    
    .cyber-notification.info {
        border-color: var(--neon-blue);
        color: var(--neon-blue);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .add-to-cart {
        margin-top: 1rem;
        padding: 0.7rem 1.5rem;
        font-size: 0.9rem;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkSections();
});

// Footer Effects
class CyberpunkFooter {
    constructor() {
        this.init();
    }
    
    init() {
        this.animatePlayerCount();
        this.addFooterEffects();
        this.addScrollToTop();
    }
    
    animatePlayerCount() {
        const playerCount = document.getElementById('playerCount');
        if (playerCount) {
            let count = 0;
            const target = Math.floor(Math.random() * 5000) + 8000;
            const duration = 3000;
            
            const timer = setInterval(() => {
                count += Math.ceil(target / (duration / 50));
                if (count >= target) {
                    playerCount.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    playerCount.textContent = count.toLocaleString();
                }
            }, 50);
        }
    }
    
    addFooterEffects() {
        // Add hover effects to footer links
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.textShadow = 'var(--glow-cyan)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
            });
        });
        
        // Add click effects to payment methods
        const paymentIcons = document.querySelectorAll('.payment-icon');
        paymentIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                this.showPaymentNotification(method);
            });
        });
    }
    
    showPaymentNotification(method) {
        const messages = {
            bitcoin: "₿ BITCOIN PAYMENTS ENABLED",
            ethereum: "Ξ ETHEREUM NETWORK ACTIVE", 
            credit: "💳 CREDIT CARD PROCESSING",
            paypal: "🅿️ PAYPAL INTEGRATED",
            crypto: "🔷 CRYPTO PAYMENTS ONLINE"
        };
        
        this.showCyberNotification(messages[method] || "PAYMENT SYSTEM ONLINE", 'info');
    }
    
    addScrollToTop() {
        // Add scroll to top functionality
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--neon-purple);
            border: 2px solid var(--neon-cyan);
            border-radius: 50%;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: var(--glow-purple);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'translateY(0)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.transform = 'translateY(20px)';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    showCyberNotification(message, type) {
        // Reuse the notification function from previous code
        console.log(`[CYBER-FOOTER] ${message}`);
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkFooter();
});


// Advanced Shopping Cart System
class AdvancedCartSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cyberCart')) || [];
        this.init();
    }
    
    init() {
        this.renderCartIcon();
        this.setupCartListeners();
        this.loadCartFromStorage();
    }
    
    addToCart(game, price, image) {
        const cartItem = {
            id: Date.now(),
            name: game,
            price: price,
            image: image,
            quantity: 1,
            addedAt: new Date().toISOString()
        };
        
        this.cart.push(cartItem);
        this.saveCart();
        this.renderCartIcon();
        this.showAddToCartAnimation(game);
    }
    
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.renderCartIcon();
    }
    
    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.renderCartIcon();
        }
    }
    
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }
    
    saveCart() {
        localStorage.setItem('cyberCart', JSON.stringify(this.cart));
    }
    
    renderCartIcon() {
        let cartIcon = document.querySelector('.cart-icon');
        if (!cartIcon) {
            cartIcon = document.createElement('div');
            cartIcon.className = 'cart-icon';
            document.querySelector('.nav-right').prepend(cartIcon);
        }
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.innerHTML = `
            🛒
            <span class="cart-count">${totalItems}</span>
        `;
    }
    
    showAddToCartAnimation(gameName) {
        // تأثير إضافة للسلة
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎮</span>
                <span class="notification-text">${gameName} ADDED TO NEURAL CART!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    setupCartListeners() {
        // إضافة أزرار Add to Cart لكل الألعاب
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const game = e.target.getAttribute('data-game');
                const price = e.target.getAttribute('data-price');
                const image = e.target.closest('.game-card').querySelector('img').src;
                this.addToCart(game, price, image);
            }
        });
    }
}

// Basic User System
class UserSystem {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('cyberUser'));
        this.init();
    }
    
    init() {
        this.renderUserUI();
        this.setupAuthListeners();
    }
    
    register(email, username, password) {
        const user = {
            id: Date.now(),
            email: email,
            username: username,
            joinDate: new Date().toISOString(),
            level: 1,
            xp: 0,
            achievements: []
        };
        
        localStorage.setItem('cyberUser', JSON.stringify(user));
        this.currentUser = user;
        this.renderUserUI();
    }
    
    login(email, password) {
        // في الواقع بيكون فيه تحقق من السيرفر
        this.currentUser = {
            id: 1,
            email: email,
            username: 'CYBER_WARRIOR',
            joinDate: new Date().toISOString(),
            level: 5,
            xp: 1250,
            achievements: ['FIRST_BLOOD', 'COLLECTOR', 'EXPLORER']
        };
        
        localStorage.setItem('cyberUser', JSON.stringify(this.currentUser));
        this.renderUserUI();
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('cyberUser');
        this.renderUserUI();
    }
    
    renderUserUI() {
        const userSection = document.querySelector('.user-section') || this.createUserSection();
        
        if (this.currentUser) {
            userSection.innerHTML = `
                <div class="user-profile">
                    <div class="user-avatar">
                        <div class="avatar-hologram"></div>
                    </div>
                    <div class="user-info">
                        <span class="username">${this.currentUser.username}</span>
                        <div class="user-level">
                            <span class="level-badge">LVL ${this.currentUser.level}</span>
                            <div class="xp-bar">
                                <div class="xp-progress" style="width: ${(this.currentUser.xp % 1000) / 10}%"></div>
                            </div>
                        </div>
                    </div>
                    <button class="logout-btn">LOGOUT</button>
                </div>
            `;
        } else {
            userSection.innerHTML = `
                <div class="auth-buttons">
                    <button class="cyber-btn login-btn">LOGIN</button>
                    <button class="cyber-btn signup-btn">SIGN UP</button>
                </div>
            `;
        }
    }
    
    createUserSection() {
        const userSection = document.createElement('div');
        userSection.className = 'user-section';
        document.querySelector('.nav-right').appendChild(userSection);
        return userSection;
    }
    
    setupAuthListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-btn')) {
                this.showLoginModal();
            } else if (e.target.classList.contains('signup-btn')) {
                this.showSignupModal();
            } else if (e.target.classList.contains('logout-btn')) {
                this.logout();
            }
        });
    }
    
    showLoginModal() {
        // نافذة تسجيل الدخول
        this.showAuthModal('LOGIN TO CYBERVERSE');
    }
    
    showSignupModal() {
        // نافذة إنشاء حساب
        this.showAuthModal('JOIN THE CYBERVERSE');
    }
    
    showAuthModal(title) {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${title}</h3>
                <form class="auth-form">
                    <input type="email" placeholder="NEURAL EMAIL" required>
                    <input type="password" placeholder="ACCESS CODE" required>
                    <button type="submit" class="cyber-btn">AUTHENTICATE</button>
                </form>
                <button class="close-modal">✕</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Smart Search System
class SmartSearchSystem {
    constructor() {
        this.searchIndex = [];
        this.init();
    }
    
    init() {
        this.buildSearchIndex();
        this.setupSearchListeners();
    }
    
    buildSearchIndex() {
        // بناء فهرس البحث من بيانات الألعاب
        this.searchIndex = [
            ...gamesData.trending,
            ...gamesData.featured,
            ...gamesData.offers
        ].map(game => ({
            ...game,
            searchTerms: [
                game.name.toLowerCase(),
                game.category,
                ...game.name.split(' ').map(word => word.toLowerCase())
            ]
        }));
    }
    
    search(query) {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return this.searchIndex;
        
        return this.searchIndex.filter(game => 
            game.searchTerms.some(term => 
                term.includes(searchTerm) || searchTerm.includes(term)
            )
        );
    }
    
    setupSearchListeners() {
        const searchInput = document.querySelector('.cyber-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }
    
    handleSearch(query) {
        const results = this.search(query);
        this.displaySearchResults(results);
    }
    
    displaySearchResults(results) {
        let resultsContainer = document.querySelector('.search-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            document.querySelector('.search-container').appendChild(resultsContainer);
        }
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <span class="no-results-icon">🔍</span>
                    <span class="no-results-text">NO NEURAL MATCHES FOUND</span>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map(game => `
                <div class="search-result-item">
                    <img src="${game.image}" alt="${game.name}">
                    <div class="result-info">
                        <h4>${game.name}</h4>
                        <span class="result-price">${game.price}</span>
                        <span class="result-category">${game.category}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize All Systems
document.addEventListener('DOMContentLoaded', () => {
    // الأنظمة الحالية
    new CyberpunkNavbar();
    new CyberpunkHero();
    new CyberpunkSections();
    new CyberpunkFooter();
    
    // الأنظمة الجديدة - المرحلة 1
    new AdvancedCartSystem();
    new UserSystem();
    new SmartSearchSystem();
    
    console.log('🎮 CYBERVERSE FULLY INITIALIZED!');
    console.log('🚀 ALL SYSTEMS ONLINE - READY FOR ACTION!');
});

// Advanced Content Platform
class ContentPlatform {
    constructor() {
        this.reviews = JSON.parse(localStorage.getItem('gameReviews')) || [];
        this.videos = this.getGameVideos();
        this.init();
    }
    
    init() {
        this.setupContentSections();
        this.loadGameDetails();
        this.setupReviewSystem();
    }
    
    getGameVideos() {
        return {
            "God of War": "https://www.youtube.com/embed/example1",
            "Spider Man": "https://www.youtube.com/embed/example2", 
            "The Last of Us": "https://www.youtube.com/embed/example3",
            "Call of Duty": "https://www.youtube.com/embed/example4"
        };
    }
    
    setupContentSections() {
        // إضافة أقسام المحتوى للعبة
        this.injectContentSections();
    }
    
    injectContentSections() {
        // حقن أقسام المحتوى في صفحة الألعاب
        const gameCards = document.querySelectorAll('.game-card, .featured-card, .carousel-slide');
        
        gameCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart')) {
                    const gameName = card.querySelector('h3').textContent;
                    this.showGameDetailsModal(gameName);
                }
            });
        });
    }
    
    showGameDetailsModal(gameName) {
        const modal = this.createGameModal(gameName);
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 100);
    }
    
    createGameModal(gameName) {
        const game = this.getGameData(gameName);
        const modal = document.createElement('div');
        modal.className = 'game-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="close-modal">✕</button>
                
                <div class="game-header">
                    <img src="${game.image}" alt="${game.name}" class="game-hero-image">
                    <div class="game-header-content">
                        <h1>${game.name}</h1>
                        <div class="game-meta">
                            <span class="game-rating">${game.rating}</span>
                            <span class="game-price">${game.price}</span>
                            <span class="game-category">${game.category}</span>
                        </div>
                        <button class="cyber-btn add-to-cart-large">ADD TO NEURAL CART</button>
                    </div>
                </div>
                
                <div class="game-content-tabs">
                    <div class="tabs-header">
                        <button class="tab-btn active" data-tab="overview">OVERVIEW</button>
                        <button class="tab-btn" data-tab="media">MEDIA</button>
                        <button class="tab-btn" data-tab="reviews">REVIEWS</button>
                        <button class="tab-btn" data-tab="requirements">REQUIREMENTS</button>
                    </div>
                    
                    <div class="tabs-content">
                        <div class="tab-panel active" id="overview">
                            <h3>SYNOPSIS</h3>
                            <p>${this.getGameDescription(gameName)}</p>
                            <div class="game-features">
                                <h4>KEY FEATURES</h4>
                                <ul>
                                    <li>⚡ Cutting-edge graphics</li>
                                    <li>🎮 Immersive gameplay</li>
                                    <li>🌍 Open world exploration</li>
                                    <li>👥 Multiplayer support</li>
                                    <li>🏆 Achievement system</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="media">
                            <div class="media-gallery">
                                <div class="video-container">
                                    <iframe src="${this.videos[gameName]}" 
                                            frameborder="0" 
                                            allowfullscreen></iframe>
                                </div>
                                <div class="screenshots-grid">
                                    <img src="${game.image}" alt="Screenshot 1">
                                    <img src="${game.image}" alt="Screenshot 2">
                                    <img src="${game.image}" alt="Screenshot 3">
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="reviews">
                            <div class="reviews-section">
                                <div class="review-stats">
                                    <div class="overall-rating">
                                        <span class="rating-score">4.8</span>
                                        <span class="rating-stars">★★★★★</span>
                                        <span class="rating-count">1,247 reviews</span>
                                    </div>
                                    <button class="cyber-btn write-review-btn">WRITE REVIEW</button>
                                </div>
                                <div class="reviews-list" id="reviewsList">
                                    ${this.renderReviews(gameName)}
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="requirements">
                            <div class="requirements-grid">
                                <div class="requirements-minimum">
                                    <h4>MINIMUM REQUIREMENTS</h4>
                                    <ul>
                                        <li>OS: Windows 10</li>
                                        <li>Processor: Intel i5</li>
                                        <li>Memory: 8GB RAM</li>
                                        <li>Graphics: GTX 1060</li>
                                        <li>Storage: 50GB</li>
                                    </ul>
                                </div>
                                <div class="requirements-recommended">
                                    <h4>RECOMMENDED</h4>
                                    <ul>
                                        <li>OS: Windows 11</li>
                                        <li>Processor: Intel i7</li>
                                        <li>Memory: 16GB RAM</li>
                                        <li>Graphics: RTX 3060</li>
                                        <li>Storage: 50GB SSD</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupModalEvents(modal, gameName);
        return modal;
    }
    
    setupModalEvents(modal, gameName) {
        // أحداث التبويبات
        modal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(modal, tabName);
            });
        });
        
        // إغلاق المودال
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        // إضافة للسلة
        modal.querySelector('.add-to-cart-large').addEventListener('click', () => {
            if (window.advancedCartSystem) {
                window.advancedCartSystem.addToCart(gameName, 
                    modal.querySelector('.game-price').textContent,
                    modal.querySelector('.game-hero-image').src
                );
            }
        });
        
        // كتابة مراجعة
        modal.querySelector('.write-review-btn')?.addEventListener('click', () => {
            this.showReviewModal(gameName);
        });
    }
    
    switchTab(modal, tabName) {
        // إخفاء كل التبويبات
        modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        modal.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        
        // إظهار التبويب المحدد
        modal.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        modal.querySelector(`#${tabName}`).classList.add('active');
    }
    
    setupReviewSystem() {
        this.loadReviews();
    }
    
    showReviewModal(gameName) {
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <h3>REVIEW: ${gameName}</h3>
                <div class="rating-selector">
                    <span class="rating-label">NEURAL RATING:</span>
                    <div class="stars">
                        ${[1,2,3,4,5].map(i => `
                            <span class="star" data-rating="${i}">☆</span>
                        `).join('')}
                    </div>
                </div>
                <textarea placeholder="SHARE YOUR CYBER EXPERIENCE..." class="review-text"></textarea>
                <button class="cyber-btn submit-review">TRANSMIT REVIEW</button>
                <button class="close-modal">✕</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // أحداث النجوم
        modal.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.getAttribute('data-rating'));
                this.setStarRating(modal, rating);
            });
        });
        
        // إرسال المراجعة
        modal.querySelector('.submit-review').addEventListener('click', () => {
            this.submitReview(modal, gameName);
        });
        
        // إغلاق
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
    }
    
    setStarRating(modal, rating) {
        modal.querySelectorAll('.star').forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
            star.style.color = index < rating ? '#ffeb3b' : '#666';
        });
    }
    
    submitReview(modal, gameName) {
        const rating = modal.querySelectorAll('.star').filter(star => star.textContent === '★').length;
        const text = modal.querySelector('.review-text').value;
        
        if (rating > 0 && text.trim()) {
            const review = {
                id: Date.now(),
                game: gameName,
                rating: rating,
                text: text,
                author: window.userSystem?.currentUser?.username || 'CYBER_USER',
                date: new Date().toISOString(),
                likes: 0
            };
            
            this.reviews.push(review);
            this.saveReviews();
            modal.remove();
            
            this.showCyberNotification('REVIEW TRANSMITTED TO CYBERNET!', 'success');
        }
    }
    
    renderReviews(gameName) {
        const gameReviews = this.reviews.filter(review => review.game === gameName);
        
        if (gameReviews.length === 0) {
            return `
                <div class="no-reviews">
                    <span class="no-reviews-icon">📝</span>
                    <span class="no-reviews-text">NO NEURAL REVIEWS DETECTED</span>
                    <p>Be the first to share your cyber experience!</p>
                </div>
            `;
        }
        
        return gameReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div class="review-text">${review.text}</div>
                <div class="review-actions">
                    <button class="like-btn" data-review="${review.id}">
                        ⚡ <span class="like-count">${review.likes}</span>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getGameData(gameName) {
        const allGames = [...gamesData.trending, ...gamesData.featured, ...gamesData.offers];
        return allGames.find(game => game.name === gameName) || allGames[0];
    }
    
    getGameDescription(gameName) {
        const descriptions = {
            "God of War": "Embark on an epic and heartfelt journey as Kratos and Atreus struggle to hold on and let go.",
            "Spider Man": "Swing through New York as Spider-Man and experience the story of an experienced Peter Parker.",
            "The Last of Us": "Survive a post-pandemic world in this critically acclaimed action-adventure game.",
            "Call of Duty": "Experience ultimate warfare in this intense first-person shooter series."
        };
        
        return descriptions[gameName] || "Experience the ultimate gaming adventure in this critically acclaimed title.";
    }
    
    saveReviews() {
        localStorage.setItem('gameReviews', JSON.stringify(this.reviews));
    }
    
    loadReviews() {
        this.reviews = JSON.parse(localStorage.getItem('gameReviews')) || [];
    }
}

// Gamification System
class GamificationSystem {
    constructor() {
        this.achievements = this.getAchievements();
        this.userProgress = JSON.parse(localStorage.getItem('userAchievements')) || {};
        this.init();
    }
    
    init() {
        this.setupAchievementListeners();
        this.renderAchievementBadges();
        this.startDailyChallenges();
    }
    
    getAchievements() {
        return {
            FIRST_BLOOD: {
                id: 'FIRST_BLOOD',
                name: 'FIRST BLOOD',
                description: 'Purchase your first game',
                icon: '🩸',
                points: 100,
                rarity: 'COMMON'
            },
            COLLECTOR: {
                id: 'COLLECTOR', 
                name: 'COLLECTOR',
                description: 'Add 5 games to your cart',
                icon: '🎮',
                points: 250,
                rarity: 'RARE'
            },
            EXPLORER: {
                id: 'EXPLORER',
                name: 'EXPLORER',
                description: 'View details of 10 different games',
                icon: '🧭',
                points: 150,
                rarity: 'COMMON'
            },
            REVIEWER: {
                id: 'REVIEWER',
                name: 'REVIEWER', 
                description: 'Write your first game review',
                icon: '📝',
                points: 200,
                rarity: 'UNCOMMON'
            },
            CYBER_WARRIOR: {
                id: 'CYBER_WARRIOR',
                name: 'CYBER WARRIOR',
                description: 'Spend over $100 in the store',
                icon: '⚡',
                points: 500,
                rarity: 'EPIC'
            }
        };
    }
    
    unlockAchievement(achievementId) {
        if (!this.userProgress[achievementId]) {
            this.userProgress[achievementId] = {
                unlocked: true,
                unlockedAt: new Date().toISOString(),
                points: this.achievements[achievementId].points
            };
            
            this.saveProgress();
            this.showAchievementNotification(achievementId);
            this.updateUserLevel();
        }
    }
    
    showAchievementNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name} UNLOCKED!</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    <div class="achievement-points">+${achievement.points} XP</div>
                </div>
                <div class="achievement-badge ${achievement.rarity.toLowerCase()}">${achievement.rarity}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    setupAchievementListeners() {
        // إنجاز الشراء الأول
        document.addEventListener('cartItemAdded', () => {
            this.unlockAchievement('FIRST_BLOOD');
        });
        
        // إنجاز المجمع
        document.addEventListener('cartUpdated', (e) => {
            const cartCount = e.detail.totalItems;
            if (cartCount >= 5) {
                this.unlockAchievement('COLLECTOR');
            }
        });
        
        // إنجاز المستكشف
        let gamesViewed = 0;
        document.addEventListener('gameDetailsViewed', () => {
            gamesViewed++;
            if (gamesViewed >= 10) {
                this.unlockAchievement('EXPLORER');
            }
        });
        
        // إنجاز المراجع
        document.addEventListener('reviewSubmitted', () => {
            this.unlockAchievement('REVIEWER');
        });
    }
    
    startDailyChallenges() {
        const challenges = {
            DAILY_VISIT: {
                name: 'DAILY LOGIN',
                description: 'Visit the site for 3 consecutive days',
                reward: 50,
                progress: 0,
                maxProgress: 3
            },
            DAILY_EXPLORER: {
                name: 'DAILY EXPLORER', 
                description: 'View 5 different games today',
                reward: 75,
                progress: 0,
                maxProgress: 5
            }
        };
        
        this.checkDailyProgress();
    }
    
    updateUserLevel() {
        const totalPoints = Object.values(this.userProgress).reduce((sum, achievement) => 
            sum + achievement.points, 0
        );
        
        const level = Math.floor(totalPoints / 1000) + 1;
        const currentLevelProgress = totalPoints % 1000;
        
        // تحديث واجهة المستخدم
        this.updateLevelUI(level, currentLevelProgress);
    }
    
    updateLevelUI(level, progress) {
        const levelElement = document.querySelector('.user-level');
        if (levelElement) {
            levelElement.querySelector('.level-badge').textContent = `LVL ${level}`;
            levelElement.querySelector('.xp-progress').style.width = `${(progress / 1000) * 100}%`;
        }
    }
    
    renderAchievementBadges() {
        const achievementsSection = this.createAchievementsSection();
        document.querySelector('.user-section')?.appendChild(achievementsSection);
    }
    
    createAchievementsSection() {
        const section = document.createElement('div');
        section.className = 'achievements-preview';
        section.innerHTML = `
            <div class="achievements-count">
                <span class="count-icon">🏆</span>
                <span class="count-text">${Object.values(this.userProgress).length}</span>
            </div>
        `;
        
        section.addEventListener('click', () => this.showAchievementsModal());
        return section;
    }
    
    showAchievementsModal() {
        const modal = document.createElement('div');
        modal.className = 'achievements-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <h3>CYBER ACHIEVEMENTS</h3>
                <div class="achievements-grid">
                    ${Object.values(this.achievements).map(achievement => {
                        const userAchievement = this.userProgress[achievement.id];
                        return `
                            <div class="achievement-card ${userAchievement ? 'unlocked' : 'locked'}">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">${achievement.name}</div>
                                    <div class="achievement-desc">${achievement.description}</div>
                                    <div class="achievement-points">${achievement.points} XP</div>
                                </div>
                                <div class="achievement-status">
                                    ${userAchievement ? '⚡ UNLOCKED' : '🔒 LOCKED'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <button class="close-modal">✕</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
    }
    
    saveProgress() {
        localStorage.setItem('userAchievements', JSON.stringify(this.userProgress));
    }
}

// Internationalization System
class InternationalizationSystem {
    constructor() {
        this.currentLang = localStorage.getItem('cyberLang') || 'en';
        this.translations = this.getTranslations();
        this.init();
    }
    
    init() {
        this.loadLanguage(this.currentLang);
        this.setupLanguageSwitcher();
    }
    
    getTranslations() {
        return {
            en: {
                // Navigation
                "HOME": "HOME",
                "TRENDING": "TRENDING", 
                "FEATURED": "FEATURED",
                "CATEGORIES": "CATEGORIES",
                "OFFERS": "OFFERS",
                
                // Buttons
                "ADD TO CART": "ADD TO CART",
                "VIEW ALL": "VIEW ALL", 
                "SEARCH GAMES...": "SEARCH GAMES...",
                "LOGIN": "LOGIN",
                "SIGN UP": "SIGN UP",
                
                // Sections
                "TRENDING GAMES": "TRENDING GAMES",
                "FEATURED GAMES": "FEATURED GAMES", 
                "SPECIAL OFFERS": "SPECIAL OFFERS",
                "STAY CONNECTED": "STAY CONNECTED",
                
                // Footer
                "QUICK ACCESS": "QUICK ACCESS",
                "SUPPORT": "SUPPORT",
                "LEGAL": "LEGAL"
            },
            ar: {
                // Navigation
                "HOME": "الرئيسية",
                "TRENDING": "الرائج",
                "FEATURED": "مميز",
                "CATEGORIES": "الفئات", 
                "OFFERS": "العروض",
                
                // Buttons
                "ADD TO CART": "أضف للسلة",
                "VIEW ALL": "عرض الكل",
                "SEARCH GAMES...": "ابحث في الألعاب...",
                "LOGIN": "تسجيل الدخول",
                "SIGN UP": "إنشاء حساب",
                
                // Sections
                "TRENDING GAMES": "الألعاب الرائجة",
                "FEATURED GAMES": "الألعاب المميزة",
                "SPECIAL OFFERS": "العروض الخاصة", 
                "STAY CONNECTED": "ابق على تواصل",
                
                // Footer
                "QUICK ACCESS": "وصول سريع",
                "SUPPORT": "الدعم",
                "LEGAL": "قانوني"
            },
            fr: {
                // Navigation  
                "HOME": "ACCUEIL",
                "TRENDING": "TENDANCE",
                "FEATURED": "EN VEDETTE",
                "CATEGORIES": "CATÉGORIES",
                "OFFERS": "OFFRES",
                
                // Buttons
                "ADD TO CART": "AJOUTER AU PANIER",
                "VIEW ALL": "VOIR TOUT",
                "SEARCH GAMES...": "RECHERCHER DES JEUX...",
                "LOGIN": "CONNEXION",
                "SIGN UP": "S'INSCRIRE",
                
                // Sections
                "TRENDING GAMES": "JEUX TENDANCES",
                "FEATURED GAMES": "JEUX EN VEDETTE",
                "SPECIAL OFFERS": "OFFRES SPÉCIALES",
                "STAY CONNECTED": "RESTEZ CONNECTÉ",
                
                // Footer
                "QUICK ACCESS": "ACCÈS RAPIDE", 
                "SUPPORT": "SUPPORT",
                "LEGAL": "LÉGAL"
            }
        };
    }
    
    loadLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('cyberLang', lang);
        
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        this.applyTranslations();
        this.updateLanguageSwitcher();
    }
    
    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLang][key] || key;
            
            if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }
    
    setupLanguageSwitcher() {
        const switcher = this.createLanguageSwitcher();
        document.querySelector('.nav-right').prepend(switcher);
    }
    
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${this.currentLang === 'ar' ? 'active' : ''}" data-lang="ar">AR</button>
            <button class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
        `;
        
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.loadLanguage(lang);
            });
        });
        
        return switcher;
    }
    
    updateLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher');
        if (switcher) {
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
            });
        }
    }
    
    t(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// نظام الهامبرغر مينيو للهواتف
class MobileMenu {
    constructor() {
        this.menu = document.getElementById('mobileMenu');
        this.overlay = document.getElementById('mobileOverlay');
        this.hamburger = document.getElementById('hamburgerMenu');
        this.closeBtn = document.getElementById('closeMobileMenu');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // فتح القائمة
        this.hamburger.addEventListener('click', () => this.openMenu());
        
        // إغلاق القائمة
        this.closeBtn.addEventListener('click', () => this.closeMenu());
        this.overlay.addEventListener('click', () => this.closeMenu());
        
        // إغلاق بزر ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        // إغلاق عند النقر على رابط
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    openMenu() {
        this.menu.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // تأثير الهامبرغر
        this.animateHamburger();
    }
    
    closeMenu() {
        this.menu.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // إعادة الهامبرغر
        this.resetHamburger();
    }
    
    animateHamburger() {
        const lines = this.hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }
    
    resetHamburger() {
        const lines = this.hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

// تحديث التهيئة في كل الصفحات
document.addEventListener('DOMContentLoaded', () => {
    // الأنظمة الحالية تبقى كما هي...
    
    // نضيف نظام الهاتف
    const mobileMenu = new MobileMenu();
    
    // جعله متاحاً globally
    window.mobileMenu = mobileMenu;
});