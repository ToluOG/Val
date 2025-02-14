// Initialize configuration
const config = window.VALENTINE_CONFIG;

function sayYes() {
    document.getElementById('yayMessage').style.display = 'block';
    setTimeout(() => {
        document.getElementById('yayMessage').style.display = 'none';
    }, 3000);
    for (let i = 0; i < 40; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.innerHTML = Math.random() > 0.5 ? '🧸' : '❤️';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}
function moveNoButton() {
    let noButton = document.getElementById('noButton');
    noButton.style.position = 'absolute';
    noButton.style.left = Math.random() * 80 + 'vw';
    noButton.style.top = Math.random() * 80 + 'vh';
}
// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
} 