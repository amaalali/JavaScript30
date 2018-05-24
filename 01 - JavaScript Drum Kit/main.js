const keyCode = (e) => e.keyCode

const getAudioElementForId = (doc, id) => doc.querySelector(`audio[data-key='${id}']`)

const getKeyElementForId = (doc, id) => doc.querySelector(`.keys__key[data-key='${id}']`)

const _addPlayingClassToElement = (element) => {
  element.classList.add("keys__key--playing")
  return element;
}

function _removePlayingClassFromElement() {
  this.classList.remove("keys__key--playing")
  this.removeEventListener('transitionend', _removePlayingClassFromElement)
  return this;
}

const _playElement = (audioElement) => {
  audioElement.currentTime = 0
  audioElement.play()
  return audioElement
}

const composedFns = (doc) => (e) => {
  const eventKeyCode = keyCode(e)
  const audioElemForKeyCode = getAudioElementForId(doc, eventKeyCode)
  const keyElemForKeyCode = getKeyElementForId(doc, eventKeyCode)

  const animatedElement = _addPlayingClassToElement(keyElemForKeyCode)
    .addEventListener('transitionend', _removePlayingClassFromElement)

  _playElement(audioElemForKeyCode)
}

window.addEventListener('keydown', composedFns(document));
