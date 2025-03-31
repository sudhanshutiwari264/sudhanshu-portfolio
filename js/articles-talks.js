// Articles & Talks Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and content cards
    const filterButtons = document.querySelectorAll('.content-tab');
    const contentCards = document.querySelectorAll('.content-card');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter content cards
            contentCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-type') === filterValue) {
                        card.style.display = 'flex';
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
                }
            });
        });
    });
    
    // Initialize with all items visible
    filterButtons[0].click();
    
    // Add animation to cards on page load
    contentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});