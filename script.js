document.addEventListener('DOMContentLoaded', function() {

    // --- Sparkle and Heart Animations ---
    const sparkleContainer = document.getElementById('sparkle-container');
    const heartsContainer = document.querySelector('.hearts-container');

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.width = `${Math.random() * 3 + 1}px`;
        sparkle.style.height = sparkle.style.width;
        sparkle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 20000);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createSparkle, 500);
    setInterval(createHeart, 300);

    // --- Memories Carousel ---
    const slide = document.querySelector('.carousel-slide');
    const items = document.querySelectorAll('.memory-item');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    setInterval(() => nextBtn.click(), 5000);

    // --- Music Player ---
    const music = document.getElementById('our-song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    let hasInteracted = false;

    function togglePlay() {
        if (music.paused) {
            // The .play() method returns a Promise
            music.play().then(() => {
                playPauseBtn.textContent = 'Pause Song';
            }).catch(error => {
                // Autoplay was prevented.
                console.log("Playback prevented. User needs to interact with the page first.");
            });
        } else {
            music.pause();
            playPauseBtn.textContent = 'Play Our Song';
        }
    }
    
    // The button's main function is to toggle play/pause
    playPauseBtn.addEventListener('click', togglePlay);

    // A one-time event listener to try playing the song on the first user click anywhere on the page
    function playOnFirstInteraction() {
        if (!hasInteracted) {
            hasInteracted = true;
            togglePlay();
            // Remove the listener after the first interaction
            document.removeEventListener('click', playOnFirstInteraction);
        }
    }

    document.addEventListener('click', playOnFirstInteraction);
});