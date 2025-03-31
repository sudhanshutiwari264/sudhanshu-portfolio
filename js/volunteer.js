// Volunteer Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get tab value and activate corresponding pane
            const tabValue = button.getAttribute('data-tab');
            document.getElementById(`${tabValue}-tab`).classList.add('active');
        });
    });
    
    // Animate volunteer items on scroll
    const animateVolunteerItems = () => {
        const items = document.querySelectorAll('.volunteer-item');
        
        items.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'all 0.5s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateVolunteerItems);
    
    // Run animation on page load
    setTimeout(animateVolunteerItems, 300);
});