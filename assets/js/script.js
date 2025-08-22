// Main Site JavaScript - Core functionality
(function() {
    'use strict';
    
    var SiteScript = function() {
        this.init();
    };
    
    SiteScript.prototype.init = function() {
        this.initMobileMenu();
        this.initScrollEffects();
        this.initLazyLoading();
        this.initFormValidation();
    };
    
    SiteScript.prototype.initMobileMenu = function() {
        var mobileToggle = document.querySelector('.mobile-menu-toggle');
        var mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    };
    
    SiteScript.prototype.initScrollEffects = function() {
        var header = document.querySelector('.header');
        var lastScrollTop = 0;
        
        if (header) {
            window.addEventListener('scroll', function() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
                
                lastScrollTop = scrollTop;
            });
        }
    };
    
    SiteScript.prototype.initLazyLoading = function() {
        var images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(function(img) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    };
    
    SiteScript.prototype.initFormValidation = function() {
        var forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                var isValid = true;
                var requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(function(field) {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Remove error class after user starts typing
                        field.addEventListener('input', function() {
                            this.classList.remove('error');
                        });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    };
    
    // Initialize SiteScript when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            new SiteScript();
        });
    } else {
        new SiteScript();
    }
})();
