# The Coffee Corner Website

Student Information
- Name: Kabuya Tambwe Josue
- Student Number: ST10468057
- Course: WEB DEVELOPMENT - WEDE5020
- Module: WEDE5020/p/w

## Project Overview
This project involves designing and developing a responsive website for The Coffee Corner, a local café in Cape Town. The website aims to establish a strong online presence, showcase their menu and atmosphere, and facilitate customer engagement through catering enquiries.

## Website Goals and Objectives
- Increase online visibility and brand awareness in the local community
- Provide easy access to menu, pricing, and operating hours
- Generate catering service enquiries through an online form
- Showcase the café's atmosphere through a professional gallery
- Improve customer engagement and service accessibility

## Key Features and Functionality
- Fully responsive design optimized for mobile and desktop devices
- Online menu with categories (Coffee, Pastries, Sandwiches)
- Professional photo gallery showcasing café ambiance and products
- Catering enquiry form with validation
- Contact information with location details
- Semantic HTML5 structure for better SEO

## Timeline and Milestones
- Part 1 (Week 1): Project Planning, HTML Structure & Basic Content
- Part 2 (Week 2): CSS Styling & Responsive Design Implementation
- Part 3 (Week 3): JavaScript Functionality & SEO Optimization

## Sitemap
- Homepage (`index.html`)  
- About Us (`about.html`)  
- Menu (`menu.html`)  
- Gallery (`gallery.html`)  
- Catering Enquiry (`enquiry.html`)  
- Contact Us (`contact.html`)

---

## Part 1 Details
- Completed two comprehensive project proposals
- Established proper file and folder structure
- Created semantic HTML5 structure for all 6 pages
- Implemented consistent navigation across all pages
- Added relevant content for each page section
- Set up GitHub repository with initial commit

## Changelog (original)
### Part 1 Initial Submission (2025-08-26)
- Created basic HTML structure for all 6 pages
- Added navigation menu to all pages
- Added placeholder content to menu and about pages

### Part 1 Corrections (2025-10-01)
- Fixed README.md structure with comprehensive details
- Added proper semantic HTML elements (header, nav, main, section, footer)
- Improved content quality and relevance across all pages
- Added proper image alt text and descriptions
- Enhanced menu page with detailed product listings
- Updated references with proper Harvard formatting
- Fixed HTML validation issues and improved code comments

### Part 2 Implementation (2025-10-01)
- Created external CSS stylesheet (`css/style.css`)
- Implemented responsive design with media queries
- Added desktop styling for all pages
- Created mobile-responsive navigation
- Added hover effects and interactive elements
- Tested cross-browser compatibility

---

## Part 3 — JavaScript & SEO Changes (2025-11-03)
This section documents the changes made in Part 3 to show the lecturer and hallow him to clearly track how the project evolved through the assignment stages.

### Summary of Part 3 changes
- Replaced and cleaned `js/script.js` to fix syntax issues and consolidate site logic into a single, maintainable file.
  - Contact form validation (client-side) with basic checks and mailto composition.
  - Catering enquiry form validation with guest limits, date checks and a simple cost estimate calculation.
  - Gallery lightbox with previous/next controls and keyboard navigation.
  - Menu search injection for quick client-side filtering of menu items.
  - Mobile navigation toggle for small screens.
  - Smooth scroll for anchor links.
  - Image load fade-in effects.
  - Map placeholder behavior that opens Google Maps in a new tab (kept as fallback).

- Appended and updated `css/style.css` with Part 3 styles, including:
  - Lightbox styles for the gallery.
  - Styles for the injected menu search input and results.
  - Mobile menu toggle styles and responsive adjustments.
  - Theme variables for a chocolate palette (CSS custom properties) and several visual polish updates (buttons, hero, shadows).
  - Responsive map iframe wrapper styles (for embedded Google Maps).

- Fixed content and asset issues:
  - Corrected gallery image file paths to match the actual files in the `images/` folder so images load correctly.

- SEO & technical files:
  - Added `robots.txt` and `sitemap.xml` to the project root.
  - Updated the `<head>` of each HTML page to include page-specific title, meta description, Open Graph tags and a deferred script include for `js/script.js`.

- Map embed:
  - Added an interactive Google Maps iframe to `contact.html` using a simple embed query (no API key required). The original `.map-placeholder` element remains in the page as a semantic/fallback element that also opens Google Maps in a new tab when clicked.
  - Harvard-style citation added to `README.md` and a short HTML comment near the iframe for reference.

- Documentation & comments:
  - Added clarifying comments in `js/script.js` around the map and other sections during the cleanup. Further in-file comments can be added on request.

### Files added / modified in Part 3
- Modified: `js/script.js` — full replacement/cleanup and new features as listed above.
- Modified: `css/style.css` — appended Part 3 styles and theme variables.
- Modified: `index.html`, `about.html`, `menu.html`, `gallery.html`, `enquiry.html`, `contact.html` — updated `<head>` sections for SEO and added script include; `contact.html` also received the embedded map iframe.
- Added: `robots.txt`, `sitemap.xml`.
- Modified: `gallery.html` — corrected image filenames to match the `images/` folder.
- Modified: `README.md` — this file was updated to include the Part 3 changelog (this section).

---

## How to run locally
1. Open the project folder in your code editor (e.g., VS Code).
2. Open any of the `.html` files in a browser (double-click or use "Open With Live Server" if you use that extension).
3. The site is static — no server is required for basic usage. For the mailto flows, an email client must be configured on the machine for `mailto:` links to open properly.

Optional: to serve via a simple local server (recommended for testing):

PowerShell (Windows):

```powershell
# from the project root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or, if you have Node.js installed (simple http-server):

```powershell
npm install -g http-server
http-server -p 8000
# then open http://localhost:8000
```

## Notes / Next steps (recommended)
- Replace alert() calls with in-page, styled notifications for improved UX. This was left as alerts to ensure simple validation behavior during rapid development.
- If you require interactive maps with multiple markers or custom behaviour, switch to the Google Maps JavaScript API — this requires an API key and billing enabled. Store any API key securely (do not commit to the repository).
- Consider adding a server-side endpoint for sending contact/catering messages instead of relying on `mailto:`.
- Continue adding human-style comments to all files if you want the project to appear fully hand-documented.

## References
- Project Research
  - Coolors.co. (2024). Coffee Brown Color Palette. [Online] Available at: https://coolors.co/palette/6f4e37-f5f5dc-2e8b57 (Accessed: 20 March 2025).
  - Google Fonts. (2024). Merriweather and Open Sans Fonts. [Online] Available at: https://fonts.google.com/ (Accessed: 20 March 2025).

- Web Development Resources
  - W3Schools. (2025). HTML, CSS and JavaScript Tutorials. [Online] Available at: https://www.w3schools.com (Accessed: 20 March 2025).
  - MDN Web Docs. (2025). HTML, CSS and JavaScript Reference. [Online] Available at: https://developer.mozilla.org/en-US (Accessed: 20 March 2025).

- Image Sources (For Future Use)
  - Pexels. (2024). Stock Photography. [Online] Available at: https://www.pexels.com/ (Accessed: 20 March 2025).
  - Unsplash. (2024). Free High-Resolution Photos. [Online] Available at: https://unsplash.com/ (Accessed: 20 March 2025).

- Google LLC (2025) Google Maps — used for embedded map (see citation below)

### Citation (Harvard style)
Google LLC (2025) Google Maps [online]. Available at: https://maps.google.com (Accessed: 3 November 2025).

---

_Prepared by Kabuya Tambwe Josue — ST10468057_
