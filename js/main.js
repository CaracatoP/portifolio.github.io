document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 80) {
                element.classList.add("active");
            }
        });
    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
});