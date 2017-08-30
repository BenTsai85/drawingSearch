import { createActions } from 'redux-actions'

export const { color } = createActions({
  COLOR: {
    SHOW: null,
    CHOOSE: color => color
  }
})
