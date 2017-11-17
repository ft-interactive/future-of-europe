const pitchCount = parseInt(document.querySelector('div[data-pitch-count]').dataset.pitchCount, 10);
const viewed = [];
const expandButton = document.querySelector('.expand-button');
const closeExpandButton = document.querySelector('.close-button i');
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

  // Add gradient if necessary
  const pitchContainer = div.children[0].children[0];
  const text = pitchContainer.children[0];
  const containerHeight = pitchContainer.getBoundingClientRect().height;
  const textHeight = text.getBoundingClientRect().height - 40;
  const tellMeMore = document.querySelector('.expand-button');

  if (textHeight > containerHeight) {
    tellMeMore.classList.add('gradient');
  } else {
    tellMeMore.classList.remove('gradient');
  }

  // Change button values
  expandButton.dataset.index = array[0];
  likeButton.value = array[0];
  tweetButton.value = array[0];

  // Change the address bar
  if (history.replaceState) {
    history.replaceState(null, null, `#${hashString}`);
  } else {
    location.hash = `#${hashString}`;
  }
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function showRandom() {
  const array = [];

  array.push(getRandomIndex(1, pitchCount));

  if (viewed.indexOf(array[0]) > -1 && viewed.length < pitchCount) {
    console.log(`${array[0]} has been viewed, re-randomising`);

    showRandom();
  } else if (viewed.length < pitchCount) {
    viewed.forEach(n => {
      const div = document.querySelector(`div[data-index="${n}"]`);

      div.style.display = 'none';
    });

    showEntries(array);

    likeButton.disabled = false;
    likeButton.children[2].innerHTML = 'I like this idea';
    likeButton.children[0].style.height = '';

    tweetButton.style.display = 'none';

    likeButton.style.display = 'inline-block';

    viewed.push(array[0]);

    randomButton.disabled = false;
  } else {
    // Change the random button on the last pitch
    document.querySelector('.top-level-pitch').innerHTML = '<div class="pitch-wrapper"><div class="pitch-container end"><span class="pitch">You have seen all the ideas.</span><div class="submit-button end"><a href="https://www.ft.com/futureofeurope/" target="_blank">Read more from this series</a></div><div class="again"><a href="https://ig.ft.com/future-of-europe/">Show me again</a></div></div></div></div>';

    document.querySelector('.button-container').innerHTML = '';
  }
}

expandButton.addEventListener('click', () => {
  const overlay = document.querySelector('.read-more-overlay');
  const pitches = JSON.parse(document.getElementById('pitches').textContent);
  const ids = pitches.map(pitch => pitch.id);
  const pitchIndex = ids.indexOf(parseInt(expandButton.dataset.index, 10));
  const content = overlay.querySelector('.text');
  const name = overlay.querySelector('.name');
  const title = overlay.querySelector('.title');
  const body = document.querySelector('body');
  const footer = document.querySelector('footer');

  body.style.overflow = 'hidden';

  content.innerHTML = `${pitches[pitchIndex].readmore}`;
  name.innerHTML = `${pitches[pitchIndex].name}`;
  title.innerHTML = `${pitches[pitchIndex].jobtitle}`;

  overlay.style.display = 'block';
  footer.style.display = 'none';

  closeExpandButton.addEventListener('click', () => {
    body.style.overflow = '';
    footer.style.display = '';
    overlay.scrollTop = 0;
    overlay.style.display = 'none';
  });

  // Escape to close overlay
  document.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
      // body.scrollTop = 0;
      body.style.overflow = '';
      footer.style.display = '';
      overlay.scrollTop = 0;
      overlay.style.display = 'none';
    }
  });
});

likeButton.addEventListener('click', () => {
  let switchButton = {};

  function transition() {
    likeButton.style.display = 'none';
    tweetButton.style.display = 'inline-block';

    clearInterval(switchButton);
  }

  switchButton = setInterval(transition, 750);

  likeButton.disabled = true;
  likeButton.children[2].innerHTML = 'Liked';
  likeButton.children[0].style.height = 0;

  // favourites.push(parseInt(button.value, 10));
  // favouritesCounter.innerHTML = favourites.length;

  window.ga('send', 'event', 'fob-likes', likeButton.value);
});

tweetButton.addEventListener('click', () => {
  window.location.href = `https://twitter.com/intent/tweet?text=Here%27s%20a%20good%20idea%20from%20the%20%40FT%27s%20collection%20of%20student%20proposals%20for%20the%20future%20of%20Europe%3A&url=https://ig.ft.com/future-of-europe/%23${tweetButton.value}`;

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
  const body = document.querySelector('body');
  let removeIntro = {};

  body.style.overflow = '';

  this.removeEventListener('click', getStarted);

  document.querySelector('.random-text').innerHTML = 'Show me another';
  document.querySelector('.random-icon').style.backgroundImage =
      'url("icons/ic_autorenew_black_24px.svg")';

  function remove() {
    document.querySelector('.intro-overlay').style.display = 'none';

    clearInterval(removeIntro);
  }

  removeIntro = setInterval(remove, 100);

  document.querySelector('.intro-overlay').style.opacity = 0;

  this.addEventListener('click', () => {
    showRandom();
  });
}

function preventTouchMove(element) {
  element.preventDefault();
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
      console.log(`${item} is not a number, randomising`);
      showRandom();
    }
  });

  document.querySelector('.random-text').innerHTML = 'Show me another';
  document.querySelector('.random-icon').style.backgroundImage =
      'url("icons/ic_autorenew_black_24px.svg")';

  randomButton.addEventListener('click', () => {
    randomButton.disabled = true;

    showRandom();
  });

  showEntries(hashNumbers);
} else {
  const body = document.querySelector('body');
  const overlay = document.querySelector('.intro-overlay');

  body.style.overflow = 'hidden';

  overlay.style.display = 'block';

  overlay.addEventListener('touchmove', preventTouchMove, false);
  randomButton.addEventListener('touchmove', preventTouchMove, false);
  randomButton.addEventListener('click', getStarted, false);

  showRandom();
}
