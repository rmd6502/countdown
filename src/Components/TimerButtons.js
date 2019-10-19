import React, { Component } from 'react'

export default class TimerButtons extends Component {
    render() {
        var runningLabel = this.props.running ? "Stop" : "Start"
        var resetLabel = this.props.running ? "Lap" : "Reset"
        return (
            <div>
                <button onClick={this.props.toggleRunning}>{runningLabel}</button>
                <button onClick={this.props.onReset}>{resetLabel}</button>
            </div>
        )
    }
}
