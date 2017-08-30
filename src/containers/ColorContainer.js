import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import style from './CanvasContainer.css'
import { color } from '../actions/canvas/color'

const mapStateToProps = (state) => ({
  colorShowed: state.canvas.colorShowed
})

class Color extends React.PureComponent {
  render () {
    return (
      <div className={this.props.colorShowed ? '' : style.notShowed}>
        <div className={style.background} onClick={() => {
          this.props.dispatch(color.show())}} />
        <div className={style.colorTitle}>請選擇顏色</div>
        <span className={[
          style.btnCircle,
          style.black,
          style.color,
          this.props.colorShowed ? style.colorNineth : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('black'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.dimgray,
          style.color,
          this.props.colorShowed ? style.colorEighth : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('dimgray'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.darkolivegreen,
          style.color,
          this.props.colorShowed ? style.colorSeventh : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('darkolivegreen'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.sienna,
          style.color,
          this.props.colorShowed ? style.colorSixth : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('sienna'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.silver,
          style.color,
          this.props.colorShowed ? style.colorFifth : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('silver'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.saddlebrown,
          style.color,
          this.props.colorShowed ? style.colorFourth : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('saddlebrown'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.tan,
          style.color,
          this.props.colorShowed ? style.colorThird : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('tan'))
          this.props.transform2Object()
        }} />
        <span className={[
          style.btnCircle,
          style.indianred,
          style.color,
          this.props.colorShowed ? style.colorSecond : style.colorFirst
        ].join(' ')} aria-hidden='true' onClick={() => {
          this.props.dispatch(color.choose('indianred'))
          this.props.transform2Object()
        }} />
        <img src='../../statics/files/gift.svg'
          className={[
            style.gift,
            style.color,
            style.colorFirst
          ].join(' ')} aria-hidden='true' onClick={() => {
            this.props.dispatch(color.choose('surprise'))
            this.props.transform2Object()
          }} />
      </div>
    )
  }
}

export const ColorContainer = connect(mapStateToProps)(Color)
