const verses = [
  { category: "Peace", text: "Peace I leave with you..." },
  { category: "Strength", text: "I can do all things through Christ..." }
];

let index = 0;
function rotateVerse() {
  const verseBox = document.getElementById("scripture-text");
  verseBox.style.opacity = 0;
  setTimeout(() => {
    verseBox.textContent = verses[index].text;
    verseBox.style.opacity = 1;
    index = (index + 1) % verses.length;
  }, 500);
}

setInterval(rotateVerse, 30000);

