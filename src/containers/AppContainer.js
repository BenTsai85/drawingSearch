import React from 'react'
import { connect } from 'react-redux'
import { SearchPageContainer } from './SearchPageContainer'
import { CanvasContainer } from './CanvasContainer'
import { LoadingPageContainer } from './LoadingPageContainer'

const mapStateToProps = (state) => ({
  items: state.product.items,
  isLoading: state.loading.isLoading
})

class App extends React.PureComponent {
  render () {
    return (
      this.props.isLoading
      ? <LoadingPageContainer />
      : this.props.items
      ? <SearchPageContainer />
      : <CanvasContainer />
    )
  }
}

export const AppContainer = connect(mapStateToProps)(App)
