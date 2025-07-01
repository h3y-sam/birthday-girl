// Romantic Birthday Surprise JS

// --- 1. Persistent 'Do you love me?' Popup Logic ---
const loveModal = document.getElementById('loveModal');
const loveQuestion = document.getElementById('loveQuestion');
const loveYes = document.getElementById('loveYes');
const loveNo = document.getElementById('loveNo');
const burstAudio = document.getElementById('burst-audio');
const bgMusic = document.getElementById('bg-music');
const bdayMusic = document.getElementById('birthday-music');
const mainContainer = document.getElementById('mainContainer');
const musicToggle = document.getElementById('music-toggle');
let musicPlaying = false;
let loveNoCount = 0;
const loveNoQuestions = [
  "Are you sure? 🥺",
  "Pakka nahi? 💔",
  "Please bolo na... 😢",
  "Dil tod dogi kya? 😭",
  "Last chance, do you love me? 💖",
  "Mujhe toh lagta hai tum mazaak kar rahi ho! 😜",
  "Sach mein nahi? Main ro dunga! 😭",
  "Chalo, ab toh haan bol do! 🙈",
  "Tu haan bolegi, mujhe pata hai! 😘"
];

function showLoveModal() {
  loveModal.classList.add('active');
}
function hideLoveModal() {
  loveModal.classList.remove('active');
}

loveNo.addEventListener('click', () => {
  loveNoCount++;
  loveModal.classList.add('shake');
  setTimeout(() => loveModal.classList.remove('shake'), 400);
  const idx = loveNoCount % loveNoQuestions.length;
  loveQuestion.textContent = loveNoQuestions[idx];
  loveNo.textContent = ["No", "Nope", "Nahi", "Bilkul nahi", "Never", "Naaah", "Nopes", "Nooo", "Nhi" ][loveNoCount % 9];
});

loveYes.addEventListener('click', () => {
  burstAudio.currentTime = 0;
  burstAudio.play();
  hideLoveModal();
  setTimeout(() => {
    mainContainer.style.display = 'block';
    showPage(1);
    playMusic();
  }, 600);
});

// --- 2. Page Navigation Logic ---
const pages = document.querySelectorAll('.page');
function showPage(n) {
  pages.forEach((pg, i) => {
    pg.classList.toggle('active', i === n - 1);
  });
  // WhatsApp chat animation: trigger when page 5 is shown
  if (n === 5 && waChat && waTyping) {
    waChat.innerHTML = '';
    waTyping.style.display = 'flex';
    typeChatMsgs(chatScript, 0);
  }
  // Sparkle & hearts for gallery page
  if (n === 6) {
    startGallerySparkles();
  } else {
    stopGallerySparkles();
  }
  // Music switch for birthday page
  if (n === 7) {
    if (!bdayMusic.paused) return;
    bgMusic.pause();
    bdayMusic.currentTime = 0;
    bdayMusic.play();
    musicPlaying = true;
    startBalloons();
  } else {
    if (bdayMusic && !bdayMusic.paused) bdayMusic.pause();
    if (musicPlaying && bgMusic.paused) bgMusic.play();
    stopBalloons();
  }
  // Confetti for last page
  if (n === 7) startConfetti();
  else stopConfetti();
}

// --- 9. Gallery Sparkle & Floating Heart Animation ---
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


document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('next-btn')) {
    const next = parseInt(e.target.getAttribute('data-next'));
    showPage(next);
  } else if (e.target.classList.contains('back-btn')) {
    const prev = parseInt(e.target.getAttribute('data-prev'));
    showPage(prev);
  }
});

// --- 3. Gift Box Animation and Transition ---
let boxOpened = false;
window.showSurprise = function () {
  if (boxOpened) return;
  boxOpened = true;
  const giftBox = document.getElementById('giftBox');
  const boxLid = giftBox ? giftBox.querySelector('.box-lid') : null;
  const giftText = document.getElementById('giftText');
  if (boxLid) {
    boxLid.style.transition = 'all 0.7s cubic-bezier(.7,-0.2,.6,1.5)';
    boxLid.style.transform = 'rotate(-60deg) translateY(-80px)';
  }
  setTimeout(() => {
    if (giftText) giftText.style.display = 'none';
    showPage(4);
  }, 700);
};
const giftBoxElem = document.getElementById('giftBox');
if (giftBoxElem) giftBoxElem.onclick = window.showSurprise;

// --- 4. WhatsApp Mock Chat Typing Animation ---
const waChat = document.getElementById('waChat');
const waTyping = document.getElementById('waTyping');
const chatScript = [
  
    { sender: 'me', text: 'Hey Amrita! 💬' },
    { sender: 'you', text: 'Haan bolo, kya hua? 😄' },
    { sender: 'me', text: 'Aaj ka din yaad hai na? 👀' },
    { sender: 'you', text: 'Obviously, mera birthday hai! 🎂' },
    { sender: 'me', text: 'Toh Happy Birthday meri jaan! ❤️' },
    { sender: 'you', text: 'Thank you babu! 😘' },
    { sender: 'me', text: 'Tujhse ek important baat puchni hai... 🥺' },
    { sender: 'you', text: 'Kya? Batao jaldi! 😯' },
    { sender: 'me', text: 'Will you be mine, forever wala mine? 💍' },
    { sender: 'you', text: 'Hamesha ke liye, sirf tera! 💖' }
  
  
];
function typeChatMsgs(msgs, idx = 0) {
  if (!waChat) return;
  if (idx >= msgs.length) { waTyping.style.display = 'none'; return; }
  waTyping.style.display = 'flex';
  setTimeout(() => {
    waTyping.style.display = 'none';
    const msg = msgs[idx];
    const div = document.createElement('div');
    div.className = 'wa-msg ' + msg.sender;
    const bubble = document.createElement('div');
    bubble.className = 'wa-bubble ' + msg.sender;
    bubble.textContent = msg.text;
    div.appendChild(bubble);
    waChat.appendChild(div);
    waChat.scrollTop = waChat.scrollHeight;
    setTimeout(() => {
      waTyping.style.display = 'flex';
      typeChatMsgs(msgs, idx + 1);
    }, 900 + Math.random() * 900);
  }, 1000 + Math.random() * 1000);
}

// --- 5. Music Control ---
function playMusic() {
  if (musicPlaying) return;
  bgMusic.currentTime = 0;
  bgMusic.play();
  musicPlaying = true;
}
function pauseMusic() {
  bgMusic.pause();
  bdayMusic.pause();
  musicPlaying = false;
}
musicToggle.addEventListener('click', () => {
  if (musicPlaying) { pauseMusic(); } else { playMusic(); }
});

// --- 6. Confetti and Balloons for Birthday/Proposal Page ---
const confettiCanvas = document.getElementById('confetti-canvas');
let confettiActive = false;
function startConfetti() {
  if (!confettiCanvas) return;
  confettiActive = true;
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  let particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    r: 6 + Math.random() * 6,
    c: `hsl(${Math.random()*360},90%,70%)`,
    d: Math.random() * 2 + 1
  }));
  function draw() {
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.c;
      ctx.fill();
    }
  }
  function update() {
    for (const p of particles) {
      p.y += p.d;
      if (p.y > confettiCanvas.height) {
        p.y = -10;
        p.x = Math.random() * confettiCanvas.width;
      }
    }
  }
  function animate() {
    if (!confettiActive) return;
    draw();
    update();
    requestAnimationFrame(animate);
  }
  animate();
}
function stopConfetti() {
  confettiActive = false;
  if (confettiCanvas) {
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  }
}

// --- 7. Starry Night Background ---
const starCanvas = document.getElementById('star-canvas');
if (starCanvas) {
  const starCtx = starCanvas.getContext('2d');
  let stars = [];
  function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeStarCanvas);
  resizeStarCanvas();
  function createStar() {
    return {
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: 0.8 + Math.random() * 1.7,
      o: 0.6 + Math.random() * 0.4
    };
  }
  stars = Array.from({length: 110}, createStar);
  function drawStars() {
    starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);
    for (const s of stars) {
      starCtx.globalAlpha = s.o;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      starCtx.fillStyle = '#fff';
      starCtx.shadowColor = '#fff';
      starCtx.shadowBlur = 6;
      starCtx.fill();
      starCtx.shadowBlur = 0;
    }
    starCtx.globalAlpha = 1;
  }
  function animateStars() {
    drawStars();
    requestAnimationFrame(animateStars);
  }
  animateStars();
}

// --- 8. Floating Heart Balloons ---
const balloonContainer = document.getElementById('balloon-container');
function createBalloon() {
  const balloon = document.createElement('div');
  const colors = ['#e75480', '#ffb6c1', '#a259c6', '#fff0f5', '#f8b6d2'];
  balloon.className = 'floating-balloon';
  balloon.style.position = 'absolute';
  balloon.style.left = `${Math.random()*96}vw`;
  balloon.style.bottom = '-80px';
  balloon.style.width = '36px';
  balloon.style.height = '48px';
  balloon.style.background = colors[Math.floor(Math.random()*colors.length)];
  balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
  balloon.style.opacity = 0.83 + Math.random() * 0.17;
  balloon.style.zIndex = 1;
  balloon.style.transition = 'transform 8s linear';
  balloonContainer.appendChild(balloon);
  setTimeout(() => {
    balloon.style.transform = `translateY(-110vh) rotate(${Math.random()*40-20}deg)`;
  }, 20);
  setTimeout(() => {
    balloon.remove();
  }, 9000);
}
// Balloon animation control
let balloonInterval = null;
function startBalloons() {
  if (balloonInterval) return;
  balloonInterval = setInterval(createBalloon, 1200);
  for (let i = 0; i < 7; i++) createBalloon();
}
function stopBalloons() {
  if (balloonInterval) { clearInterval(balloonInterval); balloonInterval = null; }
  if (balloonContainer) balloonContainer.innerHTML = '';
}


// --- 9. Gallery: (handled by HTML, swipe/scroll for mobile) ---
// Optionally, you can add swipe support for gallery if needed.

// --- 10. Proposal Button Animation ---

// --- 10b. Rewind Button Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const rewindBtn = document.getElementById('rewindBtn');
  const rewindModal = document.getElementById('rewindModal');
  if (rewindBtn) {
    rewindBtn.addEventListener('click', () => {
      // Show rewind popup
      if (rewindModal) rewindModal.classList.add('active');
      // Reset love modal text/buttons
      loveQuestion.textContent = 'Do you love me?';
      loveNo.textContent = 'No';
      loveNoCount = 0;
      // Hide main content
      mainContainer.style.display = 'none';
      // Reset music, confetti, balloons
      pauseMusic();
      stopConfetti();
      stopBalloons();
      window.scrollTo({top:0,behavior:'smooth'});
      setTimeout(() => {
        if (rewindModal) rewindModal.classList.remove('active');
        mainContainer.style.display = 'block';
        showPage(1);
      }, 1500);
    });
  }
});


const proposalBtn = document.querySelector('.yes-btn.proposal-btn');
if (proposalBtn) {
  proposalBtn.addEventListener('click', () => {
    proposalBtn.textContent = 'Love you forever! 💞';
    proposalBtn.style.background = 'linear-gradient(90deg, #a259c6, #e75480)';
    startConfetti();
    setTimeout(() => {
      proposalBtn.textContent = 'Yes, Forever! 💖';
      proposalBtn.style.background = 'linear-gradient(90deg, #e75480, #ffb347)';
    }, 3000);
  });
}

// --- 11. Unlock Music on User Interaction (Mobile Browsers) ---
function unlockAudio() {
  if (bgMusic.paused) {
    bgMusic.play().catch(()=>{});
    bgMusic.pause();
  }
  if (bdayMusic.paused) {
    bdayMusic.play().catch(()=>{});
    bdayMusic.pause();
  }
}
document.body.addEventListener('click', unlockAudio, { once: true });
document.body.addEventListener('touchstart', unlockAudio, { once: true });
