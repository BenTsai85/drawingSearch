import { clientRender } from 'iso-redux'
import configureStore from './configureStore'

const pageShared = (mod) => {
  if (mod.hot) {
    mod.hot.accept()
  }
  clientRender({ configureStore, mainComponent: mod.mainComponent })
}

export default pageShared
