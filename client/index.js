function randomPitch() {
  // find all the pitches
  // pick a random one// show it
  // hide all the rest

  const random = Math.random() * 100 / 17
  document.querySelectorAll('[data-index="'+ random +'"]')
}

myButton.onclick = randomPitch;

randomPitch()
