const pitchCount = parseInt(document.querySelector('div[data-pitch-count]').dataset.pitchCount, 10);
let currentIndex = {};
const randomButton = document.querySelector('.random-button');
const hashNumber = location.hash.slice(1);

function showEntry(index) {
  // Display div index
  const div = document.querySelector(`div[data-index="${index}"]`);

  div.style.display = 'block';
  div.classList.add('viewed');

  // Change the address bar
  if (history.replaceState) {
    history.replaceState(null, null, `#${index}`);
  } else {
    location.hash = `#${index}`;
  }
}

function getRandomIndex(min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
}

function showRandom() {
  let randomIndex = getRandomIndex(0, pitchCount);
  const div = document.querySelector(`div[data-index="${randomIndex}"]`);

  if (div.classList.contains('viewed')) {
    randomIndex = getRandomIndex(0, pitchCount);

    showRandom();
  } else {
    showEntry(randomIndex);

    currentIndex = randomIndex;
  }
}

randomButton.addEventListener('click', () => {
  const previousDiv = document.querySelector(`div[data-index="${currentIndex}"]`);
  let viewedPitchCount = {};

  showRandom();

  previousDiv.style = '';

  viewedPitchCount = document.querySelectorAll('.viewed').length;

  if (viewedPitchCount === pitchCount) {
    randomButton.innerHTML = 'Submit Your Own';

    randomButton.classList.add('submit-button');

    randomButton.classList.remove('random-button');

    randomButton.addEventListener('click', () => {
      window.location.href = 'https://ig.ft.com/sites/future-of-britain-form/';
    });
  }
});

// On load
if (hashNumber && !Number.isNaN(hashNumber)) {
  showEntry(hashNumber);

  currentIndex = hashNumber;
} else {
  showRandom();
}
