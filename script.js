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
