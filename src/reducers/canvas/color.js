const initialState = {
  colorShowed: false,
  color: 'black'
}

const reducerMap = {
  COLOR: {
    SHOW: (state, action) => ({ ...state, colorShowed: !state.colorShowed }),
    CHOOSE: (state, action) => ({ ...state, color: action.payload })
  }
}

export default { initialState, reducerMap }
