import React from 'react'
import { connect } from 'react-redux'
import Konva from 'konva'
import copy from 'copy-to-clipboard'
import { lzwEncode } from '../utils/lzw'
import 'bootstrap/dist/css/bootstrap.css'
import css from 'css'
import style from './CanvasContainer.css'
import { ColorContainer } from './ColorContainer'
import { SuggestionContainer } from './SuggestionContainer'
import { ToolListContainer } from './ToolListContainer'
import { suggestGet, suggestClear } from '../actions/canvas/suggest'
import { image } from '../actions/image'
import { loading } from '../actions/loading'
import { product } from '../actions/product'
import { layer, suggest, trash } from '../actions/canvas/layer'

var svgTransformParser = require('svg-transform-parser').parse

var circlePoint = []
for (let i = 0; i <= 50; ++i) {
  circlePoint[ i ] = {
    x: Math.cos(2 * Math.PI * i / 50),
    y: Math.sin(2 * Math.PI * i / 50)
  }
}

var rectanglePoint = []
for (let i = 0; i < 12; ++i) {
  rectanglePoint[ i ] = {
    x: i / 12,
    y: 0
  }
  rectanglePoint[ i + 12 ] = {
    x: 1,
    y: i / 12
  }
  rectanglePoint[ i + 24 ] = {
    x: 1 - i / 12,
    y: 1
  }
  rectanglePoint[ i + 36 ] = {
    x: 0,
    y: 1 - i / 12
  }
}
rectanglePoint[ 48 ] = {
  x: 0,
  y: 0
}

const globalLength = Math.min(global.innerWidth, global.innerHeight) === 768 ? 704 : Math.min(global.innerWidth, global.innerHeight)

const mapStateToProps = (state) => ({
  clicked: state.canvas.clicked,
  suggestionChosen: state.canvas.suggestionChosen,
  suggestClicked: state.canvas.suggestClicked,
  id: state.image.id,
  uuid: state.routing.params.uuid,
  layer: state.canvas.layer,
  suggest: state.canvas.suggest,
  trash: state.canvas.trash,
  color: state.canvas.color
})

class Canvas extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      isPaint: false,
      isDrag: null,
      mouseDown: false,
      lastPosition: {
        x: 0,
        y: 0
      },
      last2Position: {
        x: 0,
        y: 0
      },
      canvasPosition: {
        x: -globalLength,
        y: -globalLength
      },
      multiTouch: false,
      mounted: false
    }

    this.images = [ null, null ]
    this.canFill = [ false, false ]
    this.paths = [ [], [] ]

    this.fillEncircled = this.fillEncircled.bind(this)

    this.onContentMouseDown = this.onContentMouseDown.bind(this)
    this.onContentMouseUp = this.onContentMouseUp.bind(this)
    this.onContentMouseMove = this.onContentMouseMove.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.trash = this.trash.bind(this)
    this.onSuggestClick = this.onSuggestClick.bind(this)
    this.search = this.search.bind(this)
    this.transform2Object = this.transform2Object.bind(this)
    this.share = this.share.bind(this)
  }

  componentDidMount () {
    this.canvas = global.Konva.document.createElement('canvas')
    this.canvas.width = globalLength * 3
    this.canvas.height = globalLength * 3

    this.ctx = this.canvas.getContext('2d')
    this.ctx.strokeStyle = 'black'
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 1 / 320 * globalLength
    this.ctx.globalCompositeOperation = 'source-over'
    this.stage = new Konva.Stage({
      container: 'container',
      width: globalLength,
      height: globalLength
    })

    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    if (this.props.uuid) {
      let image = new Image()
      image.onload = async () => {
        this.images[ 0 ] = await new Konva.Image({
          image: image,
          width: globalLength,
          height: globalLength
        })
        this.layer.add(this.images[ 0 ])
        this.image = new Konva.Image({
          image: this.canvas,
          x: -globalLength,
          y: -globalLength
        })
        this.images[ 1 ] = this.image
        this.layer.add(this.image)
        this.layer.draw()
        this.setState({ mounted: true })
      }
      image.src = '../../statics/storage/' + this.props.uuid
    } else {
      this.images[ 0 ] = new Konva.Rect({
        x: this.state.canvasPosition.x,
        y: this.state.canvasPosition.y,
        fill: 'white',
        width: globalLength * 3,
        height: globalLength * 3
      })
      this.layer.add(this.images[ 0 ])
      this.image = new Konva.Image({
        image: this.canvas,
        x: -globalLength,
        y: -globalLength
      })
      this.images[ 1 ] = this.image
      this.layer.add(this.image)
      this.layer.draw()
      this.setState({ mounted: true })
    }

    this.stage.on('contentTouchstart', this.onContentMouseDown)
    this.stage.on('contentTouchend', this.onContentMouseUp)
    this.stage.on('contentTouchmove', this.onContentMouseMove)

    require('path-data-polyfill')
  }

  transform2Object () {
    const length = globalLength
    let canvas = global.Konva.document.createElement('canvas')
    canvas.width = length
    canvas.height = length
    let context = canvas.getContext('2d')
    let self = this
    this.stage.toImage({
      x: 0,
      y: 0,
      width: length,
      height: length,
      callback: async image => {
        context.drawImage(image, 0, 0, length, length)
        const data = context.getImageData(0, 0, length, length).data

        const scanX = fromLeft => {
          const offset = fromLeft ? 1 : -1

          // loop through each column
          for (let x = fromLeft ? 0 : length - 1; fromLeft ? (x < length) : (x > -1); x += offset) {
            // loop through each row
            for (let y = 0; y < length; y++) {
              if (data[(length * y + x) * 4 + 2] !== 255) {
                return x
              }
            }
          }
          return null // all image is white
        }
        const scanY = fromTop => {
          const offset = fromTop ? 1 : -1

          // loop through each row
          for (let y = fromTop ? 0 : length - 1; fromTop ? (y < length) : (y > -1); y += offset) {
            // loop through each column
            for (let x = 0; x < length; x++) {
              if (data[(length * y + x) * 4 + 2] !== 255) {
                return y
              }
            }
          }
          return null // all image is white
        }

        let cropLeft = scanX(true) - 1
        if (cropLeft < 0) {
          cropLeft = 0
        }
        let cropTop = scanY(true) - 1
        if (cropTop < 0) {
          cropTop = 0
        }
        let cropWidth = scanX(false) - cropLeft + 2
        let cropHeight = scanY(false) - cropTop + 2
        let cropLength
        if (cropWidth > cropHeight) {
          cropLength = cropWidth
          cropTop = cropTop + 0.5 * (cropHeight - cropWidth)
          if (cropTop + cropWidth > length) {
            cropTop = length - cropWidth
          }
        } else {
          cropLength = cropHeight
          cropLeft = cropLeft + 0.5 * (cropWidth - cropHeight)
          if (cropLeft + cropHeight > length) {
            cropLeft = length - cropHeight
          }
        }
        // cropTop is the last topmost Transparent row. Above this row all is white
        // cropLeft is the last leftmost Transparent column.

        const imageData = context.getImageData(cropLeft, cropTop, cropLength, cropLength)
        canvas = global.Konva.document.createElement('canvas')
        canvas.width = cropLength
        canvas.height = cropLength
        await canvas.getContext('2d').putImageData(imageData, 0, 0, 0, 0, cropLength, cropLength)
        self.search(canvas.toDataURL())
      }
    })
  }

  fillEncircled (pos, last, next) {
    let A1, A2, intersectionX, intersectionY
    let tmppath = new Path2D()
    for (let i = 0; i < this.points.length - 10; ++i) {
      if (Math.max(this.state.lastPosition.x, pos.x) < Math.min(this.points[ i ].x, this.points[ i + 1 ].x) || Math.max(this.state.lastPosition.y, pos.y) < Math.min(this.points[ i ].y, this.points[ i + 1 ].y)) {
        continue
      }
      A1 = (this.state.lastPosition.y - pos.y) / (this.state.lastPosition.x - pos.x)
      A2 = (this.points[ i ].y - this.points[ i + 1 ].y) / (this.points[ i ].x - this.points[ i + 1 ].x)
      if (A1 === A2 || (!isFinite(A1) && !isFinite(A2))) {
        continue
      }
      if (!isFinite(A1)) {
        intersectionX = this.state.lastPosition.x
        intersectionY = A2 * (intersectionX - this.points[ i ].x) + this.points[ i ].y
        if (intersectionY < Math.max(Math.min(this.state.lastPosition.y, pos.y), Math.min(this.points[ i ].y, this.points[ i + 1 ].y)) ||
          intersectionY > Math.min(Math.max(this.state.lastPosition.y, pos.y), Math.max(this.points[ i ].y, this.points[ i + 1 ].y))) {
          continue
        }
      } else if (!isFinite(A2)) {
        intersectionX = this.points[ i ].x
        intersectionY = A1 * (intersectionX - this.state.lastPosition.x) + this.state.lastPosition.y
        if (intersectionY < Math.max(Math.min(this.state.lastPosition.y, pos.y), Math.min(this.points[ i ].y, this.points[ i + 1 ].y)) ||
          intersectionY > Math.min(Math.max(this.state.lastPosition.y, pos.y), Math.max(this.points[ i ].y, this.points[ i + 1 ].y))) {
          continue
        }
      } else {
        intersectionX = (this.points[ i ].y - A2 * this.points[ i ].x - this.state.lastPosition.y + A1 * this.state.lastPosition.x) / (A1 - A2)
        intersectionY = A1 * (intersectionX - this.state.lastPosition.x) + this.state.lastPosition.y
      }
      if (intersectionX < Math.max(Math.min(this.state.lastPosition.x, pos.x), Math.min(this.points[ i ].x, this.points[ i + 1 ].x)) ||
        intersectionX > Math.min(Math.max(this.state.lastPosition.x, pos.x), Math.max(this.points[ i ].x, this.points[ i + 1 ].x))) {
        continue
      }

      tmppath.moveTo(intersectionX, intersectionY)
      for (let j = i + 1; j < this.points.length - 1; ++j) {
        tmppath.quadraticCurveTo(this.points[ j ].x, this.points[ j ].y, (this.points[ j ].x + this.points[ j + 1 ].x) / 2, (this.points[ j ].y + this.points[ j + 1 ].y) / 2)
      }
      tmppath.quadraticCurveTo(this.points[ this.points.length - 1 ].x, this.points[ this.points.length - 1 ].y, last.x, last.y)
      tmppath.quadraticCurveTo(this.state.lastPosition.x, this.state.lastPosition.y, next.x, next.y)
      this.ctx.fillStyle = this.props.clicked === 'eraser' ? 'white' : 'black'
      this.ctx.fill(tmppath)
      break
    }
    tmppath.quadraticCurveTo(this.state.lastPosition.x, this.state.lastPosition.y, next.x, next.y)
  }

  async onContentMouseDown (E) {
    if (E.evt.targetTouches.length === 2) {
      await this.setState({
        multiTouch: true,
        lastPosition: {
          x: (E.evt.targetTouches[ 0 ].clientX + E.evt.targetTouches[ 1 ].clientX) / 2,
          y: (E.evt.targetTouches[ 0 ].clientY + E.evt.targetTouches[ 1 ].clientY) / 2
        }
      })
      return
    }
    const stagePos = this.stage.getPointerPosition()
    const canvasPos = {
      x: stagePos.x - this.state.canvasPosition.x,
      y: stagePos.y - this.state.canvasPosition.y
    }
    this.setState({
      mouseDown: true,
      lastPosition: canvasPos
    })
    if (this.props.clicked === 'bucket') {
      this.path2d = new Path2D()
      this.path2d.moveTo(canvasPos.x, canvasPos.y)
    }
    if (this.props.clicked === 'circle') {
      this.shapeObj = new Konva.Circle({
        x: stagePos.x,
        y: stagePos.y,
        radius: 1,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 1 / 320 * globalLength * 2,
        strokeScaleEnabled: false
      })
      this.layer.add(this.shapeObj)
    } else if (this.props.clicked === 'rectangle') {
      this.shapeObj = new Konva.Rect({
        x: stagePos.x,
        y: stagePos.y,
        width: 1,
        height: 1,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 1 / 320 * globalLength * 2,
        strokeScaleEnabled: false
      })
      this.layer.add(this.shapeObj)
    } else if (this.props.clicked === 'triangle') {
      this.shapeObj = new Konva.RegularPolygon({
        x: stagePos.x,
        y: stagePos.y,
        sides: 3,
        radius: 1,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 1 / 320 * globalLength * 2,
        strokeScaleEnabled: false
      })
      this.layer.add(this.shapeObj)
    } else if (this.props.clicked !== 'eraser') {
      this.points = [{
        x: canvasPos.x,
        y: canvasPos.y,
        timestamp: Date.now()
      }]
    } else {
      this.points = []
    }
  }

  onContentMouseUp () {
    if (this.state.multiTouch) {
      this.setState({
        multiTouch: false,
        last2Position: {
          x: 0,
          y: 0
        }
      })
      return
    }

    this.setState({
      mouseDown: false
    })

    if (this.state.isPaint) {
      if (this.shapeObj) {
        for (let i = this.props.layer; i < this.images.length - 1; ++i) {
          if (!this.images[ i ].nextFill) {
            this.images[ i ].destroy()
          }
        }
        this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer, this.shapeObj)
        this.layer.add(this.image)
        this.layer.draw()
        this.canFill.splice(this.props.layer, this.canFill.length - 1 - this.props.layer, true)

        switch (this.props.clicked) {
          case 'circle':
            this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer,
              circlePoint.map(pos => ({
                x: pos.x * this.shapeObj.scaleX() + this.shapeObj.x() - this.state.canvasPosition.x,
                y: pos.y * this.shapeObj.scaleY() + this.shapeObj.y() - this.state.canvasPosition.y,
                timestamp: Date.now()
              }))
            )
            break
          case 'rectangle':
            this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer,
              rectanglePoint.map(pos => ({
                x: pos.x * this.shapeObj.scaleX() + this.shapeObj.x() - this.state.canvasPosition.x,
                y: pos.y * this.shapeObj.scaleY() + this.shapeObj.y() - this.state.canvasPosition.y,
                timestamp: Date.now()
              }))
            )
            break
          case 'triangle':
            this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer, [{
              x: this.shapeObj.x() - this.state.canvasPosition.x,
              y: this.shapeObj.y() + this.shapeObj.scaleY() - this.state.canvasPosition.y
            }, {
              x: this.shapeObj.x() - this.shapeObj.scaleX() * 0.5 * Math.pow(3, 0.5) - this.state.canvasPosition.x,
              y: this.shapeObj.y() - 0.5 * this.shapeObj.scaleY() - this.state.canvasPosition.y
            }, {
              x: this.shapeObj.x() + this.shapeObj.scaleX() * 0.5 * Math.pow(3, 0.5) - this.state.canvasPosition.x,
              y: this.shapeObj.y() - 0.5 * this.shapeObj.scaleY() - this.state.canvasPosition.y
            }, {
              x: this.shapeObj.x() - this.state.canvasPosition.x,
              y: this.shapeObj.y() + this.shapeObj.scaleY() - this.state.canvasPosition.y
            }])
            break
        }
        this.shapeObj = undefined
      } else {
        this.canvas = global.Konva.document.createElement('canvas')
        this.canvas.width = globalLength * 3
        this.canvas.height = globalLength * 3

        this.ctx = this.canvas.getContext('2d')
        this.ctx.strokeStyle = this.props.clicked === 'eraser' ? 'white' : 'black'
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = this.props.clicked === 'eraser' ? 10 / 320 * globalLength : 1 / 320 * globalLength
        this.ctx.globalCompositeOperation = 'source-over'

        this.image = new Konva.Image({
          image: this.canvas,
          x: this.state.canvasPosition.x,
          y: this.state.canvasPosition.y
        })
        this.layer.add(this.image)
        if (this.props.clicked !== 'eraser') {
          this.layer.draw()
        }

        for (let i = this.props.layer; i < this.images.length - 1; ++i) {
          if (!this.images[ i ].nextFill) {
            this.images[ i ].destroy()
          }
        }
        this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer)
        this.images.push(this.image)
        this.canFill.splice(this.props.layer, this.canFill.length - 1 - this.props.layer, false)
        this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer, this.points)

        if (this.props.clicked === 'bucket') {
          this.path2d = new Path2D()
        }
      }

      this.setState({
        isPaint: false,
        last2Position: {
          x: 0,
          y: 0
        }
      })
      this.props.dispatch(layer.add())
      this.props.dispatch(trash.set(this.props.trash.filter(x => (x.index < this.props.layer))))

      if (!(this.props.layer - 1 > this.props.suggest)) {
        this.props.dispatch(suggest.clear())
        this.timeID = setTimeout(this.props.dispatch, 500, suggestGet({
          shapes: this.paths.slice(this.props.trash[ this.props.trash.length - 1 ].index + 1),
          timestamp: this.props.trash[ this.props.trash.length - 1 ].timestamp
        }))
      }
    } else {
      if (this.shapeObj) {
        this.shapeObj.destroy()
        this.shapeObj = undefined
      } else if (this.props.clicked === 'bucket') {
        let group = {
          nextFill: 'black',
          group: []
        }
        let fillHappened = false
        for (let i = this.props.layer - 1; i >= 0; --i) {
          if (fillHappened) {
            break
          }
          if (this.images[ i ].nextFill) {
            continue
          }
          if (this.canFill[ i ]) {
            if (this.images[ i ].getClassName() === 'Group') {
              let children = this.images[ i ].getChildren(node => { return node.fillEnabled() }).slice(1)
              group.group.push([])
              for (let j = children.length - 1; j >= 0; --j) {
                if (children[ j ].intersects(this.stage.getPointerPosition())) {
                  group.group[ group.group.length - 1 ].push({ shape: children[ j ], prevFill: children[ j ].fill() })
                  children[ j ].fill('black')
                  fillHappened = true
                  break
                }
              }
            } else if (this.images[ i ].intersects(this.stage.getPointerPosition())) {
              group.group.push({ shape: this.images[ i ], prevFill: this.images[ i ].fill() })
              this.images[ i ].fill('black')
              fillHappened = true
            }
          }
        }

        for (let i = this.props.layer; i < this.images.length - 1; ++i) {
          if (!this.images[ i ].nextFill) {
            this.images[ i ].destroy()
          }
        }
        if (fillHappened) {
          this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer, group)
        } else {
          this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer, new Konva.Rect({
            x: this.state.canvasPosition.x,
            y: this.state.canvasPosition.y,
            fill: 'black',
            width: globalLength * 3,
            height: globalLength * 3
          }))
          this.layer.add(this.images[ this.images.length - 2 ])
        }
        this.image.moveToTop()
        this.layer.draw()
        this.canFill.splice(this.props.layer, this.canFill.length - 1 - this.props.layer, false)
        this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer, [])

        this.props.dispatch(layer.add())
        this.props.dispatch(trash.set(this.props.trash.filter(x => (x.index < this.props.layer))))
      }
    }
  }

  onContentMouseMove (E) {
    clearTimeout(this.timeID)
    if (this.state.multiTouch === true) {
      if (this.shapeObj) {
        this.shapeObj.destroy()
      } else {
        this.ctx.clearRect(0, 0, globalLength * 3, globalLength * 3)
      }
      const diff = {
        x: (E.evt.targetTouches[ 0 ].clientX + E.evt.targetTouches[ 1 ].clientX) / 2 - this.state.lastPosition.x,
        y: (E.evt.targetTouches[ 0 ].clientY + E.evt.targetTouches[ 1 ].clientY) / 2 - this.state.lastPosition.y
      }
      if (!(this.images[ this.images.length - 1 ].x() + diff.x < -globalLength * 2 ||
        this.images[ this.images.length - 1 ].x() + diff.x > 0)) {
        for (let i = 0; i < this.images.length; ++i) {
          if (!this.images[ i ].nextFill) {
            this.images[ i ].x(this.images[ i ].x() + diff.x)
          }
        }
        this.setState({
          lastPosition: {
            x: (E.evt.targetTouches[ 0 ].clientX + E.evt.targetTouches[ 1 ].clientX) / 2,
            y: this.state.lastPosition.y
          },
          canvasPosition: {
            x: this.state.canvasPosition.x + diff.x,
            y: this.state.canvasPosition.y
          }
        })
      }
      if (!(this.images[ this.images.length - 1 ].y() + diff.y < -globalLength * 2 ||
        this.images[ this.images.length - 1 ].y() + diff.y > 0)) {
        for (let i = 0; i < this.images.length; ++i) {
          if (!this.images[ i ].nextFill) {
            this.images[ i ].y(this.images[ i ].y() + diff.y)
          }
        }
        this.setState({
          lastPosition: {
            x: this.state.lastPosition.x,
            y: (E.evt.targetTouches[ 0 ].clientY + E.evt.targetTouches[ 1 ].clientY) / 2
          },
          canvasPosition: {
            x: this.state.canvasPosition.x,
            y: this.state.canvasPosition.y + diff.y
          }
        })
      }
      this.layer.draw()
      return
    }
    if (!this.state.mouseDown) {
      return
    }
    const pos = {
      x: this.stage.getPointerPosition().x - this.state.canvasPosition.x,
      y: this.stage.getPointerPosition().y - this.state.canvasPosition.y
    }
    if (this.shapeObj) {
      const distance = Math.pow((Math.pow(pos.x - this.state.lastPosition.x, 2) + Math.pow(pos.y - this.state.lastPosition.y, 2)), 0.5)
      switch (this.props.clicked) {
        case 'circle':
          this.shapeObj.scale({
            x: distance,
            y: distance
          })
          break
        case 'rectangle':
          this.shapeObj.scale({
            x: pos.x - this.state.lastPosition.x,
            y: pos.y - this.state.lastPosition.y
          })
          break
        case 'triangle':
          this.shapeObj.scale({
            x: pos.x - this.state.lastPosition.x,
            y: pos.y - this.state.lastPosition.y
          })
          break
      }
      this.layer.draw()
      this.setState({ isPaint: true })
    } else {
      if (this.state.last2Position.x !== 0 || this.state.last2Position.y !== 0) {
        const last = {
          x: (this.state.last2Position.x + this.state.lastPosition.x) / 2,
          y: (this.state.last2Position.y + this.state.lastPosition.y) / 2
        }
        const next = {
          x: (pos.x + this.state.lastPosition.x) / 2,
          y: (pos.y + this.state.lastPosition.y) / 2
        }

        this.ctx.beginPath()
        this.ctx.moveTo(last.x, last.y)
        this.ctx.quadraticCurveTo(this.state.lastPosition.x, this.state.lastPosition.y, next.x, next.y)
        this.ctx.stroke()
        this.image.draw()

        if (this.props.clicked === 'bucket') {
          this.fillEncircled(pos, last, next)
        }
        if (this.props.clicked !== 'eraser') {
          this.points.push({
            x: this.state.lastPosition.x,
            y: this.state.lastPosition.y,
            timestamp: Date.now()
          })
        }
      }
      this.setState({ isPaint: true, last2Position: this.state.lastPosition, lastPosition: pos })
    }
  }

  async prevStep () {
    const trash = this.props.trash.filter(x => (x.index < this.props.layer - 1))
    if (this.images[ this.props.layer - 1 ].nextFill) {
      for (let i = 0; i < this.images[ this.props.layer - 1 ].group.length; ++i) {
        if (Array.isArray(this.images[ this.props.layer - 1 ].group[ i ])) {
          for (let j = 0; j < this.images[ this.props.layer - 1 ].group[ i ].length; ++j) {
            this.images[ this.props.layer - 1 ].group[ i ][ j ].shape.fill(this.images[ this.props.layer - 1 ].group[ i ][ j ].prevFill)
          }
        } else {
          this.images[ this.props.layer - 1 ].group[ i ].shape.fill(this.images[ this.props.layer - 1 ].group[ i ].prevFill)
        }
      }
    } else {
      this.images[ this.props.layer - 1 ].hide()
    }
    this.layer.draw()
    await this.props.dispatch(layer.minus())
    if (this.props.layer < this.props.suggest || !this.props.suggest) {
      await this.props.dispatch(suggestGet({
        shapes: this.paths.slice(trash[ trash.length - 1 ].index + 1, this.props.layer),
        timestamp: trash[ trash.length - 1 ].timestamp
      }))
    }
  }

  async nextStep () {
    const trash = this.props.trash.filter(x => (x.index < this.props.layer + 1))
    if (this.images[ this.props.layer ].nextFill) {
      for (let i = 0; i < this.images[ this.props.layer ].group.length; ++i) {
        if (Array.isArray(this.images[ this.props.layer ].group[ i ])) {
          for (let j = 0; j < this.images[ this.props.layer ].group[ i ].length; ++j) {
            this.images[ this.props.layer ].group[ i ][ j ].shape.fill(this.images[ this.props.layer ].nextFill)
          }
        } else {
          this.images[ this.props.layer ].group[ i ].shape.fill(this.images[ this.props.layer ].nextFill)
        }
      }
    } else {
      this.images[ this.props.layer ].show()
    }
    this.layer.draw()
    await this.props.dispatch(layer.add())
    if (this.props.layer - 1 < this.props.suggest || !this.props.suggest) {
      await this.props.dispatch(suggestGet({
        shapes: this.paths.slice(trash[ trash.length - 1 ].index + 1, this.props.layer),
        timestamp: trash[ trash.length - 1 ].timestamp
      }))
    }
  }

  trash () {
    if (this.props.trash[ this.props.trash.length - 1 ] === this.props.layer - 1) {
      return
    }
    for (let i = this.props.layer; i < this.images.length - 1; ++i) {
      if (!this.images[ i ].nextFill) {
        this.images[ i ].destroy()
      }
    }
    this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer, new Konva.Rect({
      x: this.state.canvasPosition.x,
      y: this.state.canvasPosition.y,
      fill: 'white',
      width: globalLength * 3,
      height: globalLength * 3
    }))
    this.layer.add(this.images[ this.images.length - 2 ])
    this.images[ this.images.length - 1 ].moveToTop()
    this.layer.draw()
    this.canFill.splice(this.props.layer, this.canFill.length - 1 - this.props.layer, false)
    this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer, [])

    this.props.dispatch(suggestClear())

    this.props.dispatch(layer.add())
    this.props.dispatch(suggest.clear())
    this.props.dispatch(trash.set(this.props.trash.filter(x => (x.index < this.props.layer)).concat({
      index: this.props.layer,
      timestamp: Date.now()
    })))
  }

  onSuggestClick () {
    for (let i = this.props.layer; i < this.images.length - 1; ++i) {
      if (!this.images[ i ].nextFill) {
        this.images[ i ].destroy()
      }
    }
    this.images.splice(this.props.layer, this.images.length - 1 - this.props.layer, new Konva.Group({
      x: this.state.canvasPosition.x,
      y: this.state.canvasPosition.y,
      offset: this.state.canvasPosition
    }))

    let ajax = new XMLHttpRequest()
    let parser = new DOMParser()
    ajax.open('GET', this.props.suggestionChosen, true)
    ajax.send()
    ajax.onload = () => {
      this.images[ this.images.length - 2 ].add(new Konva.Rect({
        x: this.state.canvasPosition.x,
        y: this.state.canvasPosition.y,
        fill: 'white',
        width: globalLength * 3,
        height: globalLength * 3
      }))

      let svg = parser.parseFromString(ajax.responseText, 'image/svg+xml').children[ 0 ].children
      let svgStyle = css.parse(svg[ 0 ].innerHTML).stylesheet.rules
      for (let i = 1; i < svg.length; ++i) {
        const classNode = svgStyle.find(element => element.selectors[ 0 ].slice(1) === svg[ i ].classList.value)
        let haveColor

        if (classNode) {
          haveColor = classNode.declarations.find(element => element.property === 'stroke')
        } else {
          svg = [ ...svg, ...svg[ i ].children ]
          continue
        }

        let transform

        switch (svg[ i ].tagName) {
          case 'path':
            if (svg[ i ].attributes.transform) {
              transform = svgTransformParser(svg[ i ].attributes.transform.value)
            }
            const path = svg[ i ].getPathData().map(seg => ({
              type: seg.type,
              values: seg.values.map(value => value * globalLength / 1920)
            }))
            this.images[ this.images.length - 2 ].add(new Konva.Shape({
              sceneFunc: function (context) {
                context.beginPath()
                let current = path[ 0 ].values
                let reflectionControl
                context.moveTo(...current)
                for (let j = 1; j < path.length; ++j) {
                  switch (path[ j ].type) {
                    case 'M':
                      context.moveTo(...path[ j ].values)
                      current = path[ j ].values
                      break
                    case 'm':
                      context.moveTo(current[ 0 ] + path[ j ].values[ 0 ], current[ 1 ] + path[ j ].values[ 1 ])
                      current = [
                        current[ 0 ] + path[ j ].values[ 0 ],
                        current[ 1 ] + path[ j ].values[ 1 ]
                      ]
                      break
                    case 'T':
                      if (['q', 'Q', 't', 'T'].indexOf(path[ j - 1 ].type) !== -1) {
                        context.quadraticCurveTo(...reflectionControl, ...path[ j ].values)
                        current = path[ j ].values
                        reflectionControl = [
                          2 * current[ 0 ] - reflectionControl[ 0 ],
                          2 * current[ 1 ] - reflectionControl[ 1 ]
                        ]
                        break
                      }
                    case 'L':
                      context.lineTo(...path[ j ].values)
                      current = path[ j ].values
                      break
                    case 't':
                      if (['q', 'Q', 't', 'T'].indexOf(path[ j - 1 ].type) !== -1) {
                        context.quadraticCurveTo(
                          ...reflectionControl,
                          path[ j ].values[ 0 ] + current[ 0 ], path[ j ].values[ 1 ] + current[ 1 ]
                        )
                        current = [
                          path[ j ].values[ 0 ] + current[ 0 ],
                          path[ j ].values[ 1 ] + current[ 1 ]
                        ]
                        reflectionControl = [
                          2 * current[ 0 ] - reflectionControl[ 0 ],
                          2 * current[ 1 ] - reflectionControl[ 1 ]
                        ]
                        break
                      }
                    case 'l':
                      context.lineTo(path[ j ].values[ 0 ] + current[ 0 ], path[ j ].values[ 1 ] + current[ 1 ])
                      current = [
                        path[ j ].values[ 0 ] + current[ 0 ],
                        path[ j ].values[ 1 ] + current[ 1 ]
                      ]
                      break
                    case 'H':
                      context.lineTo(path[ j ].values[ 0 ], current[ 1 ])
                      current = [
                        path[ j ].values[ 0 ],
                        current[ 1 ]
                      ]
                      break
                    case 'h':
                      context.lineTo(path[ j ].values[ 0 ] + current[ 0 ], current[ 1 ])
                      current = [
                        path[ j ].values[ 0 ] + current[ 0 ],
                        current[ 1 ]
                      ]
                      break
                    case 'V':
                      context.lineTo(current[ 0 ], path[ j ].values[ 0 ])
                      current = [
                        current[ 0 ],
                        path[ j ].values[ 0 ]
                      ]
                      break
                    case 'v':
                      context.lineTo(current[ 0 ], path[ j ].values[ 0 ] + current[ 1 ])
                      current = [
                        current[ 0 ],
                        path[ j ].values[ 0 ] + current[ 1 ]
                      ]
                      break
                    case 'C':
                      context.bezierCurveTo(...path[ j ].values)
                      current = path[ j ].values.slice(4, 6)
                      reflectionControl = [
                        2 * path[ j ].values[ 4 ] - path[ j ].values[ 2 ],
                        2 * path[ j ].values[ 5 ] - path[ j ].values[ 3 ]
                      ]
                      break
                    case 'c':
                      context.bezierCurveTo(
                        path[ j ].values[ 0 ] + current[ 0 ], path[ j ].values[ 1 ] + current[ 1 ],
                        path[ j ].values[ 2 ] + current[ 0 ], path[ j ].values[ 3 ] + current[ 1 ],
                        path[ j ].values[ 4 ] + current[ 0 ], path[ j ].values[ 5 ] + current[ 1 ]
                      )
                      current = [
                        path[ j ].values[ 4 ] + current[ 0 ],
                        path[ j ].values[ 5 ] + current[ 1 ]
                      ]
                      reflectionControl = [
                        path[ j ].values[ 4 ] - path[ j ].values[ 2 ] + current[ 0 ],
                        path[ j ].values[ 5 ] - path[ j ].values[ 3 ] + current[ 1 ]
                      ]
                      break
                    case 'S':
                      if (['s', 'S', 'c', 'C'].indexOf(path[ j - 1 ].type) !== -1) {
                        context.bezierCurveTo(...reflectionControl, ...path[ j ].values)
                        current = path[ j ].values.slice(2, 4)
                        reflectionControl = [
                          2 * path[ j ].values[ 2 ] - path[ j ].values[ 0 ],
                          2 * path[ j ].values[ 3 ] - path[ j ].values[ 1 ]
                        ]
                        break
                      }
                    case 'Q':
                      context.quadraticCurveTo(...path[ j ].values)
                      current = path[ j ].values.slice(2, 4)
                      reflectionControl = [
                        2 * path[ j ].values[ 2 ] - path[ j ].values[ 0 ],
                        2 * path[ j ].values[ 3 ] - path[ j ].values[ 1 ]
                      ]
                      break
                    case 's':
                      if (['s', 'S', 'c', 'C'].indexOf(path[ j - 1 ].type) !== -1) {
                        context.bezierCurveTo(
                          ...reflectionControl,
                          path[ j ].values[ 0 ] + current[ 0 ], path[ j ].values[ 1 ] + current[ 1 ],
                          path[ j ].values[ 2 ] + current[ 0 ], path[ j ].values[ 3 ] + current[ 1 ]
                        )
                        current = [
                          path[ j ].values[ 2 ] + current[ 0 ],
                          path[ j ].values[ 3 ] + current[ 1 ]
                        ]
                        reflectionControl = [
                          path[ j ].values[ 2 ] - path[ j ].values[ 0 ] + current[ 0 ],
                          path[ j ].values[ 3 ] - path[ j ].values[ 1 ] + current[ 1 ]
                        ]
                        break
                      }
                    case 'q':
                      context.quadraticCurveTo(
                        path[ j ].values[ 0 ] + current[ 0 ], path[ j ].values[ 1 ] + current[ 1 ],
                        path[ j ].values[ 2 ] + current[ 0 ], path[ j ].values[ 3 ] + current[ 1 ]
                      )
                      current = [
                        path[ j ].values[ 2 ] + current[ 0 ],
                        path[ j ].values[ 3 ] + current[ 1 ]
                      ]
                      reflectionControl = [
                        path[ j ].values[ 2 ] - path[ j ].values[ 0 ] + current[ 0 ],
                        path[ j ].values[ 3 ] - path[ j ].values[ 1 ] + current[ 1 ]
                      ]
                      break
                    case 'z':
                    case 'Z':
                      context.closePath()
                      break
                  }
                }
                context.fillStrokeShape(this)
              },
              x: transform ? transform.rotate.cx * globalLength / 1920 : 0,
              y: transform ? transform.rotate.cy * globalLength / 1920 : 0,
              offset: {
                x: transform ? transform.rotate.cx * globalLength / 1920 : 0,
                y: transform ? transform.rotate.cy * globalLength / 1920 : 0
              },
              rotation: transform ? transform.rotate.angle : 0,
              stroke: haveColor ? 'black' : 'transparent',
              strokeWidth: 1 / 320 * globalLength,
              lineJoin: 'round',
              lineCap: 'round',
              fillEnabled: path[ path.length - 1 ].type === 'z' || path[ path.length - 1 ].type === 'Z'
            }))
            break
          case 'circle':
            const circle = svg[ i ].attributes
            this.images[ this.images.length - 2 ].add(new Konva.Circle({
              x: parseFloat(circle.cx.value) * globalLength / 1920,
              y: parseFloat(circle.cy.value) * globalLength / 1920,
              radius: parseFloat(circle.r.value) > 50 ? parseFloat(circle.r.value) * globalLength / 1920 : 10,
              stroke: haveColor ? 'black' : 'transparent',
              strokeWidth: 1 / 320 * globalLength,
              lineJoin: 'round',
              lineCap: 'round',
              fillEnabled: true
            }))
            break
          case 'ellipse':
            const ellipse = svg[ i ].attributes
            if (ellipse.tranfsform) {
              transform = svgTransformParser(ellipse.tranfsform.value)
            }
            this.images[ this.images.length - 2 ].add(new Konva.Ellipse({
              x: parseFloat(ellipse.cx.value) * globalLength / 1920,
              y: parseFloat(ellipse.cy.value) * globalLength / 1920,
              radius: {
                x: parseFloat(ellipse.rx.value),
                y: parseFloat(ellipse.ry.value)
              },
              offset: {
                x: transform ? transform.rotate.cx : 0,
                y: transform ? transform.rotate.cy : 0
              },
              rotation: transform ? transform.rotate.angle : 0,
              stroke: haveColor ? 'black' : 'transparent',
              strokeWidth: 1 / 320 * globalLength,
              fillEnabled: true,
              scale: {
                x: globalLength / 1920,
                y: globalLength / 1920
              }
            }))
            break
        }
      }

      this.layer.add(this.images[ this.images.length - 2 ])

      this.image.moveToTop()
      this.layer.draw()
    }
    this.canFill.splice(this.props.layer, this.canFill.length - 1 - this.props.layer, true)
    this.paths.splice(this.props.layer, this.paths.length - 1 - this.props.layer, [])
    this.props.dispatch(suggest.set())
    this.props.dispatch(layer.add())
  }

  async search (url) {
    this.props.dispatch(loading())
    let id
    await fetch('http://inventindent.corp.sg3.yahoo.com:8000/', {
      method: 'POST',
      body: JSON.stringify({
        url: url,
        color: this.props.color,
        mode: 'generate'
      })
    }).then(res => res.json())
      .then(json => {
        id = json.id
        this.props.dispatch(image.produce('data:image/png;base64,' + json.img_str, json.id))
      })

    await fetch('http://inventindent.corp.sg3.yahoo.com:8000/', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        mode: 'imgsearch'
      })
    }).then(res => res.json())
      .then(json => {
        this.props.dispatch(product(json.items, json.fun_comment, json.fun_name, json.fun_price))
        this.props.dispatch(loading())
      })
  }

  share (medium) {
    const data = this.stage.toDataURL().replace(/^data:image\/\w+;base64,/, '')
    const file = Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1)
    const url = (window.document.origin + '/' + file).replace('_', '://').replace('_', ':')
    fetch('/writefile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data, file })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.error(json.error)
        }
        if (json.success) {
          console.log(json.success)
        }
      })
    switch (medium) {
      case 'clipboard':
        copy(url)
        break
      case 'facebook':
        window.open('https://www.facebook.com/sharer?u=' + encodeURIComponent(url), '_blank')
        break
      case 'messenger':
        window.open('fb-messenger://share?link=' + encodeURIComponent(url), '_blank')
        break
    }
  }

  render () {
    return (
      <div id='root' className={style.container}>
        <div id='container' className={style.canvas} />
        {
          this.state.mounted
          ? <div className={style.btns}>
            <ToolListContainer ctx={this.ctx} />
            <div className={style.btn}>
              <span className={[
                'glyphicon glyphicon-trash',
                style.btnCircle,
                this.props.trash.some(elmt => elmt.index === this.props.layer - 1) ? style.btnNotAllowed : ''
              ].join(' ')} aria-hidden='true' onClick={this.props.trash.some(elmt => elmt.index === this.props.layer - 1) ? undefined : this.trash} />
            </div>
            <div className={style.btn}>
              <div>
                <div className={style.btnCircle} aria-hidden='true' />
                <img src={this.props.layer === 1 ? '../../statics/files/undo-notAllowed.svg' : '../../statics/files/undo.svg'}
                  className={[
                    style.svg,
                    style.doSVG
                  ].join(' ')} aria-hidden='true' onClick={this.props.layer === 1 ? undefined : this.prevStep} />
              </div>
            </div>
            <div className={style.btn}>
              <div>
                <div className={style.btnCircle} aria-hidden='true' />
                <img src={this.props.layer === this.images.length - 1 ? '../../statics/files/redo-notAllowed.svg' : '../../statics/files/redo.svg'}
                  className={[
                    style.svg,
                    style.doSVG
                  ].join(' ')} aria-hidden='true' onClick={this.props.layer === this.images.length - 1 ? undefined : this.nextStep} />
              </div>
            </div>
          </div>
          : ''
        }
        {
          this.state.mounted
          ? <SuggestionContainer onClick={this.onSuggestClick} paths={this.paths} share={this.share} />
          : ''
        }
        {
          this.state.mounted
          ? <ColorContainer transform2Object={this.transform2Object} />
          : ''
        }
      </div>
    )
  }
}

export const CanvasContainer = connect(mapStateToProps)(Canvas)
