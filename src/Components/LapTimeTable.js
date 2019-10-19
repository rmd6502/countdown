import React, { Component } from 'react'

export default class LapTimeTable extends Component {
    render() {
        const rows = this.props.lapTimes.map((row, index) => 
            <tr key={index} className="lapTime"><td>{index}</td><td>{row}</td></tr>
        )
        return (
            <div className="lapTime"><table><tbody>
                {rows}
            </tbody></table></div>
        )
    }
}
