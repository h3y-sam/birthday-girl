const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const bgMusic = document.getElementById('bgMusic');

// Sparkle & hearts animation for gallery
let gallerySparkleTimer = null;
function startGallerySparkles() {
  const overlay = document.querySelector('.sparkle-overlay');
  const hearts = document.querySelector('.floating-hearts');
  if (!overlay || !hearts) return;
  overlay.innerHTML = '';
  hearts.innerHTML = '';
  // Sparkles
  for (let i = 0; i < 12; i++) {
    setTimeout(() => makeSparkle(overlay), i * 120);
  }
  // Floating hearts
  for (let i = 0; i < 8; i++) {
    setTimeout(() => makeFloatingHeart(hearts), i * 250 + 300);
  }
  gallerySparkleTimer = setInterval(() => {
    makeSparkle(overlay);
    makeFloatingHeart(hearts);
  }, 800);
}
function stopGallerySparkles() {
  const overlay = document.querySelector('.sparkle-overlay');
  const hearts = document.querySelector('.floating-hearts');
  if (overlay) overlay.innerHTML = '';
  if (hearts) hearts.innerHTML = '';
  if (gallerySparkleTimer) clearInterval(gallerySparkleTimer);
  gallerySparkleTimer = null;
}
function makeSparkle(parent) {
  if (!parent) return;
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.left = `${Math.random() * 95}%`;
  s.style.top = `${Math.random() * 95}%`;
  s.style.animationDuration = `${1 + Math.random()}s`;
  parent.appendChild(s);
  setTimeout(() => s.remove(), 1300);
}
function makeFloatingHeart(parent) {
  if (!parent) return;
  const h = document.createElement('div');
  h.className = 'floating-heart';
  const emojis = ['💖','✨','💞','💕','💗','💓','💝'];
  h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  h.style.left = `${10 + Math.random()*80}%`;
  h.style.bottom = '-20px';
  h.style.animationDuration = `${2.4 + Math.random()*1.5}s`;
  h.style.fontSize = `${1.7 + Math.random()*1.3}rem`;
  parent.appendChild(h);
  setTimeout(() => h.remove(), 3300);
}

document.addEventListener('DOMContentLoaded', () => {
  startGallerySparkles();
});
window.addEventListener('beforeunload', stopGallerySparkles);

nextBtn.addEventListener('click', () => {
  stopGallerySparkles();
  window.location.href = 'page7.html';
});

backBtn.addEventListener('click', () => {
  stopGallerySparkles();
  window.location.href = 'page5.html';
});

bgMusic.play();
