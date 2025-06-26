/*
 * Mobile nav toggle
 *  -----------------
 *  Adds/removes the "open" class to show or hide the
 *  <ul id="nav-links"> element when the hamburger icon is pressed.
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks  = document.getElementById("nav-links");

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.style.display === "flex";
    navLinks.style.display = isOpen ? "none" : "flex";
  });
});


const scriptures = [
  "“Be still, and know that I am God.” – Psalm 46:10",
  "“Trust in the Lord with all your heart…” – Proverbs 3:5",
  "“I can do all things through Christ who strengthens me.” – Philippians 4:13",
  "“Let your light so shine before men…” – Matthew 5:16",
  "“Come unto me, all ye that labour and are heavy laden…” – Matthew 11:28",
  "“Draw near to God and He will draw near to you.” – James 4:8"
];

let index = 0;
const box = document.getElementById("scriptureBox");

function rotateScripture() {
  box.style.opacity = 0;
  setTimeout(() => {
    box.textContent = scriptures[index];
    box.style.opacity = 1;
    index = (index + 1) % scriptures.length;
  }, 1000); // wait for fade out
}

rotateScripture(); // initial verse
setInterval(rotateScripture, 8000); // rotate every 8 seconds


function saveEntry() {
  const entry = document.getElementById('journalEntry').value;
  if (entry.trim()) {
    alert("Your journal entry has been saved (locally).\n\n" + entry);
    document.getElementById('journalEntry').value = '';
  } else {
    alert("Please write something before saving.");
  }
}

const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('scoreBoard');
    const resetBtn = document.getElementById('resetBtn');

    const player = { x: 200, y: 200, r: 15, speed: 4 };
    const coin = { x: 0, y: 0, r: 8 };
    let score = 0;
    let keys = {};

    function randomPos(radius) {
      return Math.floor(Math.random() * (canvas.width - radius * 2)) + radius;
    }

    function placeCoin() {
      coin.x = randomPos(coin.r);
      coin.y = randomPos(coin.r);
    }

    function resetGame() {
      player.x = 200;
      player.y = 200;
      score = 0;
      scoreEl.textContent = 'Score: ' + score;
      placeCoin();
    }

    function drawPlayer() {
      ctx.fillStyle = '#a98c8a';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawCoin() {
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function handleInput() {
      if (keys['ArrowUp'])    player.y -= player.speed;
      if (keys['ArrowDown'])  player.y += player.speed;
      if (keys['ArrowLeft'])  player.x -= player.speed;
      if (keys['ArrowRight']) player.x += player.speed;

      player.x = Math.max(player.r, Math.min(canvas.width  - player.r, player.x));
      player.y = Math.max(player.r, Math.min(canvas.height - player.r, player.y));
    }

    function detectCollision() {
      const dx = player.x - coin.x;
      const dy = player.y - coin.y;
      const dist = Math.hypot(dx, dy);
      if (dist < player.r + coin.r) {
        score++;
        scoreEl.textContent = 'Score: ' + score;
        placeCoin();
      }
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleInput();
      detectCollision();
      drawCoin();
      drawPlayer();
      requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup',   e => keys[e.key] = false);
    resetBtn.addEventListener('click', resetGame);

    placeCoin();
    gameLoop();