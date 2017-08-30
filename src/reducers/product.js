import { handleActions } from 'redux-actions'

const initialState = {
  items: null,
  comment: '',
  title: '',
  price: null
}

const reducerMap = {
  PRODUCT: (state, action) => ({ ...state, ...action.payload })
}

export default handleActions(reducerMap, initialState)
