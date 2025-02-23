import { combineReducers } from '@reduxjs/toolkit'

import application from './application/reducer'
import dei from './dei/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  application,
  dei,
  mint,
  multicall,
  transactions,
  user,
})

export default reducer
