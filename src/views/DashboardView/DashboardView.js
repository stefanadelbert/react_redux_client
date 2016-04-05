import React, { Component, PropTypes } from 'react'

export class DashboardView extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <p>
            Once this view is running, ensure that you run the socketio server using:
            <pre>npm run socket-server <em>[&lt;interval-in-ms=500&gt;]</em></pre>
          </p>

          <h5>Socket data:</h5>
          <ol>
            {this.props.data.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default DashboardView
