// Hero slider
const circleLeft = document.querySelector(".circle__left-js"),
    circleRight = document.querySelector(".circle__right-js"),
    spinningHero = document.querySelector(".spinning__hero-js"),
    heroImgs = document.querySelectorAll(".hero__swap-js"),
    heroTexts = document.querySelectorAll(".hero__text-js"),
    paginationContainer = document.querySelector(".hero__pagination-js");

heroTexts.forEach((item) => {
    if (item.dataset.text == 0) {
        item.style.maxHeight = `${item.scrollHeight}px`;
    } else {
        item.style.maxHeight = 0;
    }
});

const paginationControls = () => {
    for (i = 0; i < heroImgs.length; i++) {
        const page = document.createElement("div");
        page.classList.add("hero__page-js");
        page.classList.add("hero__page");
        page.dataset.page = i;
        if (page.dataset.page == 0) {
            page.classList.add("active");
        }
        paginationContainer.appendChild(page);
    }
};

paginationControls();

const slide = () => {
    const activeText = document.querySelector(".hero__text-js.active");
    const activeSlide = document.querySelector(".hero__swap-js.active");
    const activePagination = document.querySelector(".hero__page-js.active");
    let nextSlideNumb = +activeSlide.dataset.numb + +1;
    let nextTextNumb = +activeText.dataset.text + +1;
    let nextPaginationNumb = +activePagination.dataset.page + +1;
    if (nextSlideNumb == heroImgs.length) {
        nextSlideNumb = 0;
        nextTextNumb = 0;
        nextPaginationNumb = 0;
    }
    const nextSlide = document.querySelector(`[data-numb="${nextSlideNumb}"]`);
    const nextText = document.querySelector(`[data-text="${nextTextNumb}"]`);
    const nextPagination = document.querySelector(
        `[data-page="${nextPaginationNumb}"]`
    );
    activePagination.classList.toggle("active");
    activeText.classList.toggle("active");
    activeText.style.maxHeight = 0;
    activeSlide.classList.toggle("active");

    nextPagination.classList.toggle("active");
    nextText.classList.toggle("active");
    nextText.style.maxHeight = `${nextText.scrollHeight}px`;
    nextSlide.classList.toggle("active");

    circleLeft.classList.toggle("active");
    circleRight.classList.toggle("active");
    spinningHero.classList.toggle("active");
};

const pages = document.querySelectorAll(".hero__page-js");

const pagination = (e) => {
    const activeText = document.querySelector(".hero__text-js.active");
    const activeSlide = document.querySelector(".hero__swap-js.active");
    const activePagination = document.querySelector(".hero__page-js.active");

    activeText.classList.toggle("active");
    activeText.style.maxHeight = 0;

    activeSlide.classList.toggle("active");
    activePagination.classList.toggle("active");

    const nextPagination = e.target.closest(".hero__page-js");
    const nextNumb = nextPagination.dataset.page;
    const nextSlide = document.querySelector(`[data-numb="${nextNumb}"]`);
    const nextText = document.querySelector(`[data-text="${nextNumb}"]`);

    if (parseInt(nextNumb) % 2 == 0) {
        circleRight.classList.remove("active");
        circleLeft.classList.remove("active");
        spinningHero.classList.remove("active");
    } else {
        circleRight.classList.add("active");
        circleLeft.classList.add("active");
        spinningHero.classList.add("active");
    }

    nextText.style.maxHeight = `${nextText.scrollHeight}px`;
    nextSlide.classList.toggle("active");
    nextText.classList.toggle("active");
    nextPagination.classList.toggle("active");

    clearInterval(myInterval);
    myInterval = setInterval(slide, 3000);
};

pages.forEach((item) => {
    item.addEventListener("click", pagination);
});

let myInterval = setInterval(slide, 3000);

// Cta form
const ctaDropdown = document.querySelector(".cta__dropdown");
const dropdownValue = document.querySelector(".dropdown-value");
const hiddenDropdown = document.querySelector('input[name="dropdown"]');

document.addEventListener("click", (e) => {
    if (
        !e.target.closest(".cta-option") &&
        !e.target.closest(".cta__dropdown")
    ) {
        ctaDropdown.classList.remove("active");
    }
});

ctaDropdown.addEventListener("click", (e) => {
    ctaDropdown.classList.toggle("active");
    const clickedBtn = e.target.closest(".cta-option");
    if (clickedBtn) {
        dropdownValue.textContent = clickedBtn.textContent;
        hiddenDropdown.value = clickedBtn.textContent;
    }
});

// Splide
new Splide(".stats__splide", {
    mediaQuery: "max",
    type: "slide",
    fixedWidth: 369,
    gap: "-16px",
    drag: false,
    breakpoints: {
        1440: {
            drag: true,
        },
        640: {
            fixedWidth: 177,
            fixedHeight: 177,
        },
    },
}).mount();
new Splide(".opinions__splide", {
    //   arrows: false,
    pagination: false,
    gap: "32px",
    mediaQuery: "max",
    perMove: 3,

    breakpoints: {
        1300: {
            perpage: 3,
        },
        1100: {
            perMove: 2,
            perpage: 2,
        },
        640: {
            perMove: 1,
            perpage: 1,
            arrows: false,
        },
    },
}).mount();

// FORM VALIDATION

const submitCta = document.querySelector(".cta__submit"),
    regExMail = document.querySelector(".reg__ex-email-js"),
    regExName = document.querySelector(".reg__ex-name-js"),
    regExPhone = document.querySelector(".reg__ex-phone-js"),
    regExArea = document.querySelector(".reg__ex-textarea"),
    checkbox = document.querySelector(".cta__checkbox-js"),
    ctaForm = document.querySelector(".cta__form-js");

submitCta.addEventListener("click", (e) => {
    let controlValue = 0;
    // Name and Surname validation

    const nameParent = regExName.closest(".reg__ex-parent-js");
    if (regExName.value.length > 0) {
        right(nameParent);
        controlValue++;
    } else {
        wrong(nameParent);
    }

    // Mail validation

    const mailParent = regExMail.closest(".reg__ex-parent-js");
    let mailCorrect = false;
    if (
        String(regExMail.value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        right(mailParent);
        controlValue++;
    } else {
        wrong(mailParent);
        e.preventDefault();
    }

    // Phone validation
    let phoneFlag = false;
    const phoneParent = regExPhone.closest(".reg__ex-parent-js");
    if (regExPhone.value != "") {
        if (
            String(regExPhone.value)
                .toLowerCase()
                .match(/^[0-9]{9}$/)
        ) {
            right(phoneParent);
            phoneFlag = true;
            controlValue++;
        } else {
            wrong(phoneParent);
            e.preventDefault();
        }
    } else {
        phoneParent.classList.remove("right");
        phoneParent.classList.remove("wrong");
        phoneParent.querySelector(".reg__ex-wrong").style.maxHeight = 0;
    }

    // Message validation

    const textareaParent = regExArea.closest(".reg__ex-parent-js");

    if (regExArea.value.length >= 2) {
        right(textareaParent);
        controlValue++;
    } else {
        wrong(textareaParent);
        e.preventDefault();
    }

    // Consent validation

    const checkboxParent = checkbox.closest(".checkbox__parent-js");

    if (checkbox.checked) {
        right(checkboxParent);
        controlValue++;
    } else {
        wrong(checkboxParent);
        e.preventDefault();
    }

    if (controlValue == 4 && phoneFlag == false) {
        playAnimation();
        ctaForm.reset();
        delChecks();
        e.preventDefault();
    } else if (controlValue == 5) {
        playAnimation();
        ctaForm.reset();
        delChecks();
        e.preventDefault();
    }
});

const animation = document.querySelector(".popup__container"),
    popupExit = document.querySelector(".popup__exit");

popupExit.addEventListener("click", () => {
    animation.classList.remove("active");
});

const playAnimation = () => {
    animation.classList.add("active");
    animation.style.maxHeight = "100vh";
};

const right = (parent) => {
    const wrongAnswer = parent.querySelector(".reg__ex-wrong");
    wrongAnswer.style.maxHeight = 0;
    parent.classList.add("right");
    parent.classList.remove("wrong");
};

const wrong = (parent) => {
    const wrongAnswer = parent.querySelector(".reg__ex-wrong");
    wrongAnswer.style.maxHeight = `${wrongAnswer.scrollHeight}px`;
    parent.classList.add("wrong");
    parent.classList.remove("right");
};

const delChecks = () => {
    const regParents = document.querySelectorAll(".reg__ex-parent-js");
    const checkboxReset = document.querySelector(".checkbox__custom-js");
    regParents.forEach((item) => {
        item.classList.remove("right");
    });
    checkboxReset.classList.remove("active");
    checkboxReset.checked = false;
};

const customCheckbox = document.querySelector(".checkbox__custom-js"),
    ctaCheckbox = document.querySelector(".cta__checkbox-js"),
    labelCheckbox = document.querySelector(".cta__consent-js");

const toggleCheckbox = () => {
    customCheckbox.classList.toggle("active");
    if (customCheckbox.classList.contains("active")) {
        ctaCheckbox.checked = true;
    } else {
        ctaCheckbox.checked = false;
    }
};

customCheckbox.addEventListener("click", toggleCheckbox);
labelCheckbox.addEventListener("click", toggleCheckbox);
