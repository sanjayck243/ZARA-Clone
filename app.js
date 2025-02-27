document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        fetch('/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            form.reset();
        })
        .catch(error => {
            alert('Error sending message.');
            console.error('Error:', error);
        });
    });

    // Card transition
    const container = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const offset = -(index * (card.clientWidth + 20)); // Adjust the 20 to match the card gap
            container.style.transform = `translateX(${offset}px)`;
        });
    });
});
