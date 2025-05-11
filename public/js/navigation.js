document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.links ul li a');
    
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove any existing active classes
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if the link's href matches the current path
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        }
        
        // Special case for index.html
        if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
            if (linkPath.endsWith('index.html') || linkPath === '/') {
                link.classList.add('active');
            }
        }
    });
}); 