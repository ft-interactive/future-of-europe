const pitchCount = parseInt(document.querySelector('div[data-pitch-count]').dataset.pitchCount, 10);
const viewed = [];
const likeButton = document.querySelector('.like-button');
const tweetButton = document.querySelector('.tweet-button');
const randomButton = document.querySelector('.random-button');
// const favourites = [];
// const favouritesCounter = document.querySelector('#favourites-counter');
const hash = location.hash.slice(1);
// const viewAllButton = document.querySelector('#view-all-favourites');

function showEntries(array) {
  const hashString = array.join('-');

  // Display div index
  // array.forEach(n => {
  const div = document.querySelector(`div[data-index="${array[0]}"]`);

  div.style.display = 'block';
  div.classList.add('viewed');
  // });

  // Change button values
  likeButton.value = array[0];
  tweetButton.value = array[0];

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

    submitOwnButton.innerHTML = 'Submit your own';

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

    div.style.display = 'none';
  });

  array.push(getRandomIndex(1, pitchCount));

  array.forEach(n => {
    if (viewed.indexOf(n) > -1) {
      console.log(`${n} has been viewed, re-randomising`);

      // showRandom();
    } else {
      viewed.push(n);
      // console.log(viewed);
      // console.log(viewed.length);
    }
  });

  showEntries(array);
}

likeButton.addEventListener('click', () => {
  let switchButton = {};

  function transition() {
    likeButton.style.display = 'none';
    likeButton.nextElementSibling.style.display = 'block';

    clearInterval(switchButton);
  }

  switchButton = setInterval(transition, 750);

  likeButton.disabled = true;

  likeButton.children[2].innerHTML = 'Liked!';

  likeButton.children[0].style.height = 0;

  // favourites.push(parseInt(button.value, 10));

  // favouritesCounter.innerHTML = favourites.length;

  window.ga('send', 'event', 'fob-likes', likeButton.value);
});

tweetButton.addEventListener('click', () => {
  window.location.href = `https://twitter.com/intent/tweet?url=https://ig.ft.com/sites/future-of-britain/%23${tweetButton.value}`;

  window.ga('send', 'event', 'fob-tweets', tweetButton.value);
});

// viewAllButton.addEventListener('click', () => {
//   viewed.forEach(n => {
//     const div = document.querySelector(`div[data-index="${n}"]`);
//     div.style = '';
//   });
//
//   showEntries(favourites);
// });

function getStarted() {
  let removeIntro = {};

  randomButton.removeEventListener('click', getStarted);

  randomButton.innerHTML = 'Show me another';

  function remove() {
    document.querySelector('.overlay').style.display = 'none';

    clearInterval(removeIntro);
  }

  removeIntro = setInterval(remove, 100);

  document.querySelector('.overlay').style.opacity = 0;

  randomButton.addEventListener('click', () => {
    showRandom();
  });
}

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
      showRandom();
    }
  });

  randomButton.innerHTML = 'Show me another';

  randomButton.addEventListener('click', () => {
    showRandom();
  });

  showEntries(hashNumbers);
} else {
  const overlay = document.querySelector('.overlay');

  overlay.style.display = 'block';

  randomButton.addEventListener('click', getStarted);

  showRandom();
}
