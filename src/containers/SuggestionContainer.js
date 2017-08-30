import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import style from './CanvasContainer.css'
import { ShareListContainer } from './ShareListContainer'
import { imageLoaded, suggestChosen } from '../actions/canvas/suggest'
import { color } from '../actions/canvas/color'

const mapStateToProps = (state) => ({
  suggestions: state.canvas.suggestions,
  imageLoaded: state.canvas.imageLoaded,
  layer: state.canvas.layer,
  suggest: state.canvas.suggest,
  trash: state.canvas.trash
})

class Suggestion extends React.PureComponent {
  render () {
    return (
      <div className={style.suggestion}>
        <ShareListContainer share={this.props.share} />
        <div className={style.search}>
          <span className={[
            'glyphicon glyphicon-search',
            style.largeBtnCircle,
            style.searchBtn,
            this.props.trash.some(elmt => elmt.index === this.props.layer - 1) ? style.btnNotAllowed : ''
          ].join(' ')} aria-hidden='true' onClick={this.props.trash.some(elmt => elmt.index === this.props.layer - 1) ? undefined : () => {
            this.props.dispatch(color.show())
          }} />
        </div>
        <div className={[
          style.suggestionTitle
        ].join(' ')}>需要我的幫忙嗎？
        </div>
        <div className={[
          style.suggestionList
        ].join(' ')}>
          { this.props.suggestions.reduce((prev, item, key) => {
            return prev.concat([
              <img className={[
                style.suggestionItem,
                this.props.imageLoaded[ key * 3 ] ? '' : style.notShowed
              ].join(' ')}
                src={item.url}
                key={key * 3}
                onClick={async () => {
                  await this.props.dispatch(suggestChosen(key, 0))
                  this.props.onClick()
                }}
                onLoad={() => {
                  this.props.dispatch(imageLoaded(key * 3))
                  this.forceUpdate()
                }} />,
              <img className={[
                style.suggestionItem,
                this.props.imageLoaded[ key * 3 + 1 ] ? '' : style.notShowed
              ].join(' ')}
                src={item.url_variant_1}
                key={key * 3 + 1}
                onClick={async () => {
                  await this.props.dispatch(suggestChosen(key, 1))
                  this.props.onClick()
                }}
                onLoad={() => {
                  this.props.dispatch(imageLoaded(key * 3 + 1))
                  this.forceUpdate()
                }} />,
              <img className={[
                style.suggestionItem,
                this.props.imageLoaded[ key * 3 + 2 ] ? '' : style.notShowed
              ].join(' ')}
                src={item.url_variant_2}
                key={key * 3 + 2}
                onClick={async () => {
                  await this.props.dispatch(suggestChosen(key, 2))
                  this.props.onClick()
                }}
                onLoad={() => {
                  this.props.dispatch(imageLoaded(key * 3 + 2))
                  this.forceUpdate()
                }} />
            ])
          }, []) }
        </div>
      </div>
    )
  }
}

export const SuggestionContainer = connect(mapStateToProps)(Suggestion)
