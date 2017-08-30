import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import style from './CanvasContainer.css'
import { tool, eraser, pen, bucket, circle, triangle, rectangle } from '../actions/canvas/tool'
import { ToolButton, ShapeButton } from '../components/ToolButton.js'

const globalLength = Math.min(global.innerWidth, global.innerHeight) === 768 ? 704 : Math.min(global.innerWidth, global.innerHeight)

const mapStateToProps = (state) => ({
  clicked: state.canvas.clicked,
  color: state.canvas.color,
  toolShowed: state.canvas.toolShowed
})

class ToolList extends React.PureComponent {
  render () {
    const onClick = () => {
      this.props.dispatch(tool.show())
    }
    return (
      <div className={style.list}>
        <div>
          <ShapeButton shape='triangle' hide={!this.props.toolShowed} orderClass={style.toolSeventh} onClick={() => {
            this.props.dispatch(triangle.choose())
            this.props.ctx.strokeStyle = this.props.color
          }} />
          <ShapeButton shape='rectangle' hide={!this.props.toolShowed} orderClass={style.toolSixth} onClick={() => {
            this.props.dispatch(rectangle.choose())
            this.props.ctx.strokeStyle = this.props.color
          }} />
          <ShapeButton shape='circle' hide={!this.props.toolShowed} orderClass={style.toolFifth} onClick={() => {
            this.props.dispatch(circle.choose())
            this.props.ctx.strokeStyle = this.props.color
          }} />
          <ToolButton toolClass='glyphicon-tint' hide={!this.props.toolShowed} orderClass={style.toolFourth} onClick={() => {
            this.props.dispatch(bucket.choose())
            this.props.ctx.strokeStyle = this.props.color
            this.props.ctx.lineWidth = 1 / 320 * globalLength
          }} />
          <ToolButton toolClass='glyphicon-erase' hide={!this.props.toolShowed} orderClass={style.toolThird} onClick={() => {
            this.props.dispatch(eraser.choose())
            this.props.ctx.strokeStyle = 'white'
            this.props.ctx.lineWidth = 10 / 320 * globalLength
          }} />
          <ToolButton toolClass='glyphicon-pencil' hide={!this.props.toolShowed} orderClass={style.toolSecond} onClick={() => {
            this.props.dispatch(pen.choose())
            this.props.ctx.strokeStyle = this.props.color
            this.props.ctx.lineWidth = 1 / 320 * globalLength
          }} />
          { this.props.clicked === 'pen'
            ? <ToolButton toolClass='glyphicon-pencil' orderClass={style.toolFirst} onClick={onClick} />
          : this.props.clicked === 'eraser'
            ? <ToolButton toolClass='glyphicon-erase' orderClass={style.toolFirst} onClick={onClick} />
          : this.props.clicked === 'bucket'
            ? <ToolButton toolClass='glyphicon-tint' orderClass={style.toolFirst} onClick={onClick} />
          : this.props.clicked === 'circle'
            ? <ShapeButton shape='circle' orderClass={style.toolFirst} onClick={onClick} />
          : this.props.clicked === 'rectangle'
            ? <ShapeButton shape='rectangle' orderClass={style.toolFirst} onClick={onClick} />
          : this.props.clicked === 'triangle'
            ? <ShapeButton shape='triangle' orderClass={style.toolFirst} onClick={onClick} />
          : ''
          }
        </div>
      </div>
    )
  }
}

export const ToolListContainer = connect(mapStateToProps)(ToolList)
