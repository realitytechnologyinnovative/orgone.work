// Auto Scroll JavaScript - Smooth scrolling functionality
(function() {
    'use strict';
    
    var AutoScroll = function() {
        this.init();
    };
    
    AutoScroll.prototype.init = function() {
        this.bindEvents();
    };
    
    AutoScroll.prototype.bindEvents = function() {
        var self = this;
        
        // Smooth scroll for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                var targetId = e.target.getAttribute('href');
                var targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    self.smoothScrollTo(targetElement);
                }
            }
        });
        
        // Smooth scroll for navigation links
        var navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                var targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    self.smoothScrollTo(targetElement);
                }
            });
        });
    };
    
    AutoScroll.prototype.smoothScrollTo = function(targetElement) {
        var targetPosition = targetElement.offsetTop - 80; // Account for fixed header
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = 1000;
        var start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            var timeElapsed = currentTime - start;
            var run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
    };
    
    AutoScroll.prototype.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    // Initialize AutoScroll when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            new AutoScroll();
        });
    } else {
        new AutoScroll();
    }
})();
