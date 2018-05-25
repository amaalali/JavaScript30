(function(_window) {
  const Some = x => ({
    map: f => Some(f(x)),
    inspect: () => console.log(`Some(${x})`),
    fold: (l, r) => r(x) // not needed for this
  })
  
  // None can be passed an element or not
  const None = (x = undefined) => ({
    map: f => None(x),
    inspect: () => console.log(`None(${x})`),
    fold: (l, r) => x ? l(x) : x
  })
  
  const Option = x => x ? Some(x) : None(x)
  
  const keyCode = (e) => e.keyCode
  
  const getAudioElementForId = (doc, id) => Option(
    doc.querySelector(`audio[data-key='${id}']`)
  )
  
  const getKeyElementForId = (doc, id) => Option(
    doc.querySelector(`.keys__key[data-key='${id}']`)
  )
  
  const _addPlayingClassToElement = (element) => {
    element.classList.add("keys__key--playing")
    return element;
  }
  
  const _removePlayingClassFromElement = () => {
    this.classList.remove("keys__key--playing")
    this.removeEventListener('transitionend', _removePlayingClassFromElement)
  }
  
  const _playElement = (audioElement) => {
    audioElement.currentTime = 0
    audioElement.play()
    return audioElement
  }
  
  const composedFns = (doc) => (e) => {
    const eventKeyCode = keyCode(e)
  
    getAudioElementForId(doc, eventKeyCode)
      .map(_playElement)
    
    getKeyElementForId(doc, eventKeyCode)
      .map(_addPlayingClassToElement)
      .map(keyElem => keyElem.addEventListener('transitionend', _removePlayingClassFromElement))
  }

  _window.addEventListener('keydown', composedFns(document));
})(window)
