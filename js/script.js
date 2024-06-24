new Splide(".similar-splide", {
    perPage: 3,
    gap: 32,
    pagination: false,
    drag: false,
    breakpoints: {
        1100: { perPage: 2, drag: true },
        640: { perPage: 1 },
    },
}).mount();
