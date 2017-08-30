import { suggestGet } from '../../actions/canvas/suggest'

const initialState = {
  suggestions: [],
  imageLoaded: [],
  suggestionChosen: ''
}

const reducerMap = {
  [ suggestGet ]: (state, action) => {
    if (action.error) {
      return ({ ...state, suggestions: [], imageLoaded: [], suggestionChosen: '' })
    } else if (state.suggestions.length === action.payload.length && state.suggestions.every((v, i) => v.name === action.payload[ i ].name)) {
      return ({ ...state, suggestionChosen: '' })
    } else {
      return ({ ...state, suggestions: action.payload, imageLoaded: [], suggestionChosen: '' })
    }
  },
  SUGGEST_CLEAR: (state, action) => ({ ...state, suggestions: [], imageLoaded: [], suggestionChosen: '' }),
  IMAGE_LOADED: (state, action) => {
    let imageLoaded = state.imageLoaded
    imageLoaded[ action.payload ] = true
    return { ...state, imageLoaded }
  },
  SUGGEST_CHOSEN: (state, action) => {
    switch (action.payload.index) {
      case 0:
        return { ...state, suggestionChosen: state.suggestions[action.payload.key].url }
      case 1:
        return { ...state, suggestionChosen: state.suggestions[action.payload.key].url_variant_1 }
      case 2:
        return { ...state, suggestionChosen: state.suggestions[action.payload.key].url_variant_2 }
    }
  }
}

export default { initialState, reducerMap }
