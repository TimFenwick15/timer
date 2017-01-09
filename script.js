class Timer {
  constructor(min, sec) {
    this.min = this.min || min
    this.sec = this.sec || sec
    this.timeRemaining = min * 60 + sec
    this.timerID = 0
  }
  
  currentTime() {
    return this.timeRemaining
  }
  count() {
    this.timeRemaining--
    if (this.timeRemaining === 0)
      this.pauseTimer()
  }
  runTimer() {
    this.timerID = setInterval(_ => this.count(), 1000)
  }
  pauseTimer() {
    if (this.timerID)
      clearInterval(this.timerID)
  }
  resetTimer(min, sec) {
    this.pauseTimer()
    this.constructor(min, sec)
  }

}

function updateView() {
  // do the dom manipulations here
}

(function() {
  let timer
  let userMins
  let userSecs
  document.getElementById('run')
    .addEventListener('click', event => {
      const min = Number(document
        .getElementById('min')
        .value)
      
      const sec = Number(document
        .getElementById('sec')
        .value)
      
      userMins = min
      userSecs = sec

      timer = new Timer(min,sec)

      timer.runTimer()

      setInterval(_ => {
        document.getElementById('min').value = Math.floor(timer.currentTime() / 60)
        document.getElementById('sec').value = timer.currentTime() % 60
        document.title = Math.floor(timer.currentTime() / 60) + ':' + (timer.currentTime() % 60)
      }, 1000)

    })
  document.getElementById('pause')
    .addEventListener('click', event => {
      timer.pauseTimer()
    })
  document.getElementById('reset')
    .addEventListener('click', event => {
      timer.resetTimer(userMins, userSecs)
    })

})()

