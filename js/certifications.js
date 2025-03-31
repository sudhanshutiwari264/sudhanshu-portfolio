// Certifications Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter cards
            certificationCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const categories = card.getAttribute('data-categories').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Load More functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const certificationsGrid = document.querySelector('.certifications-grid');
    
    if (loadMoreBtn && certificationsGrid) {
        loadMoreBtn.addEventListener('click', () => {
            certificationsGrid.classList.toggle('show-all');
            
            if (certificationsGrid.classList.contains('show-all')) {
                loadMoreBtn.querySelector('span').textContent = 'Show Less';
                loadMoreBtn.classList.add('active');
            } else {
                loadMoreBtn.querySelector('span').textContent = 'Load More Certifications';
                loadMoreBtn.classList.remove('active');
                
                // Scroll back to certifications section
                document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add animation to certification cards
    const animateCertifications = () => {
        const cards = document.querySelectorAll('.certification-card');
        
        cards.forEach((card, index) => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateCertifications);
    
    // Run animation on page load
    animateCertifications();
});