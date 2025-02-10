document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a"); 

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetPage = this.getAttribute("data-page"); 
            window.location.href = targetPage; 
        });
    });
});
