const giftBox = document.getElementById('giftBox');
const giftMsg = document.getElementById('giftMsg');
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const bgMusic = document.getElementById('bgMusic');

giftBox.addEventListener('click', () => {
  giftMsg.style.display = 'block';
  giftMsg.classList.add('neon-border');
  // Animate the heart emoji
  const heart = giftBox.querySelector('.emoji');
  if (heart) {
    heart.style.transform = 'scale(1.7) rotate(-10deg)';
    heart.style.transition = 'transform 0.3s cubic-bezier(.7,-0.2,.6,1.5)';
    setTimeout(() => {
      heart.style.transform = 'scale(1) rotate(0deg)';
    }, 650);
  }
});

nextBtn.addEventListener('click', () => {
  window.location.href = 'page4.html';
});

backBtn.addEventListener('click', () => {
  window.location.href = 'page2.html';
});

// Optionally play background music
bgMusic.play();
// Mobile audio unlock
window.onload = () => {
  document.body.addEventListener('touchstart', () => {
    bgMusic.play();
    bgMusic.pause();
  }, { once: true });
};
