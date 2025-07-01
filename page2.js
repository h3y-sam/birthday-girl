document.querySelector('.next-btn').addEventListener('click', () => {
  window.location.href = 'page3.html';
});
document.querySelector('.back-btn').addEventListener('click', () => {
  window.location.href = 'page1.html';
});

// Optionally play background music
document.getElementById('bgMusic').play();
