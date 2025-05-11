// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu");
    const links = document.querySelector(".links");
  
    if (menuIcon && links) {
        menuIcon.addEventListener("click", () => {
            links.classList.toggle("show");
        });
    }
}); 