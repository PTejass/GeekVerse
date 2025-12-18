// Cart functionality
let cartCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Load cart count from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCount = savedCart.length;
    document.querySelector('.badge').textContent = cartCount;

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            // Get product details from the parent card
            const productCard = this.closest('.product');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price-tag').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            // Add to cart data
            const cartItem = {
                name: productName,
                price: productPrice,
                timestamp: new Date().getTime()
            };

            // Save to localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(cartItem);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update UI
            cartCount++;
            document.querySelector('.badge').textContent = cartCount;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#00b3d4';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });

    // Feedback form submission
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Generate feedback content
                const timestamp = new Date().toLocaleString();
                const feedbackContent = `
=====================================
        FEEDBACK SUBMISSION REPORT
=====================================

Date & Time: ${timestamp}

CUSTOMER DETAILS:
Name: ${name}
Email: ${email}

FEEDBACK MESSAGE:
${message}

=====================================
Thank you for your feedback!
GeekVerse Team
=====================================
                `.trim();

                // Download file
                downloadFile(feedbackContent, `GeekVerse_Feedback_${Date.now()}.txt`);
                
                alert('Thank you for your feedback, ' + name + '!\nYour feedback has been saved and downloaded.');
                this.reset();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Helper function to download file
function downloadFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}