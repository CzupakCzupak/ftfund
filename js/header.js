// Hamburger
const hamburger = document.querySelector(".hamburger-js");
const nav = document.querySelector(".nav-js");
const dropdownNav = document.querySelector(".dropdown-js");
const anchors = document.querySelectorAll("a[href]");
const hamburgerShadow = document.querySelector(".header__shadow");
const header = document.querySelector(".header");

const hamburgerToggle = () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    dropdownNav.classList.remove("active");
    if (hamburger.classList.contains("active")) {
        hamburgerShadow.classList.add("active");
    } else {
        hamburgerShadow.classList.remove("active");
    }
};

const hamburgerRemove = () => {
    dropdownNav.classList.remove("active");
    hamburgerShadow.classList.remove("active");
    hamburger.classList.remove("active");
    nav.classList.remove("active");
};

anchors.forEach((item) =>
    item.addEventListener("click", () => {
        hamburgerRemove();
    })
);

hamburgerShadow.addEventListener("click", hamburgerToggle);
hamburger.addEventListener("click", hamburgerToggle);

dropdownNav.addEventListener("click", () => {
    if (window.innerWidth < 1200) {
        dropdownNav.classList.toggle("active");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1200) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        hamburgerShadow.classList.remove("active");
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY == 0) {
        header.classList.remove("header__scroll");
    } else {
        header.classList.add("header__scroll");
    }
});
