import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import DashboardView from './DashboardView'
import actions from './actions'

export class DashboardContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    dashboard: PropTypes.object
  }

  constructor (props) {
    super(props)

    let ws = io('http://localhost:3001')
    ws.on('connect', () => console.log('connected to socket.io server'))
    ws.on('somedata', (data) => {
      props.dispatch(actions.receiveSocketData(data))
    })
  }

  render () {
    return (
      <DashboardView data={this.props.dashboard.data} />
    )
  }
}

const mapState = (state) => ({
  dashboard: state.dashboard
})

export default connect(mapState)(DashboardContainer)
