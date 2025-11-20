// بيانات الأخبار والفيديوهات
const newsData = {
    articles: [
        {
            id: 1,
            title: "CYBERPUNK 2077: ULTIMATE EDITION ANNOUNCED",
            description: "The definitive version of the cyberpunk masterpiece arrives with all DLCs and enhanced graphics.",
            date: "2024-12-15",
            category: "UPDATE",
            badge: "EXCLUSIVE",
            image: "god.jpg"
        },
        {
            id: 2,
            title: "GAME AWARDS 2024 WINNERS REVEALED",
            description: "See which games dominated this year's awards ceremony and took home the golden statues.",
            date: "2024-12-10",
            category: "EVENT",
            badge: "HOT",
            image: "spider (1).jpg"
        },
        {
            id: 3,
            title: "NEW GENERATION CONSOLES PRICE DROP",
            description: "Major price reductions announced for next-gen consoles just in time for the holidays.",
            date: "2024-12-05",
            category: "NEWS",
            badge: "BREAKING",
            image: "last.jpg"
        },
        {
            id: 4,
            title: "VIRTUAL REALITY GAMING REVOLUTION",
            description: "New VR technology promises to completely transform how we experience digital worlds.",
            date: "2024-11-28",
            category: "TECH",
            badge: "INNOVATION",
            image: "téléchargement.jpg"
        }
    ],
    
    trailers: [
        {
            id: 1,
            title: "GRAND THEFT AUTO ",
            video: "animation.gif 2.mp4",
            thumbnail: "god.jpg",
            duration: "3:45",
            category: "action",
            description: "The most anticipated game of the decade returns with a massive open world."
        },
        {
            id: 2,
            title: "NFS",
            video: "animation.gif 3.mp4", 
            thumbnail: "spider (1).jpg",
            duration: "2:30",
            category: "action",
            description: "Become the ultimate assassin in this groundbreaking stealth experience."
        },
        {
            id: 3,
            title: "SPIDERMAN",
            video: "animation.gif 4.mp4",
            thumbnail: "img/last.jpg",
            duration: "4:15",
            category: "sports", 
            description: "Experience football like never before with hyper-realistic graphics and physics."
        },
        {
            id: 4,
            title: "GTA V",
            video: "animation.gif 5.mp4",
            thumbnail: "img/téléchargement.jpg",
            duration: "5:20",
            category: "rpg",
            description: "Journey through the wild west in this epic tale of outlaws and redemption."
        },
        {
            id: 5,
            title: "GTA",
            video: "animation.gif 6.mp4",
            thumbnail: "img/Call Of Duty_ WWII (2017).jpg",
            duration: "3:10",
            category: "action",
            description: "The emotional saga continues in this stunning post-apocalyptic adventure."
        },
        {
            id: 6, 
            title: "CYBERVERSE ONLINE",
            video: "animation.gif (1).mp4",
            thumbnail: "img/b.jpg",
            duration: "4:45",
            category: "rpg",
            description: "Enter the digital realm in this massive multiplayer cyberpunk experience."
        }
    ]
};

// نظام الأخبار الرئيسي
class CyberNews {
    constructor() {
        this.currentVideoFilter = 'all';
        this.videoPlayers = new Map();
        this.init();
    }
    
    init() {
        this.loadNewsArticles();
        this.loadTrailers();
        this.setupVideoWall();
        this.setupEventListeners();
        this.createParticles();
        this.setupVideoControls();
    }
    
    // تحميل مقالات الأخبار
    loadNewsArticles() {
        const newsGrid = document.getElementById('newsGrid');
        
        newsGrid.innerHTML = newsData.articles.map(article => `
            <div class="news-card">
                <div class="news-card-header">
                    <span class="news-badge">${article.badge}</span>
                    <span class="news-date">${this.formatDate(article.date)}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="#" class="read-more">READ FULL STORY →</a>
            </div>
        `).join('');
        
        document.getElementById('newsCount').textContent = newsData.articles.length;
    }
    
    // تحميل العروض الترويجية
    loadTrailers() {
        const trailersGrid = document.getElementById('trailersGrid');
        const filteredTrailers = this.currentVideoFilter === 'all' 
            ? newsData.trailers 
            : newsData.trailers.filter(trailer => trailer.category === this.currentVideoFilter);
        
        trailersGrid.innerHTML = filteredTrailers.map(trailer => `
            <div class="trailer-card" data-video="${trailer.video}" data-title="${trailer.title}" data-desc="${trailer.description}">
                <img src="${trailer.thumbnail}" alt="${trailer.title}" class="trailer-thumbnail">
                <div class="trailer-overlay">
                    <div class="trailer-play-btn">▶</div>
                    <div class="trailer-info">
                        <h4 class="trailer-title">${trailer.title}</h4>
                        <div class="trailer-meta">
                            <span>${trailer.category.toUpperCase()}</span>
                            <span>${trailer.duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('videosCount').textContent = newsData.trailers.length;
        this.setupTrailerInteractions();
    }
    
    // إعداد جدار الفيديوهات
    setupVideoWall() {
        const videoWall = document.getElementById('videoWall');
        
        videoWall.innerHTML = newsData.trailers.slice(0, 6).map(trailer => `
            <div class="video-wall-item" data-video="${trailer.video}">
                <video class="video-wall-video" muted loop>
                    <source src="${trailer.video}" type="video/mp4">
                </video>
                <div class="video-wall-overlay">
                    <div class="video-wall-title">${trailer.title}</div>
                </div>
            </div>
        `).join('');
        
        this.setupVideoWallInteractions();
        this.setupAutoPlayVideos();
    }
    
    // التشغيل التلقائي للفيديوهات
    setupAutoPlayVideos() {
        const videoElements = document.querySelectorAll('.video-wall-video');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoElements.forEach(video => observer.observe(video));
    }
    
    // إعداد تفاعلات العروض
    setupTrailerInteractions() {
        document.querySelectorAll('.trailer-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('trailer-play-btn')) {
                    const video = card.getAttribute('data-video');
                    const title = card.getAttribute('data-title');
                    const description = card.getAttribute('data-desc');
                    this.openVideoModal(video, title, description);
                }
            });
            
            const playBtn = card.querySelector('.trailer-play-btn');
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const video = card.getAttribute('data-video');
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-desc');
                this.openVideoModal(video, title, description);
            });
        });
    }
    
    // إعداد تفاعلات جدار الفيديو
    setupVideoWallInteractions() {
        document.querySelectorAll('.video-wall-item').forEach(item => {
            item.addEventListener('click', () => {
                const video = item.getAttribute('data-video');
                const title = item.querySelector('.video-wall-title').textContent;
                this.openVideoModal(video, title, 'Experience the digital revolution');
            });
        });
    }
    
    // فتح نافذة الفيديو
    openVideoModal(videoSrc, title, description) {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        const modalInfo = document.getElementById('modalInfo');
        
        // تعيين مصدر الفيديو
        modalVideo.innerHTML = `
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
        `;
        
        // تعيين المعلومات
        modalInfo.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="modal-meta">
                <span class="modal-category">ACTION</span>
                <span class="modal-views">1.2M views</span>
            </div>
        `;
        
        // إظهار النافذة
        modal.classList.add('active');
        
        // تحميل وتشغيل الفيديو
        modalVideo.load();
        modalVideo.play().catch(e => {
            console.log('Autoplay prevented, waiting for user interaction');
        });
    }
    
    // إغلاق نافذة الفيديو
    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        modalVideo.pause();
        modal.classList.remove('active');
    }
    
    // إعداد عناصر التحكم بالفيديو الرئيسي
    setupVideoControls() {
        const mainVideo = document.getElementById('mainVideo');
        const playBtn = document.getElementById('playBtn');
        const muteBtn = document.getElementById('muteBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        
        // زر التشغيل/الإيقاف
        playBtn.addEventListener('click', () => {
            if (mainVideo.paused) {
                mainVideo.play();
                playBtn.textContent = '❚❚ PAUSE';
            } else {
                mainVideo.pause();
                playBtn.textContent = '▶ PLAY';
            }
        });
        
        // زر كتم الصوت
        muteBtn.addEventListener('click', () => {
            mainVideo.muted = !mainVideo.muted;
            muteBtn.textContent = mainVideo.muted ? '🔇' : '🔊';
        });
        
        // وضع ملء الشاشة
        fullscreenBtn.addEventListener('click', () => {
            if (mainVideo.requestFullscreen) {
                mainVideo.requestFullscreen();
            } else if (mainVideo.webkitRequestFullscreen) {
                mainVideo.webkitRequestFullscreen();
            }
        });
        
        // تحديث واجهة التحكم تلقائياً
        mainVideo.addEventListener('play', () => {
            playBtn.textContent = '❚❚ PAUSE';
        });
        
        mainVideo.addEventListener('pause', () => {
            playBtn.textContent = '▶ PLAY';
        });
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // الفلترة
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.applyVideoFilter(filter);
                
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // إغلاق النافذة
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeVideoModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeVideoModal());
        
        // إغلاق النافذة بزر ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal();
            }
        });
    }
    
    // تطبيق الفلترة
    applyVideoFilter(filter) {
        this.currentVideoFilter = filter;
        this.loadTrailers();
    }
    
    // إنشاء الجسيمات
    createParticles() {
        const container = document.getElementById('heroParticles');
        const particleCount = 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                background: ${this.getRandomNeonColor()};
            `;
            
            container.appendChild(particle);
        }
    }
    
    // الحصول على لون نيون عشوائي
    getRandomNeonColor() {
        const colors = [
            'var(--neon-pink)',
            'var(--neon-cyan)', 
            'var(--neon-purple)',
            'var(--neon-blue)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // تنسيق التاريخ
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    }
    
    // تأثيرات Cyberpunk إضافية
    addCyberEffects() {
        // تأثيرات نص متلألئ
        const titles = document.querySelectorAll('.section-title, .hero-title');
        titles.forEach(title => {
            title.style.animation = 'textGlow 3s ease-in-out infinite';
        });
        
        // تأثيرات تحويم للبطاقات
        const cards = document.querySelectorAll('.news-card, .trailer-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-5px) scale(1)';
            });
        });
    }
}

// تهيئة النظام عندما يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const cyberNews = new CyberNews();
    
    // جعل النظام متاحاً globally للتصحيح
    window.cyberNews = cyberNews;
    
    console.log('🎬 Cyber News Network Initialized!');
    console.log('📡 Loading digital content streams...');
    console.log('🎥 Video systems: ONLINE');
    console.log('📰 News feeds: ACTIVE');
});

// إضافة تأثيرات CSS ديناميكية
const dynamicStyles = `
    @keyframes textGlow {
        0%, 100% { 
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }
        50% { 
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
        }
    }
    
    .modal-meta {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
    }
    
    .modal-category {
        background: var(--neon-pink);
        color: #000;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
    }
    
    .modal-views {
        color: var(--neon-cyan);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    /* تحسينات الأداء للفيديوهات */
    .video-wall-video {
        transition: filter 0.3s ease;
    }
    
    .video-wall-item:hover .video-wall-video {
        filter: brightness(1.2) contrast(1.1);
    }
    
    /* تأثيرات تحميل */
    .loading-pulse {
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;

// إضافة الستايلات الديناميكية
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

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