import { createActions } from 'redux-actions'

export const { tool, eraser, pen, bucket, circle, triangle, rectangle } = createActions({
  TOOL: {
    SHOW: null
  },
  ERASER: {
    CHOOSE: null
  },
  PEN: {
    CHOOSE: null
  },
  BUCKET: {
    CHOOSE: null
  },
  CIRCLE: {
    CHOOSE: null
  },
  TRIANGLE: {
    CHOOSE: null
  },
  RECTANGLE: {
    CHOOSE: null
  }
})
