import categories from "./categories.js";

const canYouNameIt = () => {
  const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const category = categories[Math.floor(Math.random() * categories.length)];

  document.getElementById('name-it-letter').innerHTML = letter;
  document.getElementById('name-it-category').innerHTML = category.toLowerCase();
  document.getElementById('name-it-play').style.display = 'block';
};

document.getElementById('name-it-button').addEventListener('click', canYouNameIt);
document.getElementById('name-it-play').style.display = 'none';

const whatsTheWord = () => {
  const firstLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const secondLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  document.getElementById('whats-the-word-first-letter').innerHTML = firstLetter;
  document.getElementById('whats-the-word-second-letter').innerHTML = secondLetter;
  document.getElementById('whats-the-word-play').style.display = 'block';
};

document.getElementById('whats-the-word-button').addEventListener('click', whatsTheWord);
document.getElementById('whats-the-word-play').style.display = 'none';

// Word Auction game
let selectedCategory = null;

const wordAuction = () => {
  // Reset the game state
  selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  document.getElementById('word-auction-bidding').style.display = 'block';
  document.getElementById('word-auction-reveal').style.display = 'none';
  document.getElementById('word-auction-play').style.display = 'block';

  // Change button to reveal mode
  document.getElementById('word-auction-button').textContent = 'Reveal Category';
  document.getElementById('word-auction-button').removeEventListener('click', wordAuction);
  document.getElementById('word-auction-button').addEventListener('click', revealCategory);
};

const revealCategory = () => {
  if (selectedCategory) {
    document.getElementById('word-auction-category').innerHTML = selectedCategory.toLowerCase();
    document.getElementById('word-auction-bidding').style.display = 'none';
    document.getElementById('word-auction-reveal').style.display = 'block';

    // Change button back to start new auction
    document.getElementById('word-auction-button').textContent = 'New Auction';
    document.getElementById('word-auction-button').removeEventListener('click', revealCategory);
    document.getElementById('word-auction-button').addEventListener('click', wordAuction);
  }
};

document.getElementById('word-auction-button').addEventListener('click', wordAuction);
document.getElementById('word-auction-play').style.display = 'none';

// Syllable Challenge game
const syllableChallenge = () => {
  // Generate a random number between 1 and 5 syllables
  // Weighted towards 2-3 syllables as they're most common
  const weights = [10, 30, 30, 20, 10]; // weights for 1, 2, 3, 4, 5 syllables
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  let syllableCount = 1;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      syllableCount = i + 1;
      break;
    }
  }

  // Select a random category
  const category = categories[Math.floor(Math.random() * categories.length)];

  document.getElementById('syllable-count').innerHTML = syllableCount;
  document.getElementById('syllable-category').innerHTML = category.toLowerCase();
  
  // Update the text to use correct grammar
  const syllableText = syllableCount === 1 ? 'syllable' : 'syllables';
  document.getElementById('syllable-challenge-play').innerHTML =
    `<p>Say a word from <span id="syllable-category" class="prompt">${category.toLowerCase()}</span> with exactly <span id="syllable-count" class="prompt">${syllableCount}</span> ${syllableText}!</p>`;
  document.getElementById('syllable-challenge-play').style.display = 'block';
};

document.getElementById('syllable-challenge-button').addEventListener('click', syllableChallenge);
document.getElementById('syllable-challenge-play').style.display = 'none';

// Timer functionality
class GameTimer {
  constructor(gameId) {
    this.gameId = gameId;
    this.seconds = 0;
    this.minutes = 0;
    this.interval = null;
    this.displayElement = document.querySelector(`#${gameId}-timer .timer-display`);
    this.overlayElement = document.getElementById(`${gameId}-timer`);

    // Set up event listeners
    const toggleBtn = document.querySelector(`[data-game="${gameId}"]`);
    const startBtn = document.querySelector(`#${gameId}-timer .timer-btn.start`);
    const stopBtn = document.querySelector(`#${gameId}-timer .timer-btn.stop`);
    const resetBtn = document.querySelector(`#${gameId}-timer .timer-btn.reset`);

    toggleBtn.addEventListener('click', () => this.toggleOverlay());
    startBtn.addEventListener('click', () => this.start());
    stopBtn.addEventListener('click', () => this.stop());
    resetBtn.addEventListener('click', () => this.reset());

    // Close overlay when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.timer-overlay') && !e.target.closest('.timer-toggle')) {
        this.overlayElement.classList.remove('active');
      }
    });
  }

  toggleOverlay() {
    this.overlayElement.classList.toggle('active');
  }

  updateDisplay() {
    const displayMinutes = this.minutes.toString().padStart(2, '0');
    const displaySeconds = this.seconds.toString().padStart(2, '0');
    this.displayElement.textContent = `${displayMinutes}:${displaySeconds}`;
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.seconds++;
        if (this.seconds >= 60) {
          this.minutes++;
          this.seconds = 0;
        }
        this.updateDisplay();
      }, 1000);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.stop();
    this.seconds = 0;
    this.minutes = 0;
    this.updateDisplay();
  }
}

// Initialize timers for each game
const nameItTimer = new GameTimer('name-it');
const whatsTheWordTimer = new GameTimer('whats-the-word');
const wordAuctionTimer = new GameTimer('word-auction');
const syllableChallengeTimer = new GameTimer('syllable-challenge');

// Word Auction counter controls
document.addEventListener('keydown', function (event) {
  const counter = document.getElementById('word-auction-counter');

  // Only allow counter controls when Word Auction is active (visible)
  const wordAuctionPlay = document.getElementById('word-auction-play');
  if (wordAuctionPlay.style.display === 'none') {
    return; // Don't respond to keys if game isn't active
  }

  if (event.key === '+' || event.key === '=') {
    // Increment on + or = key
    event.preventDefault();
    counter.textContent = parseInt(counter.textContent) + 1;
  } else if (event.key === '-') {
    // Decrement on - key (prevent going below 0)
    event.preventDefault();
    counter.textContent = Math.max(0, parseInt(counter.textContent) - 1);
  } else if (event.key === '0' && event.ctrlKey) {
    // Reset on Ctrl+0 key combination
    event.preventDefault();
    counter.textContent = 0;
  }
});

// Button controls for counter
document.getElementById('counter-increment').addEventListener('click', function () {
  const counter = document.getElementById('word-auction-counter');
  counter.textContent = parseInt(counter.textContent) + 1;
});

document.getElementById('counter-decrement').addEventListener('click', function () {
  const counter = document.getElementById('word-auction-counter');
  counter.textContent = Math.max(0, parseInt(counter.textContent) - 1);
});

document.getElementById('counter-reset').addEventListener('click', function () {
  const counter = document.getElementById('word-auction-counter');
  counter.textContent = 0;
});

// Reset counter when starting new auction
const originalWordAuction = wordAuction;
wordAuction = () => {
  // Reset counter when starting new auction
  document.getElementById('word-auction-counter').textContent = 0;
  originalWordAuction();
};
