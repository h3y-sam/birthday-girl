const waChat = document.getElementById('waChat');
const waTyping = document.getElementById('waTyping');
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const bgMusic = document.getElementById('bgMusic');

// Example chat script
const chatScript = [
  { sender: 'amrita', text: 'Hlw bandar 🐒' },
  { sender: 'user', text: 'Haan bolo  🦁' },
  { sender: 'amrita', text: 'Ek baat btao 🤔' },
  { sender: 'user', text: 'Puchho 💕' },
  { sender: 'amrita', text: 'Hum Kaise pasand aa gaye tumko? 😳' },
  { sender: 'user', text: 'Itni achhi ho... kaise nahi pasand aati 😍 par tum kaise maan gayi?' },
  { sender: 'amrita', text: 'Tum kitne achhe ho... tumse koi baat karke dekhe, sabko pasand aaoge 😌💫' },
  { sender: 'user', text: 'Phir bhi ab tak single tha 😭' },
  { sender: 'amrita', text: 'Shayad sirf mere liye 😚' },
  { sender: 'user', text: 'Shyyyy... hmm... I love you Amrita 💖 I love you sooooo much... tum bahut pyaari ho 🥺' },
  { sender: 'amrita', text: 'I love you too jaan... 💘' },
  { sender: 'user', text: 'Hayyyyyyeeee... itna pyaarrrrrr 💓💓💓' },
  { sender: 'amrita', text: 'Bol diye... tum bhi kya yaad rakhoge 😂❤️' },
  { sender: 'amrita', text: 'Oh haan... hum video call nahi karege 😤' },
  { sender: 'user', text: 'Aise kaise nahi karegi? 😳' },
  { sender: 'amrita', text: 'Matlab daily-daily... hum nahi karne wale 📵😝' },
  { sender: 'user', text: 'Achha thik thikkkk 🫡' },
  { sender: 'amrita', text: 'Aur din raat baat bhi nahi karenge... baki GF ke jaise 🤷‍♀️' },
  { sender: 'user', text: 'Achha thik reee 😅' },
  { sender: 'user', text: 'But I still love you sooooo much... meri jaaan 😘💞' },
  { sender: 'amrita', text: 'Kitni baar bologe? 🙄' },
  { sender: 'user', text: 'Jab tak dil nahi bharta 😌❤️' },
  { sender: 'amrita', text: 'Basss basss... 🙈🙈 ' }
];


function typeChatMsgs(msgs, idx = 0) {
  if (!waChat || idx >= msgs.length) {
    waTyping.style.display = 'none';
    return;
  }

  const msg = msgs[idx];

  // Show typing indicator for 'amrita' only
  waTyping.style.display = msg.sender === 'amrita' ? 'flex' : 'none';

  // Simulate realistic delay before the message appears
  setTimeout(() => {
    waTyping.style.display = 'none';

    const div = document.createElement('div');
    div.className = 'wa-msg ' + msg.sender;

    const bubble = document.createElement('div');
    bubble.className = 'wa-bubble ' + msg.sender;
    bubble.textContent = '';

    div.appendChild(bubble);
    waChat.appendChild(div);
    waChat.scrollTop = waChat.scrollHeight;

    // Typing animation (letter by letter)
    let i = 0;
    const speed = 25 + Math.random() * 15; // Realistic speed variation

    function typeLetter() {
      if (i < msg.text.length) {
        bubble.textContent += msg.text.charAt(i);
        i++;
        waChat.scrollTop = waChat.scrollHeight;
        setTimeout(typeLetter, speed);
      } else {
        // Move to next message after a short pause
        setTimeout(() => {
          typeChatMsgs(msgs, idx + 1);
        }, 600 + Math.random() * 500);
      }
    }

    typeLetter();
  }, 900 + Math.random() * 1000);
}

// 🟢 Start chat and music when page is ready
window.addEventListener('DOMContentLoaded', () => {
  // Auto-play music or fallback on user click
  bgMusic.play().catch(() => {
    document.body.addEventListener('click', () => bgMusic.play(), { once: true });
  });

  // Start the chat
  typeChatMsgs(chatScript);

  // Fix navigation for Next and Back buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.location.href = 'page6.html';
    });
  }
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'page4.html';
    });
  }
});