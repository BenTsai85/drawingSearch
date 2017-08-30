import { suggest } from './suggest'
import { suggestGet } from '../actions/canvas/suggest'
// * You should define all services in serviceList,
// * If a service is not listed here, then it can not be executed by redux middleware.
// * The service name should be a service action type.
const serviceList = {
  [ suggestGet ]: suggest
}

export default serviceList
