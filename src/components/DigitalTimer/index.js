import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    elapsedTimeInSeconds: 0,
    timeLimitInMinutes: 25,
  }

  getTimeLimit = () => {
    const {elapsedTimeInSeconds, timeLimitInMinutes} = this.state
    const totalRemainingTime = timeLimitInMinutes * 60 - elapsedTimeInSeconds
    const minute = Math.floor(totalRemainingTime / 60)
    const second = Math.floor(totalRemainingTime % 60)
    const stringifyMinutes = minute > 9 ? minute : `0${minute}`
    const stringifySeconds = second > 9 ? second : `0${second}`
    return `${stringifyMinutes}:${stringifySeconds}`
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    return (
      <div className="timer-controller-container">
        <button
          type="button"
          onClick={this.playPauseBtn}
          className="timer-controller-btn"
        >
          <img
            src={
              isTimeRunning
                ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
            }
            alt="img"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimeRunning ? 'PAUSE' : 'PLAY'}
          </p>
        </button>
        <button
          type="button"
          onClick={this.resetBtn}
          className="timer-controller-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="img"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">RESET</p>
        </button>
      </div>
    )
  }

  renderTimeLimitController = () => {
    const {elapsedTimeInSeconds, timeLimitInMinutes} = this.state
    const isButtonDisabled = elapsedTimeInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <h1 className="limit-label">Set Timer Limit</h1>
        <div className="timer-limit-controller">
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.decreaseBtn}
            className="limit-controller-button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeLimitInMinutes}</p>
          </div>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.increaseBtn}
            className="limit-controller-button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  playPauseBtn = () => {
    const {isTimeRunning, timeLimitInMinutes, elapsedTimeInSeconds} = this.state
    if (elapsedTimeInSeconds === timeLimitInMinutes * 60) {
      this.setState({elapsedTimeInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.interValid = setInterval(this.increaseElapsedTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  clearTimerInterval = () => clearInterval(this.interValid)

  increaseElapsedTimeInSeconds = () => {
    const {elapsedTimeInSeconds, timeLimitInMinutes} = this.setState
    if (elapsedTimeInSeconds === timeLimitInMinutes * 60) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }))
    }
  }

  resetBtn = () => {
    this.clearTimerInterval()
    this.setState({
      isTimeRunning: false,
      elapsedTimeInSeconds: 0,
      timeLimitInMinutes: 25,
    })
  }

  decreaseBtn = () => {
    const {timeLimitInMinutes} = this.state
    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  increaseBtn = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  render() {
    const {isTimeRunning} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">DIGITAL TIMER</h1>
        <div className="elapsed-time-container">
          <p className="elapsed-time">{this.getTimeLimit()}</p>
          <p className="timer-state">{isTimeRunning ? 'RUNNING' : 'PAUSED'}</p>
        </div>
        <div className="controls-container">
          {this.renderTimeController()}
          {this.renderTimeLimitController()}
        </div>
      </div>
    )
  }
}
export default DigitalTimer
