import { createActions } from 'redux-actions'

export const { image } = createActions({
  IMAGE: {
    PRODUCE: (image, id) => ({ image, id })
  }
})
