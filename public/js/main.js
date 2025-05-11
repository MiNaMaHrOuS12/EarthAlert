import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from "aos";
import "aos/dist/aos.css";

// init AOS animation
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        mirror: false
    });
});

