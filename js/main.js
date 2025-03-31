/*
 * Main JavaScript for Sudhanshu Tiwari's Portfolio
 * Handles interactive elements, animations, and functionality
 * Inspired by Liran Tal's website and Emma Bostian's developer portfolios collection
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const backToTop = document.querySelector('.back-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const feedTabs = document.querySelectorAll('.feed-tab');
    const feedPanels = document.querySelectorAll('.feed-panel');
    const loading = document.getElementById('loading');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        // Save theme preference to localStorage - shared with contact page
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // If we're using Tailwind dark mode on this page too
        if (document.documentElement.classList.contains('dark') !== !isLight) {
            document.documentElement.classList.toggle('dark');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        // Also handle Tailwind dark mode if present
        document.documentElement.classList.remove('dark');
    } else {
        // Ensure dark mode is applied for Tailwind if present
        document.documentElement.classList.add('dark');
    }

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow)';
            header.style.height = '60px';
            backToTop.classList.add('active');
        } else {
            header.style.boxShadow = 'none';
            header.style.height = 'var(--header-height)';
            backToTop.classList.remove('active');
        }

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Skills Tabs
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding tab pane
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // Project Filtering
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            contactForm.reset();
        });
    }

    // Social Feed Tabs
    if (feedTabs.length > 0 && feedPanels.length > 0) {
        feedTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                feedTabs.forEach(t => t.classList.remove('active'));
                feedPanels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding feed panel
                const feedId = tab.getAttribute('data-feed');
                document.getElementById(`${feedId}-feed`).classList.add('active');
            });
        });
    }

    // Recommendations section - external link for more recommendations

    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-card, .skill-card, .tech-category, .soft-skill, .event-card, .timeline-content, .recommendation-cardtion-card, .blog-card, .speaking-item, .contact-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.about-card, .skill-card, .tech-category, .soft-skill, .event-card, .timeline-content, .recommendation-card, .blog-card, .speaking-item, .contact-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Run animation on initial load
    setTimeout(animateOnScroll, 500);

    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Uncomment to enable typing effect
        // typeWriter();
    }

    // Loading Animation
    if (loading) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Scroll Progress Indicator
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const windowScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (windowScroll / windowHeight) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });
    }

    // Animate blobs on scroll
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length > 0) {
        window.addEventListener('scroll', () => {
            blobs.forEach(blob => {
                const blobTop = blob.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (blobTop < windowHeight * 1.2 && blobTop > -windowHeight * 0.5) {
                    const scrollPosition = window.scrollY;
                    const translateY = scrollPosition * 0.05;
                    const translateX = Math.sin(scrollPosition * 0.001) * 30;
                    blob.style.transform = `translate(${translateX}px, ${translateY}px)`;
                }
            });
        });
    }
});