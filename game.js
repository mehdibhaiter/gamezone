// بيانات الألعاب - نفس البيانات من الصفحة الرئيسية
const storeGamesData = {
    trending: [
        { id: 1, name: "God of War", image: "god.jpg", rating: "★★★★★", price: "$50.99", category: "action" },
        { id: 2, name: "Spider Man", image: "spider (1).jpg", rating: "★★★★★", price: "$10.99", category: "action" },
        { id: 3, name: "The Last of Us", image: "last.jpg", rating: "★★★★★", price: "$10.99", category: "adventure" },
        { id: 4, name: "Ghost", image: "téléchargement.jpg", rating: "★★★★★", price: "$6.99", category: "action" },
        { id: 5, name: "Call of Duty", image: "Call Of Duty_ WWII (2017).jpg", rating: "★★★★★", price: "$59.99", category: "fps" },
        { id: 6, name: "Farcry", image: "b.jpg", rating: "★★★★★", price: "$49.99", category: "fps" },
        { id: 7, name: "Assassins Creed", image: "a.jpg", rating: "★★★★★", price: "$39.99", category: "action" },
        { id: 8, name: "Black Myth", image: "Black Myth_ Wukong.jpg", rating: "★★★★★", price: "$69.99", category: "rpg" }
    ]
};

// نظام الـ S
class StoreGallery {
    constructor() {
        this.games = [];
        this.filteredGames = [];
        this.currentFilter = 'all';
        this.currentSort = 'featured';
        this.cart = JSON.parse(localStorage.getItem('cyberCart')) || [];
        this.init();
    }
    
    init() {
        this.loadGames();
        this.setupEventListeners();
        this.createParticles();
        this.updateCartIcon();
    }
    
    loadGames() {
        this.games = [...storeGamesData.trending].map((game, index) => ({
            ...game,
            featured: index < 3,
            releaseDate: new Date(2024, index % 12, (index % 28) + 1)
        }));
        
        this.filteredGames = [...this.games];
        this.renderGallery();
        this.updateStats();
    }
    
    renderGallery() {
        const grid = document.getElementById('galleryGrid');
        const loading = document.getElementById('galleryLoading');
        
        loading.style.display = 'block';
        grid.innerHTML = '';
        
        setTimeout(() => {
            grid.innerHTML = this.filteredGames.map(game => `
                <div class="gallery-item" data-game="${game.name}" data-category="${game.category}">
                    <div class="gallery-category">${game.category}</div>
                    <img src="${game.image}" alt="${game.name}" class="gallery-image">
                    <div class="gallery-overlay">
                        <h3 class="gallery-title">${game.name}</h3>
                        <div class="gallery-meta">
                            <span class="gallery-price">${game.price}</span>
                            <span class="gallery-rating">${game.rating}</span>
                        </div>
                        <button class="gallery-add-cart" onclick="storeGallery.addToCart('${game.name}', '${game.price}', '${game.image}')">
                            ADD TO CART
                        </button>
                    </div>
                </div>
            `).join('');
            
            loading.style.display = 'none';
        }, 1000);
    }
    
    addToCart(gameName, price, image) {
        const cartItem = {
            id: Date.now(),
            name: gameName,
            price: price,
            image: image,
            quantity: 1
        };
        
        this.cart.push(cartItem);
        localStorage.setItem('cyberCart', JSON.stringify(this.cart));
        this.updateCartIcon();
        this.showAddToCartNotification(gameName);
    }
    
    updateCartIcon() {
        const cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    showAddToCartNotification(gameName) {
        // نضيف إشعار إضافة للسلة
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🎮 ${gameName} ADDED TO CART!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    setupEventListeners() {
        // الفلترة
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.applyFilter(filter);
                
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // الترتيب
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.applySort(e.target.value);
        });
        
        // إغلاق المودال
        document.getElementById('modalOverlay').addEventListener('click', () => this.closePreview());
        document.getElementById('closePreview').addEventListener('click', () => this.closePreview());
    }
    
    applyFilter(filter) {
        this.currentFilter = filter;
        this.filteredGames = filter === 'all' 
            ? [...this.games] 
            : this.games.filter(game => game.category.toLowerCase() === filter.toLowerCase());
        
        this.applySort(this.currentSort);
    }
    
    applySort(sortType) {
        this.currentSort = sortType;
        
        switch(sortType) {
            case 'newest':
                this.filteredGames.sort((a, b) => b.releaseDate - a.releaseDate);
                break;
            case 'rating':
                this.filteredGames.sort((a, b) => {
                    const aRating = a.rating.split('★').length - 1;
                    const bRating = b.rating.split('★').length - 1;
                    return bRating - aRating;
                });
                break;
            default:
                this.filteredGames.sort((a, b) => b.featured - a.featured);
        }
        
        this.renderGallery();
    }
    
    createParticles() {
        const container = document.getElementById('heroParticles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${Math.random() * 10 + 5}s;
                background: ${i % 3 === 0 ? 'var(--neon-pink)' : i % 3 === 1 ? 'var(--neon-cyan)' : 'var(--neon-purple)'};
            `;
            container.appendChild(particle);
        }
    }
    
    updateStats() {
        document.getElementById('gamesCount').textContent = this.games.length;
        const totalRating = this.games.reduce((sum, game) => sum + (game.rating.split('★').length - 1), 0);
        const averageRating = (totalRating / this.games.length).toFixed(1);
        document.getElementById('totalRating').textContent = averageRating;
    }
    
    closePreview() {
        document.getElementById('previewModal').classList.remove('active');
    }
}

// إنشاء الـ Store Gallery
const storeGallery = new StoreGallery();

// إضافة الـ CSS للإشعارات
const notificationStyles = `
    .cart-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 10, 10, 0.95);
        border: 2px solid var(--neon-cyan);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--neon-cyan);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .cart-notification.show {
        transform: translateX(0);
    }
    
    .gallery-add-cart {
        background: var(--neon-pink);
        color: #000;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 1rem;
        width: 100%;
        transition: all 0.3s ease;
    }
    
    .gallery-add-cart:hover {
        background: var(--neon-cyan);
        box-shadow: var(--glow-cyan);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);