// Function to handle scroll behavior
function scrollFunction() {
    let e = window.innerWidth;
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30 && e > 991) {
        document.getElementById("navbar").classList.add("top-nav-collapse");
    } else {
        document.getElementById("navbar").classList.remove("top-nav-collapse");
    }
}

// Observe changes in the #navbar element's class list
const navbar = document.getElementById("navbar");
const config = { attributes: true, attributeFilter: ["class"] };

const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
            console.log(`Navbar class changed to: ${navbar.className}`);
            // Add additional logic here if needed
        }
    }
};

const observer = new MutationObserver(callback);
if (navbar) {
    observer.observe(navbar, config);
}

window.addEventListener('scroll', () => {
    scrollFunction();
    scrollFunctionBTT();
});

document.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelector(".offcanvas-collapse").classList.toggle("open");
    });
});

function toggleDropdown(e) {
    let dropdown = e.target.closest(".dropdown");
    let menu = document.querySelector(".dropdown-menu", dropdown);
    setTimeout(() => {
        let isHover = dropdown.matches(":hover");
        menu.classList.toggle("show", isHover);
        dropdown.classList.toggle("show", isHover);
        dropdown.setAttribute("aria-expanded", isHover);
    }, e.type === "mouseleave" ? 300 : 0);
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
    document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

const dropdownCheck = document.querySelector(".dropdown");
if (dropdownCheck) {
    dropdownCheck.addEventListener("mouseleave", toggleDropdown);
    dropdownCheck.addEventListener("mouseover", toggleDropdown);
    dropdownCheck.addEventListener("click", (e) => {
        let dropdown = e.target.closest(".dropdown");
        let menu = document.querySelector(".dropdown-menu", dropdown);
        dropdown.classList.toggle("show");
        menu.classList.toggle("show");
    });
}

const cardSlider = new Swiper(".card-slider", {
    autoplay: { delay: 4000, disableOnInteraction: false },
    loop: true,
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    slidesPerView: 3,
    spaceBetween: 70,
    breakpoints: { 767: { slidesPerView: 1 }, 991: { slidesPerView: 2, spaceBetween: 40 } },
});

function scrollFunctionBTT() {
    myButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const myButton = document.getElementById("myBtn");

AOS.init({ duration: 1000, easing: "ease", once: true });

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    fetch("contact.php", { method: "POST", body: formData })
        .then(response => response.text())
        .then(() => {
            alert("Message sent successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was a problem with the submission.");
        });
});

window.fnames = ["EMAIL"];
window.ftypes = ["email"];
var $mcj = jQuery.noConflict(true);
