const bdayMusic = document.getElementById('bdayMusic');
const bgMusic = document.getElementById('bgMusic');
const confettiCanvas = document.getElementById('confetti-canvas');
const yesBtn = document.querySelector('.yes-btn.proposal-btn');
const rewindBtn = document.getElementById('rewindBtn');
const backBtn = document.querySelector('.back-btn');

// --- Balloons Animation ---
function startBalloons() {
  const balloonsDiv = document.querySelector('.balloons');
  if (!balloonsDiv) return;
  balloonsDiv.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = `${10 + Math.random()*80}%`;
    b.style.background = `hsl(${Math.random()*360},80%,80%)`;
    b.style.animationDuration = `${2.5 + Math.random()*2}s`;
    balloonsDiv.appendChild(b);
  }
}

// --- Confetti Animation ---
function startConfetti() {
  if (!confettiCanvas) return;
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  let confettiPieces = Array.from({length: 120}, () => ({
    x: Math.random()*confettiCanvas.width,
    y: Math.random()*confettiCanvas.height,
    r: 4 + Math.random()*6,
    d: Math.random()*Math.PI*2,
    color: `hsl(${Math.random()*360},80%,70%)`
  }));
  function draw() {
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettiPieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += Math.cos(p.d) + 1 + p.r/6;
      p.x += Math.sin(p.d);
      if (p.y > confettiCanvas.height) {
        p.x = Math.random()*confettiCanvas.width;
        p.y = -10;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  // Music: Switch to birthday music
  if (bgMusic && !bgMusic.paused) bgMusic.pause();
  bdayMusic.currentTime = 0;
  bdayMusic.play();
  startBalloons();
  startConfetti();
});

yesBtn.addEventListener('click', () => {
  alert('She said YES! 💖 Happy Birthday!');
});

rewindBtn.addEventListener('click', () => {
  window.location.href = 'page1.html';
});

backBtn.addEventListener('click', () => {
  window.location.href = 'page6.html';
});
