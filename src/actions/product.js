import { createActions } from 'redux-actions'

export const { product } = createActions({
  PRODUCT: (items, comment, title, price) => ({ items, comment, title, price })
})
