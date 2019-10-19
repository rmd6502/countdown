import React, { Component } from 'react'

export default class LapTimeTable extends Component {
    render() {
        const rows = this.props.lapTimes.map((row, index) => 
            <tr key={index}><td>{row}</td></tr>
        )
        return (
            <table><tbody>
                {rows}
            </tbody></table>
        )
    }
}
