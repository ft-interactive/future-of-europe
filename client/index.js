const pitchCount = parseInt(document.querySelector('div[data-pitch-count]').dataset.pitchCount, 10);
const viewed = [];
const likeButtons = document.querySelectorAll('.like-button');
const randomButton = document.querySelector('#random-button');
const favourites = [];
// const favouritesCounter = document.querySelector('#favourites-counter');
const hash = location.hash.slice(1);
// const viewAllButton = document.querySelector('#view-all-favourites');

function showEntries(array) {
  const hashString = array.join('-');

  // Display div index
  array.forEach(n => {
    const div = document.querySelector(`div[data-index="${n}"]`);

    div.style.display = 'block';
    div.classList.add('viewed');
  });

  // Change the address bar
  if (history.replaceState) {
    history.replaceState(null, null, `#${hashString}`);
  } else {
    location.hash = `#${hashString}`;
  }

  // Change the random button on the last pitch
  if (viewed.length === pitchCount) {
    const submitOwnButton = randomButton.cloneNode(true);

    randomButton.parentNode.replaceChild(submitOwnButton, randomButton);

    submitOwnButton.innerHTML = 'Submit Your Own';

    submitOwnButton.classList.remove('random-button');

    submitOwnButton.classList.add('submit-button');

    submitOwnButton.addEventListener('click', () => {
      window.location.href = 'https://ig.ft.com/sites/future-of-britain-form/';
    });
  }
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function showRandom() {
  const array = [];

  viewed.forEach(n => {
    const div = document.querySelector(`div[data-index="${n}"]`);

    div.style = '';
  });

  array.push(getRandomIndex(1, pitchCount));

  array.forEach(n => {
    if (viewed.indexOf(n) > -1) {
      console.log('Duplicate, re-randomising');

      showRandom();
    } else {
      viewed.push(n);

      showEntries(array);

      console.log(viewed);
      console.log(viewed.length);
    }
  });
}

randomButton.addEventListener('click', () => {
  showRandom();
});

likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', () => {
    const button = likeButton;
    // const icon =
    let intervalId = {};

    button.classList.remove('icon-empty');

    button.classList.add('icon-full');

    function transition() {
      button.classList.add('hidden');

      button.nextElementSibling.classList.remove('hidden');

      clearInterval(intervalId);
    }

    intervalId = setInterval(transition, 500);

    favourites.push(parseInt(button.value, 10));

    // favouritesCounter.innerHTML = favourites.length;
  });
});

// viewAllButton.addEventListener('click', () => {
//   viewed.forEach(n => {
//     const div = document.querySelector(`div[data-index="${n}"]`);
//     div.style = '';
//   });
//
//   showEntries(favourites);
// });

// On load
if (hash) {
  const hashArray = hash.split('-');
  const hashNumbers = [];

  hashArray.forEach(item => {
    const int = parseInt(item, 10);

    if (Number.isInteger(int)) {
      hashNumbers.push(int);
      viewed.push(int);
    } else {
      console.log(`${item} is not a number`);
    }
  });

  showEntries(hashNumbers);
} else {
  showRandom();
}
