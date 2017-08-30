import { createService } from 'reservice'
import { createActions } from 'redux-actions'

export const suggestGet = createService('SUGGEST_GET')

export const { suggestClear, imageLoaded, suggestChosen } = createActions({
  SUGGEST_CLEAR: null,
  IMAGE_LOADED: index => index,
  SUGGEST_CHOSEN: (key, index) => ({ key, index })
})
