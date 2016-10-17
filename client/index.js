let currentIndex = {};

function showEntry(index) {
  // Display div index
  const div = document.querySelector(`div[data-index="${index}"]`);

  div.style.display = 'block';

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
  const pitchCount = document.querySelector('div[data-pitch-count]').dataset.pitchCount;
  let randomIndex = getRandomIndex(0, pitchCount);

  // console.log(randomIndex);

  if (randomIndex === currentIndex) {
    // console.log('Duplicate index returned, re-randomising');
    randomIndex = getRandomIndex(0, pitchCount);
    // console.log(randomIndex);
  }

  showEntry(randomIndex);

  currentIndex = randomIndex;
}

const randomButton = document.querySelector('.random-button');

randomButton.addEventListener('click', () => {
  const previousDiv = document.querySelector(`div[data-index="${currentIndex}"]`);

  previousDiv.style = '';

  showRandom();
});

// On load
const hashNumber = location.hash.slice(1);

if (hashNumber && !Number.isNaN(hashNumber)) {
  showEntry(hashNumber);

  currentIndex = hashNumber;
} else {
  showRandom();
}
