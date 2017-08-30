import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import style from './CanvasContainer.css'
import { share } from '../actions/canvas/share'

const mapStateToProps = (state) => ({
  shareShowed: state.canvas.shareShowed
})

class ShareList extends React.PureComponent {
  render () {
    return (
      <div className={style.shareList}>
        <span className={[
          'glyphicon glyphicon-link',
          style.largeBtnCircle,
          this.props.shareShowed ? style.shareFourth : style.shareFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.share('clipboard')
          this.props.dispatch(share.show())
        }} />
        <img src='https://18955-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2017/05/Facebook.png'
          className={[
            style.largeBtn,
            this.props.shareShowed ? style.shareThird : style.shareFirst
          ].join(' ')} aria-hidden='true' onClick={() => {
            this.props.share('facebook')
            this.props.dispatch(share.show())
          }} />
        <img src='../../statics/files/messenger.png'
          className={[
            style.largeBtn,
            this.props.shareShowed ? style.shareSecond : style.shareFirst
          ].join(' ')} aria-hidden='true' onClick={() => {
            this.props.share('messenger')
            this.props.dispatch(share.show())
          }} />
        <span className={[
          'glyphicon glyphicon-share',
          style.largeBtnCircle,
          style.shareFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(share.show())
        }} />
      </div>
    )
  }
}

export const ShareListContainer = connect(mapStateToProps)(ShareList)
