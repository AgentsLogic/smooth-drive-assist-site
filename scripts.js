// Smoother Drive - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle functionality
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mobileNav.classList.toggle('mobile-nav-open');
      document.body.classList.toggle('mobile-menu-open');
    });
  }

  // Cookie banner functionality
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieBanner && cookieAccept && cookieDecline) {
    // Check if cookie consent has already been given
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      cookieBanner.classList.add('hidden');
    }

    cookieAccept.addEventListener('click', function() {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('cookieConsent', 'accepted');
    });

    cookieDecline.addEventListener('click', function() {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('cookieConsent', 'declined');
    });
  }

  // Back to top button functionality (Enhanced)
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    let scrollProgress = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = (scrollTop / docHeight) * 100;

      if (scrollTop > 400) {
        backBtn.classList.add('back-to-top-visible');
        // Update progress circle if it exists
        const progressCircle = backBtn.querySelector('.progress-ring-circle');
        if (progressCircle) {
          const circumference = 2 * Math.PI * 18; // radius = 18
          const offset = circumference - (scrollProgress / 100) * circumference;
          progressCircle.style.strokeDashoffset = offset;
        }
      } else {
        backBtn.classList.remove('back-to-top-visible');
      }
    });

    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Track back to top click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'back_to_top_click', {
          'event_category': 'navigation',
          'event_label': 'scroll_position_' + Math.round(scrollProgress)
        });
      }
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" or empty
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Page loader functionality
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        pageLoader.classList.add('page-loader-hidden');
        document.body.classList.remove('loading');
      }, 500);
    });
  }

  // Scroll progress indicator
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        if (document.body.classList.contains('mobile-menu-open')) {
          menuToggle.click();
        }
      }
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('faq-item-open');

        // Close all FAQ items
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('faq-item-open');
        });

        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('faq-item-open');
        }
      });
    }
  });

  // Form submission handling
  const simpleBookingForm = document.querySelector('.booking-form');
  if (simpleBookingForm) {
    simpleBookingForm.addEventListener('submit', function(e) {
      // Basic form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const vehicle = document.getElementById('vehicle').value.trim();

      if (!name || !email || !vehicle) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
      }
    });
  }

  // Animate elements on scroll
  const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
  if (animateOnScrollElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    animateOnScrollElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Stagger children animation
  const staggerChildrenElements = document.querySelectorAll('.stagger-children');
  if (staggerChildrenElements.length > 0) {
    staggerChildrenElements.forEach(parent => {
      const children = parent.querySelectorAll('> *');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 100}ms`;
      });
    });
  }

  // Hero particles animation (simple implementation)
  function createHeroParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;

    const particleCount = 20;
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');

      // Random properties
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);
    }
  }

  // Initialize particles
  createHeroParticles();

  // Countdown Timer for Promo Banner
  function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Set end time to 24 hours from now (or use a fixed date)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        countdownElement.textContent = '00:00:00';
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  initCountdown();

  // Exit Intent Popup (Enhanced)
  const exitPopup = document.getElementById('exitPopup');
  const exitPopupClose = document.getElementById('exitPopupClose');
  const exitPopupOverlay = document.getElementById('exitPopupOverlay');
  let exitIntentShown = false;
  let userEngaged = false;
  let timeOnSite = 0;

  if (exitPopup && exitPopupClose && exitPopupOverlay) {
    // Track time on site
    setInterval(function() {
      timeOnSite++;
    }, 1000);

    // Track user engagement (scrolling, clicking)
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (currentScroll > scrollDepth) {
        scrollDepth = currentScroll;
      }
      if (scrollDepth > 25) {
        userEngaged = true;
      }
    });

    document.addEventListener('click', function() {
      userEngaged = true;
    });

    // Desktop: Detect exit intent (mouse leaving viewport at top)
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !exitIntentShown && !localStorage.getItem('exitPopupShown')) {
        // Only show if user has been on site for at least 10 seconds and is engaged
        if (timeOnSite >= 10 && userEngaged) {
          showExitPopup();
        }
      }
    });

    // Mobile: Show after inactivity or scroll back up
    let lastScrollTop = 0;
    let inactivityTimer;

    if (window.innerWidth <= 768) {
      // Show on scroll up (user might be leaving)
      window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        if (scrollTop < lastScrollTop && scrollTop < 100 && !exitIntentShown && userEngaged && timeOnSite >= 15) {
          if (!localStorage.getItem('exitPopupShown')) {
            showExitPopup();
          }
        }
        lastScrollTop = scrollTop;
      });

      // Show after 30 seconds of inactivity
      function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
          if (!exitIntentShown && userEngaged && timeOnSite >= 20 && !localStorage.getItem('exitPopupShown')) {
            showExitPopup();
          }
        }, 30000);
      }

      document.addEventListener('mousemove', resetInactivityTimer);
      document.addEventListener('touchstart', resetInactivityTimer);
      document.addEventListener('scroll', resetInactivityTimer);
      resetInactivityTimer();
    }

    function showExitPopup() {
      exitPopup.classList.add('active');
      exitIntentShown = true;
      localStorage.setItem('exitPopupShown', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling

      // Track popup shown
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exit_intent_shown', {
          'event_category': 'engagement',
          'event_label': 'exit_popup'
        });
      }
    }

    // Close popup handlers
    function closeExitPopup() {
      exitPopup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling

      // Track popup closed
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exit_intent_closed', {
          'event_category': 'engagement',
          'event_label': 'exit_popup'
        });
      }
    }

    exitPopupClose.addEventListener('click', closeExitPopup);
    exitPopupOverlay.addEventListener('click', closeExitPopup);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && exitPopup.classList.contains('active')) {
        closeExitPopup();
      }
    });

    // Close when clicking CTA
    const exitPopupCTA = exitPopup.querySelector('.exit-popup-cta');
    if (exitPopupCTA) {
      exitPopupCTA.addEventListener('click', function() {
        closeExitPopup();

        // Track CTA click
        if (typeof gtag !== 'undefined') {
          gtag('event', 'exit_intent_conversion', {
            'event_category': 'conversion',
            'event_label': 'exit_popup_cta'
          });
        }
      });
    }
  }

  // Live Chat Button
  const chatButton = document.getElementById('chatButton');
  if (chatButton) {
    chatButton.addEventListener('click', function() {
      // In production, this would open your chat widget (Intercom, Drift, etc.)
      // For now, scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Remove badge after click
      const badge = this.querySelector('.chat-badge');
      if (badge) {
        badge.classList.add('hidden');
      }
    });
  }

  // Savings Calculator
  const timeRangeSelect = document.getElementById('timeRange');
  const teslaCostElement = document.getElementById('teslaCost');
  const teslaBreakdownElement = document.getElementById('teslaBreakdown');
  const savingsValueElement = document.getElementById('savingsValue');

  if (timeRangeSelect && teslaCostElement && teslaBreakdownElement && savingsValueElement) {
    function updateCalculator() {
      const years = parseInt(timeRangeSelect.value);
      const months = years * 12;
      const smootherCost = 2000;
      const teslaUpfront = 8000;
      const teslaMonthly = 99;
      const teslaTotalCost = teslaUpfront + (teslaMonthly * months);
      const savings = teslaTotalCost - smootherCost;

      teslaCostElement.textContent = '$' + teslaTotalCost.toLocaleString();
      teslaBreakdownElement.textContent = `$${teslaUpfront.toLocaleString()} upfront + $${teslaMonthly}/mo × ${months} months`;
      savingsValueElement.textContent = '$' + savings.toLocaleString();
    }

    timeRangeSelect.addEventListener('change', updateCalculator);
    updateCalculator(); // Initialize
  }

  // Enhanced Form Validation and Progress
  const bookingForm = document.getElementById('bookingForm');
  const formProgress = document.getElementById('formProgress');
  const progressPercent = document.getElementById('progressPercent');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (bookingForm && formProgress && progressPercent && submitBtn) {
    const requiredFields = bookingForm.querySelectorAll('[required]');
    const allFields = bookingForm.querySelectorAll('input, textarea');

    // Update progress bar
    function updateProgress() {
      let filledCount = 0;
      requiredFields.forEach(field => {
        if (field.value.trim() !== '') {
          filledCount++;
        }
      });
      const percent = Math.round((filledCount / requiredFields.length) * 100);
      formProgress.style.width = percent + '%';
      progressPercent.textContent = percent;
    }

    // Real-time validation
    allFields.forEach(field => {
      field.addEventListener('input', function() {
        updateProgress();
        validateField(this);
      });

      field.addEventListener('blur', function() {
        validateField(this);
      });
    });

    function validateField(field) {
      const errorElement = document.getElementById(field.id + 'Error');
      if (!errorElement) return;

      let errorMessage = '';

      if (field.hasAttribute('required') && field.value.trim() === '') {
        errorMessage = 'This field is required';
        field.classList.add('error');
        field.classList.remove('valid');
      } else if (field.type === 'email' && field.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          errorMessage = 'Please enter a valid email address';
          field.classList.add('error');
          field.classList.remove('valid');
        } else {
          field.classList.remove('error');
          field.classList.add('valid');
        }
      } else if (field.type === 'tel' && field.value.trim() !== '') {
        const phoneRegex = /[\d\(\)\s\-\+]{10,}/;
        if (!phoneRegex.test(field.value)) {
          errorMessage = 'Please enter a valid phone number';
          field.classList.add('error');
          field.classList.remove('valid');
        } else {
          field.classList.remove('error');
          field.classList.add('valid');
        }
      } else if (field.value.trim() !== '') {
        field.classList.remove('error');
        field.classList.add('valid');
      } else {
        field.classList.remove('error', 'valid');
      }

      errorElement.textContent = errorMessage;
    }

    // Form submission with loading state
    bookingForm.addEventListener('submit', function(e) {
      // Validate all fields before submit
      let isValid = true;
      requiredFields.forEach(field => {
        validateField(field);
        if (field.classList.contains('error') || field.value.trim() === '') {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        return;
      }

      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      if (btnText && btnLoader) {
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
      }

      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'engagement',
          'event_label': 'booking_form'
        });
      }

      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
      }

      // Note: For mailto: forms, we can't show success message
      // In production, replace with actual form submission to a backend
    });

    // Initialize progress
    updateProgress();
  }

  // Sticky Header on Scroll
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  let scrollThreshold = 100;

  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        header.classList.add('scrolled');

        // Hide on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('hidden');
      }

      lastScrollTop = scrollTop;
    });
  }

  // Track CTA Clicks
  const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();

      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'event_category': 'engagement',
          'event_label': buttonText
        });
      }

      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout');
      }
    });
  });

  // Track Video Plays
  const videoIframes = document.querySelectorAll('iframe[src*="youtube"]');
  videoIframes.forEach(iframe => {
    iframe.addEventListener('load', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'video_load', {
          'event_category': 'engagement',
          'event_label': 'demo_video'
        });
      }
    });
  });

  // Track Scroll Depth
  let scrollDepthMarks = {25: false, 50: false, 75: false, 100: false};

  window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    Object.keys(scrollDepthMarks).forEach(mark => {
      if (scrollPercent >= mark && !scrollDepthMarks[mark]) {
        scrollDepthMarks[mark] = true;

        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': mark + '%'
          });
        }
      }
    });
  });

  // Newsletter Popup
  const newsletterPopup = document.getElementById('newsletterPopup');
  const newsletterClose = document.getElementById('newsletterClose');
  const newsletterOverlay = document.getElementById('newsletterOverlay');
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterPopup && newsletterClose && newsletterOverlay && newsletterForm) {
    // Show newsletter popup after 30 seconds if not shown before
    setTimeout(function() {
      if (!localStorage.getItem('newsletterShown') && !sessionStorage.getItem('newsletterDismissed')) {
        newsletterPopup.classList.add('active');
        localStorage.setItem('newsletterShown', 'true');
      }
    }, 30000); // 30 seconds

    function closeNewsletter() {
      newsletterPopup.classList.remove('active');
      sessionStorage.setItem('newsletterDismissed', 'true');
    }

    newsletterClose.addEventListener('click', closeNewsletter);
    newsletterOverlay.addEventListener('click', closeNewsletter);

    // Handle newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;

      // Track newsletter signup
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
          'event_category': 'engagement',
          'event_label': email
        });
      }

      if (typeof fbq !== 'undefined') {
        fbq('track', 'Subscribe');
      }

      // In production, send to your email service (Mailchimp, ConvertKit, etc.)
      alert('Thanks for subscribing! Check your email for confirmation.');
      closeNewsletter();
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && newsletterPopup.classList.contains('active')) {
        closeNewsletter();
      }
    });
  }



  // UTM Parameter Tracking
  function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content')
    };

    // Store in sessionStorage
    if (Object.values(utmParams).some(val => val !== null)) {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));

      // Track in analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'utm_tracking', {
          'event_category': 'marketing',
          'utm_source': utmParams.utm_source,
          'utm_medium': utmParams.utm_medium,
          'utm_campaign': utmParams.utm_campaign
        });
      }
    }

    return utmParams;
  }

  // Initialize UTM tracking
  getUTMParameters();

  // A/B Testing Framework
  const ABTest = {
    // Define your tests here
    tests: {
      'hero_cta_text': {
        variants: [
          'Get $1,000 Off Today →',
          'Book Your Install Now →',
          'Start Driving Smarter →'
        ],
        element: '.hero .btn-primary'
      },
      'pricing_highlight': {
        variants: [
          '$2,000 one-time',
          'Just $2,000',
          '$2,000 (Save $9,564 vs Tesla)'
        ],
        element: '.pricing-amount'
      }
    },

    // Get or assign variant
    getVariant: function(testName) {
      const stored = localStorage.getItem('ab_' + testName);
      if (stored !== null) {
        return parseInt(stored);
      }

      const test = this.tests[testName];
      if (!test) return 0;

      const variant = Math.floor(Math.random() * test.variants.length);
      localStorage.setItem('ab_' + testName, variant);

      // Track variant assignment
      if (typeof gtag !== 'undefined') {
        gtag('event', 'ab_test_assigned', {
          'event_category': 'experiment',
          'test_name': testName,
          'variant': variant
        });
      }

      return variant;
    },

    // Apply variant to page
    applyVariant: function(testName) {
      const test = this.tests[testName];
      if (!test) return;

      const variant = this.getVariant(testName);
      const elements = document.querySelectorAll(test.element);

      elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = test.variants[variant];
        } else {
          element.textContent = test.variants[variant];
        }
      });
    },

    // Track conversion for active tests
    trackConversion: function(testName) {
      const variant = this.getVariant(testName);

      if (typeof gtag !== 'undefined') {
        gtag('event', 'ab_test_conversion', {
          'event_category': 'experiment',
          'test_name': testName,
          'variant': variant
        });
      }
    },

    // Initialize all tests
    init: function() {
      Object.keys(this.tests).forEach(testName => {
        this.applyVariant(testName);
      });
    }
  };

  // Initialize A/B tests
  // Uncomment to enable A/B testing
  // ABTest.init();

  // Track conversions on form submit
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      // Track all active A/B test conversions
      Object.keys(ABTest.tests).forEach(testName => {
        ABTest.trackConversion(testName);
      });
    });
  });

  // Keyboard Navigation Support
  document.addEventListener('keydown', function(e) {
    // Tab trap for modals
    const activeModal = document.querySelector('.exit-popup.active, .newsletter-popup.active');
    if (activeModal && e.key === 'Tab') {
      const focusableElements = activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    // Quick navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'k': // Ctrl/Cmd + K to focus search/contact
          e.preventDefault();
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const firstInput = contactSection.querySelector('input');
            if (firstInput) firstInput.focus();
          }
          break;
      }
    }
  });

  // Improved Mobile Menu
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileMenuLinks = document.querySelectorAll('.nav-mobile a');

  if (mobileMenuToggle && mobileMenu) {
    // Add animation class
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('active');

      if (!isOpen) {
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate menu items
        const menuItems = mobileMenu.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
          item.style.animation = `slideInRight 0.3s ease-out ${index * 0.1}s forwards`;
        });
      } else {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Add focus visible styles for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
  });

  // Image Gallery Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  let galleryImages = [];

  // Make all images in gallery sections clickable
  function initGallery() {
    const clickableImages = document.querySelectorAll('.gallery-grid img, .installation-photo, .process-image img');

    clickableImages.forEach((img, index) => {
      galleryImages.push({
        src: img.src,
        alt: img.alt,
        caption: img.getAttribute('data-caption') || img.alt
      });

      img.addEventListener('click', function() {
        openLightbox(index);
      });

      // Add keyboard support
      img.setAttribute('tabindex', '0');
      img.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });
  }

  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track in analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_view', {
        'event_category': 'engagement',
        'event_label': galleryImages[index].caption
      });
    }
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }

  if (lightbox && lightboxClose && lightboxPrev && lightboxNext) {
    initGallery();

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    });

    // Close on background click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Vehicle Finder Functionality
  const vehicleDatabase = {
    toyota: {
      models: {
        camry: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        corolla: [2020, 2021, 2022, 2023, 2024],
        rav4: [2019, 2020, 2021, 2022, 2023, 2024],
        highlander: [2020, 2021, 2022, 2023, 2024],
        prius: [2021, 2022, 2023, 2024],
        sienna: [2021, 2022, 2023, 2024]
      }
    },
    honda: {
      models: {
        accord: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        civic: [2019, 2020, 2021, 2022, 2023, 2024],
        crv: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        pilot: [2019, 2020, 2021, 2022, 2023, 2024]
      }
    },
    hyundai: {
      models: {
        sonata: [2020, 2021, 2022, 2023, 2024],
        elantra: [2021, 2022, 2023, 2024],
        tucson: [2019, 2020, 2021, 2022, 2023, 2024],
        santafe: [2019, 2020, 2021, 2022, 2023, 2024],
        ioniq5: [2022, 2023, 2024]
      }
    },
    kia: {
      models: {
        forte: [2019, 2020, 2021, 2022, 2023, 2024],
        optima: [2019, 2020],
        k5: [2021, 2022, 2023, 2024],
        sportage: [2020, 2021, 2022, 2023, 2024],
        sorento: [2021, 2022, 2023, 2024]
      }
    },
    ford: {
      models: {
        mustang: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        f150: [2021, 2022, 2023, 2024],
        escape: [2020, 2021, 2022, 2023, 2024],
        explorer: [2020, 2021, 2022, 2023, 2024]
      }
    },
    chevrolet: {
      models: {
        malibu: [2019, 2020, 2021, 2022, 2023],
        equinox: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        traverse: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
      }
    },
    nissan: {
      models: {
        altima: [2019, 2020, 2021, 2022, 2023, 2024],
        rogue: [2021, 2022, 2023, 2024],
        leaf: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
      }
    },
    mazda: {
      models: {
        mazda3: [2019, 2020, 2021, 2022, 2023, 2024],
        cx5: [2019, 2020, 2021, 2022, 2023, 2024],
        cx9: [2019, 2020, 2021, 2022, 2023, 2024]
      }
    },
    subaru: {
      models: {
        outback: [2020, 2021, 2022, 2023, 2024],
        forester: [2019, 2020, 2021, 2022, 2023, 2024],
        crosstrek: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
      }
    },
    volkswagen: {
      models: {
        jetta: [2019, 2020, 2021, 2022, 2023, 2024],
        passat: [2020, 2021, 2022],
        tiguan: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
      }
    }
  };

  const makeSelect = document.getElementById('vehicleMake');
  const modelSelect = document.getElementById('vehicleModel');
  const yearSelect = document.getElementById('vehicleYear');
  const checkButton = document.getElementById('checkCompatibility');
  const resultDiv = document.getElementById('compatibilityResult');

  if (makeSelect && modelSelect && yearSelect && checkButton && resultDiv) {
    makeSelect.addEventListener('change', function() {
      const make = this.value;
      modelSelect.innerHTML = '<option value="">Select Model</option>';
      yearSelect.innerHTML = '<option value="">Select Year</option>';
      modelSelect.disabled = true;
      yearSelect.disabled = true;
      checkButton.disabled = true;
      resultDiv.classList.add('hidden');

      if (make && vehicleDatabase[make]) {
        const models = Object.keys(vehicleDatabase[make].models);
        models.forEach(model => {
          const option = document.createElement('option');
          option.value = model;
          option.textContent = model.charAt(0).toUpperCase() + model.slice(1).replace(/([A-Z])/g, ' $1');
          modelSelect.appendChild(option);
        });
        modelSelect.disabled = false;
      }
    });

    modelSelect.addEventListener('change', function() {
      const make = makeSelect.value;
      const model = this.value;
      yearSelect.innerHTML = '<option value="">Select Year</option>';
      yearSelect.disabled = true;
      checkButton.disabled = true;
      resultDiv.classList.add('hidden');

      if (make && model && vehicleDatabase[make]?.models[model]) {
        const years = vehicleDatabase[make].models[model];
        years.sort((a, b) => b - a).forEach(year => {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearSelect.appendChild(option);
        });
        yearSelect.disabled = false;
      }
    });

    yearSelect.addEventListener('change', function() {
      checkButton.disabled = !this.value;
      resultDiv.classList.add('hidden');
    });

    checkButton.addEventListener('click', function() {
      const make = makeSelect.value;
      const model = modelSelect.value;
      const year = yearSelect.value;

      if (make && model && year) {
        const isCompatible = vehicleDatabase[make]?.models[model]?.includes(parseInt(year));

        resultDiv.classList.remove('hidden', 'compatible', 'not-compatible');

        if (isCompatible) {
          resultDiv.classList.add('compatible');
          resultDiv.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
            <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Great news!</div>
            <div>Your ${year} ${make.charAt(0).toUpperCase() + make.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1).replace(/([A-Z])/g, ' $1')} is compatible with Smoother Drive.</div>
            <a href="#contact" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Book Your Install →</a>
          `;
        } else {
          resultDiv.classList.add('not-compatible');
          resultDiv.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">ℹ️</div>
            <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Let's check together</div>
            <div>We need to verify compatibility for your specific vehicle configuration.</div>
            <a href="#contact" class="btn btn-secondary" style="margin-top: 1rem; display: inline-block;">Contact Us →</a>
          `;
        }
      }
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');

      const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);

      // Track theme change
      if (typeof gtag !== 'undefined') {
        gtag('event', 'theme_change', {
          'event_category': 'engagement',
          'event_label': theme
        });
      }

      // Smooth transition
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(function() {
        document.body.style.transition = '';
      }, 300);
    });
  }

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful:', registration.scope);

          // Check for updates
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, show update notification
                console.log('New version available! Refresh to update.');
              }
            });
          });
        })
        .catch(function(err) {
          console.log('ServiceWorker registration failed:', err);
        });
    });
  }

  // Floating Action Button (FAB)
  const fabButton = document.getElementById('fabButton');
  if (fabButton) {
    // Show FAB after scrolling down
    let fabVisible = false;
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 300;

      if (shouldShow && !fabVisible) {
        fabButton.classList.add('visible');
        fabVisible = true;
      } else if (!shouldShow && fabVisible) {
        fabButton.classList.remove('visible');
        fabVisible = false;
      }
    });

    // Click handler - scroll to booking form
    fabButton.addEventListener('click', function() {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Track FAB click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'fab_click', {
          'event_category': 'engagement',
          'event_label': 'floating_action_button'
        });
      }
    });
  }

  // YouTube Lazy Load Facade
  function initYouTubeFacade() {
    const facades = document.querySelectorAll('.youtube-facade');

    facades.forEach(facade => {
      const videoId = facade.dataset.videoId;
      if (!videoId) return;

      // Create thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      thumbnail.alt = facade.dataset.title || 'Video thumbnail';
      thumbnail.className = 'youtube-facade-thumbnail';
      thumbnail.loading = 'lazy';

      // Fallback to hqdefault if maxresdefault doesn't exist
      thumbnail.onerror = function() {
        this.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      };

      // Create play button
      const playButton = document.createElement('div');
      playButton.className = 'youtube-facade-play-button';
      playButton.setAttribute('aria-label', 'Play video');

      facade.appendChild(thumbnail);
      facade.appendChild(playButton);

      // Load iframe on click
      facade.addEventListener('click', function() {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.title = facade.dataset.title || 'YouTube video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        // Replace facade with iframe
        facade.innerHTML = '';
        facade.appendChild(iframe);
        facade.style.cursor = 'default';

        // Track video play
        if (typeof gtag !== 'undefined') {
          gtag('event', 'video_play', {
            'event_category': 'engagement',
            'event_label': videoId
          });
        }
      });
    });
  }

  // Initialize YouTube facades
  initYouTubeFacade();

  // Hide skeleton loaders when content is ready
  function hideSkeletons() {
    const skeleton = document.getElementById('testimonialsSkeleton');
    const content = document.getElementById('testimonialsContent');

    if (skeleton && content) {
      // Wait for images to load
      const images = content.querySelectorAll('img');
      let loadedCount = 0;

      if (images.length === 0) {
        // No images, hide skeleton immediately
        skeleton.classList.add('hidden');
        content.classList.add('fade-in');
        return;
      }

      images.forEach(img => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', function() {
            loadedCount++;
            if (loadedCount === images.length) {
              skeleton.classList.add('hidden');
              content.classList.add('fade-in');
            }
          });
        }
      });

      if (loadedCount === images.length) {
        skeleton.classList.add('hidden');
        content.classList.add('fade-in');
      }

      // Fallback: hide after 3 seconds regardless
      setTimeout(function() {
        skeleton.classList.add('hidden');
        content.classList.add('fade-in');
      }, 3000);
    }
  }

  // Run after a short delay to let content render
  setTimeout(hideSkeletons, 100);

  // Animate rating bars when in view
  const ratingBars = document.querySelectorAll('.rating-bar-fill');
  if (ratingBars.length > 0) {
    const ratingObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          setTimeout(function() {
            bar.style.width = width + '%';
          }, 100);
          ratingObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    ratingBars.forEach(function(bar) {
      ratingObserver.observe(bar);
    });
  }

  // Social Proof Widgets
  // Live Visitor Counter
  const visitorCounter = document.getElementById('visitorCounter');
  const visitorCount = document.getElementById('visitorCount');

  if (visitorCounter && visitorCount) {
    // Generate random visitor count (8-24 range for realism)
    const baseCount = 8 + Math.floor(Math.random() * 17);
    let currentCount = 0;

    // Animate count up
    const countInterval = setInterval(function() {
      if (currentCount < baseCount) {
        currentCount++;
        visitorCount.textContent = currentCount;
      } else {
        clearInterval(countInterval);

        // Randomly fluctuate count every 10-30 seconds
        setInterval(function() {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newCount = Math.max(5, Math.min(30, currentCount + change));
          currentCount = newCount;
          visitorCount.textContent = currentCount;
        }, 10000 + Math.random() * 20000);
      }
    }, 50);
  }

  // Recent Booking Notifications
  const bookingNotification = document.getElementById('bookingNotification');
  const notificationClose = document.getElementById('notificationClose');
  const notificationName = document.getElementById('notificationName');
  const notificationAction = document.getElementById('notificationAction');
  const notificationTime = document.getElementById('notificationTime');
  const notificationAvatar = document.getElementById('notificationAvatar');

  if (bookingNotification && notificationClose) {
    const bookings = [
      { name: 'Sarah from Austin', action: 'just booked an installation', avatar: '👩', time: '2 minutes ago' },
      { name: 'Mike from Round Rock', action: 'just booked an installation', avatar: '👨', time: '5 minutes ago' },
      { name: 'Jessica from Cedar Park', action: 'just booked an installation', avatar: '👩', time: '8 minutes ago' },
      { name: 'David from Pflugerville', action: 'just booked an installation', avatar: '👨', time: '12 minutes ago' },
      { name: 'Emily from Georgetown', action: 'just booked an installation', avatar: '👩', time: '15 minutes ago' },
      { name: 'Chris from Leander', action: 'just checked compatibility', avatar: '👨', time: '3 minutes ago' },
      { name: 'Amanda from Lakeway', action: 'just viewed pricing', avatar: '👩', time: '6 minutes ago' },
      { name: 'Ryan from Dripping Springs', action: 'just booked an installation', avatar: '👨', time: '10 minutes ago' }
    ];

    let currentBookingIndex = 0;
    let notificationShown = false;

    function showBookingNotification() {
      const booking = bookings[currentBookingIndex];

      if (notificationName) notificationName.textContent = booking.name;
      if (notificationAction) notificationAction.textContent = booking.action;
      if (notificationTime) notificationTime.textContent = booking.time;
      if (notificationAvatar) notificationAvatar.textContent = booking.avatar;

      bookingNotification.classList.remove('hidden');
      notificationShown = true;

      // Auto-hide after 8 seconds
      setTimeout(function() {
        hideBookingNotification();
      }, 8000);

      // Move to next booking
      currentBookingIndex = (currentBookingIndex + 1) % bookings.length;
    }

    function hideBookingNotification() {
      bookingNotification.classList.add('hidden');
      notificationShown = false;
    }

    // Show first notification after 5 seconds
    setTimeout(function() {
      showBookingNotification();
    }, 5000);

    // Show subsequent notifications every 20-40 seconds
    setInterval(function() {
      if (!notificationShown) {
        showBookingNotification();
      }
    }, 20000 + Math.random() * 20000);

    // Close button handler
    notificationClose.addEventListener('click', function() {
      hideBookingNotification();

      // Track notification close
      if (typeof gtag !== 'undefined') {
        gtag('event', 'social_proof_closed', {
          'event_category': 'engagement',
          'event_label': 'booking_notification'
        });
      }
    });

    // Track notification shown
    bookingNotification.addEventListener('transitionend', function() {
      if (!bookingNotification.classList.contains('hidden') && typeof gtag !== 'undefined') {
        gtag('event', 'social_proof_shown', {
          'event_category': 'engagement',
          'event_label': 'booking_notification'
        });
      }
    });
  }
}); // End of DOMContentLoaded
