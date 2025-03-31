// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const resultDiv = document.getElementById('result');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData(contactForm);
            
            // Submit form using fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                if (data.success) {
                    resultDiv.innerHTML = 'Thank you for your message! I will get back to you soon.';
                    resultDiv.className = 'form-result success';
                    contactForm.reset();
                } else {
                    // Handle error
                    resultDiv.innerHTML = 'Something went wrong. Please try again later.';
                    resultDiv.className = 'form-result error';
                }
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Scroll to result
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide result after 5 seconds
                setTimeout(() => {
                    resultDiv.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                resultDiv.innerHTML = 'Something went wrong. Please try again later.';
                resultDiv.className = 'form-result error';
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Form input animation
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});