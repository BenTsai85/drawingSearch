const initialState = {
  layer: 1,
  suggest: undefined,
  trash: [{
    index: 0,
    timestamp: Date.now()
  }]
}

const reducerMap = {
  LAYER: {
    ADD: state => ({ ...state, layer: state.layer + 1 }),
    MINUS: state => ({ ...state, layer: state.layer - 1 })
  },
  SUGGEST: {
    SET: state => ({ ...state, suggest: Number.isInteger(state.suggest) ? state.suggest : state.layer }),
    CLEAR: state => ({ ...state, suggest: undefined })
  },
  TRASH: {
    SET: (state, action) => ({ ...state, trash: action.payload })
  }
}

export default { initialState, reducerMap }
