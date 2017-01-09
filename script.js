class Timer {
  constructor(min, sec) {
    this.min = min
    this.sec = sec
    this.resetTimer()
  }
  
  count() {
    this.timeRemaining--
    this.updateView()
    if (this.timeRemaining === 0)
      this.pauseTimer()
  }
  runTimer() {
    const viewMin = Number(document.getElementById('min').value) * 60
    const viewSec = Number(document.getElementById('sec').value)
    if (this.timeRemaining !== viewMin + viewSec) {
      this.timeRemaining = viewMin + viewSec
      this.min = viewMin
      this.sec = viewSec
    }
    if (!this.timerID)
      this.timerID = setInterval(_ => this.count(), 1000)
  }
  pauseTimer() {
    this.updateView()
    if (this.timerID) {
      clearInterval(this.timerID)
      this.timerID = 0
    }
  }
  resetTimer() {
    this.timeRemaining = this.min * 60 + this.sec
    this.pauseTimer()
  }
  updateView() {
    const min = Math.floor(this.timeRemaining / 60)
    const sec = this.timeRemaining % 60
    document.getElementById('min').value = min
    document.getElementById('sec').value = sec
    document.title = min + ':' + (('0' + sec).length === 3 ? sec : ('0' + sec))
  }
}

(function() {
  let timer
  document.getElementById('run')
    .addEventListener('click', event => {
      if (typeof timer !== 'object')
        timer = new Timer(
          Number(document.getElementById('min').value),
          Number(document.getElementById('sec').value)
        )
      timer.runTimer()
    })
  document.getElementById('pause')
    .addEventListener('click', event => {
      timer.pauseTimer()
    })
  document.getElementById('reset')
    .addEventListener('click', event => {
      timer.resetTimer()
    })
})()

