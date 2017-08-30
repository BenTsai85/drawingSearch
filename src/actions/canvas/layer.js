import { createActions } from 'redux-actions'

export const { layer, suggest, trash } = createActions({
  LAYER: {
    ADD: null,
    MINUS: null
  },
  SUGGEST: {
    SET: null,
    CLEAR: null
  },
  TRASH: {
    SET: array => array
  }
})
