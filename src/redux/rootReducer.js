import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import dashboard from '../views/DashboardView/reducer'

export default combineReducers({
  counter,
  router,
  dashboard
})
