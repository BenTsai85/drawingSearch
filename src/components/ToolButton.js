import React from 'react'
import style from '../containers/CanvasContainer.css'

export const ToolButton = ({ toolClass, orderClass, onClick, hide }) =>
  <span className={[
    'glyphicon',
    style.btnCircle,
    toolClass,
    hide ? style.toolFirst : orderClass
  ].join(' ')} aria-hidden='true' onClick={onClick} />

export const ShapeButton = ({ shape, orderClass, onClick, hide }) =>
  <div>
    <span className={[
      style.btnCircle,
      hide ? style.toolFirst : orderClass
    ].join(' ')} aria-hidden='true' />
    <img src={'https://www.autodraw.com/assets/images/icons/' + shape + '.svg'}
      className={[
        style.svg,
        hide ? style.toolFirst : orderClass
      ].join(' ')} aria-hidden='true' onClick={onClick} />
  </div>
