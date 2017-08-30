const initialState = {
  clicked: 'pen',
  toolShowed: false
}

const reducerMap = {
  TOOL: {
    SHOW: (state, action) => ({ ...state, toolShowed: !state.toolShowed, sizeShowed: false, colorShowed: false })
  },
  ERASER: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'eraser', toolShowed: false })
  },
  PEN: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'pen', toolShowed: false })
  },
  BUCKET: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'bucket', toolShowed: false })
  },
  CIRCLE: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'circle', toolShowed: false })
  },
  TRIANGLE: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'triangle', toolShowed: false })
  },
  RECTANGLE: {
    CHOOSE: (state, action) => ({ ...state, clicked: 'rectangle', toolShowed: false })
  }
}

export default { initialState, reducerMap }
