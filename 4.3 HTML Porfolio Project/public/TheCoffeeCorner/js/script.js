/**
 * The Coffee Corner - Main JavaScript
 * =================================
 * This file handles all interactive functionality for The Coffee Corner website.
 * It includes form validation, notifications, gallery interactions, and more.
 * 
 * Features:
 * - Form validation (contact and catering forms)
 * - Custom notification system
 * - Image gallery lightbox
 * - Menu search functionality
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Image loading effects
 * 
 * Author: Kabelo Chabedi
 * Last Updated: November 3, 2025
 */

// Global Variables and Constants
// ----------------------------
// ------------------------
/**
 * Notification System
 * ------------------
 * A reusable notification component that displays messages to users.
 * Supports different types of notifications (success, error, info)
 * with customizable content and auto-dismiss functionality.
 * 
 * Features:
 * - Animated entrance/exit
 * - Different styles for success/error/info
 * - Auto-dismiss option (except for errors)
 * - Support for lists in message content
 * - Stacks multiple notifications
 * - Responsive design
 */
function showNotification(options) {
    const {title, message, type = 'success', duration = 5000, list = null} = options;
    
    // Create container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Build notification content
    notification.innerHTML = `
        <div class="notification-header">
            <h4 class="notification-title">${title}</h4>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
        <div class="notification-content">
            ${message}
            ${list ? `<ul class="notification-list">${list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        </div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Setup close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
            if (container.children.length === 0) {
                document.body.removeChild(container);
            }
        }, 300);
    });
    
    // Show notification
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto-dismiss after duration (if not an error)
    if (type !== 'error') {
        setTimeout(() => {
            if (notification.parentNode) { // Check if still in DOM
                closeBtn.click();
            }
        }, duration);
    }
    
    return notification;
}

/**
 * Main Event Listener
 * -----------------
 * Initializes all interactive features when the DOM is fully loaded.
 * This includes form validation, gallery functionality, and menu interactions.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Contact Form Validation
     * ---------------------
     * Handles the contact form submission and validation.
     * Validates:
     * - Name (min 2 characters)
     * - Email (proper format)
     * - Phone (optional, but must be valid if provided)
     * - Subject (required)
     * - Message (min 10 characters)
     */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (document.getElementById('contact-name') || {}).value?.trim() || '';
            const email = (document.getElementById('contact-email') || {}).value?.trim() || '';
            const phone = (document.getElementById('contact-phone') || {}).value?.trim() || '';
            const location = (document.getElementById('contact-location') || {}).value || '';
            const subject = (document.getElementById('contact-subject') || {}).value || '';
            const message = (document.getElementById('contact-message') || {}).value?.trim() || '';

            let isValid = true; let errors = [];
            if (name.length < 2) { errors.push('• Name must be at least 2 characters long'); isValid = false; }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) { errors.push('• Please enter a valid email address'); isValid = false; }
            if (phone) { const phonePattern = /^[\d\s\-\(\)\+]{10,15}$/; if (!phonePattern.test(phone)) { errors.push('• Phone number must be 10-15 digits'); isValid = false; } }
            if (!subject) { errors.push('• Please select a subject for your message'); isValid = false; }
            if (message.length < 10) { errors.push('• Message must be at least 10 characters long'); isValid = false; }

            if (!isValid) {
                showNotification({
                    title: '❌ Form Validation Error',
                    message: 'Please correct the following errors:',
                    type: 'error',
                    list: errors,
                    duration: 0 // Don't auto-dismiss error notifications
                });
                return;
            }

            const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nPreferred Location: ${location || 'Not specified'}\nSubject: ${subject}\n\nMessage:\n${message}`;
            const recipient = 'info@coffeecorner.co.za';
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent('Contact Form: ' + subject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
            
            showNotification({
                title: '✓ Message Ready to Send',
                message: `Thank you for your message, ${name}! Your email client will open to send the message. We will respond within 24 hours.`,
                type: 'success'
            });
            
            contactForm.reset();
        });
    }

    // CATERING ENQUIRY FORM
    const cateringForm = document.querySelector('.catering-form');
    if (cateringForm) {
        cateringForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (document.getElementById('name') || {}).value?.trim() || '';
            const email = (document.getElementById('email') || {}).value?.trim() || '';
            const phone = (document.getElementById('phone') || {}).value?.trim() || '';
            const eventType = (document.getElementById('event-type') || {}).value || '';
            const guests = parseInt((document.getElementById('guests') || {}).value || '0', 10) || 0;
            const date = (document.getElementById('date') || {}).value || '';
            const specialRequests = (document.getElementById('message') || {}).value?.trim() || '';

            let isValid = true; let errors = [];
            if (name.length < 2) { errors.push('• Name must be at least 2 characters long'); isValid = false; }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) { errors.push('• Please enter a valid email address'); isValid = false; }
            const phonePattern = /^[\d\s\-\(\)\+]{10,15}$/; if (!phonePattern.test(phone)) { errors.push('• Please enter a valid phone number (10-15 digits)'); isValid = false; }
            if (!eventType) { errors.push('• Please select an event type'); isValid = false; }
            if (!guests || guests < 10 || guests > 500) { errors.push('• Number of guests must be between 10 and 500'); isValid = false; }
            if (!date) { errors.push('• Please select a preferred date for your event'); isValid = false; } else { const selectedDate = new Date(date); const today = new Date(); today.setHours(0,0,0,0); if (selectedDate < today) { errors.push('• Please select a future date for your event'); isValid = false; } const daysUntilEvent = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24)); if (daysUntilEvent < 7) { errors.push('• We recommend booking at least 7 days in advance'); } }

            if (!isValid) {
                showNotification({
                    title: '❌ Form Validation Error',
                    message: 'Please correct the following errors:',
                    type: 'error',
                    list: errors,
                    duration: 0 // Don't auto-dismiss error notifications
                });
                return;
            }

            let costPerPerson = 150;
            if (eventType === 'wedding') costPerPerson = 250;
            else if (eventType === 'corporate') costPerPerson = 180;

            const totalCost = guests * costPerPerson;
            const formattedCost = 'R' + totalCost.toLocaleString();
            const selectedDate = new Date(date);
            const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // Show success notification with the summary
            showNotification({
                title: '✓ Catering Enquiry Confirmed',
                message: `
                    <p>Thank you for your enquiry, ${name}!</p>
                    <h4>Event Details</h4>
                    <ul>
                        <li>Event Type: ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</li>
                        <li>Number of Guests: ${guests}</li>
                        <li>Preferred Date: ${formattedDate}</li>
                    </ul>
                    <h4>Estimated Cost</h4>
                    <ul>
                        <li>Cost per Person: R${costPerPerson}</li>
                        <li>Total Estimate: ${formattedCost}</li>
                    </ul>
                    <h4>Availability</h4>
                    <p>Your selected date (${dayOfWeek}) is currently available!</p>
                    <h4>Next Steps</h4>
                    <p>Our catering team will contact you within 24 hours at:</p>
                    <ul>
                        <li>📧 ${email}</li>
                        <li>📞 ${phone}</li>
                    </ul>
                    <p>We will discuss:</p>
                    <ul>
                        <li>Menu customization options</li>
                        <li>Exact pricing and packages</li>
                        <li>Setup and delivery details</li>
                        ${specialRequests ? '<li>Your special requests</li>' : ''}
                    </ul>
                    <p><small>Note: This is an estimate only. Final pricing will be confirmed after consultation.</small></p>
                `,
                type: 'success',
                duration: 10000 // Show for 10 seconds due to content length
            });
            cateringForm.reset();
        });
    }

    /**
     * Gallery Lightbox
     * ---------------
     * Creates an interactive lightbox for gallery images.
     * Features:
     * - Image zoom on click
     * - Navigation between images
     * - Keyboard controls (left/right/escape)
     * - Image captions
     * - Responsive design
     * - Touch-friendly navigation
     */
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div'); lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" alt="Gallery image">
            <div class="lightbox-caption"></div>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        `;
        document.body.appendChild(lightbox);
        const lightboxImg = lightbox.querySelector('.lightbox-content');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentImageIndex = 0; const imagesArray = Array.from(galleryImages);
        function showLightboxImage(index) { const img = imagesArray[index]; lightboxImg.src = img.src; lightboxImg.alt = img.alt; lightboxCaption.textContent = img.alt || (img.parentElement && img.parentElement.querySelector('p') ? img.parentElement.querySelector('p').textContent : ''); }
        galleryImages.forEach((img, index) => { img.style.cursor = 'pointer'; img.addEventListener('click', function () { currentImageIndex = index; showLightboxImage(currentImageIndex); lightbox.style.display = 'flex'; document.body.style.overflow = 'hidden'; }); });
        closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; });
        lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; } });
        prevBtn.addEventListener('click', function () { currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length; showLightboxImage(currentImageIndex); });
        nextBtn.addEventListener('click', function () { currentImageIndex = (currentImageIndex + 1) % imagesArray.length; showLightboxImage(currentImageIndex); });
        document.addEventListener('keydown', function (e) { if (lightbox.style.display === 'flex') { if (e.key === 'ArrowLeft') prevBtn.click(); else if (e.key === 'ArrowRight') nextBtn.click(); else if (e.key === 'Escape') { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; } } });
    }

    // MENU SEARCH
    const menuPage = document.querySelector('.menu-category');
    if (menuPage) {
        const searchContainer = document.createElement('div'); searchContainer.className = 'menu-search-container';
        searchContainer.innerHTML = `\n            <input type="text" id="menu-search" class="menu-search-input" placeholder="🔍 Search menu items...">\n            <p class="search-results-count"></p>\n        `;
        const mainContent = document.querySelector('main h1'); if (mainContent) mainContent.after(searchContainer);
        const searchInput = document.getElementById('menu-search'); const searchResultsCount = document.querySelector('.search-results-count'); const menuCategories = document.querySelectorAll('.menu-category');
        searchInput.addEventListener('input', function () { const searchTerm = this.value.toLowerCase().trim(); let visibleCount = 0; menuCategories.forEach(category => { const categoryItems = category.querySelectorAll('.menu-item'); let categoryHasVisibleItems = false; categoryItems.forEach(item => { const titleEl = item.querySelector('h3'); const descEl = item.querySelector('p'); const title = titleEl ? titleEl.textContent.toLowerCase() : ''; const description = descEl ? descEl.textContent.toLowerCase() : ''; if (title.includes(searchTerm) || description.includes(searchTerm)) { item.style.display = 'flex'; visibleCount++; categoryHasVisibleItems = true; } else { item.style.display = 'none'; } }); if (categoryHasVisibleItems || searchTerm === '') category.style.display = 'block'; else category.style.display = 'none'; }); if (searchTerm === '') searchResultsCount.textContent = ''; else if (visibleCount === 0) { searchResultsCount.textContent = '❌ No menu items found'; searchResultsCount.style.color = '#c0392b'; } else { searchResultsCount.textContent = `✓ Found ${visibleCount} item${visibleCount !== 1 ? 's' : ''}`; searchResultsCount.style.color = '#27ae60'; } });
    }

    // MOBILE MENU TOGGLE
    const nav = document.querySelector('nav'); if (nav && window.innerWidth <= 768) { const menuButton = document.createElement('button'); menuButton.className = 'mobile-menu-toggle'; menuButton.innerHTML = '☰ Menu'; menuButton.setAttribute('aria-label', 'Toggle navigation menu'); const header = document.querySelector('header'); if (header) header.insertBefore(menuButton, nav); menuButton.addEventListener('click', function () { nav.classList.toggle('mobile-active'); this.classList.toggle('active'); this.innerHTML = nav.classList.contains('mobile-active') ? '✕ Close' : '☰ Menu'; }); }

    // SMOOTH SCROLL
    const anchorLinks = document.querySelectorAll('a[href^="#"]'); anchorLinks.forEach(link => { link.addEventListener('click', function (e) { const href = this.getAttribute('href'); if (href !== '#' && href.length > 1) { e.preventDefault(); const target = document.querySelector(href); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }); });

    // IMAGE LOAD EFFECT
    const images = document.querySelectorAll('img'); images.forEach(img => { if (img.complete) { img.style.opacity = '1'; } else { img.addEventListener('load', function () { this.style.opacity = '1'; this.style.transition = 'opacity 0.5s ease-in'; }); img.style.opacity = '0'; } });

    // MAP PLACEHOLDER
    initializeMap();
});

function initializeMap() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.cursor = 'pointer';
        // Provide a direct link to Google Maps for the main Gardens location.
        mapPlaceholder.setAttribute('title', 'Open Coffee Corner locations in Google Maps');
        mapPlaceholder.addEventListener('click', function () {
            const query = encodeURIComponent('The Coffee Corner, 123 Coffee Street, Gardens, Cape Town');
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + query;
            window.open(mapsUrl, '_blank');
        });
    }
}

/* NOTE:
   A Google Maps iframe is embedded in `contact.html` (class: `.map-embed`).
   The placeholder above remains as a semantic/fallback element and also
   provides a direct link that opens Google Maps in a new tab. The iframe
   uses the simple embed query (no API key required). If later you decide
   to use the Google Maps JavaScript API (for markers or advanced control),
   you will need an API key and billing enabled — please add the key in a
   secure server-side config or an environment variable. When citing the
   Maps API/key, follow project citation standards (see README).
*/