import { handleActions } from 'redux-actions'

const initialState = {
  data: [0]
}

const reducer = handleActions({

  'DASHBOARD_RCV_DATA': (state, action) => {
    let newState = {...state}
    newState.data.push(action.payload)
    return newState
  }

}, initialState)

export default reducer
