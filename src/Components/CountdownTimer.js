import React, { Component } from 'react'
import TimerButtons from './TimerButtons'
import LapTimeTable from './LapTimeTable'

export default class CountdownTimer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countDown: props.initialTime,
            running: false,
            interval: null,
            worker: new Worker('/counterWorker.js'),
            lapTimes: []
        }
        this.frameRate = 40
        this.state.worker.onmessage = this.onmessage
        this.state.worker.postMessage({"time":props.initialTime})
    }

    onReset = () => {
        console.log("Reset/Lap")
        if (this.state.running) {
            this.addLap(this.state.countDown)
        } else {
            this.setState({
                countDown: this.props.initialTime,
                lapTimes: []
            })
        }
    }

    addLap = (t) => {
        this.setState({
            lapTimes: [...this.state.lapTimes, this.formatTime(t)]
        })
    }

    toggleRunning = () => {
        console.log("Start/Stop")
        var interval = null
        if (!this.state.running) {
            interval = setInterval(this.updateTimer, this.frameRate)
        } else {
            clearInterval(this.state.interval)
        }
        this.state.worker.postMessage({"start":!this.state.running})
        this.setState({
            running: !this.state.running,
            interval: interval
        })
    }

    updateTimer = () => {
        this.state.worker.postMessage({"getCurrentTime": true})
    }

    onmessage = (e) => {
        var message = e.data
        if (message.hasOwnProperty("timeLeft")) {
            this.setState({
                countDown : message.timeLeft
            })
            if (message.timeLeft === 0) {
                if (this.state.running) {
                    this.toggleRunning()
                }
                //this.state.worker.terminate()
                this.props.callback()
            }
        }
    }

    formatTime(t) {
        var mins = Math.floor(t / 60000)
        var secs = Math.floor((t - mins * 60000) / 1000)
        var millis = t % 1000
        return "" + mins + "m " + ("00"+secs).slice(-2) + "s . " + ("000" + millis).slice(-3)
    }
    
    render() {
        const timeLeft = this.state.countDown
        
        return (
            <div>
                <p className="countdown">
                    {this.formatTime(timeLeft)}
                </p>
                <TimerButtons toggleRunning={this.toggleRunning} onReset={this.onReset} running={this.state.running} />
                <LapTimeTable lapTimes={this.state.lapTimes} />
            </div>
        )
    }
}
