const initialState = {
  shareShowed: false
}

const reducerMap = {
  SHARE: {
    SHOW: (state, action) => ({ ...state, shareShowed: !state.shareShowed })
  }
}

export default { initialState, reducerMap }
