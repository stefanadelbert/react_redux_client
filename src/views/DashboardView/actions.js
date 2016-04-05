import { createAction } from 'redux-actions'

const actions = {
  receiveSocketData: createAction('DASHBOARD_RCV_DATA', (data) => data)
}

export default actions
