const lovePopup = document.querySelector('.love-modal');
const welcomePage = document.getElementById('welcomePage');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const nextBtn = document.querySelector('.next-btn');
const burstSound = document.getElementById('burstSound');
const bgMusic = document.getElementById('bgMusic');

let noCount = 0;
const noTexts = [
  "Sach mein no bol diya? 😢💔",
  "Please yaar, ek baar haan bol de 🥺💕",
  "Dil tod diya tune 💔😭",
  "Phir se try kar le na, meri jaan... 😘",
  "Main fir bhi puchhta rahunga 😘🥰",
  "Aise kaise? Mera dil hai tumhare paas! 💖",
  "Hamesha pyaar rahega! 💞",
  "Meri Amrita, please! 😘💗",
  "Tera haan sunke hi to jeena hai mujhe 😩❤️",
  "Na bolke bhi tu meri hi hai... sach bol 😏💕",
  "Acha thik hai... par ro lunga main 😭💔",
  "Mujhse na ho payega bina tere... 😔",
  "Tu haan bol de... warna main sad song play kar dunga 🎶🥺",
  "Tu meri khushi hai, zidd nahi 💘",
  "Tere bina toh coffee bhi feeki lagti hai ☕😒",
  "Na na na... tu haan bolne wali hai, bas time lag raha hai 🕒😉",
  "Ek baar muskura de... haan ka signal samajh lunga 😅💗",
  "Mujhe tere 'haan' se zyada kuch nahi chahiye... 🥹"
];
const noBtnColors = [
  '#e75480', '#ff4fa5', '#ffb6f9', '#a259c6', '#ff6f91', '#ffb347', '#e75480', '#ffb6c1'
];

noBtn.addEventListener('click', () => {
  noCount = (noCount + 1) % noTexts.length;
  const h2 = lovePopup.querySelector('h2');
  h2.innerHTML = noTexts[noCount] + ' <span class="emoji">💔</span>';
  noBtn.style.background = `linear-gradient(90deg, ${noBtnColors[noCount]}, #fff0f7)`;
  lovePopup.classList.add('shake');
  setTimeout(() => lovePopup.classList.remove('shake'), 350);
});

yesBtn.addEventListener('click', () => {
  burstSound.currentTime = 0;
  burstSound.play();
  setTimeout(() => {
    lovePopup.style.display = 'none';
    welcomePage.style.display = 'flex';
    welcomePage.classList.add('neon-border');
    bgMusic.play();
  }, 400);
});

nextBtn.addEventListener('click', () => {
  window.location.href = 'page2.html';
});

// Optionally: auto-focus yes button
window.onload = () => {
  yesBtn.focus();
  // Mobile audio unlock
  document.body.addEventListener('touchstart', () => {
    burstSound.play();
    burstSound.pause();
    bgMusic.play();
    bgMusic.pause();
  }, { once: true });
};
