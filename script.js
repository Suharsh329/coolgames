const canYouNameIt = () => {
  const categories = [
    'cars',
    'makeup',
    'countries',
    'capitals',
    'movies',
    'shows',
    'singers',
    'celebrity',
    'hairstyles',
    'athletes',
    'yoga positions',
    'element',
    'scientists',
    'luxury brands',
    'rappers',
    'street-wear brands',
    'books',
    'snacks',
    'spices',
    'desserts',
    'mint',
    'animals',
    'places',
  ];

  const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const category = categories[Math.floor(Math.random() * categories.length)];

  document.getElementById('name-it-letter').innerHTML = letter;
  document.getElementById('name-it-category').innerHTML = category;
  document.getElementById('name-it-play').style.display = 'block';
};

document.getElementById('name-it-button').addEventListener('click', canYouNameIt);
document.getElementById('name-it-play').style.display = 'none';