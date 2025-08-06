const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const toggleNavbar = function () {
  if (navbar) {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  } else {
    console.error("Navbar not found!");
  }
};

navTogglers.forEach(toggler => {
  toggler.addEventListener("click", toggleNavbar);
});

window.addEventListener("scroll", function () {
  if (backTopBtn) {
    if (window.scrollY > 100) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  } else {
    console.error("Back to top button not found!");
  }
});

// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  const sliderInner = document.querySelector(".slider-inner");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const sliderItems = document.querySelectorAll(".slider-item");
  const totalItems = sliderItems.length;
  let currentIndex = 0;

  if (!sliderInner || !prevBtn || !nextBtn || totalItems === 0) {
    console.error("Slider elements not found:", {
      sliderInner: !!sliderInner,
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      totalItems
    });
    return;
  }

  function updateSlider() {
    // Calculate visible items based on screen width
    const isMobile = window.innerWidth < 768;
    const visibleItems = isMobile ? 1 : 3;
    const maxIndex = totalItems - visibleItems;

    // Ensure currentIndex stays within bounds
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    // Calculate slide width as a percentage
    const slideWidth = 100 / visibleItems;
    sliderInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    console.log("Slider updated:", { currentIndex, visibleItems, transform: sliderInner.style.transform });
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    } else {
      console.log("Cannot slide left: at first item");
    }
  });

  nextBtn.addEventListener("click", () => {
    const isMobile = window.innerWidth < 768;
    const visibleItems = isMobile ? 1 : 3;
    if (currentIndex < totalItems - visibleItems) {
      currentIndex++;
      updateSlider();
    } else {
      console.log("Cannot slide right: at last item(s)");
    }
  });

  // Update slider on window resize to adjust for responsive changes
  window.addEventListener("resize", updateSlider);

  // Initialize slider
  updateSlider();
});
