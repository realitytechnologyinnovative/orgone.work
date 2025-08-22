// AOS (Animate On Scroll) JavaScript
(function() {
    'use strict';
    
    var AOS = function() {
        this.init();
    };
    
    AOS.prototype.init = function() {
        this.observeElements();
        this.handleScroll();
    };
    
    AOS.prototype.observeElements = function() {
        var elements = document.querySelectorAll('[data-aos]');
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(function(element) {
            observer.observe(element);
        });
    };
    
    AOS.prototype.handleScroll = function() {
        var self = this;
        window.addEventListener('scroll', function() {
            self.updateElements();
        });
    };
    
    AOS.prototype.updateElements = function() {
        var elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
        elements.forEach(function(element) {
            var rect = element.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                element.classList.add('aos-animate');
            }
        });
    };
    
    // Initialize AOS when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            new AOS();
        });
    } else {
        new AOS();
    }
})();
