// نظام تسجيل الدخول المتقدم
class CyberLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('loginEmail');
        this.passwordInput = document.getElementById('loginPassword');
        this.togglePasswordBtn = document.getElementById('toggleLoginPassword');
        this.submitBtn = this.form.querySelector('.auth-submit-btn');
        this.loading = document.getElementById('loginLoading');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSocialLogin();
        this.checkRememberedUser();
    }
    
    setupEventListeners() {
        // إرسال النموذج
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        
        // تبديل عرض كلمة السر
        this.togglePasswordBtn.addEventListener('click', () => this.togglePasswordVisibility());
        
        // التحقق الفوري من الإيميل
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        
        // التحقق الفوري من كلمة السر
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        
        // تأثيرات الكتابة
        this.setupInputEffects();
    }
    
    setupInputEffects() {
        const inputs = this.form.querySelectorAll('input');
        
        inputs.forEach(input => {
            // تأثير عند التركيز
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // تأثير كتابة
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoading(true);
        
        // محاكاة عملية تسجيل الدخول
        try {
            await this.performLogin();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async performLogin() {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // التحقق من المستخدم في localStorage
        const users = JSON.parse(localStorage.getItem('cyberUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // حفظ بيانات الجلسة
            const sessionData = {
                id: user.id,
                email: user.email,
                username: user.username,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(sessionData));
            
            if (rememberMe) {
                localStorage.setItem('rememberedUser', email);
            }
            
            this.showSuccess('NEURAL PATTERN ACCEPTED!');
            
            // التوجيه للصفحة الرئيسية بعد نجاح التسجيل
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } else {
            throw new Error('INVALID NEURAL CREDENTIALS');
        }
    }
    
    validateForm() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        return isEmailValid && isPasswordValid;
    }
    
    validateEmail() {
        const email = this.emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showInputError(this.emailInput, 'NEURAL ID REQUIRED');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showInputError(this.emailInput, 'INVALID NEURAL ID FORMAT');
            return false;
        }
        
        this.clearInputError(this.emailInput);
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showInputError(this.passwordInput, 'SECURITY CODE REQUIRED');
            return false;
        }
        
        if (password.length < 6) {
            this.showInputError(this.passwordInput, 'CODE TOO WEAK');
            return false;
        }
        
        this.clearInputError(this.passwordInput);
        return true;
    }
    
    showInputError(input, message) {
        this.clearInputError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--neon-pink);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 0.5rem;
            text-shadow: var(--glow-pink);
        `;
        
        input.parentElement.appendChild(errorElement);
        input.style.borderColor = 'var(--neon-pink)';
        input.style.boxShadow = 'var(--glow-pink)';
    }
    
    clearInputError(input) {
        const existingError = input.parentElement.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        this.togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🔒';
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.loading.style.display = 'block';
            this.submitBtn.querySelector('.btn-content').style.opacity = '0';
        } else {
            this.submitBtn.disabled = false;
            this.loading.style.display = 'none';
            this.submitBtn.querySelector('.btn-content').style.opacity = '1';
        }
    }
    
    setupSocialLogin() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.getAttribute('data-provider');
                this.handleSocialLogin(provider);
            });
        });
    }
    
    async handleSocialLogin(provider) {
        this.setLoading(true);
        
        // محاكاة تسجيل الدخول عبر المنصات
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // إنشاء مستخدم افتراضي للتسجيل الاجتماعي
            const socialUser = {
                id: Date.now(),
                email: `user_${Date.now()}@${provider}.com`,
                username: `${provider.toUpperCase()}_USER`,
                provider: provider,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(socialUser));
            
            this.showSuccess(`${provider.toUpperCase()} AUTHENTICATION SUCCESSFUL!`);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            this.showError(`${provider.toUpperCase()} AUTHENTICATION FAILED`);
        } finally {
            this.setLoading(false);
        }
    }
    
    checkRememberedUser() {
        const rememberedEmail = localStorage.getItem('rememberedUser');
        if (rememberedEmail) {
            this.emailInput.value = rememberedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        // إزالة الإشعارات القديمة
        const oldNotification = document.querySelector('.auth-notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '⚡' : '⚠️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // إضافة الستايل للإشعار
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 128, 0.1)' : 'rgba(255, 0, 128, 0.1)'};
            border: 2px solid ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-pink)'};
            color: ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-pink)'};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // تأثير الظهور
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // إخفاء تلقائي بعد 3 ثواني
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة نظام التسجيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const cyberLogin = new CyberLogin();
    
    // جعل النظام متاحاً globally
    window.cyberLogin = cyberLogin;
    
    console.log('🔐 Cyber Login System Initialized!');
    console.log('⚡ Social authentication ready');
    console.log('🎮 Gaming platforms integration active');
});

// نظام تسجيل الدخول المتقدم
class CyberLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('loginEmail');
        this.passwordInput = document.getElementById('loginPassword');
        this.togglePasswordBtn = document.getElementById('toggleLoginPassword');
        this.submitBtn = this.form.querySelector('.auth-submit-btn');
        this.loading = document.getElementById('loginLoading');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSocialLogin();
        this.checkRememberedUser();
    }
    
    setupEventListeners() {
        // إرسال النموذج
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        
        // تبديل عرض كلمة السر
        this.togglePasswordBtn.addEventListener('click', () => this.togglePasswordVisibility());
        
        // التحقق الفوري من الإيميل
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        
        // التحقق الفوري من كلمة السر
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        
        // تأثيرات الكتابة
        this.setupInputEffects();
    }
    
    setupInputEffects() {
        const inputs = this.form.querySelectorAll('input');
        
        inputs.forEach(input => {
            // تأثير عند التركيز
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // تأثير كتابة
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoading(true);
        
        // محاكاة عملية تسجيل الدخول
        try {
            await this.performLogin();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async performLogin() {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // التحقق من المستخدم في localStorage
        const users = JSON.parse(localStorage.getItem('cyberUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // حفظ بيانات الجلسة
            const sessionData = {
                id: user.id,
                email: user.email,
                username: user.username,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(sessionData));
            
            if (rememberMe) {
                localStorage.setItem('rememberedUser', email);
            }
            
            this.showSuccess('NEURAL PATTERN ACCEPTED!');
            
            // التوجيه للصفحة الرئيسية بعد نجاح التسجيل
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } else {
            throw new Error('INVALID NEURAL CREDENTIALS');
        }
    }
    
    validateForm() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        return isEmailValid && isPasswordValid;
    }
    
    validateEmail() {
        const email = this.emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showInputError(this.emailInput, 'NEURAL ID REQUIRED');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showInputError(this.emailInput, 'INVALID NEURAL ID FORMAT');
            return false;
        }
        
        this.clearInputError(this.emailInput);
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showInputError(this.passwordInput, 'SECURITY CODE REQUIRED');
            return false;
        }
        
        if (password.length < 6) {
            this.showInputError(this.passwordInput, 'CODE TOO WEAK');
            return false;
        }
        
        this.clearInputError(this.passwordInput);
        return true;
    }
    
    showInputError(input, message) {
        this.clearInputError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--neon-pink);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 0.5rem;
            text-shadow: var(--glow-pink);
        `;
        
        input.parentElement.appendChild(errorElement);
        input.style.borderColor = 'var(--neon-pink)';
        input.style.boxShadow = 'var(--glow-pink)';
    }
    
    clearInputError(input) {
        const existingError = input.parentElement.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        this.togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🔒';
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.loading.style.display = 'block';
            this.submitBtn.querySelector('.btn-content').style.opacity = '0';
        } else {
            this.submitBtn.disabled = false;
            this.loading.style.display = 'none';
            this.submitBtn.querySelector('.btn-content').style.opacity = '1';
        }
    }
    
    setupSocialLogin() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.getAttribute('data-provider');
                this.handleSocialLogin(provider);
            });
        });
    }
    
    async handleSocialLogin(provider) {
        this.setLoading(true);
        
        // محاكاة تسجيل الدخول عبر المنصات
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // إنشاء مستخدم افتراضي للتسجيل الاجتماعي
            const socialUser = {
                id: Date.now(),
                email: `user_${Date.now()}@${provider}.com`,
                username: `${provider.toUpperCase()}_USER`,
                provider: provider,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(socialUser));
            
            this.showSuccess(`${provider.toUpperCase()} AUTHENTICATION SUCCESSFUL!`);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            this.showError(`${provider.toUpperCase()} AUTHENTICATION FAILED`);
        } finally {
            this.setLoading(false);
        }
    }
    
    checkRememberedUser() {
        const rememberedEmail = localStorage.getItem('rememberedUser');
        if (rememberedEmail) {
            this.emailInput.value = rememberedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        // إزالة الإشعارات القديمة
        const oldNotification = document.querySelector('.auth-notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '⚡' : '⚠️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // إضافة الستايل للإشعار
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 128, 0.1)' : 'rgba(255, 0, 128, 0.1)'};
            border: 2px solid ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-pink)'};
            color: ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-pink)'};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // تأثير الظهور
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // إخفاء تلقائي بعد 3 ثواني
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة نظام التسجيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const cyberLogin = new CyberLogin();
    
    // جعل النظام متاحاً globally
    window.cyberLogin = cyberLogin;
    
    console.log('🔐 Cyber Login System Initialized!');
    console.log('⚡ Social authentication ready');
    console.log('🎮 Gaming platforms integration active');
});