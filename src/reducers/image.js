import { handleActions } from 'redux-actions'

const initialState = {
  image: null,
  id: -1
}

const reducerMap = {
  IMAGE: {
    PRODUCE: (state, action) => ({ ...state, image: action.payload.image, id: action.payload.id })
  }
}

export default handleActions(reducerMap, initialState)
