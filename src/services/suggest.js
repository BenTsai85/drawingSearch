import autodraw from 'autodraw'

export const suggest = {
  service: payload => autodraw(payload.shapes, payload.timestamp),
  selector: results => results
}
