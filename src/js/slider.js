let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
    // Reset to the first slide if we go past the last one
    if (index >= totalSlides) {
        currentIndex = 0;
    }
    // Go to the last slide if we go before the first one
    else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    // Move the slider to the correct position
    document.querySelector(".slider").style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);