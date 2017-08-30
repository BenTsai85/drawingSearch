import canvasDefaultPage from './pages/canvasDefault'
import canvasPage from './pages/canvas'

const routes = {
  canvasDefault: {
    path: '/',
    page: canvasDefaultPage
  },
  canvas: {
    path: '/:uuid',
    page: canvasPage
  }
}

export default routes
