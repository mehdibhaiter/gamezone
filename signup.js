// نظام إنشاء الحساب المتقدم
class CyberSignup {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.currentStep = 1;
        this.totalSteps = 3;
        this.userData = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSocialSignup();
        this.createBinaryRain();
        this.showStep(1);
    }
    
    setupEventListeners() {
        // أزرار التنقل بين الخطوات
        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextStep = parseInt(e.target.getAttribute('data-next'));
                this.goToStep(nextStep);
            });
        });
        
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prevStep = parseInt(e.target.getAttribute('data-prev'));
                this.goToStep(prevStep);
            });
        });
        
        // إرسال النموذج النهائي
        this.form.addEventListener('submit', (e) => this.handleSignup(e));
        
        // التحقق الفوري من البيانات
        this.setupRealTimeValidation();
        
        // تأثيرات الإدخال
        this.setupInputEffects();
    }
    
    setupRealTimeValidation() {
        // التحقق من الإيميل
        document.getElementById('signupEmail').addEventListener('blur', () => {
            this.validateEmail();
        });
        
        // التحقق من اسم المستخدم
        document.getElementById('username').addEventListener('input', () => {
            this.validateUsername();
        });
        
        // قوة كلمة السر
        document.getElementById('signupPassword').addEventListener('input', () => {
            this.validatePassword();
            this.updatePasswordStrength();
        });
        
        // تأكيد كلمة السر
        document.getElementById('confirmPassword').addEventListener('blur', () => {
            this.validatePasswordConfirmation();
        });
        
        // تبديل عرض كلمة السر
        document.getElementById('toggleSignupPassword').addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
    }
    
    setupInputEffects() {
        const inputs = this.form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    goToStep(step) {
        if (step < 1 || step > this.totalSteps) return;
        
        // التحقق من صحة الخطوة الحالية قبل الانتقال
        if (step > this.currentStep && !this.validateCurrentStep()) {
            return;
        }
        
        this.showStep(step);
    }
    
    showStep(step) {
        // إخفاء كل الخطوات
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // إظهار الخطوة المطلوبة
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
        
        // تحديث مؤشر التقدم
        this.updateProgress(step);
        
        // تحديث الخطوات النشطة
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
        
        this.currentStep = step;
        
        // إذا كانت الخطوة الأخيرة، نملئ ملخص البيانات
        if (step === 3) {
            this.fillConfirmationSummary();
        }
    }
    
    updateProgress(step) {
        const progress = ((step - 1) / (this.totalSteps - 1)) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.validateStep1();
            case 2:
                return this.validateStep2();
            default:
                return true;
        }
    }
    
    validateStep1() {
        const emailValid = this.validateEmail();
        const usernameValid = this.validateUsername();
        
        return emailValid && usernameValid;
    }
    
    validateStep2() {
        const passwordValid = this.validatePassword();
        const confirmValid = this.validatePasswordConfirmation();
        
        return passwordValid && confirmValid;
    }
    
    validateEmail() {
        const emailInput = document.getElementById('signupEmail');
        const feedback = document.getElementById('emailFeedback');
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        feedback.className = 'input-feedback';
        feedback.textContent = '';
        
        if (!email) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'NEURAL ID REQUIRED';
            return false;
        }
        
        if (!emailRegex.test(email)) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'INVALID NEURAL ID FORMAT';
            return false;
        }
        
        // التحقق من وجود الإيميل مسبقاً
        const users = JSON.parse(localStorage.getItem('cyberUsers')) || [];
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'NEURAL ID ALREADY EXISTS';
            return false;
        }
        
        feedback.className = 'input-feedback valid';
        feedback.textContent = 'NEURAL ID AVAILABLE';
        this.userData.email = email;
        return true;
    }
    
    validateUsername() {
        const usernameInput = document.getElementById('username');
        const feedback = document.getElementById('usernameFeedback');
        const username = usernameInput.value;
        
        feedback.className = 'input-feedback';
        feedback.textContent = '';
        
        if (!username) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'CYBER ALIAS REQUIRED';
            return false;
        }
        
        if (username.length < 3) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'ALIAS TOO SHORT';
            return false;
        }
        
        if (username.length > 20) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'ALIAS TOO LONG';
            return false;
        }
        
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'INVALID CHARACTERS';
            return false;
        }
        
        feedback.className = 'input-feedback valid';
        feedback.textContent = 'CYBER ALIAS AVAILABLE';
        this.userData.username = username;
        return true;
    }
    
    validatePassword() {
        const passwordInput = document.getElementById('signupPassword');
        const password = passwordInput.value;
        
        if (!password) {
            return false;
        }
        
        if (password.length < 6) {
            return false;
        }
        
        this.userData.password = password;
        return true;
    }
    
    validatePasswordConfirmation() {
        const password = document.getElementById('signupPassword').value;
        const confirmInput = document.getElementById('confirmPassword');
        const feedback = document.getElementById('confirmFeedback');
        const confirmPassword = confirmInput.value;
        
        feedback.className = 'input-feedback';
        feedback.textContent = '';
        
        if (!confirmPassword) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'CONFIRM SECURITY CODE';
            return false;
        }
        
        if (password !== confirmPassword) {
            feedback.className = 'input-feedback invalid';
            feedback.textContent = 'CODES DO NOT MATCH';
            return false;
        }
        
        feedback.className = 'input-feedback valid';
        feedback.textContent = 'CODES MATCH';
        return true;
    }
    
    updatePasswordStrength() {
        const password = document.getElementById('signupPassword').value;
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        let strength = 'weak';
        let width = 33;
        
        if (password.length >= 8) {
            strength = 'medium';
            width = 66;
        }
        
        if (password.length >= 12 && /[!@#$%^&*]/.test(password)) {
            strength = 'strong';
            width = 100;
        }
        
        strengthBar.className = `strength-bar ${strength}`;
        strengthBar.style.setProperty('--strength-width', `${width}%`);
        
        strengthText.textContent = `${strength.toUpperCase()} CODE STRENGTH`;
    }
    
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('signupPassword');
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const toggleBtn = document.getElementById('toggleSignupPassword');
        toggleBtn.textContent = type === 'password' ? '👁️' : '🔒';
    }
    
    fillConfirmationSummary() {
        document.getElementById('summaryEmail').textContent = this.userData.email;
        document.getElementById('summaryUsername').textContent = this.userData.username;
        
        const password = this.userData.password;
        let securityLevel = 'BASIC';
        if (password.length >= 12 && /[!@#$%^&*]/.test(password)) {
            securityLevel = 'MAXIMUM';
        } else if (password.length >= 8) {
            securityLevel = 'ENHANCED';
        }
        
        document.getElementById('summarySecurity').textContent = securityLevel;
    }
    
    async handleSignup(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            this.showError('PLEASE COMPLETE ALL FIELDS CORRECTLY');
            return;
        }
        
        const termsAccepted = document.getElementById('acceptTerms').checked;
        if (!termsAccepted) {
            this.showError('YOU MUST ACCEPT THE NEURAL PROTOCOL');
            return;
        }
        
        this.setLoading(true);
        
        try {
            await this.performSignup();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async performSignup() {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // حفظ المستخدم في localStorage
        const users = JSON.parse(localStorage.getItem('cyberUsers')) || [];
        const newUser = {
            id: Date.now(),
            email: this.userData.email,
            username: this.userData.username,
            password: this.userData.password,
            joinDate: new Date().toISOString(),
            level: 1,
            xp: 0,
            achievements: ['FIRST_BLOOD']
        };
        
        users.push(newUser);
        localStorage.setItem('cyberUsers', JSON.stringify(users));
        
        // تسجيل الدخول تلقائياً
        const sessionData = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(sessionData));
        
        this.showSuccess('NEURAL PROFILE ACTIVATED! WELCOME TO CYBERVERSE!');
        
        // التوجيه للصفحة الرئيسية بعد التسجيل
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
    
    setupSocialSignup() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.getAttribute('data-provider');
                this.handleSocialSignup(provider);
            });
        });
    }
    
    async handleSocialSignup(provider) {
        this.setLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // إنشاء مستخدم افتراضي للتسجيل الاجتماعي
            const socialUser = {
                id: Date.now(),
                email: `user_${Date.now()}@${provider}.com`,
                username: `${provider.toUpperCase()}_USER_${Date.now()}`,
                provider: provider,
                joinDate: new Date().toISOString(),
                level: 1,
                xp: 0,
                achievements: ['SOCIAL_CONNECT']
            };
            
            // حفظ المستخدم
            const users = JSON.parse(localStorage.getItem('cyberUsers')) || [];
            users.push(socialUser);
            localStorage.setItem('cyberUsers', JSON.stringify(users));
            
            // تسجيل الدخول
            localStorage.setItem('currentUser', JSON.stringify({
                id: socialUser.id,
                email: socialUser.email,
                username: socialUser.username,
                loginTime: new Date().toISOString()
            }));
            
            this.showSuccess(`${provider.toUpperCase()} REGISTRATION SUCCESSFUL!`);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            this.showError(`${provider.toUpperCase()} REGISTRATION FAILED`);
        } finally {
            this.setLoading(false);
        }
    }
    
    createBinaryRain() {
        const container = document.getElementById('binaryRain');
        const digits = '0101010101';
        const count = 50;
        
        for (let i = 0; i < count; i++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = digits[Math.floor(Math.random() * digits.length)];
            digit.style.left = `${Math.random() * 100}%`;
            digit.style.animationDuration = `${Math.random() * 5 + 3}s`;
            digit.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(digit);
        }
    }
    
    setLoading(isLoading) {
        const submitBtn = document.querySelector('.auth-submit-btn');
        const loading = document.getElementById('signupLoading');
        
        if (isLoading) {
            submitBtn.disabled = true;
            loading.style.display = 'block';
            submitBtn.querySelector('.btn-content').style.opacity = '0';
        } else {
            submitBtn.disabled = false;
            loading.style.display = 'none';
            submitBtn.querySelector('.btn-content').style.opacity = '1';
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة نظام التسجيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const cyberSignup = new CyberSignup();
    
    // جعل النظام متاحاً globally
    window.cyberSignup = cyberSignup;
    
    console.log('🚀 Cyber Signup System Initialized!');
    console.log('📝 Multi-step registration ready');
    console.log('🔐 Social registration active');
    console.log('🎮 Gaming platforms integration online');
});